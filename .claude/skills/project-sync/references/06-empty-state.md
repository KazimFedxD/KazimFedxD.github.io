# 06-empty-state.md — `EMPTY_STATE_SLUGS` Management

## File purpose

Decision logic for adding/removing slugs from the `EMPTY_STATE_SLUGS` Set in `src/pages/ProjectDetail.jsx`. This is the gap-state for projects that have a `links.json` entry but no full case-study data.

---

## The Set's purpose

`EMPTY_STATE_SLUGS` slugs render `<DetailEmptyState />` (a real page with title and GitHub link) instead of either a full case study or a 404. They are projects the user wants to surface but hasn't yet written detailed data for.

Three states a slug can be in:

| State | Renders | Conditions |
|---|---|---|
| **Full case study** | `<CaseStudyHero>` + `<AtAGlance>` + `<CaseStudyBody>` + `<RelatedAndCTA>` | Has `*-data.js` AND has `dataBySlug` entry AND not in `EMPTY_STATE_SLUGS` |
| **Empty state** | `<DetailEmptyState>` (still a real page) | In `EMPTY_STATE_SLUGS` (and NOT in `dataBySlug`) |
| **404** | `<NotFound>` (inline in ProjectDetail.jsx) | Not in either (typo / stale link) |

**Invariant:** `EMPTY_STATE_SLUGS` ∩ `dataBySlug keys` === ∅.

---

## Decision rule for adding a slug

```
has .website/ bundle?  →  Yes:  generate data.js, do NOT add to EMPTY_STATE_SLUGS (use 03-metadata-to-datajs.md)
                        No:   check links.json:
                              if in links.json  →  add to EMPTY_STATE_SLUGS
                              if not in links.json → do NOT add (it shouldn't exist anywhere)
```

**Concrete examples:**
- New project at `projects/Skyntel/` with no `.website/`, but `"Skyntel"` in `links.json` → ADD to `EMPTY_STATE_SLUGS`.
- New project at `projects/TestNew/` with `.website/metadata.json` AND not in `links.json` → generate data.js, add to `links.json` (via M4), do NOT add to `EMPTY_STATE_SLUGS`.
- Slug `"FooBar"` in `links.json` but no `projects/FooBar/` dir at all → flag for manual cleanup, do NOT auto-add to `EMPTY_STATE_SLUGS`.

---

## Decision rule for removing a slug

A slug leaves `EMPTY_STATE_SLUGS` when the project gets a `data.js` (becomes a full case study).

```
did data.js get created this run?  →  Yes: remove from EMPTY_STATE_SLUGS
                                       No:  keep as-is
```

---

## Edit patterns

### Add a slug (alphabetic insertion — keep list sorted for stable diffs)

Before applying, check if the slug is already in the Set. If yes, skip.

Find the alphabetic predecessor and insert after it:

```
old: "  \"<Predecessor>\",\n  \"<Successor>\",\n]);"
new: "  \"<Predecessor>\",\n  \"<NewSlug>\",\n  \"<Successor>\",\n]);"
```

If the new slug is the first alphabetic:

```
old: "const EMPTY_STATE_SLUGS = new Set([\n  \"<First>\","
new: "const EMPTY_STATE_SLUGS = new Set([\n  \"<NewSlug>\",\n  \"<First>\","
```

If the new slug is the last alphabetic:

```
old: "  \"<Last>\",\n]);"
new: "  \"<Last>\",\n  \"<NewSlug>\",\n]);"
```

### Remove a slug

```
old: "  \"<Slug>\",\n  \"<NextSlug>\",\n]);"
new: "  \"<NextSlug>\",\n]);"
```

Or if `<Slug>` is last:

```
old: "  \"<Predecessor>\",\n  \"<Slug>\",\n]);"
new: "  \"<Predecessor>\",\n]);"
```

---

## Sort order

Current order (alphabetic): `FedxD-PiPy`, `FxChange`, `Skyntel`, `Webstore`.

