# 014 — SEO / AEO / GEO / AI-search discoverability layer for fedxd.net

## Entry points

- `lib/portfolio/{identity,content,projects,slugs,json-ld,types}.ts` — server-only re-export layer that consumes `portfolio_data/*` for both HTML routes and machine-readable endpoints. The OS engine in `components/machine/box-computer-engine.ts` continues to import the raw `portfolio_data/*` files directly without going through this layer.
- `app/page.tsx` — root page now wraps `<BoxComputer />` with `<SemanticFallback />` (sr-only) + `<JsonLd>` Person + WebSite schemas. The OS engine, the markup, and the CSS are byte-for-byte unchanged.
- `app/{about,projects,projects/[slug],skills,experience,education,achievements,contact,portfolio}/page.tsx` — semantic HTML routes (Server Components) that render from `lib/portfolio/*`.
- `app/{content.json,content.txt,llms.txt,llms-full.txt}/route.ts` — `GET` route handlers, content-type-correct, no secrets.
- `app/sitemap.ts`, `app/robots.ts` — multi-page sitemap enumeration; multi-group robots policy (search crawlers allowed, AI-training crawlers disallowed, AI-search crawlers explicitly allowed).
- `components/seo/{page-shell.tsx,semantic-fallback.tsx}` — shared layout shell (top nav, footer, breadcrumbs) used by every new route and an sr-only semantic fallback for `/`.

## Flow

### 1. Layering

Two adjacent surfaces, two different audiences:

- **OS at `/`** for human visitors — immersive CRT simulation, unchanged.
- **`/about`, `/projects`, `/skills`, `/experience`, `/education`, `/achievements`, `/contact`, `/portfolio`, `/projects/<slug>`** for crawlers, AI search engines, and humans who land on a deep link — readable, semantic, no JS required.

The OS engine is untouched. `app/page.tsx` is the *only* consumer of `<BoxComputer />` and that import has not changed path or shape.

`lib/portfolio/` is a thin re-export layer. Neither side (OS engine, SEO pages) shares runtime state with the other because they're on different URLs. The layer prevents *data* duplication: `home.json`, `about.md`, `skills.json`, `experience.json`, `education.json`, `achievements.json`, `contact.json`, `projectsData.js`, and the nine `<project>-data.js` bundles are the single source of truth. The OS engine reads them through `@ts-nocheck` engine imports; the SEO layer reads them through typed TS accessors.

### 2. Server-side data normalisation

`lib/portfolio/projects.ts` imports every `<project>-data.js` bundle statically. The bundles have slightly different shapes (FxDC has full schema, Skyntel has no bundle at all, VoiceMatter is mostly TODO stubs). `normaliseToProjectDetail` coerces every bundle to a single `ProjectDetail` shape with safe defaults for every field. `pickFeatures` and `arr<T>()` helpers tolerate missing fields.

`ProjectSummary` (light, returned by `getAllProjects()`) and `ProjectDetail` (full, returned by `getProject(slug)`) are kept as **separate** types — `ProjectDetail` does not extend `ProjectSummary` because they have different `features` shapes (`string[]` of titles vs. `ProjectFeature[]` of objects). This avoids `Array<>.map` crashes on projects whose bundle omits features.

Each access pattern uses the appropriate type:
- `getAllProjects()` → `ProjectSummary[]` (used by `/projects` and `/portfolio` for list rendering).
- `getProject(slug)` → `ProjectDetail | null` (used by `/projects/[slug]` and `/llms-full.txt` for full-fidelity rendering).
- `getAllProjectSlugs()` → `string[]` (used by `generateStaticParams` and `sitemap.ts`).

### 3. Per-route rendering pattern

Every SEO route follows:

1. `export const metadata` (or `generateMetadata` for `[slug]`) returning title, description, OG, Twitter, canonical, `robots: { index: true, follow: true }`.
2. `export default async function` (Server Component) for dynamic routes (Next 16 makes `params: Promise<{…}>`).
3. Optional `generateStaticParams` for dynamic paths.
4. `<JsonLd>` components placed near the top of the JSX to deliver schema.org markup inline.
5. `<PageShell>` (shared layout) with `<Breadcrumbs>` and the "Open Interactive Portfolio" footer link.
6. Heavy sections are gated on `length > 0` so projects with sparse data don't show empty `<ul>`s.

The `[slug]` route additionally wraps the normalised `project` object in a `safe` local with every key defaulted to `[]`, `"`, or `{}` — projects without `-data.js` (Skyntel, FedxD-PiPy, FxChange, Webstore) still render rather than crashing the prerender pass.

### 4. JSON-LD helpers

`lib/portfolio/json-ld.tsx` exports:

- `personSchema()`, `websiteSchema()`, `projectSchema(project)`, `collectionSchema({name, description, urlPath, items})`, `breadcrumbsSchema(items)` — return plain typed objects.
- `<JsonLd schema={…}>` — a Server Component that renders `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`. No external library; no client hydration needed.

The `Person` schema shares a `sameAs` array across every page so search engines resolve to one canonical entity URL (`https://fedxd.net#person`). Projects link to the person via `author: { "@id": … }`. Projects without a GitHub URL use `CreativeWork` instead of `SoftwareSourceCode` — falling back rather than fabricating data.

### 5. Sitemap

`app/sitemap.ts` enumerates:

- Core routes (always present): `/`, `/portfolio`, `/about`, `/projects`, `/skills`, `/experience`, `/education`, `/achievements`, `/contact` — each with explicit `changeFrequency` and `priority`.
- `/projects/<slug>` for every slug returned by `getAllProjectSlugs()` — 13 paths.

