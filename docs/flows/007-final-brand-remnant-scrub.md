# 007 — Final scrub of "Liam Henry" / "RejectModders" remnants

## Entry point

User request: rebrand every visible string in the codebase from the prior identity (`rejectmodders.dev` / `Liam Henry`) to the current one (`fedxd.net` / `Kazim Abbas`). Diff is across user-facing strings only — the `IDENTITY` object inside the engine and the constants in `config/constants.ts` were already on the new brand at the time this work started (see flow 006).

## What this change touched

A grep over `*.ts` / `*.tsx` / `*.json` / `*.md` / `*.mdx` / `*.css` / `*.html` / `*.txt` (excluding `node_modules` / `.next` / `.git`) returned 11 files with matches. All of them got a targeted edit:

| File | What changed |
|---|---|
| `package.json` | `name`: `rejectmodders.dev` → `fedxd.net` |
| `package-lock.json` | `name` (root + root-package node): same |
| `README.md` | Title, clone URL, directory, PR target |
| `app/error.tsx` | Terminal title bar string `crash log - …` |
| `app/global-error.tsx` | Terminal title bar string + prompt segments (user / host) |
| `app/not-found.tsx` | Diagnostic `x-request-id` line |
| `app/admin/page.tsx` | Final prompt segments (user / host) |
| `components/machine/box-computer-engine.ts` | BIOS banner `(C) REJECTMODDERS SYSTEMS` → `(C) FEDXD SYSTEMS 2024-2026`; one comment header |
| `config/constants.ts` | File-header comment ("Centralized configuration for …") |
| `public/.well-known/security.txt` | `Contact:` mailto + `Canonical:` URL |
| `docs/flows/006-wire-portfolio-data-into-crt.md` | Five leftover brand-name references in the narrative, rewritten to neutral language |

## Function call order (none — this change is content-only)

There is no code-level flow change. The CRT engine, the layout, the API routes, and the data loaders all already read from `BRAND_HOST` / `IDENTITY.*` / `SITE_URL` / `EMAIL_DOMAIN`. The only "code" edits in this sweep were:

1. A string literal in `biosPhase` (engine boot banner).
2. Three pieces of JSX in the error/admin pages (terminal chrome strings).
3. A file-header comment in `config/constants.ts`.
4. A descriptive comment in the engine.

None of these change what the engine *does* — they only change what the visitor *sees*. So no call-graph update is needed; flow 006 remains accurate for the engine, and this file documents the visual-surface cleanup that ride on top of it.

## What was specifically modified in this change cycle

- `package.json:2` — name
- `package-lock.json:2`, `package-lock.json:8` — root + package node names
- `README.md:1`, `README.md:14`, `README.md:15`, `README.md:79` — title, clone URL, cd target, PR target
- `app/error.tsx:107` — terminal title
- `app/global-error.tsx:81`, `app/global-error.tsx:89`, `app/global-error.tsx:91` — title + prompt user + prompt host
- `app/not-found.tsx:51` — `x-request-id` value
- `app/admin/page.tsx:83`, `app/admin/page.tsx:85` — prompt user + prompt host
- `components/machine/box-computer-engine.ts:477` — BIOS banner copyright line
- `components/machine/box-computer-engine.ts:915` — descriptive comment ("REAL SITE CONTENT — pulled from the actual fedxd.net")
- `config/constants.ts:1-4` — file-header comment
- `public/.well-known/security.txt:1`, `:4` — `Contact:` + `Canonical:`
- `docs/flows/006-wire-portfolio-data-into-crt.md` — five narrative mentions of the old brand, rewritten to neutral phrasing

## What was deliberately NOT modified

- `config/constants.ts:8` — `LEGACY_DOMAIN = "rejectmodders.is-a.dev"`. The constant is a redirect-detection value used by `components/layout/legacy-domain-banner.tsx` to recognize visitors still arriving on the old subdomain. Rewriting it would silently disable that nudge. It is not a brand string, it is a deployment artifact.
- `decisions.md` — the prior identity-swap entry (2026-10-04 — Switch site identity …) is history. Rewriting it would erase the work it records. The new entry added at the top of this change correctly references the old name in the past tense.
- `data/friends.json` — only one entry has `website: "https://krish-space.is-a.dev/"`. That's a friend's personal subdomain, not project branding. Untouched.

## Verification

A follow-up grep across the same file set returns no `rejectmodders` / `REJECTMODDERS` / `liam` matches outside the three intentional sites above (`LEGACY_DOMAIN`, the historical `decisions.md` entry, and the historical `docs/flows/006-*` narrative line that still refers to the prior `login: liam@rm-1000` shell-prompt in the boot flow).
