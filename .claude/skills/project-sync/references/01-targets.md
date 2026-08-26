# 01-targets.md — Inventory of Target Files

## File purpose

Every file the skill can write to or read from. For each target: exact path, when it's touched, the Edit pattern (concrete before/after), and consumers.

---

## T1. `src/portfolio_data/<slug>-data.js` (write/read)

**When touched:**
- **NEW project**: created via Write (template from `03-metadata-to-datajs.md`)
- **EXISTING project**: surgical Edit on simple fields only (per `04-sync-datajs-fields.md`)
- **Screenshots**: Edit to append new entries to `screenshots[]`

**Consumers:** imported only by `src/data/registry.js` (via `dataBySlug` map). Other modules import via the registry.

**Filename convention:** `<slug-kebab>-data.js`. E.g. `teachback-data.js`, `fincore-data.js`, `fullstack-template-data.js`, `fedxd-data-container-data.js`, `fxpy-data.js`, `fexobot-data.js`, `fxquest-data.js`, `portfolio-website-data.js`.

**Named export:** `<slugCamel>Data`. E.g. `teachbackData`, `fincoreData`, `fullStackTemplateData`, `fedxdDataContainerData`, `fxpyData`, `fexobotData`, `fxquestData`, `portfolioWebsiteData`.

**Naming rule:** kebab-case filename → camelCase export. Split on `-`, capitalize each segment except first. `fullstack-template` → `fullStackTemplate`.

**Full schema:** see `02-data-js-shape.md`.

---

## T2. `src/portfolio_data/project_route_mapping.json` (write)

**When touched:** every NEW project. Also if a slug is renamed.

**Current shape:**
```json
{
  "mappings": [
    { "urlSlug": "TeachBack", "dataModule": "teachback-data.js", "route": "/projects/TeachBack" },
    ...
  ]
}
```

**Edit pattern** (append a new mapping):
```
old: "  ]\n}\n"
new: "  ,\n  { \"urlSlug\": \"<Slug>\", \"dataModule\": \"<slug-kebab>-data.js\", \"route\": \"/projects/<Slug>\" }\n  ]\n}\n"
```

Always use the `Edit` tool, never `Write`. Match the indentation exactly (2 spaces).

