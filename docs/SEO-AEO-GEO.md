# fedxd.net — SEO / AEO / GEO / AI-search Discoverability

This document describes the public search-indexing surface of fedxd.net and how it integrates with the existing interactive portfolio. It is the user-facing companion to the execution flow doc (`docs/flows/014-seo-aeo-geo-implementation.md`).

> **Scope reminder:** This infrastructure makes every public portfolio page *eligible* for indexing and inclusion in AI-search answers. It does not guarantee rankings, AI citations, or training-data usage. Indexing and citations are gradual, gradual, gradual.

---

## 1. What is now indexable

Every URL below returns HTTP 200 for humans and crawlers, renders meaningful HTML without JavaScript, exposes unique metadata, and ships schema.org JSON-LD where applicable.

| URL | Purpose | JSON-LD type(s) |
|---|---|---|
| `/` | Interactive OS homepage (unchanged) — adds an `sr-only` semantic fallback alongside `<BoxComputer />` | `Person`, `WebSite` |
| `/portfolio` | Accessible hub: summary of every section with deep links to sibling routes and the OS | `WebSite`, `Person`, `BreadcrumbList` |
| `/about` | Biography + identity + skills + experience + achievements + contact | `Person`, `WebSite`, `BreadcrumbList` |
| `/projects` | List of every public project with per-card descriptions and tech tags | `CollectionPage`, `BreadcrumbList` |
| `/projects/<slug>` | Full project page (one per project in the canonical `projectsData.js`) | `SoftwareSourceCode` (or `CreativeWork` if no GitHub URL), `BreadcrumbList` |
| `/skills` | Six skill categories with proficiency levels + skill stats | `Person`, `BreadcrumbList` |
| `/experience` | Professional timeline (KayzBlog, Disutils) + skills gained | `BreadcrumbList` |
| `/education` | BUKC bachelor + intermediate + matriculation + parallel self-taught learning | `BreadcrumbList` |
| `/achievements` | AI Preneur '26 (TeachBack) + NASA Space Apps '25 (Skyntel) | `BreadcrumbList` |
| `/contact` | Public contact methods + availability tags | `BreadcrumbList` |

Slugs are derived deterministically from project titles in `portfolio_data/projectsData.js` (`TeachBack → teachback`, `FedxD Data Container (FxDC) → fedxd-data-container-fxdc`, etc.). The list of slugs is exposed via `getAllProjectSlugs()` and re-used by `generateStaticParams()` and `sitemap.ts`.

`projectsData.js` declares 13 entries; every one is rendered as its own `/projects/<slug>` URL.

> **Unknown slugs return real 404s.** Visiting e.g. `/projects/wxyz` triggers `notFound()`, which Next serves with HTTP 404 and the themed `app/not-found.tsx`. The not-found page links to `/` and `/portfolio` (the secondary link was changed from the previously-broken `/projects`).

---

## 2. The OS is unchanged

The interactive operating system is the entire visitor experience — and this infrastructure is added alongside, not on top of. Specifically:

- `components/machine/box-computer-engine.ts` — engine file, **unchanged**.
- `components/machine/box-computer.tsx` — React wrapper, unchanged.
- `components/machine/box-computer-markup.ts` — CRT markup, unchanged.
- `components/machine/box-computer.css` — styling, unchanged.
- The OS engine still imports `portfolio_data/content/*.json` and `portfolio_data/projectsData.js` directly. The new `lib/portfolio/` server-side layer is parallel to that — it does not flow through the engine.
- `app/page.tsx` renders `<BoxComputer />` *and* `<SemanticFallback />` (sr-only). Sighted visitors see only the OS; screen-reader and no-JS users hit the fallback. There is no redirect, no user-agent sniffing, no cloaking.

---

## 3. Crawler & AI-search policy

`app/robots.ts` declares one wildcard policy plus explicit allow/disallow buckets:

- **Allowed (`User-agent: *` then specific `Allow: /` for):** Googlebot, Google-InspectionTool, Bingbot, Slurp, DuckDuckBot, Baiduspider, YandexBot, **OAI-SearchBot, PerplexityBot, Perplexity, DuckAssistBot, YouBot, ChatGPT-User**.
- **Disallowed (`Disallow: /`)**: **GPTBot, ClaudeBot, Claude-Web, anthropic-ai, Applebot-Extended, Google-Extended, CCBot, cohere-ai, cohere-training-data-crawler, ImagesiftBot, Diffbot.**
- **Always disallowed:** `/api/`, `/admin/`, `/500-test/`.
- `host` and `sitemap` directives included at the bottom.

