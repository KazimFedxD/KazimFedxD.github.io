# 001 — Create `project-sync` Skill

## Entry point

The skill is invoked by `/project-sync` or by user phrases ("sync projects", "regenerate portfolio data", "add new project to site"). The orchestrator is `.claude/skills/project-sync/SKILL.md`.

## Skill invocation → execution flow

```
/project-sync (or trigger phrase)
    │
    ▼
SKILL.md (orchestrator)
    │  defines 5-phase workflow + critical rules
    │
    ├─→ Phase 1: Discover
    │     read 01-targets.md
    │     list projects/*/ and src/portfolio_data/*-data.js
    │     read projects/<Name>/.website/metadata.json for each
    │     build diff table {NEW | EXISTING | EMPTY | ORPHAN}
    │
    ├─→ Phase 2: Diff
    │     classify each project
    │     for EXISTING: read data.js, compare whitelist fields vs metadata.json
    │     for EMPTY: decide add/remove in EMPTY_STATE_SLUGS
    │     for NEW: queue generatePlan
    │
    ├─→ Phase 3: Generate (NEW projects only)
    │     read 02-data-js-shape.md
    │     read 03-metadata-to-datajs.md
    │     Write src/portfolio_data/<slug-kebab>-data.js
    │     then load 05-meta-files.md and apply 7 meta edits:
    │       M1: project_route_mapping.json +1 entry
    │       M2a: projectsData.js projectsData[] +1 entry
    │       M2b: projectsData.js projectsWithDetails[] +1 string
    │       M3a: registry.js +1 import
    │       M3b: registry.js dataBySlug +1 entry
    │       M3c: registry.js bottom re-export +1 entry
    │       M4: links.json ×2 files +1 entry each
    │       M5: screenshots.js SCREENSHOT_FOLDER +1 entry
    │
    ├─→ Phase 4: Sync (EXISTING projects only)
    │     read 04-sync-datajs-fields.md
    │     for each EXISTING project:
    │       Edit each changed whitelist field (idempotent pre-check)
    │     read 07-screenshots-sync.md
    │       glob public/screenshots/<Slug>/*.{png,jpg,jpeg,webp,gif}
    │       diff vs data.screenshots[] filenames
    │       Edit to append new entries (bare filename + inferred category)
    │     read 06-empty-state.md
    │       if a new data.js was generated this run → REMOVE from EMPTY_STATE_SLUGS
    │       if EMPTY slug detected → ADD to EMPTY_STATE_SLUGS
    │
    └─→ Phase 5: Report
          single-line: sync: discovered=N new=X synced=Y screenshots=Z empty=±K errors=M
          if errors, bullet block before summary
```

## Function call order — what calls what

| Caller | Callee | Purpose |
|---|---|---|
| SKILL.md → Phase 1 | `01-targets.md` | file inventory + Edit patterns |
| SKILL.md → Phase 3 | `02-data-js-shape.md` | data.js schema reference |
| SKILL.md → Phase 3 | `03-metadata-to-datajs.md` | mapping function for NEW projects |
| SKILL.md → Phase 4 | `04-sync-datajs-fields.md` | diff+merge for EXISTING |
| SKILL.md → Phase 4 | `07-screenshots-sync.md` | public/screenshots → data.js |
| SKILL.md → Phase 4 | `06-empty-state.md` | EMPTY_STATE_SLUGS management |
| 03/04 → after Edit | `05-meta-files.md` | per-file Edit patterns for 7 meta files |
| All phases | `00-workflow.md` | phase lifecycle + dry-run + idempotency rules |

## What was modified this change cycle

**Created:**
- `.claude/skills/project-sync/SKILL.md` (118 lines)
- `.claude/skills/project-sync/references/00-workflow.md` (251 lines)
- `.claude/skills/project-sync/references/01-targets.md` (246 lines)
- `.claude/skills/project-sync/references/02-data-js-shape.md` (334 lines)
- `.claude/skills/project-sync/references/03-metadata-to-datajs.md` (334 lines)
- `.claude/skills/project-sync/references/04-sync-datajs-fields.md` (265 lines)
- `.claude/skills/project-sync/references/05-meta-files.md` (244 lines)
- `.claude/skills/project-sync/references/06-empty-state.md` (191 lines)
- `.claude/skills/project-sync/references/07-screenshots-sync.md` (247 lines)
- `decisions.md` (4 decision entries)
- `docs/flows/001-create-project-sync-skill.md` (this file)

**Modified:**
- None (no source code touched; this is a new skill).

## Idempotency contract

Re-running `/project-sync` on a clean tree produces **zero diff**. Every Edit uses:
1. **Pre-check:** parse file, confirm addition isn't already present, skip if so.
2. **Unique anchor:** Edit pattern matches one occurrence.
3. **Verification:** after every sync, run it again — `git diff --stat` must show no new changes.

If idempotency fails, that's a bug — fix the Edit pattern in the relevant reference (04, 05, 06, 07).

## Cross-file consistency invariants

1. `Object.keys(dataBySlug)` (registry.js) === `project_route_mapping.json#mappings[].urlSlug`
2. `projects/links.json` keys === `src/portfolio_data/links.json` keys (byte-identical)
3. `EMPTY_STATE_SLUGS` ∩ `dataBySlug keys` === ∅
4. `links.json` keys ⊇ `EMPTY_STATE_SLUGS` ∪ `dataBySlug keys`
5. `SCREENSHOT_FOLDER` keys ⊇ `dataBySlug keys` (every detail-page project has a folder map)
6. `SCREENSHOT_FOLDER` uses slug-form keys (e.g., `"Full-Stack-Template"` not `"Full-Stack Template"`)

Violating any of these after sync → abort + rollback + report.

## Related

- Sibling skill `project-documentor` (global, at `~/.claude/skills/project-documentor/`) — produces the `.website/` bundles this skill consumes.
- Decisions logged in `/decisions.md` (4 entries: location, scope, idempotency, dual-links).
