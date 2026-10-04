# Decisions

A log of meaningful decisions made in this codebase, newest first. Each entry explains the call, the reasoning, and what was rejected.

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