# 03-metadata-to-datajs.md — Map `.website/` → `*-data.js` (NEW Projects)

## File purpose

The mapping function for NEW projects (no `*-data.js` exists yet). Reads `projects/<Name>/.website/metadata.json` plus the markdown files, and writes a complete `*-data.js` with rich TODO placeholders for hand-authored fields.

This reference is loaded ONLY for NEW projects. EXISTING projects use `04-sync-datajs-fields.md` instead.

---

## Inputs

1. `projects/<Name>/.website/metadata.json` — JSON, see `references/01-targets.md` schema
2. `projects/<Name>/.website/overview.md` — markdown, first paragraph used for `overview.description`
3. `projects/<Name>/.website/features.md` — markdown, bullet list used for `features[]` skeleton
4. `projects/<Name>/.website/architecture.md` — markdown (optional)
5. `projects/<Name>/.website/performance.md` — markdown (optional)
6. `projects/<Name>/.website/requirements.md` — markdown (optional)

If a file is missing, that field gets an empty default with `// TODO:` comment.

---

## Algorithm

### Step 1 — Derive filename + export name

```
slug = <Name>                                  # directory name verbatim
slugKebab = <Name>                             # already kebab if "FeXoBot"→"fexobot"? NO: keep dir name as-is
slugCamel = toCamel(slug)                      # FeXoBot → fexobot
                                                  # Full-Stack-Template → fullStackTemplate
```

**Naming rule:** filenames keep the directory casing. E.g. `FeXoBot` → `fexobot-data.js` (lowercase). `FullStack-Template` → `fullstack-template-data.js`. `TeachBack` → `teachback-data.js`.

```
filename = `${slugKebab.toLowerCase()}-data.js`
exportName = `${toCamel(slug)}-Data`
```

Examples:
- `FeXoBot/` → `fexobot-data.js`, `export const fexobotData`
- `FullStack-Template/` → `fullstack-template-data.js`, `export const fullStackTemplateData`
- `FedxD-Data-Container-FxDC/` → `fedxd-data-container-data.js`, `export const fedxdDataContainerData`

**Note on `toCamel`:** split on `-` and other non-alphanumeric boundaries, lowercase the first segment, capitalize the rest.

---

### Step 2 — Read metadata.json

```js
const metadata = JSON.parse(Read(`projects/${slug}/.website/metadata.json`));
```

Required fields (from `project-documentor` schema): `title`, `shortDescription`, `techStack`, `features`, `github`, `liveDemo`, `performance`, `awards`, `requirements`.

Optional: `badges`, `developmentStatus`.

---

### Step 3 — Read markdown files (extract minimum needed)

**overview.description** — first non-heading paragraph from `overview.md`:
```js
function firstParagraph(md) {
  const lines = md.split('\n');
  let started = false;
  let buf = [];
  for (const line of lines) {
    if (line.startsWith('#')) continue;
    if (line.trim() === '') {
      if (started) break;
      continue;
    }
    started = true;
    buf.push(line.trim());
  }
  return buf.join(' ').slice(0, 500);  // cap at 500 chars
}
```

**features[] skeleton** — first 6 bullet items from `features.md`:
```js
function firstBullets(md, n = 6) {
  const bullets = md.split('\n').filter(l => /^[-*]\s+/.test(l)).slice(0, n);
  return bullets.map(b => b.replace(/^[-*]\s+/, '').trim());
}
```

Skip the rest — admin fills in `whyItMatters`, `howItWorks`, etc. by hand.

---

### Step 4 — Map metadata fields

Use the table from `02-data-js-shape.md` §C, §D, §E, §F.

```js
const badges = (metadata.badges || []).map(text => ({
  icon: inferIcon(text),  // see §D
  text,
}));

if (metadata.developmentStatus && !badges.some(b => /Development|Production|Alpha|Beta/i.test(b.text))) {
  badges.push({ icon: 'Construction', text: `🚧 ${metadata.developmentStatus}` });
}

const techStack = (metadata.techStack || []).map(s => {
  const m = s.match(/^([^\d]+?)\s*(\d+(?:\.\d+)*)?$/);  // split name + version
  return {
    name: (m && m[1] ? m[1] : s).trim(),
    version: (m && m[2]) || '',
    category: inferCategory(s),  // see §E
  };
});

const awards = (metadata.awards || []).map(text => {
  const yearMatch = text.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '';
  // Heuristic: text before " - " is title, after is event
  const parts = text.split(/\s+-\s+/);
  return {
    title: parts[0] || text,
    event: parts[1] || '',
    year,
    description: text,
  };
});
```

