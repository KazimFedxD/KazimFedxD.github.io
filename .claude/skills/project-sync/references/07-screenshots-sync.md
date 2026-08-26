# 07-screenshots-sync.md — `public/screenshots/<Slug>/` → `data.js#screenshots[]`

## File purpose

Append-only sync of screenshot entries. Reads `public/screenshots/<Slug>/*` and adds any missing files as bare-filename entries to `data.js#screenshots[]`. Never reorders, never removes.

---

## Path convention reminder

| Location | Format | Notes |
|---|---|---|
| `public/screenshots/<Slug>/file.png` | physical file | the source of truth |
| `data.screenshots[i].filename` | **bare filename** (e.g., `"homepage.png"`) | renderer prepends `/screenshots/<Slug>/` |
| `data.codeSnippets[i].screenshots[j]` | absolute path (e.g., `"/screenshots/<Slug>/file.png"`) | already-prefixed; out of scope for this skill |

This skill touches ONLY `data.screenshots[]` (top-level array). The nested `codeSnippets[].screenshots[]` arrays are hand-authored and not synced.

---

## Algorithm

### Step 1 — List files in `public/screenshots/<Slug>/`

Use Glob: `public/screenshots/<Slug>/*.{png,jpg,jpeg,webp,gif}`

Expected output (example):
```
public/screenshots/TeachBack/homepage.png
public/screenshots/TeachBack/session-active.png
public/screenshots/TeachBack/mobile-homepage.png
...
```

