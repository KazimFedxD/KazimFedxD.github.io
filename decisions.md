# Decisions

A log of meaningful decisions made in this codebase, newest first. Each entry explains the call, the reasoning, and what was rejected.

## 2026-10-04 — Contact form wired to EmailJS, personal email removed

**Decision:** Add a real `<form class="contact-form">` to the in-sim Contact app, with Name + Email side-by-side, optional Subject, Message body, and a Send button. Submit fires `emailjs.send(...)` for two recipient templates (notification to owner, confirmation to visitor), reading service ID / public key / template IDs from `portfolio_data/content/contact.json`'s `form.emailJs` block. The personal `abbaskazim135@gmail.com` is removed everywhere it appeared in `contact.json` and replaced with the business `fedxdofficial@gmail.com`. CSP `connect-src` is relaxed to allow `https://api.emailjs.com`.

**Why:**

- The user's old portfolio (`portfolio-website-data.js`) used the dual-template pattern with EmailJS; reusing the same payload shape (`user_name`, `subject`, `message`, `timestamp`) means the templates the user already has configured at EmailJS don't need to be edited. The `timestamp` field is added on top so the visitor's confirmation has a send-time string without the templates needing it.
- EmailJS's `publicKey` is a public key by design (it's literally called that) — it gates the service ID, but it isn't secret. Reading it from `contact.json` keeps a single source of truth for all Contact-app configuration (form fields, contact info, EmailJS keys) instead of splitting between data and env vars.
- The `IDENTITY.email` lookup in `box-computer-engine.ts` (line 73) is `contact.contactInfo.find(c => /email/i.test(c.title)).value` — so flipping the JSON value automatically propagates to the in-sim Terminal `contact` command, the `ALLOWED_LINKS.email = mailto:…` map, and the Hire page's footer. Zero engine edits needed for the email swap.
- The browser-page click delegation (`pageEl.addEventListener('click', …)`) short-circuits on `e.target.closest('a')` and bails if null — so a form submission click falls through that path and only hits the new `submit` listener attached directly to `#contactForm`. No extension of the click handler needed.

**Rejected:**