This is the user-confirmed default. To revisit, change the arrays in `app/robots.ts`.

Crawler-name references are taken from each operator's published docs (OpenAI, Anthropic, Google AI, etc.) rather than guesswork.

---

## 4. Structured data

JSON-LD types ship inline in the HTML — no extra runtime dependency:

- `Person` — at `/`, `/about`, `/portfolio`, `/skills`. Authoritative `@id` is `https://fedxd.net#person`. `alternateName: ["Kasim Abbas", "FedxD", "FedXD", "Kazim FedxD", "Kasim Abbas FedxD"]`. `sameAs` only includes verified public profiles (GitHub, LinkedIn).
- `WebSite` — at `/`, `/about`, `/portfolio`. `inLanguage: "en"`, `author: { "@id": … #person }`.
- `CollectionPage` — at `/projects`. Lists every project as a `hasPart`.
- `SoftwareSourceCode` (or `CreativeWork` when no GitHub repo) — at `/projects/<slug>`. Includes `codeRepository`, `programmingLanguage` from tech stack, `author: { "@id": … #person }`, `keywords`.
- `BreadcrumbList` — at every section route.
- Schema builders live in `lib/portfolio/json-ld.tsx`; the `<JsonLd>` Server Component renders them with Next's idiomatic inline `<script type="application/ld+json">`.

Nothing is fabricated. No ratings, no reviews, no certifications, no organisational affiliations. If a project lacks a tech-stack array, the `programmingLanguage` list falls back to the `tech: []` field from `projectsData.js`.

---

## 5. Sitemap & robots behaviour

- `https://fedxd.net/sitemap.xml` is a dynamic XML sitemap with **22 entries**: 9 static routes (`/`, `/portfolio`, `/about`, `/projects`, `/skills`, `/experience`, `/education`, `/achievements`, `/contact`) plus 13 project slugs.
- `https://fedxd.net/robots.txt` is a dynamic, multi-group robots.txt as described above.
- Both routes are static-pre-rendered (declared `dynamic = "auto"` via Next defaults).
- The previous static `public/robots.txt`, `public/sitemap.xml`, `public/index.html`, and `public/404.html` (legacy Create-React-App build) were deleted because they were shadowing the dynamic routes. CNAME, favicon, og-image, resume.pdf, and the `manifest.json` PWA manifest are kept.

Adding or removing a project in `portfolio_data/projectsData.js` automatically updates the sitemap and `generateStaticParams` on the next build.

---

## 6. Machine-readable endpoints

Optional supplements for AI agents and crawlers that prefer non-HTML formats. None of these are load-bearing for any search engine.

| URL | Content-Type | Notes |
|---|---|---|
| `/content.json` | `application/json` | Normalised portfolio data. `EmailJS` keys stripped from the contact card. No secrets. |
| `/content.txt` | `text/plain; charset=utf-8` | Heading-tagged plain-text mirror of `content.json`. |
| `/llms.txt` | `text/plain; charset=utf-8` | Concise AI site index (per llmstxt.org). Lists every public route. |
| `/llms-full.txt` | `text/markdown; charset=utf-8` | Extended Markdown description, one section per area. |

All four are `public, max-age=3600, s-maxage=3600`.

Treat these as compatibility aids. The HTML routes are authoritative.

---

## 7. How new projects become discoverable

The path from "add a project" to "search engines see it":

1. Add the project to `portfolio_data/projectsData.js` with `title`, `description`, `tech`, `github`, `features`, and an `order` value.
2. (Optional, for full long-form page) Create `portfolio_data/<slug>-data.js` with the matching title; export the data as `xData`; register it in `lib/portfolio/projects.ts` → `LONG_FORM` map.
3. (Optional) Drop a `projects/<ProjectName>/` folder with the `.md` source files for hand-authored content.
4. Rebuild (`pnpm build`). The build output shows `/projects/[slug]` and lists every generated path; the same list appears in the next sitemap response.

Each new project automatically gets:

- A `/projects/<slug>` page with title, description, JSON-LD `SoftwareSourceCode`, BreadcrumbList, and an "Open Interactive Portfolio" footer link.
- An entry in `/projects` (collection), `/portfolio` (hub), `/content.json`, `/content.txt`, `/llms.txt`, `/llms-full.txt`.
- A `<loc>` in `/sitemap.xml`.

