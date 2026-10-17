# 015 — One-shot deploy script (commit + build + publish to gh-pages)

## Entry point

- `scripts/deploy.sh` — the only entry. Invoked from the repo root (it `cd`s there itself), prompts for a commit message, drives the rest.

## Flow

```
scripts/deploy.sh
  ├─ cd "$(dirname "$0")/.."          # resolve to repo root from scripts/
  ├─ read -r -p "Commit message: "    # fail fast if empty
  ├─ npm run build                    # next build → out/  (requires output:"export" in next.config.mjs)
  ├─ git add -A                       # out/ is .gitignore'd; only source files get staged
  ├─ git diff --cached --quiet?       # if yes → skip commit + push
  │     ├─ git commit -m "$msg"
  │     └─ git push                   # current branch
  ├─ [ -d "$PREFIX" ]?                # PREFIX="out" by default
  │     └─ git push origin "$(git subtree split --prefix out HEAD)":gh-pages --force
```

## What was modified in this change cycle

- **New:** `scripts/deploy.sh` (executable).
- **`next.config.mjs`:** added `output: "export"` + `images.unoptimized: true` so `next build` writes to `out/` instead of `.next/`. The `headers()` block is silently ignored by static export (warning only) — its CSP / HSTS rules will need a `_headers` file or CDN later.
- **API routes forced static:** `app/sitemap.ts`, `app/robots.ts`, `app/api/github/{activity,stats}/route.ts` got `export const dynamic = "force-static"` so the build snapshots them at deploy time.
- **Removed:** `app/api/github/route.ts` (the parent route) — no frontend caller; conflicted with the sub-route directory during static export (`EISDIR`).
- **Dynamic routes that still won't ship:** `/api/avatar`, `/api/cron/revalidate`, `/api/csp-report` (POST + GET with no cache hint) — Next.js skips them in `out/`. Acceptable for the gh-pages target.
- **`.gitignore`:** added `out/` so the script's `git add -A` doesn't try to commit build artifacts back to the source branch.
- **`public/.nojekyll`:** tells GitHub Pages not to run the `_next/` directory through Jekyll, which would otherwise 404 every asset.

## Force-push rationale

`gh-pages` is a build-artifact branch — never a history-bearing one. A plain `git subtree push --prefix out origin gh-pages` refuses to fast-forward after any prior local reset on `gh-pages`, which would force a manual `git push origin :gh-pages` ritual before every deploy. `subtree split` + force-push is the lazy-correct path: same content, no manual wipe step.

## What this script does NOT do

- Set `git config user.{name,email}`. Relies on whatever's in the user's global / repo config. If unset, `git commit` will error and the script aborts — by design.
- Run any pre-deploy checks (typecheck, lint, tests). Add them between `npm run build` and `git add -A` if you want a gate.
- Surface a status banner mid-deploy. `git subtree split` is slow on big histories; expect 5–30 s of silence before the final push.