---

### Step 5 — Map performance (default to teachback A1 shape)

```js
const performance = {
  pageLoad: [
    { metric: 'Page Load Time',   target: metadata.performance?.pageLoadTime   || '[unmeasured]', actual: '' },
    { metric: 'API Response Time', target: metadata.performance?.apiResponseTime || '[unmeasured]', actual: '' },
    { metric: 'Bundle Size',       target: metadata.performance?.bundleSize     || '[unmeasured]', actual: '' },
  ],
  apiResponseTimes: [],
  webSocketLatency: [],
  lighthouseScores: {
    desktop: { performance: metadata.performance?.lighthouseScore ?? null, accessibility: null, bestPractices: null, seo: null },
    mobile:  { performance: null, accessibility: null, bestPractices: null, seo: null },
  },
  bundleSize: { total: metadata.performance?.bundleSize || '[unmeasured]', breakdown: [] },
};
```

If `metadata.performance.lighthouseScore` is a number, use it for `desktop.performance`. Leave others as `null` (never invent).

---

### Step 6 — Map requirements (default to teachback B1 shape)

```js
const requirements = {
  os: (metadata.requirements?.os || []).map(s => {
    const m = s.match(/^([A-Za-z\s]+?)\s*(\d.*)?$/);
    return {
      name: (m && m[1] ? m[1] : s).trim(),
      supported: true,
      notes: m && m[2] ? m[2] : undefined,
    };
  }),
  hardware: {
    minimum: { ram: metadata.requirements?.minRAM || '4GB', cpu: 'Dual-core 2GHz+', disk: '10GB free' },
    recommended: { ram: '8GB', cpu: 'Quad-core 2.5GHz+', disk: '20GB free' },
  },
  software: (metadata.requirements?.dependencies || []).map(s => {
    const m = s.match(/^([A-Za-z\s]+?)\s*(\d.*)?$/);
    return {
      name: (m && m[1] ? m[1] : s).trim(),
      version: (m && m[2]) || 'latest',
      required: true,
      purpose: 'Required dependency',
    };
  }),
  browsers: (metadata.requirements?.browsers || []).map(s => {
    const m = s.match(/^([A-Za-z]+)\s*(\d.*)?$/);
    return {
      name: m && m[1] ? m[1] : s,
      version: (m && m[2]) || 'latest',
      supported: true,
    };
  }),
  externalServices: [],
};
```

---

### Step 7 — Map overview from md

```js
const overview = {
  description: firstParagraph(overviewMd) || metadata.shortDescription,
  problemIntro: '',
  problemStatement: [],
  howWeSolve: [],
  targetAudience: [],
  uniqueFeatures: [],
  useCases: [],
  comparison: { traditional: [], teachback: [] },  // or `projectName` if known
};
```

If `overview.md` doesn't exist, fall back to `metadata.shortDescription` and add `// TODO:` comment.

---

### Step 8 — Map features skeleton

```js
const features = firstBullets(featuresMd, 6).map((bulletText, i) => {
  // Split on em-dash or " — " for title/description
  const parts = bulletText.split(/\s+—\s+|\s+-\s+/);
  const title = parts[0]?.replace(/^[^\w]+/, '').trim() || bulletText.slice(0, 40);
  const description = parts.slice(1).join(' — ').trim() || bulletText;
  return {
    id: i + 1,
    title,
    icon: 'Sparkles',
    description,
    // TODO: hand-author whyItMatters, howItWorks, codeSnippets, ...
  };
});
```

