# 05-meta-files.md — Update the 7 Meta Files

## File purpose

Per-file Edit patterns for the 7 meta files the skill maintains. All patterns are **idempotent** (running twice produces zero diff on a clean tree).

---

## M1. `src/portfolio_data/project_route_mapping.json` (T2)

**When:** every NEW project.

**Current shape:**
```json
{
  "mappings": [
    { "urlSlug": "TeachBack", "dataModule": "teachback-data.js", "route": "/projects/TeachBack" },
    ...
  ]
}
```

**Idempotent add pattern:**

Before applying, check if `{ "urlSlug": "<Slug>", ... }` already exists in the file. If yes, skip (idempotent).

If no:

```
old: "  ]\n}\n"
new: "  ,\n  { \"urlSlug\": \"<Slug>\", \"dataModule\": \"<slug-kebab>-data.js\", \"route\": \"/projects/<Slug>\" }\n  ]\n}\n"
```

The indentation is 2 spaces. Match exactly.

**Slug → kebab rule:** directory name verbatim (e.g., `FeXoBot` → `fexobot-data.js`). If `metadata.dataModule` is provided, use that verbatim instead.

---

## M2. `src/portfolio_data/projectsData.js` (T3)

**When:** every NEW project.

**Two edits in this file:**

### M2a. Append to `projectsData[]`

Before applying, check if `{ order: <n>, title: '<Title>', ... }` already contains `<Title>`. If yes, skip.

If no, find the last entry in the array and insert after it (or before the closing `];`).

The new entry shape:

```js
{
  order: <number>,  // see order rule below
  title: '<Title>',
  badge: '<emoji + label>' | undefined,
  description: '<shortDescription>',
  tech: ['<stack strings>', ...],
  github: '<github-url>',
  features: ['<emoji + line>', ...]
},
```

**Order rule for NEW projects:**

```js
const maxPositiveOrder = Math.max(...projectsData.filter(p => p.order > 0).map(p => p.order));
const order = maxPositiveOrder + 1;
```

This places new projects just after the highest positive order, before the negative ones (which render at end).

**Pattern for Edit:**

Find the closing `];` of the array. The last entry ends with `},` (with trailing comma). Match a unique trailing fragment:

```
old: "    '<last-feature>'\n  },\n];\n"
new: "    '<last-feature>'\n  },\n  {\n    order: <n>,\n    title: '<Title>',\n    badge: '<badge>'|undefined,\n    description: '<shortDesc>',\n    tech: ['<t1>', ...],\n    github: '<github>',\n    features: ['<f1>', ...]\n  },\n];\n"
```

Better approach: anchor on the last entry's unique title + closing:

```
old: "  // ─── ORDER <N>: <LastTitle> ─────────────────────────────────────────────────\n  ...\n];"
new: "  // ─── ORDER <N>: <LastTitle> ─────────────────────────────────────────────────\n  ...\n  // ─── ORDER <NewOrder>: <NewTitle> ────────────────────────────────────────────\n  {\n    order: <NewOrder>,\n    ...\n  },\n];"
```

**Ponytail:** simpler — anchor on the array's closing `];` and use replace_all=false with sufficient context (e.g., the unique last title above it).

### M2b. Append to `projectsWithDetails[]`

The list is plain strings. Append the new title.

```
old: "  '<LastProjectTitle>',\n];\n\n// Helper function to get sorted projects"
new: "  '<LastProjectTitle>',\n  '<NewTitle>',\n];\n\n// Helper function to get sorted projects"
```

The strings are single-quoted, comma-separated.

---

## M3. `src/data/registry.js` (T4)

**When:** every NEW project.

**Three edits in this file:**

### M3a. Add `import` line

Before applying, check if the import `import { <slugCamel>Data } from` already exists. If yes, skip.

Find the last import line and append after it:

```
old: "import { portfolioWebsiteData } from \"../portfolio_data/portfolio-website-data.js\";\n"
new: "import { portfolioWebsiteData } from \"../portfolio_data/portfolio-website-data.js\";\nimport { <slugCamel>Data } from \"../portfolio_data/<slug-kebab>-data.js\";\n"
```

### M3b. Add to `dataBySlug` map

Before applying, check if `"<Slug>": <slugCamel>Data` already exists. If yes, skip.

```
old: "  \"Portfolio-Website\": portfolioWebsiteData,\n};"
new: "  \"Portfolio-Website\": portfolioWebsiteData,\n  \"<Slug>\": <slugCamel>Data,\n};"
```