**Consumer:** `src/data/registry.js` (line 24 imports; dev-only sanity check warns if `dataBySlug` keys don't match).

---

## T3. `src/portfolio_data/projectsData.js` (write)

**When touched:** every NEW project.

**Two edit points:**

**T3a. `projectsData[]` array** — append a new entry with an `order` value at end of list. New projects default to `order: projectsData.length + 1` (placed just before the negative-orders).

**Entry shape:**
```js
{
  order: <number>,
  title: '<Title>',
  badge: '<emoji + label>' | undefined,
  description: '<shortDescription>',
  tech: ['<stack items>', ...],
  github: '<url>',
  features: ['<emoji + line>', ...]
}
```

**Edit pattern** (append):
- Find the closing `];` of `projectsData` array
- Insert new entry before it

**T3b. `projectsWithDetails[]` array** — append the project's `title`.

**Edit pattern** (append):
```
old: "];\n\n// Helper function to get sorted projects"
new: ", '<Title>'];\n\n// Helper function to get sorted projects"
```

Match indentation (2 spaces, single-quoted strings).

**Consumer:** `src/data/registry.js` re-exports; consumed by `src/pages/Home.jsx`, `src/pages/Projects.jsx`.

**`title` mapping rule:** the `title` in `projectsData[]` ≠ always the slug. Examples:
- slug `TeachBack` → title `TeachBack`
- slug `Full-Stack-Template` → title `Full-Stack Template`
- slug `FedxD-Data-Container-FxDC` → title `FedxD Data Container (FxDC)`
- slug `Portfolio-Website` → title `Portfolio Website`

Default for NEW projects: use `metadata.title` (verbatim). Flag if it differs from `<slug>`.

---

## T4. `src/data/registry.js` (write)

**When touched:** every NEW project.

**Three edit points:**

**T4a. Import line** — append `import { <slugCamel>Data } from "../portfolio_data/<slug-kebab>-data.js";`

**Edit pattern:**
```
old: "import { portfolioWebsiteData } from \"../portfolio_data/portfolio-website-data.js\";\n"
new: "import { portfolioWebsiteData } from \"../portfolio_data/portfolio-website-data.js\";\nimport { <slugCamel>Data } from \"../portfolio_data/<slug-kebab>-data.js\";\n"
```

**T4b. `dataBySlug` map** — append `"<Slug>": <slugCamel>Data,`

**Edit pattern:**
```
old: "  \"Portfolio-Website\": portfolioWebsiteData,\n};"
new: "  \"Portfolio-Website\": portfolioWebsiteData,\n  \"<Slug>\": <slugCamel>Data,\n};"
```

**T4c. Bottom re-export** — append the camelCase export.

**Edit pattern:**
```
old: "  portfolioWebsiteData,\n};"
new: "  portfolioWebsiteData,\n  <slugCamel>Data,\n};"
```

**Idempotency check:** dev-only sanity check at line 51 warns if any `dataBySlug` key lacks a `mappings[]` entry. If the warning fires after sync, T2 was skipped.

---

## T5. `projects/links.json` AND `src/portfolio_data/links.json` (write — both in lockstep)

**When touched:** every NEW project.

**Current shape:**
```json
{
  "FxPy": "https://github.com/KazimFedxD/FxPy",
  ...
}
```

**Edit pattern** (append):
```
old: "  \"FxQuest\": \"https://github.com/KazimFedxD/FxQuest\"\n}\n"
new: "  \"FxQuest\": \"https://github.com/KazimFedxD/FxQuest\",\n  \"<Slug>\": \"<github-url>\"\n}\n"
```

The two files are byte-identical. Always write both. Verify with `diff` after sync.

**Consumers:** none currently (orphaned per Agent 2 report). Sync keeps them in sync for cleanliness — if a future consumer appears, it has both options.

**`github-url` source:** `metadata.json#github`. If empty (`""`), use `https://github.com/KazimFedxD` as fallback and flag.

---

## T6. `src/lib/screenshots.js` (write)

**When touched:** every NEW project.

**Current shape:**
```js
export const SCREENSHOT_FOLDER = {
  "TeachBack": "TeachBack",
  "Full-Stack Template": "Full-Stack-Template",  // title key
  "Full-Stack-Template": "Full-Stack-Template",  // slug key (second wins)
  ...
};
```

**WARNING:** duplicate keys. The slug key wins (declared second). When syncing, ALWAYS use the slug key.

**Edit pattern** (append a slug-keyed entry):
```
old: "  \"Portfolio-Website\": \"Portfolio-Website\",\n};"
new: "  \"Portfolio-Website\": \"Portfolio-Website\",\n  \"<Slug>\": \"<Slug>\",\n};"
```

**`SCREENSHOT_FOLDER[<Slug>]` value** = the slug itself (used as the public folder name).

**Note:** the public folder is `public/screenshots/<value>/`. The slug and folder name are usually identical, but verify against `public/screenshots/<slug>/` existence.

---

## T7. `src/pages/ProjectDetail.jsx` (write — `EMPTY_STATE_SLUGS`)

**When touched:** when a slug enters/leaves the empty-state gap.

**Current shape:**
```js
const EMPTY_STATE_SLUGS = new Set([
  "Skyntel",
  "FedxD-PiPy",
  "FxChange",
  "Webstore",
]);
```

**Edit pattern** (add a slug):
```
old: "  \"Webstore\",\n]);"
new: "  \"Webstore\",\n  \"<NewSlug>\",\n]);"
```

**Edit pattern** (remove a slug):
```
old: "  \"<OldSlug>\",\n  \"Webstore\",\n]);"
new: "  \"Webstore\",\n]);"
```

**Sort order:** keep the list alphabetized for stable diffs.

**Decision logic:** see `06-empty-state.md`.

---

## T8. `public/screenshots/<Slug>/*` (read-only by skill)

**When read:** by `07-screenshots-sync.md`.

**Rule:** skill does NOT copy files into this folder. The `.website/screenshots/` are the source; admin/Playwright captures populate `public/screenshots/<Slug>/`. If `.website/screenshots/` exists but `public/screenshots/<Slug>/` is empty, flag the gap.

---

## Cross-file consistency checks (run after every sync)

1. `Object.keys(dataBySlug)` (in registry.js) === `mappings[].urlSlug` (in T2) — sorted, compared
2. `keys(links.json)` (T5, both copies) === `keys(dataBySlug)` ∪ EMPTY_STATE_SLUGS ∪ projectsData titles — superset
3. `keys(SCREENSHOT_FOLDER)` (T6) ⊇ `keys(dataBySlug)` — every detail-page project has a folder map
4. `EMPTY_STATE_SLUGS` ∩ `dataBySlug keys` === ∅ — never overlap
5. Both `links.json` files byte-identical: `diff projects/links.json src/portfolio_data/links.json` → no output

If any check fails after sync, abort and report.

## Anti-patterns

- Using `Write` to rewrite T2/T4/T6/T7 entirely (destroys formatting)
- Editing only ONE of the two `links.json` files (causes drift)
- Using title-form keys in T6 (`"Full-Stack Template"` vs `"Full-Stack-Template"`)
- Putting slug prefix in `data.screenshots[]#filename` (bare names only)
- Forgetting the bottom re-export in T4c
- Forgetting `projectsWithDetails[]` entry (causes `hasProjectDetails()` to return false → `/projects/<slug>` shows empty state instead of full case study)