If `features.md` doesn't exist, build from `metadata.features[]` strings instead:
```js
const features = (metadata.features || []).slice(0, 6).map((line, i) => {
  const parts = line.split(/\s+—\s+|\s+-\s+/);
  return {
    id: i + 1,
    title: parts[0]?.replace(/^[^\w]+/, '').trim() || line.slice(0, 40),
    icon: 'Sparkles',
    description: parts.slice(1).join(' — ').trim() || line,
  };
});
```

---

### Step 9 — Assembly + write

Assemble the full object literal (include all sacred-field TODO placeholders from `02-data-js-shape.md` §F), wrap in `export const <exportName> = ...;`, and `Write` to `src/portfolio_data/`.

```js
// src/portfolio_data/${filename}
// Generated by project-sync on <ISO date> from projects/${slug}/.website/
// Sacred fields (overview.* detail, features[].rich, architecture.services,
// apiEndpoints, setupSteps, knownIssues, futureEnhancements) are TODO — admin
// fills in by hand from .website/*.md files.

export const ${exportName} = {
  title: ${JSON.stringify(metadata.title)},
  shortDescription: ${JSON.stringify(metadata.shortDescription)},
  github: ${JSON.stringify(metadata.github || '')},
  liveDemo: ${JSON.stringify(metadata.liveDemo || '')},

  badges: ${JSON.stringify(badges, null, 2)},
  techStack: ${JSON.stringify(techStack, null, 2)},
  awards: ${JSON.stringify(awards, null, 2)},

  overview: ${JSON.stringify(overview, null, 2)},
  // TODO: hand-author overview.problemIntro, problemStatement, howWeSolve,
  //       targetAudience, uniqueFeatures, useCases, comparison from .website/overview.md

  mainFlow: { title: '', subtitle: '', description: '', oneLiner: '', steps: [], corePrinciples: [] },
  // TODO: hand-author from .website/overview.md "How It Works" section

  features: ${JSON.stringify(features, null, 2)},
  // TODO: hand-author features[].whyItMatters, howItWorks, codeSnippets from .website/features.md

  architecture: {
    description: '',  // TODO: extract from .website/architecture.md first paragraph
    servicesTitle: 'Services',
    servicesIntro: '',
    diagram: { title: '', description: '', layers: [] },
    services: [],
  },
  // TODO: hand-author architecture.diagram and architecture.services from .website/architecture.md

  apiEndpoints: [],    // TODO: hand-author from backend code or .website/architecture.md
  setupSteps: [],      // TODO: hand-author from .website/setup.md
  screenshots: [],     // populated by project-sync via 07-screenshots-sync.md
  performance: ${JSON.stringify(performance, null, 2)},
  requirements: ${JSON.stringify(requirements, null, 2)},

  knownIssues: [],          // TODO: hand-author from .website/known-issues.md
  futureEnhancements: [],   // TODO: hand-author from .website/future.md
  relatedProjects: [],      // TODO: hand-curate from cross-references
};
```

**Sanity check before writing:**
- `JSON.stringify` round-trip succeeds (valid JS)
- All required fields present (per `02-data-js-shape.md` §G)
- No invented Lighthouse numbers

---

### Step 10 — Run cross-file consistency

After Write, immediately update T2–T7 per `05-meta-files.md`. Then add `EMPTY_STATE_SLUGS` check per `06-empty-state.md` (should NOT be added if data.js was just created).

---

## Quality gate

- [ ] File written to `src/portfolio_data/`
- [ ] Named export matches `<slugCamel>Data`
- [ ] Top-level fields all present
- [ ] No invented Lighthouse / performance numbers
- [ ] Sacred fields have `// TODO:` comments
- [ ] `screenshots[]` is empty array (will be filled by 07)
- [ ] Cross-file updates (T2–T7) all done
- [ ] `git diff` shows expected changes only

---

## Anti-patterns

- Generating rich `features[].{whyItMatters,howItWorks,codeSnippets}` from md text (extraction too fragile; let admin fill in)
- Inventing `lighthouseScore` when `null` would be honest
- Adding slug prefix to `screenshots[].filename` (bare names only)
- Using title-form keys in `SCREENSHOT_FOLDER` (use slug)
- Writing sacred-field TODO without the `// TODO:` comment (admin won't know to fill)
- Skipping the camelCase export rename (the registry import will silently fail)