Future adds should keep alphabetic order. The Edit patterns above use predecessor/successor anchors which work for any insertion point.

---

## Idempotency

Both add and remove operations are idempotent:
- **Add:** the before-check (`slug already in Set?`) makes it a no-op if already present.
- **Remove:** after the slug is gone, the Edit pattern won't match (the slug line is gone), so the Edit fails. Pre-check: if slug not in Set, skip.

---

## Cross-checks (run after every sync)

1. **`EMPTY_STATE_SLUGS` ∩ `Object.keys(dataBySlug)` === ∅.** If non-empty, one of them drifted — fix by removing from `EMPTY_STATE_SLUGS` (slug now has full data, render full case study).

2. **`projects/links.json` keys ⊇ `EMPTY_STATE_SLUGS` ∪ `Object.keys(dataBySlug)`.** If a `EMPTY_STATE_SLUGS` entry has no `links.json` entry, the empty-state page won't have a GitHub link — flag.

3. **Every `EMPTY_STATE_SLUGS` entry has a matching `projects/<Slug>/` directory OR an admin-curated exception.** Empty state pages render the project title; admin may have chosen to surface a project without a `projects/<Slug>/` source.

---

## Examples

### Example 1: new project arrives with `.website/` bundle

Input:
- `projects/TestNew/` exists with `.website/metadata.json`
- `TestNew` is NOT in `links.json`
- `TestNew` is NOT in `EMPTY_STATE_SLUGS`

Skill action:
- Generate `testnew-data.js` (via `03-metadata-to-datajs.md`)
- Add to all 7 meta files (via `05-meta-files.md`)
- Do NOT add to `EMPTY_STATE_SLUGS` (project has full data now)

### Example 2: project appears in `links.json` but no `.website/`

Input:
- `TestFoo` appears in `projects/links.json` with `"https://github.com/..."`
- `projects/TestFoo/` directory does NOT exist

Skill action:
- Flag for manual cleanup (orphan link)
- Do NOT add to `EMPTY_STATE_SLUGS` (no directory = nothing to render)
- Report in final summary as "orphan link detected"

### Example 3: project directory exists but no `.website/`

Input:
- `projects/Skyntel/` exists (with the existing bundle content but no `.website/` subdir yet)
- `Skyntel` is in `links.json`
- `Skyntel` is in `EMPTY_STATE_SLUGS`

Skill action:
- Report as "no .website bundle yet — run project-documentor first"
- Keep `Skyntel` in `EMPTY_STATE_SLUGS` (no change)
- If `*.website/metadata.json` was just created this run, do nothing else
- The skill does NOT auto-run `project-documentor` (different skill)

### Example 4: project graduates from empty state to full case study

Input:
- `projects/FxChange/` now has `.website/metadata.json` (just created via `project-documentor`)
- `FxChange` is in `EMPTY_STATE_SLUGS`
- `FxChange` is in `links.json`
- No `fxchange-data.js` exists

Skill action:
- Generate `fxchange-data.js`
- Add to all 7 meta files
- REMOVE `FxChange` from `EMPTY_STATE_SLUGS`
- Report: "FxChange: empty state → full case study"

---

## Quality gate

- [ ] `EMPTY_STATE_SLUGS` is alphabetic-sorted
- [ ] `EMPTY_STATE_SLUGS` ∩ `dataBySlug keys` === ∅
- [ ] Every `EMPTY_STATE_SLUGS` entry is in `links.json` (so GitHub link works)
- [ ] Slug additions/removals are idempotent
- [ ] No project is in BOTH `EMPTY_STATE_SLUGS` and `dataBySlug`

---

## Anti-patterns

- Adding a slug to `EMPTY_STATE_SLUGS` after generating its data.js (overlap, renders wrong component)
- Removing a slug without first creating its data.js (renders 404 instead of empty state)
- Adding a slug with no `links.json` entry (empty state page has no GitHub link)
- Non-alphabetic insertion order (breaks stable diffs)
- Auto-cleaning orphan links without flagging (silent data loss)
