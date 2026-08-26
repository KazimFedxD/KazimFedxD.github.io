# 00-workflow.md — 5-Phase Execution + Idempotency Rules

## File purpose

The execution lifecycle of `/project-sync`. Defines the 5 phases, dry-run mode, error handling, and the post-sync idempotency check.

---

## 5 phases (the loop)

```
┌─ Phase 1: Discover
│  list projects/*/ and src/portfolio_data/*-data.js
│  for each project, read .website/metadata.json if present
│  build diff table: NEW | EXISTING | EMPTY
│
├─ Phase 2: Diff (load 01-targets.md)
│  for each EXISTING project: diff metadata.json vs data.js simple fields
│  for each EMPTY slug (links.json but no .website/): flag for EMPTY_STATE_SLUGS add
│  for each NEW project: queue data.js generation
│
├─ Phase 3: Generate (NEW only — load 03-metadata-to-datajs.md)
│  for each NEW project: write <slug>-data.js
│  then update 7 meta files (load 05-meta-files.md)
│
├─ Phase 4: Sync (EXISTING only — load 04-sync-datajs-fields.md, 07-screenshots-sync.md)
│  for each EXISTING project: Edit simple fields if changed
│  for each project: append new screenshots from public/screenshots/<Slug>/
│  update EMPTY_STATE_SLUGS if needed (load 06-empty-state.md)
│  update meta files for new screenshots? No — screenshots don't add new projects
│
└─ Phase 5: Report
   single-line summary: sync: discovered=N new=X synced=Y screenshots=Z empty=±K errors=M
   if errors, bullet block of error lines before the summary
```

---

## Phase 1 — Discover

**Inputs:** working directory (portfolio repo root).

**Steps:**

1. List `projects/*/` directories → `Set<slug>` of project folders.
2. List `src/portfolio_data/*-data.js` files → `Set<slugKebab>` of existing data modules.
3. Read `projects/links.json` → `Set<slug>` of link slugs.
4. Read `src/portfolio_data/links.json` → verify byte-identical with (3); flag drift if not.
5. Read `src/pages/ProjectDetail.jsx` → extract `EMPTY_STATE_SLUGS` as `Set<slug>`.
6. Read `src/data/registry.js` → extract `dataBySlug` keys.
7. Read `src/portfolio_data/project_route_mapping.json` → extract `mappings[].urlSlug`.

**For each project folder:**

- Try to read `projects/<Name>/.website/metadata.json` (Bash: `test -f`). If present, parse as JSON.
- If absent: project is in `EMPTY_STATE` state (needs links.json entry to render).

**Output:** `diffTable` = `[{slug, status: 'NEW'|'EXISTING'|'EMPTY'|'ORPHAN', metadata?}]`

Status definitions:
- **NEW:** project folder exists, `.website/metadata.json` exists, but no `<slug>-data.js`.
- **EXISTING:** project folder exists, `.website/metadata.json` exists, AND `<slug>-data.js` exists.
- **EMPTY:** project slug in `links.json` and/or `EMPTY_STATE_SLUGS`, but no `.website/` bundle OR no project folder.
- **ORPHAN:** data.js exists but no project folder AND not in `links.json` — flag for cleanup, don't touch.

---

## Phase 2 — Diff

**For each EXISTING project:**

Read both `metadata.json` and `<slug>-data.js`. For each whitelist field (per `04-sync-datajs-fields.md`), compare current vs new. Build `editPlan = [{field, old, new}]`.

**For each EMPTY slug:**

Per `06-empty-state.md` decision rule, decide add/remove.

**For each NEW project:**

Queue `generatePlan = [slug]`.

**For each ORPHAN:**

Add to report. Do NOT touch.

---

## Phase 3 — Generate (NEW projects only)

For each `slug` in `generatePlan`:

1. Load `02-data-js-shape.md` and `03-metadata-to-datajs.md`.
2. Read `projects/<slug>/.website/metadata.json`, `overview.md`, `features.md` (if exists).
3. Run algorithm in `03-metadata-to-datajs.md` Steps 1–9.
4. Write `src/portfolio_data/<slug-kebab>-data.js`.
5. Load `05-meta-files.md`. Apply M1, M2a, M2b, M3a, M3b, M3c, M4 (both), M5 in order.
6. Per `06-empty-state.md`: do NOT add to `EMPTY_STATE_SLUGS` (project has full data now).

---

## Phase 4 — Sync (EXISTING projects only)

For each `slug` in `editPlan`:

1. Load `04-sync-datajs-fields.md`.
2. Apply each Edit from the diff. Verify each Edit succeeded.
3. Load `07-screenshots-sync.md`.
4. List `public/screenshots/<slug>/*`, compute `newFiles`, append to `screenshots[]`.
5. Load `06-empty-state.md`. If a new data.js was just generated this run, REMOVE from `EMPTY_STATE_SLUGS`.

For each EMPTY slug decision:
- If add → Edit `EMPTY_STATE_SLUGS`.
- If remove → Edit `EMPTY_STATE_SLUGS`.

