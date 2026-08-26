---
name: project-sync
description: Sync portfolio data from projects/<Name>/.website/ bundles to the runtime data layer. Use when the user says "sync projects", "regenerate portfolio data", "add new project to site", or wants to update src/portfolio_data/, links.json, registry.js, projectsData.js, screenshots.js, or EMPTY_STATE_SLUGS in ProjectDetail.jsx from the .website bundles.
---

# project-sync

Inverse of `project-documentor`. Reads `projects/<Name>/.website/metadata.json` (and the `.md` files) and writes to the React runtime data layer.

## When to use

- User added a new project under `projects/<Name>/` (with or without `.website/`)
- User updated `.website/metadata.json` for an existing project
- User added PNGs to `public/screenshots/<Slug>/`
- User added an entry to `projects/links.json` for a project that has no `.website/` yet
- User wants to detect drift across the 8+ meta files

Do NOT use for:
- Generating `.website/` bundles (use `project-documentor`)
- Editing case-study rich content (overview, features, architecture, etc. — that's hand-authored)

## Trigger phrases

- "sync projects"
- "regenerate portfolio data"
- "add new project to site"
- "sync <ProjectName> to portfolio"
- "update portfolio data from .website bundles"

## 5-phase workflow

1. **Discover** — load `references/01-targets.md`; list `projects/*/` and `src/portfolio_data/*-data.js`; read every `projects/<Name>/.website/metadata.json`.
2. **Diff** — for each project, classify: NEW (no `data.js`), EXISTING (data.js exists), EMPTY (in `links.json` but no `.website/`).
3. **Generate** (NEW only) — load `references/02-data-js-shape.md` then `references/03-metadata-to-datajs.md`; write `<slug>-data.js`, then update all 7 meta files via `references/05-meta-files.md`.
4. **Sync** (EXISTING only) — load `references/04-sync-datajs-fields.md`; use Edit to update only the simple fields. Then update screenshots via `references/07-screenshots-sync.md`. Then update meta files via `references/05-meta-files.md`.
5. **Report** — print terse summary: `Discovered: N / Created: X data.js / Synced: Y fields / Screenshots added: Z / EMPTY_STATE: ±K / Errors: M`.

Load `references/00-workflow.md` for full phase detail and dry-run mode.

## Critical rules (NEVER violate)

1. **Never overwrite hand-authored rich content** in existing `*-data.js`. Sacred fields: `overview.*`, `features[].{whyItMatters,howItWorks,codeSnippets,...}`, `architecture.{diagram,services}`, `mainFlow`, `apiEndpoints`, `setupSteps`, `knownIssues`, `futureEnhancements`, `showcaseVideo`. Sync only the simple fields listed in `references/04-sync-datajs-fields.md`.

2. **Idempotent edits.** Every Edit must produce identical output if run twice. Test by running sync twice on a clean tree and confirming `git diff --stat` shows zero changes after the second run.

3. **Slug = directory name.** `projects/<Name>/` → `<Name>` is the canonical slug. If `dataBySlug` or `projectsWithDetails` disagrees, flag the mismatch and ask before overwriting.

4. **Both `links.json` files in lockstep.** `projects/links.json` and `src/portfolio_data/links.json` must remain byte-identical. Sync writes to both or neither.

5. **`SCREENSHOT_FOLDER` key = slug, not title.** Use the slug form (`"Full-Stack-Template"` not `"Full-Stack Template"`). The current file has duplicate keys (title + slug); second wins.

6. **Screenshot `filename` is bare.** `data.screenshots[]` entries use bare filenames; renderer prepends `/screenshots/<Slug>/`. Do NOT include the slug prefix in `filename`.

7. **EMPTY_STATE_SLUGS is for the gap between `links.json` and `.website/`.** A slug with a `data.js` must NOT be in `EMPTY_STATE_SLUGS`. A slug with no `.website/` but in `links.json` MUST be in `EMPTY_STATE_SLUGS`.

## Field mapping (metadata.json → data.js simple fields)

See `references/04-sync-datajs-fields.md` for the canonical table. Summary:

| metadata.json | data.js field | Notes |
|---|---|---|
| `title` | `title` | direct |
| `shortDescription` | `shortDescription` | direct |
| `github` | `github` | direct |
| `liveDemo` | `liveDemo` | direct |
| `badges[]` (strings) | `badges[]` | `[{icon: inferIcon(text), text}]` |
| `techStack[]` (strings) | `techStack[]` | `[{name, version, category}]` parsed |
| `awards[]` (strings) | `awards[]` | `[{title: text, event:"", year:"", description:""}]` |
| `performance.*` | `performance.*` | see 04 |
| `requirements.*` | `requirements.*` | flatten strings to objects |
| `.website/overview.md` first ¶ | `overview.description` | only for NEW projects |
| `public/screenshots/<Slug>/*` | `screenshots[]` (append-only) | see 07 |
| `developmentStatus` | `badges[]` (add if missing) | `{icon:"Construction", text:"🚧 " + status}` |

## References (load on demand)

| # | File | Phase | Purpose |
|---|---|---|---|
| 00 | `00-workflow.md` | All | Dry-run, idempotency checks, error handling |
| 01 | `01-targets.md` | 1 | Inventory of all 8 target files + Edit patterns |
| 02 | `02-data-js-shape.md` | 3, 4 | Full `*-data.js` schema (teachback + fincore variants) |
| 03 | `03-metadata-to-datajs.md` | 3 | Mapping for NEW projects: `.website/` → `*-data.js` |
| 04 | `04-sync-datajs-fields.md` | 4 | Diff+merge logic for EXISTING projects |
| 05 | `05-meta-files.md` | 3, 4 | Per-file Edit patterns for the 7 meta files |
| 06 | `06-empty-state.md` | 4 | `EMPTY_STATE_SLUGS` add/remove logic |
| 07 | `07-screenshots-sync.md` | 4 | `public/screenshots/<Slug>/` → `data.js#screenshots[]` |

## Self-check before reporting done

- [ ] Every new `<slug>-data.js` was created (count vs NEW list)
- [ ] Every existing project had its simple fields diffed (no silent no-ops)
- [ ] `git diff --stat` after a no-op re-run shows zero changes
- [ ] `EMPTY_STATE_SLUGS` is consistent with `links.json` ∩ ¬`.website/`
- [ ] `dataBySlug` keys in `registry.js` match `project_route_mapping.json#urlSlug` 1:1
- [ ] `SCREENSHOT_FOLDER` keys in `screenshots.js` use slug form, not title form
- [ ] No real PII / API keys / secrets introduced
- [ ] No rich-content fields in existing `*-data.js` were overwritten

## Reporting format

Always end with a single-line terse summary:

```
sync: discovered=8 new=0 synced=3 screenshots=2 empty=±1 errors=0
```

One line. No prose. If errors, list them in a compact bullet block right before the summary line.

## Anti-patterns

- Overwriting `overview.description` from `.website/overview.md` (it's hand-authored)
- Writing to only ONE of the two `links.json` files
- Using title form (`"Full-Stack Template"`) in `SCREENSHOT_FOLDER` instead of slug form
- Adding slug prefix to `data.screenshots[]#filename` (bare filenames only)
- Silent slug mismatch — always flag and ask
- Auto-deleting orphan slugs (report only)
- Generating rich content from `.website/*.md` (text extraction too fragile — leave TODO placeholders)
- Writing a NEW `projectsData.js` entry without an `order` (uses end-of-list default)
