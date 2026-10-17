# 006 — Wire `portfolio_data/*` into the RM-1000 CRT terminal

## Entry point

Visitor loads `https://fedxd.net/` →
`app/page.tsx` renders `<BoxComputer />` →
`components/machine/box-computer.tsx` mounts the static markup into `#root` →
`initBoxComputer(root)` (export from `components/machine/box-computer-engine.ts`) takes over the screen.

## Boot / login / shell (identity-bearing strings)

1. `initBoxComputer` calls `powerOn()` → `biosPhase()` → `kernelPhase()` → `loginPhase()` → returns to the main shell.
2. Each phase is a top-level `async` function inside `initBoxComputer` that calls `main.addLine(...)` against the singleton `main = createTerm(canvas, screenEl, …)`.
3. **Boot kernel line** (was hardcoded `(kazim@fedxd.net)` at the time of the prior identity swap):
   - now: `'[    0.000000] Linux version 5.4.0-rm (' + IDENTITY.handle + '@' + IDENTITY.host + ')'`
   - `IDENTITY.handle` = lowercased first token of `home.json.header.name` → `"kazim"`.
   - `IDENTITY.host` = `BRAND_HOST` literal → `"fedxd.net"`.
4. **Login line**: `'rm-1000 login: ' + IDENTITY.handle`.
5. **Intro line** (replaces the old `Kazim Abbas — type 'startx'…` string): `IDENTITY.name + " — type 'startx' …"`.
6. **Shell prompt**: `IDENTITY.handle + '@rm-1000:~$ '`.
7. **Windowed Terminal prompt** (line 1827, when the visitor opens a Terminal from the desktop): same expression.
8. **Window-manager title** (line 1795, `'Terminal — kazim@rm-1000'`): now `'Terminal — ' + IDENTITY.handle + '@rm-1000'`.
9. **File Manager root** (`buildFileManager`, line 1043): path string starts with `/home/`; root node name comes from `FS_TREE.name` which is now `IDENTITY.handle`.
10. **`pwd` command output**: `'/home/' + IDENTITY.handle`.
11. **`neofetch` header**: `IDENTITY.handle + '@rm-1000'`.
12. **`startx` echo** (line 556): same handle substitution.

## Shell command outputs (`runShellCommand`)

`runShellCommand(raw, term, ctx)` is the single dispatch for every command. Identity-bearing outputs now read from the data imports:

- `whoami` → `IDENTITY.name + ' — ' + IDENTITY.summary` (from `home.json.summary`).
- `about` → `IDENTITY.typing` (from `home.json.typingAnimation.sequences.map(s => s.text)`).
- `contact` → `IDENTITY.email`, `IDENTITY.github.replace(/^https?:\/\//, '')`, `IDENTITY.responseTime`.
- `hire` → `IDENTITY.name + ' — ' + skills.header.subtitle`, `IDENTITY.achievementsLine` (from `achievements.json.stats`).
- `ls` → list mirrors the new `FS_TREE` (drops `friends/` directory, uses `friends.md`).
- `pwd`, `neofetch`, `startx` echo, login, intro, prompt, window title — all use `IDENTITY.*`.

## Window content — `PAGES`

`PAGES` is the canonical data for the five in-sim apps (about / projects / friends / contact / hire). It was previously a hand-typed object with hardcoded HTML. It's now a runtime-built object whose `html` field is composed once at module load from the data imports.

Composition helpers (defined just above `PAGES`):
- `repoSlug(name)` → `name.toLowerCase().replace(/[^a-z0-9]+/g, '-')` — used to map `links.json` keys → `ALLOWED_LINKS.repo-*` keys, and `project.title` → matching `repo-*` for the `<a data-link="…">` in each project card.
- `friendLink(i, kind)` → `<a data-link="friend-<i>-<kind>">KIND/UPPER</a>`.
- `projectCardHtml(p)` → `<div class="card">` with title (link), badge (`<i>`), description, tech pills.