---

## Phase 5 — Report

```
sync: discovered=N new=X synced=Y screenshots=Z empty=±K errors=M
```

- `discovered`: total project folders found
- `new`: NEW projects that got data.js created this run
- `synced`: number of simple-field edits applied across all EXISTING projects
- `screenshots`: total new screenshots appended across all projects
- `empty`: net change to `EMPTY_STATE_SLUGS` (+N added, -N removed)
- `errors`: number of Edit failures or skipped operations

If `errors > 0`, list them BEFORE the summary line:

```
- TechBack: Edit failed for `techStack` (anchor not found) — manual review needed
- FxQuest: `public/screenshots/FxQuest/` missing — skipped
sync: discovered=8 new=0 synced=3 screenshots=2 empty=±1 errors=2
```

---

## Dry-run mode

If invoked with `--dry-run` (or env `PROJECT_SYNC_DRY_RUN=1`):

- Run Phase 1 (Discover) and Phase 2 (Diff) as normal.
- Print the planned diff table.
- Skip Phase 3 and Phase 4 (no Write/Edit).
- Print what would be done:

```
DRY RUN — no changes will be written

Discovered projects:
  TeachBack        EXISTING   (7 fields differ, 1 new screenshot)
  FinCore          EXISTING   (no changes)
  TestNew          NEW        (will generate data.js, update 7 meta files)
  SkyntelNew       EMPTY      (will add to EMPTY_STATE_SLUGS)

Planned changes:
  + Generate: src/portfolio_data/testnew-data.js
  + Update: src/portfolio_data/project_route_mapping.json (+1 entry)
  + Update: src/portfolio_data/projectsData.js (+2 entries)
  + Update: src/data/registry.js (+3 edits)
  + Update: projects/links.json AND src/portfolio_data/links.json (+1 each)
  + Update: src/lib/screenshots.js (+1 entry)
  + Edit: src/portfolio_data/teachback-data.js (7 field updates)
  + Edit: src/portfolio_data/teachback-data.js (1 screenshot append)
  + Edit: src/pages/ProjectDetail.jsx (1 EMPTY_STATE_SLUGS add)

Re-run without --dry-run to apply.
```

---

## Error handling

### Edit failures

If an Edit fails (anchor not found, multiple matches, etc.):

- Abort that operation.
- Log the error in the report.
- Continue with remaining operations.
- If > 3 Edit failures, abort the entire run.

### File not found

If `projects/<slug>/.website/metadata.json` is missing:

- Status: EMPTY (or ORPHAN if no project folder).
- Skip this slug's data sync.

### Parse errors

If `metadata.json` is invalid JSON or `data.js` doesn't parse:

- Skip this project.
- Log error.
- Continue.

### Cross-file consistency violations

If after sync, any cross-check from `01-targets.md` end fails:

- Abort the run.
- Roll back the last batch of edits (manual — Edit tool doesn't auto-rollback).
- Print the violation in the report.

---

## Idempotency rules (the most important property)

**Every Edit must be safe to re-run.** This means:

1. **Pre-check:** before any Edit, parse the file and check if the addition is already present. If yes, skip silently.
2. **Edit (not Write):** never rewrite a whole file. Use Edit with unique anchors.
3. **Match indentation:** copy the existing whitespace exactly. Mismatched indentation creates spurious diffs.
4. **Idempotency test:** after every sync, run it again on the same tree. `git diff --stat` must show zero changes after the second run.

If idempotency fails (any file shows changes after a no-op re-run), that's a bug. Fix the Edit pattern.

### Specific idempotency patterns

- **Append-only arrays:** check that the entry isn't already present.
- **Whole-array replace:** not idempotent if the existing array has hand-edits. Use `replace_all: false` with a unique anchor on the opening line.
- **Single-field replace:** include enough context (surrounding lines) to make the anchor unique.

---

## Self-check before reporting done

- [ ] `git diff --stat` shows exactly the changes reported in the summary.
- [ ] Both `links.json` files are byte-identical.
- [ ] `dataBySlug` keys === `project_route_mapping.json#urlSlug`.
- [ ] `EMPTY_STATE_SLUGS` ∩ `dataBySlug keys` === ∅.
- [ ] `SCREENSHOT_FOLDER` uses slug-form keys.
- [ ] No rich-content fields in EXISTING data.js were edited.
- [ ] Re-running sync produces zero additional diff.

---

## Anti-patterns

- Skipping the pre-check (causes duplicate entries on re-run)
- Using `Write` to rewrite a whole file (destroys formatting + non-idempotent)
- Writing only one of the two `links.json` files (causes drift)
- Using title-form keys in `SCREENSHOT_FOLDER`
- Adding slug prefix to `screenshots[].filename`
- Editing sacred rich-content fields in EXISTING data.js
- Not running idempotency check before reporting done
- Continuing past 3 Edit failures (cascade of bad state)
- Reporting success without verifying cross-file consistency