Filter out `README.md` (which lives in the folder but isn't a screenshot).

### Step 2 — Read existing `data.screenshots[]` from the data module

For an existing data.js: read the file, extract the array (regex or parser).

For a NEW data.js: empty array (will be populated entirely this run).

### Step 3 — Compute the diff (files on disk vs files in data)

```js
const diskFiles = new Set(listedFiles.map(f => path.basename(f)));  // {"homepage.png", "session-active.png", ...}
const dataFiles = new Set(existingScreenshots.map(s => s.filename));
const newFiles = [...diskFiles].filter(f => !dataFiles.has(f));  // files present on disk but missing from data
```

### Step 4 — Build new entries

For each `newFile`, infer the category:

| Filename pattern | Inferred category |
|---|---|
| starts with `mobile-` | `Mobile` |
| ends with `-mobile` | `Mobile` |
| contains `phone` or `iphone` (case-insensitive) | `Mobile` |
| everything else | `Frontend` |

Build the entry:

```js
const entry = {
  filename: <newFile>,                     // bare name, NO prefix
  caption: humanizeFilename(newFile),       // "homepage" → "Homepage"
  category: inferCategory(newFile),
  description: '',                          // TODO: hand-author
};
```

`humanizeFilename`: strip extension, replace `-` with space, capitalize each word. `mobile-homepage.png` → `Mobile Homepage`. `session-active.png` → `Session Active`.

If the existing entries use `description` field (some files do, some don't — see `02-data-js-shape.md` §C), omit it for consistency with the file's existing shape. Match the field set of the FIRST existing entry.

### Step 5 — Append to `data.screenshots[]`

For NEW data.js (empty array):

```
old: "  screenshots: [],\n"
new: "  screenshots: [\n    <entries as JS>\n  ],\n"
```

For EXISTING data.js (non-empty array):

```
old: "    {\n      filename: \"<lastExistingFilename>\",\n      caption: \"<lastExistingCaption>\",\n      category: \"<lastExistingCategory>\"\n    }\n  ],\n"
new: "    {\n      filename: \"<lastExistingFilename>\",\n      caption: \"<lastExistingCaption>\",\n      category: \"<lastExistingCategory>\"\n    },\n    <new entries>\n  ],\n"
```

**Sort order:** append at end (don't reorder existing). Within the appended batch, sort alphabetically by filename for stable diffs.

**Field shape consistency:** if existing entries have `description`, include `description: ''` in new entries. If not, omit.

### Step 6 — Optional: report admin tasks

After sync, list new screenshots as "needs caption/description" in the report. Admin fills in `caption` and `description` by hand.

---

## Edge cases

### Empty directory

If `public/screenshots/<Slug>/` doesn't exist or is empty:

- Don't error — just skip this project for screenshots.
- Add to report: "no public/screenshots/<Slug>/ directory; skipping screenshots sync".

### Files on disk but not in data AND data has files NOT on disk

If `dataFiles` has entries NOT in `diskFiles` (files removed from disk but still in data):

- Do NOT auto-remove. Flag in report: "orphan screenshot entries: ,  — manual review".
- Reason: file might be intentionally missing (e.g., redesign in progress).

### Subdirectories inside `public/screenshots/<Slug>/`

If the directory has subdirectories like `public/screenshots/TeachBack/light/`:

- Skip subdirs entirely. Only top-level files are synced.
- Report: "subdirectories detected: light/ — not synced".

### Non-image files

Filter out non-image extensions at Step 1:
- `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif` → include
- everything else (`.md`, `.txt`, etc.) → skip

### Filename case sensitivity

Filesystems may report different cases. Normalize to lowercase before comparison. The data.js `filename` field is lowercase (matches existing convention).

### Duplicate filenames on disk

If `public/screenshots/TeachBack/` has both `homepage.png` and `Homepage.PNG`:

- `Glob` is typically case-sensitive on Linux. Both will be listed.
- `diskFiles` Set will have one entry per case (`Set` is case-sensitive in JS).
- Risk: data.js will have two entries pointing at different files. Flag and ask admin to resolve casing.

---

## Idempotency

**Read-then-append pattern is idempotent:**

1. List files on disk.
2. Compare to existing data.js entries.
3. If `newFiles` is empty, skip.
4. If non-empty, append all `newFiles` in one Edit.

Re-run on a clean tree: `git diff` shows zero changes after the second run.

**Failure mode:** if the Edit fails (e.g., anchor doesn't match because admin hand-edited the file), abort screenshots sync for that project and report. Do NOT retry with a fuzzy match.

---

## Cross-checks

After sync:

- `new Set(diskFiles) === new Set(data.screenshots.map(s => s.filename))` for synced projects.
- If they differ (orphan entries), flag in report.

---

## Example

### Input

`public/screenshots/TeachBack/`:
```
homepage.png
session-active.png
session-ai-question.png
evaluation.png
sessions-list.png
mobile-homepage.png
mobile-session.png
homepage-v2.png    ← NEW this run
```

`teachback-data.js#screenshots[]`:
```js
[
  { filename: "homepage.png", caption: "Homepage", category: "Frontend", description: "..." },
  { filename: "session-active.png", caption: "Active session", category: "Frontend", description: "..." },
  ... (5 more existing)
]
```

### Diff

```
newFiles = ["homepage-v2.png"]
```

### New entry

```js
{
  filename: "homepage-v2.png",
  caption: "Homepage V2",
  category: "Frontend",        // no "mobile" prefix → Frontend
  description: "",
}
```

### Append Edit

```
old: "    {\n      filename: \"<last>\",\n      caption: \"<last caption>\",\n      category: \"<last category>\",\n      description: \"<last desc>\"\n    }\n  ],"
new: "    {\n      filename: \"<last>\",\n      caption: \"<last caption>\",\n      category: \"<last category>\",\n      description: \"<last desc>\"\n    },\n    {\n      filename: \"homepage-v2.png\",\n      caption: \"Homepage V2\",\n      category: \"Frontend\",\n      description: \"\"\n    }\n  ],"
```

### Report

```
TeachBack: +1 screenshot (homepage-v2.png) — needs caption + description
```

---

## Quality gate

- [ ] `screenshots[]` is append-only (no reorder, no removal)
- [ ] All `newFiles` appended in one Edit
- [ ] Bare filenames (no slug prefix)
- [ ] Category inferred correctly (`mobile-*` → "Mobile", else "Frontend")
- [ ] Field set matches existing entries (don't add `description` if existing entries lack it, and vice versa)
- [ ] Idempotent: re-run produces zero diff
- [ ] Orphan entries (data has, disk lacks) flagged for manual review

---

## Anti-patterns

- Reordering `screenshots[]` (render order matters; admin controls it)
- Removing entries (admin might be mid-redesign)
- Adding slug prefix to `filename` (breaks the path convention)
- Inventing captions/descriptions (admin's job — leave empty + report)
- Syncing from `.website/screenshots/` to `public/screenshots/<Slug>/` (out of scope; that's `project-documentor`'s territory)
- Touching nested `codeSnippets[].screenshots[]` arrays (hand-authored)
- Auto-deleting orphan entries (silent data loss)