Nothing else needs to change. The OS engine picks up the same `projectsData.js` row and renders it inside the in-sim Projects window.

---

## 8. Manual verification steps

These require your access to the third-party consoles; we cannot complete them for you.

### Google Search Console

1. Go to <https://search.google.com/search-console/welcome> → **Add property** → enter `https://fedxd.net`.
2. Verify ownership — DNS `TXT` record on `fedxd.net` is the recommended method; HTTP file upload via `public/` is also OK (the live Next.js `app/layout.tsx` does not need to change).
3. Once verified, go to **Sitemaps** → submit `https://fedxd.net/sitemap.xml`.
4. Use **URL Inspection** to test: `/`, `/about`, `/projects`, `/projects/teachback`, `/projects/skyntel`, `/projects/fedxd-data-container-fxdc`, `/content.json`, `/llms.txt`.
5. (Optional) Click **Request Indexing** on the most important URLs after first deploy.

### Bing Webmaster Tools

1. <https://www.bing.com/webmasters> → **Add a site** → `https://fedxd.net`.
2. Verify via DNS `CNAME` (Bing widget) or `meta` tag (the project's root layout currently exposes a `theme-color` and OG/Twitter meta but no `msvalidate` — add one when Bing issues the token).
3. Submit `https://fedxd.net/sitemap.xml`.
4. **URL Inspection** mirrors Google's flow.

### AI-search crawlers

- OAI-SearchBot (OpenAI): confirmed allowed in `robots.txt`. Reach via IndexNow or `https://platform.openai.com/docs/` if OpenAI ever publishes a direct ingest URL.
- PerplexityBot: confirmed allowed. Indexing is automatic; no manual submission step.
- DuckAssistBot (DuckDuckGo): confirmed allowed.
- YouBot (You.com): confirmed allowed.

### Manual queries to monitor

After first deploy, none of these are guaranteed to return results immediately — indexation is gradual. Useful queries to spot-check after 1-7 days:

- `site:fedxd.net`
- `site:fedxd.net/projects`
- `"Kazim Abbas" "FedxD"`
- `"Kasim Abbas" "FedxD"`
- `"FedxD Data Container"` (FxDC)
- `"TeachBack" "Kazim Abbas"`
- `"Skyntel" "Kazim Abbas"`
- `"VoiceMatter" "Kazim Abbas"`

Each query should return at least one result pointing to a page on fedxd.net once indexation propagates.

### Rich Results Test

Paste one of the served JSON-LD blocks into <https://search.google.com/test/rich-results> after deploy. The page-level `Person` and `WebSite` schemas should pass without warnings; project `SoftwareSourceCode` schemas may surface a "page lacks visible content for this type" note if the page is JS-only — but every project page here ships real HTML.

---

## 9. What this layer is *not*

- Not a guarantee of rankings or AI-search inclusion. Search engines and AI products make inclusion decisions on their own terms.
- Not a replacement for the OS experience. The OS is the visitor experience; the SEO layer is the indexing surface. Visitors arrive at `/` either way; search engines arrive wherever they prefer.
- Not a way to influence training-data extraction. The robots policy is the relevant control surface, not the page markup.

---

## 10. Known limitations & follow-ups

| Limitation | Status |
|---|---|
| Google Search Console / Bing Webmaster Tools verification | Manual step for the user. |
| `dynamicParams = false` on `/projects/[slug]` — adding a project requires a rebuild | Acceptable: the OS already requires a rebuild to pick up new projects in the in-sim window. |
| OG image is the generic `/og-image.jpg` for the home; project pages do not have dedicated OG art | Could be added later via `next/og` if per-project artwork is desired. |
| Google AI Overviews and ChatGPT search aren't transparent about their selection criteria | Out of our control; covered by eligibility, content quality, and robot policy. |
| VoiceMatter bundle has TODO stubs | Yellow "Note" box on the page; rest of the page renders from available fields. Same for Skyntel, FedxD-PiPy, FxChange, Webstore. |
| `pnpm` policy (`ERR_PNPM_IGNORED_BUILDS`) forces local `./node_modules/.bin/next build` instead of `pnpm build` | Local `next build` succeeds; production CI may need `pnpm approve-builds`. |
| Static `public/manifest.json` references `#0d1410` while the Next.js metadata declares `#7a6aa8` | Cosmetic, not a search-discoverability issue. Trim on a future branch. |