### M3c. Add to bottom re-export

```
old: "  portfolioWebsiteData,\n};"
new: "  portfolioWebsiteData,\n  <slugCamel>Data,\n};"
```

**Three separate Edits** — they target three different parts of the file.

---

## M4. `projects/links.json` AND `src/portfolio_data/links.json` (T5)

**When:** every NEW project.

**Both files in lockstep.** Write both with identical content.

**Idempotent check:** parse both files; check if `<Slug>` is already a key. If yes in both, skip both. If yes in one but not the other (drift!), fix the missing one and flag.

**Pattern:**

```
old: "  \"FxQuest\": \"https://github.com/KazimFedxD/FxQuest\"\n}\n"
new: "  \"FxQuest\": \"https://github.com/KazimFedxD/FxQuest\",\n  \"<Slug>\": \"<github-url>\"\n}\n"
```

Match indentation (2 spaces, 4-space hanging indent is fine).

**`github-url` source:** `metadata.github`. If empty `""`, use `https://github.com/KazimFedxD` and flag for manual review.

**Post-write verification:**

```bash
diff projects/links.json src/portfolio_data/links.json
# expect: no output (identical)
```

If diff shows output, re-write the drifted file from the other.

---

## M5. `src/lib/screenshots.js` (T6)

**When:** every NEW project.

**Before applying:** read the file. Check if `"<Slug>"` (slug form, NOT title form) already exists as a key in `SCREENSHOT_FOLDER`. If yes, skip.

**Slug vs title keys:** the file currently has both `"Full-Stack Template"` (title) and `"Full-Stack-Template"` (slug). Slug wins. When adding new entries, ALWAYS use the slug form.

**Pattern:**

```
old: "  \"Portfolio-Website\": \"Portfolio-Website\",\n};"
new: "  \"Portfolio-Website\": \"Portfolio-Website\",\n  \"<Slug>\": \"<Slug>\",\n};"
```

**If a title-form key already exists but no slug-form key:** add the slug-form entry. The JS object will have both keys but the slug-form will be the active one (declared later). Optionally flag to admin that the title-form key should be removed in a separate cleanup.

---

## M6. `src/pages/ProjectDetail.jsx` (T7)

**When:** a slug enters/leaves `EMPTY_STATE_SLUGS`.

See `06-empty-state.md` for the decision logic and Edit patterns.

---

## Order of operations for a NEW project

1. Write `*-data.js` (T1) using `03-metadata-to-datajs.md`
2. Update `project_route_mapping.json` (M1)
3. Update `projectsData.js` × 2 (M2a, M2b)
4. Update `registry.js` × 3 (M3a, M3b, M3c)
5. Update both `links.json` (M4)
6. Update `screenshots.js` (M5)
7. Check `EMPTY_STATE_SLUGS` — should NOT be added (slug now has data.js) (M6 / `06-empty-state.md`)

Then run cross-file consistency checks (see `01-targets.md` end).

---

## Idempotency rules (apply to every meta file)

1. Before any Edit, parse the file and check if the addition is already present. If yes, skip silently.
2. Use Edit with unique anchors. Never Write.
3. Match indentation exactly (2 spaces for JSON, 2 spaces for JS in this repo).
4. Match string quoting (single quotes in `projectsData.js`, double in JSON).
5. After all edits, verify with `git diff -- <files>` that the changes are exactly what was intended.
6. Re-run sync: `git diff` should show zero additional changes.

---

## Quality gate

- [ ] All 7 meta files updated for every NEW project
- [ ] No meta file touched for projects that were already synced
- [ ] Both `links.json` files byte-identical (`diff` returns nothing)
- [ ] `registry.js` import + dataBySlug + bottom re-export all three updated
- [ ] `projectsData.js` projectsData[] AND projectsWithDetails[] both updated
- [ ] `SCREENSHOT_FOLDER` uses slug-form key, not title-form
- [ ] Idempotent: re-run produces zero diff

---

## Anti-patterns

- Editing one `links.json` but not the other (drift)
- Using title-form keys in `SCREENSHOT_FOLDER` (slug form only)
- Skipping the bottom re-export in `registry.js` (consumer crashes)
- Forgetting `projectsWithDetails[]` entry (causes `hasProjectDetails()` false → empty state)
- Reordering existing `projectsData[]` entries when adding (preserve order)
- Adding to `dataBySlug` without matching `project_route_mapping.json` (registry warns at startup)