The static `public/sitemap.xml` that shipped with the original Create-React-App build was removed; until removed it shadowed the dynamic route and emitted a one-URL sitemap.

### 6. Robots policy

`app/robots.ts` returns:

- Wildcard rule: `User-agent: *`, `Allow: /`, `Disallow: /api/, /admin/, /500-test/`.
- Explicit `Allow: /` for: Googlebot, Google-InspectionTool, Bingbot, Slurp, DuckDuckBot, Baiduspider, YandexBot, OAI-SearchBot, PerplexityBot, Perplexity, DuckAssistBot, YouBot, ChatGPT-User.
- Explicit `Disallow: /` for: GPTBot, ClaudeBot, Claude-Web, anthropic-ai, Applebot-Extended, Google-Extended, CCBot, cohere-ai, cohere-training-data-crawler, ImagesiftBot, Diffbot.
- `host` and `sitemap` directives at the bottom.

The static `public/robots.txt` was deleted (shadowed the dynamic route).

### 7. Machine-readable endpoints

Each is a `route.ts` exporting `GET`:

| Path | Content-Type | Use |
|---|---|---|
| `/content.json` | `application/json` | Normalised portfolio data; EmailJS keys stripped via `getContact()` |
| `/content.txt` | `text/plain; charset=utf-8` | Heading-tagged plain text mirror |
| `/llms.txt` | `text/plain; charset=utf-8` | Concise AI-oriented site index (per llmstxt.org conventions) |
| `/llms-full.txt` | `text/markdown; charset=utf-8` | Extended Markdown-formatted description |

Each sets `Cache-Control: public, max-age=3600, s-maxage=3600`. The endpoints never set cookies, never auth — they are safe to be hit by any agent.

### 8. Homepage semantic fallback

`app/page.tsx` now returns:

```tsx
<>
  <JsonLd schema={personSchema()} />
  <JsonLd schema={websiteSchema()} />
  <BoxComputer />           {/* unchanged */}
  <SemanticFallback />      {/* sr-only */}
</>
```

`SemanticFallback` is a Server Component rendering an `<h1>`, name + aliases short bio, a `<nav>` listing every public HTML route, and a link to the OS homepage. Tailwind's `sr-only` keeps the block invisible to sighted users but visible to screen readers and crawlers — fulfilling "must not disrupt the OS" and "must genuinely be accessible" simultaneously.

### 9. The not-found page

`app/not-found.tsx` still renders the themed 404 terminal animation. The secondary CTA was changed from `/projects` (404s) to `/portfolio` (always 200). Same visual; one fewer broken link.

## What changed vs. what didn't

**Added:**

- `lib/portfolio/identity.ts`, `content.ts`, `projects.ts`, `slugs.ts`, `json-ld.tsx`, `types.ts`
- `components/seo/page-shell.tsx`, `semantic-fallback.tsx`
- `app/about/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`
- `app/skills/page.tsx`, `app/experience/page.tsx`, `app/education/page.tsx`
- `app/achievements/page.tsx`, `app/contact/page.tsx`, `app/portfolio/page.tsx`
- `app/content.json/route.ts`, `app/content.txt/route.ts`
- `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`

**Modified:**

- `app/page.tsx` — adds `<SemanticFallback />` + two `<JsonLd>` wrappers around unchanged `<BoxComputer />`.
- `app/sitemap.ts` — enumerates all indexable routes + every project slug.
- `app/robots.ts` — multi-group policy.
- `app/not-found.tsx` — broken secondary CTA replaced with `/portfolio`.

**Deleted (stale, were shadowing dynamic routes):**

- `public/robots.txt`, `public/sitemap.xml`, `public/index.html`, `public/404.html`

**Untouched:**

- `components/machine/box-computer-engine.ts` (engine)
- `components/machine/box-computer.tsx` (React wrapper)
- `components/machine/box-computer-markup.ts`
- `components/machine/box-computer.css`
- `portfolio_data/*` — no duplication; SEO layer reads the same files
- `next.config.mjs`, `tailwind.config.*`, `tsconfig.json`
- All `components/layout/*` (theme/cursor/scroll-top/legacy-banner)
- `app/api/*` (csp-report, github, cron, avatar, status)

## Verification surface

1. `pnpm tsc --noEmit` — clean.
2. `pnpm next build` — succeeds with all 13 project paths and 9 static HTML routes prerendered.
3. `curl http://localhost:3001/{about,portfolio,projects,skills,experience,education,achievements,contact}` — 200, valid HTML, JSON-LD scripts present.
4. `curl http://localhost:3001/projects/{teachback,skyntel,fedxd-data-container-fxdc,voicematter,fincore,fxpy,…}` — 200, project-specific title and `<h1>`, `SoftwareSourceCode` JSON-LD present, canonical URL self-references `/projects/<slug>`.
5. `curl http://localhost:3001/projects/does-not-exist` — 404, themed `app/not-found.tsx`.
6. `curl http://localhost:3001/{content.json,content.txt,llms.txt,llms-full.txt}` — 200, correct content-type, no secrets in JSON.
7. `curl http://localhost:3001/sitemap.xml` — 200, 22 `<loc>` entries (9 static + 13 project slugs).
8. `curl http://localhost:3001/robots.txt` — multi-group policy (allow list, training-crawler disallow list, host, sitemap).
9. `curl -s -o /dev/null -w "%{http_code}" /` — 200, HTML contains `<BoxComputer />` marker, `<h1>Kazim Abbas…</h1>` in sr-only fallback, application/ld+json scripts.