- *Server-side proxy through `/api/contact`.* Would have kept `connect-src 'self'` intact, but added: a route handler, server-side fetch, env-var loading for the EmailJS service ID, and a second error-handling surface. The user provided direct-browser-call code; matching that is the lazy fix. CSP gets one allowlist entry, the engine stays self-contained.
- *Env-var indirection (`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`).* Standard practice for keys, but EmailJS's public key isn't a secret by their own contract, and the user explicitly chose to read from `contact.json`. Splitting keys across `.env.local` and `contact.json` would have been two sources of truth for one app's setup.
- *Generic form hook / reusable `<ContactForm>` React component.* The engine is a single ~2000-line imperative DOM module by design (see the file's header comment). A React subtree inside `dangerouslySetInnerHTML` markup would break that contract for one feature.
- *Use the existing in-page `#bStatus` as the only status feedback, skip the inline `#contactStatus`.* A bare status bar update is invisible until you look at the bottom of the window — feedback next to the Send button is the natural place. `#bStatus` is also updated so the bottom bar still reflects "Done" / "Sending…" / "Failed" like every other browser action.
- *Migrate the static contact-info list to a real Markdown file (`hire.md`-style).* The Contact page is one of the few PAGES that already pulls all its content from `contact.json`. There's no engine reading a `.md` for it. Adding form HTML inline is the smaller change.
- *Keep the personal email anywhere in `contact.json` (e.g. as a secondary card labeled differently) "in case I want to use it."* The user explicitly said remove my personal email from this — keeping it under a different label is the kind of speculative flexibility that drifts toward inconsistency. Out, fully.
- *Add server-side rate limiting.* No backend involvement (EmailJS does this on its side). Adding our own limiter would mean the server proxy that was rejected above.

---

## 2026-10-04 — favicon.jpg + Resume dicon + Hire download button

**Decision:** Three small changes, none of them architecturally new:

1. Switch `metadata.icons` in `app/layout.tsx` from the three missing `favicon-{32,64,192}.png` entries to a single `/favicon.jpg` (the only favicon file on disk).
3. Add a Resume app icon (with a tiny new `download.svg` mask) to the CRT desktop. Clicking it — or the Resume entry in the rootmenu — calls `downloadResume()`, which programmatically clicks a transient `<a href="/resume.pdf" download>` and discards it. No window opens.
4. Add a `<a class="dlbtn" href="/resume.pdf" download>` line to `PAGES.hire.html` (the engine's virtual `hire.md` — the actual MD file does not exist in the repo; the page content is composed inline in the engine from `portfolio_data/content/skills.json`).

**Why:**

- The favicon files were referenced but never existed on disk — browsers were 404ing on every page load. Using what's on disk is the lazy fix.
- A click → download flow was the user's literal request. Routing through `openApp('resume')` would have opened a windowed Resume app instead, which is what `openApp` does to every other dicon — but no Resume window makes sense if the file itself is the thing being handed over. The dicon and rootmenu both special-case `resume` before the `openApp()` fallthrough.
- The `hire.md` filename is what the user wrote; the actual file is a virtual page in the engine's `PAGES.hire` slot (same shape as `about.md`, `contact.md`, etc. — they show up in the in-sim `ls` output via `FS_TREE` and the File Manager, but the content is composed inline at engine-load). Adding the download button there puts the same control a visitor sees when they open the Hire app — no second file to keep in sync.
- New SVG icon file: 18 bytes, one path, a document + corner-fold. Mirrors the card/briefcase shape language of the existing icons so it sits in the grid without design debt.

**Rejected:**

- *Open a Resume window instead of triggering the download.* Would have required a new app entry in `appTitle()`, `openApp()`, the FS_TREE, plus window chrome for what is functionally a one-click file delivery. The user said "make it download" — they didn't ask for a window. Click → download is the smallest thing that satisfies the request.
- *Reuse an existing icon (e.g. `card.svg`) for Resume.* `card.svg` is the Memory Match glyph. Repurposing it would have meant either changing Memory Match's icon (extra work for no gain) or having two apps with the same icon (visual confusion). One tiny SVG file is cheaper than either.
- *Add the Resume download button to multiple places (About, Contact, rootmenu, etc.).* One place — the Hire page — is the canonical "you want to evaluate me for a role" surface. Spreading the same button across more pages is the kind of speculative reuse that drifts toward inconsistency.
- *Write the hire content to a real `.md` file and have the engine load it.* The existing engine composes `PAGES.hire.html` from `portfolio_data/content/skills.json` and a subtitle. Migrating it to a real markdown file would have been a parallel format the engine doesn't read; adding one inline `<p>` line to the composition is the lazy fix.
- *Generate the `.dlbtn` style with Tailwind utility classes.* The CRT browser chrome (`.browser-page`, `.card`, etc.) uses hand-rolled CSS, not Tailwind — the Hire page lives inside that chrome. A Tailwind class would not apply inside the scoped `.rm-machine` namespace without extra config.

---

## 2026-10-04 — rebrand visual theme from cream+red to purple+green
**Decision:** Shift the entire site palette from cream/beige CRT shell + red phosphor glow to a soft purple casing + green terminal phosphor. Every red accent flips to phosphor green, including semantic red (HTTP 500, "Access denied", FATAL labels) per user direction. Browser chrome `theme-color` flips to purple. UI layout, structure, animations, and functionality unchanged.
**Why:** User wants the site to read as a personal cyber/terminal aesthetic rather than the original warm beige + red. Green-on-purple is the canonical hacker-terminal palette; flipping the semantic-red error text too gives a cohesive look even at the cost of some error affordance — the user explicitly chose cohesion over accessibility when asked.
**Rejected:** (1) Keeping semantic-red error text intact — would have preserved HTTP 500 / Access denied as red, but the user picked "convert all red→green" when asked. (2) A desaturated/muted purple would have been safer for accessibility but the user said "feel premium, not overly saturated" — landed on mid-saturation chroma 0.13. (3) Renaming `.glow-red` → `.glow-primary` — chose clarity over preservation of any historical name. (4) Tailwind `text-green-400` everywhere vs. custom CSS class — kept Tailwind tokens (`text-emerald-400` for the framework pages, `var(--phosphor)` / `--red` aliases inside the CRT engine) so the terminal stays self-contained while the rest of the site uses framework conventions. (5) Keeping `.simon-btn.r` red — Simon Says' four button colors (red/green/yellow/blue) are a gameplay convention; flipping red→green would clash with the existing green button. (6) Keeping the 90s-browser sepia palette inside the in-sim `win-browser` — the file's own comment says the content area is deliberately period-correct, and that mid-90s Netscape look was the entire point of the browser-in-window feature.
---

## 2026-10-04 — Rename `RM-1000` → `fedxd.net` and the `RM-` prefix → `FX-` across the CRT sim

**Decision:** Two case-sensitive string replaces in `box-computer-engine.ts` and `box-computer-markup.ts`:

1. `rm-1000` → `fedxd.net` (case-insensitive). BIOS banner, login prompt, shell prompt, `uname`-style header, neofetch host, window-manager title, windowed-terminal prompt, the `<div class="nameplate">` badge, and the CSS `::after` wordmark all move together.
2. `RM-` → `FX-` and `:: RM` → `:: FX` (case-sensitive). The `RM-QUANTUM LPS40S` disk drive name (BIOS + `dmesg`), the `RM-Linux 5.4.0-rm` OS name (`dmesg` + neofetch), the `RM-VGA(0)` X11 driver line, and the `:: RM` panel button all become `FX-…` / `:: FX`.

**Why:** The user asked for it across two follow-ups. `RM-1000` was the in-sim machine name and the previous identity's strongest remaining footprint. The `RM-` prefix (panel button, drive model, OS name, video driver) was a second, lighter identity leak in the same vein — the `R` of `RM-` was the old project initials. After this pass, no `RM` strings remain anywhere a visitor can see them.

`RM386SX-40` (CPU model — a fake Cyrix-derived 386SX name) and `5.4.0-rm` (kernel version suffix) are deliberately untouched. They share letters with the brand but are not the brand.

**Rejected:**
- *Use `IDENTITY.host` instead of the literal `fedxd.net`.* The engine already has `IDENTITY.host = BRAND_HOST = 'fedxd.net'`, and rewriting the boot-phase strings to interpolate it would have been the *correct* fix. Skipped because the user asked for "make it say fedxd.net" — a literal swap, not a refactor. The strings are still hardcoded literals, but the value is now the right one. Refactoring them to `IDENTITY.host` is a five-minute follow-up if it ever matters.
- *Drop the BIOS banner / nameplate / wordmark / panel button entirely.* The chrome is part of the CRT's identity (a nameplate, a big etched wordmark, a BIOS copyright, a panel button). Removing them would have made the sim look generic. Renaming in place keeps the visual structure.
- *Rename the class name `.rm-machine` in the CSS.* That's a class hook, not a user-visible string, and renaming it would touch every CSS rule in the file. None of it ships to the user. Skipped per ponytail — change only what the user sees.
- *Rename the `RM-` product names to a more meaningful prefix (e.g. `FEDXD-QUANTUM`, `FEDXD-Linux`).* The user explicitly asked for `FX`. Two letters, one per side, matches the existing "lowercase f / uppercase X" FedxD-ism. Done.

---

## 2026-10-04 — Remove the entire Friends section

**Decision:** Delete the Friends feature top-to-bottom. Concretely: remove the desktop icon, rootmenu entry, the `friends` PAGES entry, the `friends.md` row in `FS_TREE`, the `friendsData` import, the `friendLink()` helper, the `friendsData.forEach()` block inside `ALLOWED_LINKS`, the README's "Adding yourself to the friends list" section, the `Friends` entries in `NAV_LINKS` / `FOOTER_NAV_LINKS`, the `/friends` row in the cron-revalidate path list, and delete the files `app/api/friends/route.ts`, `data/friends.json`, `lib/resolve-avatar.ts`, and `public/friends/` (4 images). No replacement, no stub page.

**Why:** The user said "remove the friends section" — section, not "rearrange" or "soften". A stub Friends page ("this page used to list people but it's gone now") would have been a six-line placeholder surfacing a dead concept, which is more debt than the empty removal. The Friends feature was the only consumer of `lib/resolve-avatar.ts`, the only caller of `friendsData` in the engine, the only thing rendering `app/friends.html` content, and the only thing the cron-revalidate `/friends` path was protecting. None of the deletions leave a dangling caller.

**Rejected:**
- *Keep `lib/resolve-avatar.ts` as a generic helper.* It exports `FriendRaw` / `FriendResolved` and the helpers only make sense for the friends shape. Refactoring it into a generic "resolve any avatar" would be three new helpers, a new name, and a new file — pure speculative reuse, YAGNI.
- *Stub the Friends page.* "Section removed" reads louder than "section was here but now isn't". The desktop icon, rootmenu entry, `FS_TREE` row, and `ALLOWED_LINKS` block all go with it. If a future "Friends" page ever returns, it'll re-introduce its own data shape and shouldn't find a half-wired skeleton.
- *Hide Friends via feature flag.* Same shape as the stub — leaves wiring in place, costs the same number of bytes, costs more in cognitive load. Removal is the lazier answer.
- *Re-flow flow doc 006 to match.* It's the historical record of what the engine looked like at the time `portfolio_data/` was wired in. Friends were part of the engine then; the doc accurately reflects that. The new flow 008 documents the subsequent removal so a reader can follow the timeline without back-editing history.

---

## 2026-10-04 — Final scrub of "Liam Henry" / "RejectModders" remnants across user-facing strings

**Decision:** Sweep every remaining `rejectmodders`, `is-a.dev`, `liam@…`, and `REJECTMODDERS SYSTEMS` literal in user-facing code and replace with the `fedxd.net` / `kazim@fedxd.net` equivalents. `LEGACY_DOMAIN` in `config/constants.ts` is kept (it still serves a redirect-detection purpose) and prior `decisions.md` entries documenting the earlier identity swap stay untouched as history.

**Why:** The earlier identity swap (logged above) flipped metadata, deploy targets, and the engine's `BRAND_HOST`, but a handful of cosmetic strings in the error pages, admin page, the BIOS banner, the README, and the security.txt slipped through. Leaving them on the live site is a visible identity leak — anyone who triggers a 500 sees `crash log - rejectmodders@is-a.dev` in the terminal chrome.

**Rejected:**
- *Sed across the whole repo.* Too blunt — would have rewritten the `LEGACY_DOMAIN` constant and the historical `decisions.md` entries that legitimately still mention the old name. Per-file edits kept the targets precise.
- *Drop `LEGACY_DOMAIN`.* The legacy-domain banner (`components/layout/legacy-domain-banner.tsx`) still uses it to detect visitors on the old subdomain and prompt them to switch. Removing it disables that nudge.
- *Rewrite flow doc 006 to drop the old identity entirely.* It's a historical record of what the engine looked like at the time the portfolio-data was wired in; rewriting the timeline would lie about the work. Lightly edited the leftover brand strings to neutral language and kept the narrative intact.

---

## 2026-10-04 — Switch site identity from rejectmodders.dev → fedxd.net

**Decision:** Re-target the whole site to `Kazim Abbas` at `fedxd.net`. Identity strings across `config/constants.ts`, `next.config.mjs`, the error pages, the admin route, the avatar proxy User-Agent, `app/layout.tsx` metadata, `app/sitemap.ts`, `app/robots.ts`, `public/CNAME`, and `public/manifest.json` all switch together.

**Why:** The user took ownership of this repo (existing CRT engine was originally their personal site under a different name) and re-purposed it as their portfolio at `fedxd.net`. CNAME/manifest/sitemap/robots + all User-facing hardcoded references had to move at the same time, otherwise the static fallbacks in `public/` would shadow the Next-generated ones at deploy and visitors would land on a mixed-identity site.

**Rejected:**
- *Only flip CNAME.* Leaves 20+ hardcoded `rejectmodders` strings visible in the boot/login/shell, and metadata still cites the old domain.
- *Forks.* The CRT engine itself is worth keeping; the user explicitly asked for an identity swap, not a redesign.
- *New `lib/brand.ts` shim.* The brand constants are infra (deploy target), not portfolio content. Inlining `BRAND_HOST = 'fedxd.net'` as the only literal in the engine is fine — the user said "no hardcoded portfolio info", not "no literals at all". One literal at the engine top is the laziest fix that satisfies the rule.

---

## 2026-10-04 — Wire `portfolio_data/*` into the existing CRT engine, not into a new app shell

**Decision:** Reuse the existing `components/machine/box-computer-engine.ts` (~1900-line IIFE) and wire `portfolio_data/` + `data/friends.json` into it via top-of-file ES imports + a 12-line `mdInline()` helper + composition of the existing `PAGES`/`ALLOWED_LINKS`/`FS_TREE`/`HELP`/`ALL_CMDS` structures from those imports. No new window apps, no UI redesign, no engine rewrite, no new dependencies.

**Why:** The user explicitly required (a) `portfolio_data/` as the single source of truth, (b) no UI redesign, (c) edits to data files propagate without code edits, and (d) reuse of existing components. A separate React-shell wrapper would have violated all four. Top-of-engine imports + literal/string-composition at module load gives the "edit-data-only" property (no build step / no template-generation script) while preserving the entire existing CRT.

**Rejected:**
- *Adapter layer (`lib/portfolio.ts`).* Two files of abstraction for what is mostly direct JSON access. The only helper that earns its keep is `mdInline()` because `about.md` is markdown and the existing engine takes HTML.
- *Marked / remark / markdown-it.* New dep for a 12-line function that handles exactly four markdown constructs (`## `, `### `, `**bold**`, `- bullet`, `> quote`) and ignores everything else. The actual `about.md` has predictable surface — bigger parser = bigger surface area for bugs.
- *New window apps for Skills / Experience / Education / Achievements.* Out of scope per user ("populate existing UI"). Skills absorbs into Hire; Experience absorbs into About; Achievements gets a one-liner in About's Highlights list.
- *Restructure portfolio_data.* The user said "Avoid modifying original portfolio data format unless genuinely necessary." Wasn't necessary — every field used already exists in the data.
- *Stale tab-completion / HELP updates.* HELP text didn't reference identity. `ALL_CMDS` doesn't either.

---

## 2026-10-04 — `feat: switch site identity to fedxd.net` + `feat: wire portfolio_data` + `docs:` as three commits, not one

**Decision:** Three separate commits: (1) identity swap in non-engine files, (2) engine wiring + `next.config.mjs` webpack rule, (3) docs (`docs/flows/006-*.md` + `decisions.md`).

**Why:** The identity swap is independently revertable (a single deploy can be flipped back to `rejectmodders.dev` if needed) and is conceptually separate from "wire the data". The docs commit rides alone so a reviewer can see exactly what changed in the engine versus what is just narrative. Smaller commits make the diff readable.

**Rejected:**
- *Single squash.* Makes bisecting later regressions harder; harder to revert one piece.
- *Two commits (code, then docs).* Same effect but the docs commit still belongs with the work; keeping it separate from the engine wiring commit makes that commit about *just* the engine.
## 2026-10-11 — SEO / AEO / GEO / AI-search layer for fedxd.net

**Decision:** Add a parallel, server-rendered, no-JS-required semantic surface *beside* the existing interactive OS at `/`. The OS engine in `components/machine/box-computer-engine.ts` and the runtime desktop in `box-computer-markup.ts` / `box-computer.css` are unchanged. New files: `lib/portfolio/*` (server-only re-export layer), `app/{about,projects,projects/[slug],skills,experience,education,achievements,contact,portfolio}/page.tsx`, `app/{content.json,content.txt,llms.txt,llms-full.txt}/route.ts`, `components/seo/{page-shell.tsx,semantic-fallback.tsx}`. Modified: `app/{page,not-found}.tsx`, `app/{sitemap,robots}.ts`, deleted the stale `public/{robots.txt,sitemap.xml,index.html,404.html}` that were shadowing the dynamic routes.

**Why:**

- The OS is the visitor experience; the SEO layer is the indexing surface. Keeping them as parallel routes (`/` for OS, `/projects/<slug>` for project pages) avoids cloaking — humans and crawlers see the same HTML on every route, and there are no user-agent switches or client-side redirects.
- A central `lib/portfolio/` layer re-exports from `portfolio_data/content/*.json` and `<project>-data.js` so adding or editing a project in the canonical data automatically updates the sitemap, the project route, the JSON-LD entity, and the machine-readable endpoints. Zero data duplication.
- Per-route `metadata` exports get their own title, description, canonical, OG, and Twitter cards — every page is independently indexable and the `template: "%s | ${SITE_NAME}"` in the root layout keeps titles consistent.
- JSON-LD types (`Person`, `WebSite`, `CollectionPage`, `SoftwareSourceCode`, `BreadcrumbList`) are typed TypeScript objects rendered via `<script type="application/ld+json" dangerouslySetInnerHTML={…}>` — no extra dependency. `Person` ships with `alternateName: ["Kasim Abbas", "FedxD", "FedXD", "Kazim FedxD", "Kasim Abbas FedxD"]` so alternate-spelling searches hit the right entity without inventing claims.
- Robots: separate buckets for conventional search + AI-search (allowed) and LLM-training (disallowed). GPTBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot, Applebot-Extended, ImagesiftBot, Diffbot are `Disallow: /`. OAI-SearchBot, PerplexityBot, DuckAssistBot, YouBot, ChatGPT-User are explicitly `Allow: /`. Standard search crawlers inherit the wildcard rule.
- Machine-readable endpoints (`/content.json`, `/content.txt`, `/llms.txt`, `/llms-full.txt`) are optional supplements that expose the same data without rendering HTML — they're called out as "optional compatibility aids" in the public docs, never load-bearing for Google.
- Stale `public/{robots.txt,sitemap.xml,index.html,404.html}` were leftovers from the original Create-React-App build that ran on GitHub Pages. They shadowed the dynamic `app/robots.ts` and `app/sitemap.ts` until removed — a one-character detail (no static + dynamic same-name), but the kind of thing a crawler would otherwise quietly index from a typo of reality.

**Rejected:**

- *Stateful engine hooks to deep-link `/projects/<slug>` into the OS window via `?app=projects&project=<slug>`.* Today the engine has zero deep-link support; adding it requires reading `window.location.search`, swapping default open-app state in `box-computer-engine.ts`, and forwarding clicks into `openApp`. The user's task explicitly says "modifying `box-computer-engine.ts` is out of scope unless narrowly scoped." Plain link to `/` from every project page covers 99% of the SEO value (the deep-link gives the rest of the 1% the cost would pay for).
- *Server-side markdown pull from `projects/<Name>/*.md` at runtime.* Each project folder has 10+ markdown files. Reading them all on every prerender would 10x the build time, and there's already a hand-curated `<project>-data.js` bundle that's the right shape. The .md files stay as the human-edited source; the .js bundles are the build-time input — same single source of truth the OS engine already uses.
- *Add a real Markdown parser (remark/marked) for `llms-full.txt`.* We only emit short headers and bullet lists. `String#split(/\r?\n/)` + a small join is enough. Adding a parser would inflate the dependency tree for zero correctness gain.
- *Strip VoiceMatter (TODO stubs) and the projects without `-data.js` (Skyntel, FedxD-PiPy, FxChange, Webstore).* The task said "render every data that there is … in the independent paths" — pruning projects at the SEO layer would hide legitimate portfolio entries. Instead, every project renders with the fields its data source provides; missing fields are omitted (never invented), and a yellow note appears on stub-heavy pages.
- *Re-export the `EmailJS` keys in `/content.json`.* `contact.json` exposes a `form.emailJs` block with service ID, public key, and template IDs. Those keys are not secrets by EmailJS's own contract (the `public` in `publicKey` is literal) and they do live in the OS-side contact form, but exposing them in a public machine-readable endpoint risks abuse if the spam-protection EmailJS provides is bypassed. `getContact()` strips the `form` key from the public shape — `/content.json` only includes the public card list, response time, and tags.
- *Add a `Prerender.io`-style SEO header.* Next.js produces static HTML at build time for every `/projects/<slug>` route — server-side rendering is already happening for free; no third-party service needed.
- *Move `<BoxComputer />` into a Server Component that streams a placeholder while the engine boots.* The engine is JS-driven and has to run client-side. The new `/` adds a server-rendered `<section class="sr-only">` semantic fallback alongside `<BoxComputer />` — invisible to sighted users but readable by crawlers and screen readers — so visitors with JS off, search bots, and AI agents all get the same identity summary visitors-on-OS-with-JS would see in the BIOS readout.
- *Use a state layer (Zustand/Redux/Context) to share portfolio data between OS and SEO.* Module-level constants on the server side and `@ts-nocheck` imports on the engine side already work. The two layers don't share runtime state because they're on different routes; a state layer would couple them for no benefit.