Per-window data sources:
- `about`: `IDENTITY.summary` + `mdInline(aboutRaw)` (markdown from `portfolio_data/content/about.md` via webpack `asset/source`) + `experience.experiences` (timeline cards) + `achievements.achievements` (highlight list) + `IDENTITY.statsLine + ' · ' + IDENTITY.achievementsLine`.
- `projects`: split `getSortedProjects()` into Featured (first 6) + More Projects (rest); each card pulls title, badge, description, tech from `portfolio_data/projectsData.js`.
- `friends`: iterate `data/friends.json`. Each friend card shows `isGF` flag (italicized) and one `<a data-link="friend-<i>-gh|web|tw|yt|dc|em">` per non-empty link. (Email + Discord are deliberately not exposed even though they're public in the data — see existing comment in old `ALLOWED_LINKS` block about why this boundary stays.)
- `contact`: iterate `contact.contactInfo` (from `contact.json`). The two title-matching `<a>`s (`Email`, `GitHub`) reuse the `ALLOWED_LINKS.email` / `ALLOWED_LINKS.github` keys so the existing `data-link` click handler routes them; other entries get a plain `href` with `target="_blank"`.
- `hire`: iterate `skills.categories` (Languages / Frameworks & Libraries / Databases / DevOps & Tools) from `skills.json`; each skill renders as a card with `Level <n>/100`.

## `ALLOWED_LINKS`

Old: 28 hardcoded keys (`vulnradar`, `repo-vulnradar`, `friend-hd-gh`, etc.) — earlier portfolio's hand-rolled allowlist era.

New: an IIFE that builds the map from:
- `IDENTITY.github` and `IDENTITY.email` (always present, two first entries).
- Every key of `portfolio_data/links.json` (FxPy, FullStack-Template, FinCore, FedxD-PiPy, Portfolio-Website, FeXoBot, FxQuest, VoiceMatter) → `repo-<slug>`.
- Every friend in `data/friends.json` → `friend-<i>-gh|web|tw|yt|dc|em` when present.

Adding a friend or a project-link key automatically wires up its `data-link` targets. The existing `<a data-link>` click handler (line 1823) is unchanged — it just got a larger allowlist.

## `FS_TREE`

Old: `{ name: 'kazim', children: [..., { friends: dir/friends.md } ...] }`.
New: `{ name: IDENTITY.handle, … }`. Dropped the redundant `friends/` directory entry — Friends is reachable via the single `friends.md` file (matches `ls` output, which dropped `friends/`).

## `HELP` and `ALL_CMDS`

Untouched. Command blurb for `hire` already said "why you should hire me" — accurate under any identity.

## What this file modified this cycle

- Top of file: 8 `import` statements from `@/portfolio_data/content/*.json` + `@/portfolio_data/content/about.md` + `@/portfolio_data/links.json` + `@/portfolio_data/projectsData` + `@/data/friends.json`.
- `BRAND_HOST` constant (one literal).
- `mdInline(text)` helper (~25 lines).
- `IDENTITY` block (~14 lines, derived from the imports above).
- `KERNEL_LINES[0]`.
- `loginPhase` (kernel banner line + intro line + setPrompt + startx echo).
- `runShellCommand` outputs: `whoami`, `about`, `contact`, `hire`, `ls`, `pwd`, `neofetch`.
- `ALLOWED_LINKS` rebuild.
- `PAGES` rebuild (the only data-bearing object in this file that required JSON file paths to be mapped to HTML).
- `FS_TREE` rebuild.
- Window-manager title for `id === 'term'`.
- Windowed-terminal `createTerm` prompt.

What this file did NOT modify this cycle:
- All audio code (`playPostBeep`, `playKeyClick`, `playStartxChime`, `playCollapseThump`, etc.).
- The seven game builders (`buildMinesweeper`, `buildSnake`, etc.).
- The `createTerm` factory — only its *prompt argument* changed.
- The window manager (drag, resize, focus, tasklist).
- The desktop markup/icons.
- The CRT canvas / scanline code.
- Strict-type retrofit (file still `@ts-nocheck`).

## Companion files (also modified this cycle)

- `config/constants.ts` — `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_KEYWORDS`, `SITE_AUTHOR`, `SITE_LOCATION`, `GITHUB_URL`, `GITHUB_USERNAME`, `GITHUB_REPO_URL`, `EMAIL_USER`, `EMAIL_DOMAIN` — all flipped to Kazim/FedxD values.
- `next.config.mjs` — added `webpack` hook adding `test: /\.md$/, type: 'asset/source'` so `import … from '@/portfolio_data/content/about.md'` returns the raw string.
- `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx` — issue tracker link target switched to `KazimFedxD/fedxd.github.io`.
- `app/admin/page.tsx` — three SSH login labels switched to `fedxd.net login: …`; title bar text switched; footer link switched.
- `app/api/avatar/route.ts` — User-Agent header string switched to `fedxd.net image-cache/1.0`.