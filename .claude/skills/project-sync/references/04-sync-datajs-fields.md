# 04-sync-datajs-fields.md — Sync Simple Fields in EXISTING `*-data.js`

## File purpose

Diff+merge logic for projects that already have a `*-data.js`. **Sync only simple fields.** Sacred rich-content fields are NEVER touched.

This reference is loaded ONLY for EXISTING projects. NEW projects use `03-metadata-to-datajs.md` instead.

---

## Syncable simple fields (the whitelist)

These are the ONLY fields the skill edits in an existing data.js:

| Field | Type | Source | Transform |
|---|---|---|---|
| `title` | string | `metadata.title` | direct |
| `shortDescription` | string | `metadata.shortDescription` | direct |
| `github` | string | `metadata.github` | direct |
| `liveDemo` | string | `metadata.liveDemo` | direct |
| `badges` | `[{icon, text}]` | `metadata.badges[]` (strings) | map via `inferIcon` (§D in 02) |
| `techStack` | `[{name, version, category}]` | `metadata.techStack[]` (strings) | parse + `inferCategory` (§E in 02) |
| `awards` | `[{title, event, year, description}]` | `metadata.awards[]` (strings) | parse year regex |
| `performance.pageLoad` | `[{metric, target, actual}]` | `metadata.performance.{pageLoadTime,apiResponseTime,bundleSize}` | flatten |
| `performance.bundleSize.total` | string | `metadata.performance.bundleSize` | direct |
| `performance.lighthouseScores.desktop.performance` | number\|null | `metadata.performance.lighthouseScore` | direct if number, null otherwise |
| `requirements.os` | `[{name, supported, notes}]` | `metadata.requirements.os[]` | flatten |
| `requirements.browsers` | `[{name, version, supported}]` | `metadata.requirements.browsers[]` | flatten |
| `requirements.hardware.minimum.ram` | string | `metadata.requirements.minRAM` | direct |
| `requirements.software` | `[{name, version, required, purpose}]` | `metadata.requirements.dependencies[]` | flatten |
| `screenshots[]` | append-only | `public/screenshots/<Slug>/*` | bare filename + inferred category |
| `relatedProjects[]` | append-only | cross-refs in `.website/features.md` | manual extraction (skip if unclear) |

---

## Sacred fields (NEVER sync)

These are hand-authored from `.website/*.md` and are NOT touched by this skill:

- `showcaseVideo`
- `mainFlow`
- `overview.{problemIntro, problemStatement, howWeSolve, targetAudience, uniqueFeatures, useCases, comparison}`
- `features[].{whyItMatters, howItWorks, codeSnippets, evaluationDimensions, securityFeatures, ...}` (and ALL nested optional fields)
- `architecture.{description, servicesTitle, servicesIntro, diagram, services}`
- `apiEndpoints`
- `setupSteps`
- `knownIssues`
- `futureEnhancements`
- `overview.description` — even though it's a single string, it's the hand-authored elevator pitch from `.website/overview.md`. Skill does NOT overwrite.

**Exception: `overview.description`** — see Rule 1 below.

---

## Rule 1: `overview.description` — be conservative

The `overview.description` field is a single string, but it is the hand-authored elevator pitch. The skill MUST NOT overwrite it from `.website/overview.md` after the first generation. Initial generation (from `03-metadata-to-datajs.md` Step 7) is allowed; subsequent syncs leave it alone.

If the admin wants to refresh `overview.description` from `.website/`, they do it by hand.

---

## Algorithm

### Step 1 — Read both sides

```js
const metadata = JSON.parse(Read(`projects/${slug}/.website/metadata.json`));
const dataPath = `src/portfolio_data/${slugKebab}-data.js`;
const dataContent = Read(dataPath);

// Parse the data.js export. Easiest: regex-extract the object literal.
// Note: data.js is a single export const = { ... }; — no imports.
const dataObj = evalOrParseDataModule(dataContent, slugCamel + 'Data');
```

**Parsing trick:** the file is `export const <name> = { ... };`. Use a small regex/eval helper to extract the object. Don't `eval` — write a JS parser or use:

```js
// Strip "export const X = " prefix and trailing ";", then wrap in parens and eval
// in a sandboxed VM context. Or use acorn/esprima if available.
```

Alternative: use `Bash` to `node -e "import('./${dataPath}').then(m => console.log(JSON.stringify(m.${slugCamel}Data)))"` if the data module is ESM-compatible. (Verify with `package.json#type`.)

**Ponytail:** keep it simple — read the file as text, do regex field extraction for the simple fields only. Don't parse the whole object.

### Step 2 — Compute diff for each simple field

For each whitelist field, compare current value vs computed new value:

```js
const diffs = {};

if (currentTitle !== metadata.title) {
  diffs.title = { current: currentTitle, new: metadata.title };
}
// ... repeat for each whitelist field
```

### Step 3 — Build Edit plan

For each diff, construct a single Edit call:

```js
// Edit pattern for string field:
old: `  title: "${currentTitle}",\n`
new: `  title: "${metadata.title}",\n`

// Edit pattern for array field (replace whole array):
old: `  badges: [\n    ${currentBadgesAsString}\n  ],\n`
new: `  badges: [\n    ${newBadgesAsString}\n  ],\n`
```

**Always use Edit (not Write).** Match whitespace exactly.

### Step 4 — Apply edits

Apply each Edit one at a time. After each, verify the file still parses by reading the last 5 lines.

If a field's current value isn't found in the file (e.g., `overview.description` is hand-edited to a different length), skip the diff and report it as "manual review needed".

### Step 5 — Idempotency check

After all edits, re-read the file. For each whitelist field, verify the value matches `metadata.json`. If not, the edit didn't apply — flag and retry.

Re-run sync on a clean tree: `git diff --stat` must show zero changes after a no-op re-run.

---

## Field-by-field edit patterns

### `title` (string)

```
old: `  title: "<current>",\n`
new: `  title: "<new>",\n`
```

### `shortDescription` (string)

```
old: `  shortDescription: "<current>",\n`
new: `  shortDescription: "<new>",\n`
```

### `github` (string)

```
old: `  github: "<current>",\n`
new: `  github: "<new>",\n`
```

### `liveDemo` (string)

```
old: `  liveDemo: "<current>",\n`
new: `  liveDemo: "<new>",\n`
```

### `badges` (array of objects)

Whole-array replace. Build the new array from `metadata.badges[]` (or skip if absent):

```js
const newBadges = (metadata.badges || []).map(text => ({ icon: inferIcon(text), text }));
const oldBlock = `  badges: ${JSON.stringify(currentBadges, null, 2).split('\n').join('\n  ')},\n`;
const newBlock = `  badges: ${JSON.stringify(newBadges, null, 2).split('\n').join('\n  ')},\n`;
```

Use `replace_all: false` and a unique anchor (the array opening).

### `techStack` (array of objects)

Whole-array replace, same pattern as `badges`.

### `awards` (array of objects)

Whole-array replace. Parse each `metadata.awards[i]` for year/event.

### `performance.pageLoad` (array of objects)

Whole-array replace. Build 3 rows from `metadata.performance.{pageLoadTime, apiResponseTime, bundleSize}`.

### `performance.bundleSize.total` (string)

Single-line replace.

### `performance.lighthouseScores.desktop.performance` (number)

Single-value replace inside the nested object. Use a long enough anchor:

```
old: `    desktop: {\n      performance: <old>, accessibility:`
new: `    desktop: {\n      performance: ${metadata.performance.lighthouseScore ?? 'null'}, accessibility:`
```

### `requirements.os` (array of objects)

Whole-array replace.

### `requirements.browsers` (array of objects)

Whole-array replace.

### `requirements.hardware.minimum.ram` (string)

Single-line replace. Anchor:

```
old: `      ram: "<old>",`
new: `      ram: "<new>",`
```

### `requirements.software` (array of objects)

Whole-array replace.

### `screenshots[]` (array of objects) — append-only

**Never overwrite.** Use `07-screenshots-sync.md` to append new entries.

### `relatedProjects[]` (array of strings) — manual

**Skip by default.** Cross-references in `.website/features.md` are ambiguous. Admin manages this list.

If `metadata.relatedProjects` exists (rare), use whole-array replace.

---

## What if the whitelist field is missing from the existing data.js?

Example: `metadata.performance.lighthouseScore` is 95, but the existing data.js has no `performance.lighthouseScores` field (older project).

**Action:** add the field. Use Edit to insert after `performance: {`:

```
old: `  performance: {\n    pageLoad: [`
new: `  performance: {\n    lighthouseScores: { desktop: { performance: 95, accessibility: null, bestPractices: null, seo: null }, mobile: { performance: null, accessibility: null, bestPractices: null, seo: null } },\n    pageLoad: [`
```

If the structure is too divergent, flag for manual review rather than auto-rewriting.

---

## Quality gate

- [ ] Only whitelist fields edited
- [ ] Sacred fields untouched (verify with `git diff -- <dataPath>` — no lines touching sacred field names)
- [ ] No invented Lighthouse / performance numbers
- [ ] `screenshots[]` only appended to (never reordered or removed)
- [ ] Idempotent: re-running produces zero diff
- [ ] Every Edit applied successfully (no Edit failures)

---

## Anti-patterns

- Overwriting `overview.description` from `.website/overview.md` (hand-authored, leave alone)
- Replacing `features[]` with metadata-only version (destroys `whyItMatters`, `howItWorks`, etc.)
- Reordering `screenshots[]` (order matters for render — append only)
- Editing `architecture.services[]` (hand-authored from .website/architecture.md)
- Editing `apiEndpoints[]`, `setupSteps[]`, `knownIssues[]`, `futureEnhancements[]` (all hand-authored)
- Silently fixing typos in hand-authored fields (flag for manual review)
- Skipping the idempotency check after edits
