# 02-data-js-shape.md — `*-data.js` Schema Reference

## File purpose

Authoritative reference for the shape of `src/portfolio_data/<slug>-data.js`. Two variants exist: **teachback** (richer) and **fincore** (more structured performance). All other data files follow one of these two patterns.

---

## Top-level shape

```js
export const <slugCamel>Data = {
  title: string,                    // "TeachBack"
  shortDescription: string,         // one-liner
  github: string,                   // URL
  liveDemo: string,                 // "" or URL

  showcaseVideo: {                  // optional — present in teachback only
    url: string,
    title: string,
    description: string,
    duration: string,               // "5:30"
  },

  badges: [{                        // string[] in metadata.json → object[]
    icon: string,                   // lucide-react name: "Trophy", "Construction", etc.
    text: string,
  }],

  techStack: [{                     // string[] in metadata.json → object[]
    name: string,                   // "React"
    version: string,                // "19"
    category: string,               // "Frontend" | "Backend" | "Database" | "Cache" | "Task Queue" | "Scheduler" | "Real-Time" | "DevOps" | "Proxy" | "Security" | "Styling" | "Animation" | "External Service"
  }],

  awards: [{                        // string[] in metadata.json → object[]
    title: string,                  // "Best Use Of AI"
    event: string,                  // "AI Preneur '26"
    year: string,                   // "2026"
    description: string,            // longer prose
  }],

  overview: {
    description: string,            // first paragraph of .website/overview.md
    problemIntro: string,           // optional
    problemStatement: [string, ...],
    howWeSolve: [{ problem: string, solution: string, benefit: string }],
    targetAudience: [string, ...],
    uniqueFeatures: [{ icon: string, title: string, points: [string, ...] }],
    useCases: [string, ...],
    comparison: { traditional: [string, ...], teachback: [string, ...] },
  },

  mainFlow: {                       // optional — teachback only
    title: string,
    subtitle: string,
    description: string,
    oneLiner: string,
    steps: [{ step: number, action: string, icon: string, description: string }],
    corePrinciples: [string, ...],
  },

  features: [{                      // rich shape, hand-authored from .website/features.md
    id: number,                     // 1..N
    title: string,
    icon: string,                   // lucide-react name
    description: string,
    whyItMatters: string,
    howItWorks: [string, ...],      // optional bullet list
    codeSnippets: [{                // optional
      title: string,
      language: string,             // "javascript" | "python" | "json"
      code: string,
    }],
    // plus optional shape-specific fields per project
    supportedLanguages: [string, ...],
    questionTypes: [{ type: string, example: string }],
    evaluationDimensions: [{ dimension: string, description: string }],
    securityFeatures: [string, ...],
  }],

  architecture: {
    description: string,
    servicesTitle: string,
    servicesIntro: string,
    diagram: {                      // ASCII diagrams in fenced code blocks
      title: string,
      description: string,
      layers: [{ name: string, components: [{ name: string, icon: string, description: string }] }],
    },
    services: [{                    // teachback shape
      name: string,
      port: string,                 // "3000" | "8000" | "N/A"
      description: string,
      purpose: string,
    }],
  },

  apiEndpoints: [{                  // optional — teachback only
    category: string,               // "Authentication" | "Sessions" | "WebSocket"
    method: string,                 // "POST" | "GET" | "WS"
    path: string,                   // "/api/auth/login/"
    auth: boolean,
    description: string,
    fullDescription: string,
  }],

  setupSteps: [{                    // optional — teachback only
    number: number,
    title: string,
    description: string,
    commands: [{ code: string, description: string }],
  }],

  screenshots: [{                   // BARE FILENAMES — renderer prepends /screenshots/<Slug>/
    filename: string,               // "homepage.png" — NOT "/screenshots/TeachBack/homepage.png"
    caption: string,
    category: string,               // "Frontend" | "Mobile" | "Main" | "Features"
    description: string,            // optional in some files
  }],

  performance: { /* see §A below */ },

  requirements: { /* see §B below */ },

  knownIssues: [{                   // optional
    severity: string,               // "critical" | "high" | "medium" | "low"
    title: string,
    description: string,
    impact: string,
    workaround: string,
    status: string,                 // "Open" | "In Progress" | "Resolved" | "Won't Fix"
    detailedExplanation: string,    // optional
    proposedFix: string,            // optional
  }],

  futureEnhancements: [{            // optional
    version: string,                // "2.0"
    timeline: string,               // "Q2 2026"
    theme: string,
    features: [{
      name: string,
      priority: string,             // "high" | "medium" | "low"
      effort: string,               // "8-12 weeks"
      difficulty: string,           // "Hard" | "Medium" | "Easy"
      description: string,
      whyWeNeed: string,            // optional
      howToImplement: [string, ...], // optional
      benefits: [string, ...],      // optional
    }],
  }],

  relatedProjects: [string, ...],   // titles (matching projectsData[].title), NOT slugs
};
```

---

## §A. `performance` — two variants

### A1. teachback variant (richer, structured)

```js
performance: {
  pageLoad: [{ metric: string, target: string, actual: string }],
  apiResponseTimes: [{ endpoint: string, avg: string, p95: string, p99: string }],
  webSocketLatency: [{ event: string, direction: string, latency: string }],
  lighthouseScores: {
    desktop: { performance: number, accessibility: number, bestPractices: number, seo: number },
    mobile:  { performance: number, accessibility: number, bestPractices: number, seo: number },
  },
  bundleSize: { total: string, breakdown: [{ file: string, size: string }] },
}
```

**Use this shape** when generating NEW data.js unless the project has Lighthouse measurements and bundle breakdown available.

### A2. fincore variant (flat, with codebaseMetrics)

```js
performance: {
  overview: { philosophy: string },
  keyMetrics: { [name: string]: string },  // { "Page Load Time": "< 2s", "API Response Time": "< 200ms avg" }
  codebaseMetrics: [{ component: string, value: string, category: string }],
  strengths: [string, ...],
  bottlenecks: [string, ...],
}
```

**Mapping from metadata.json:** flatten `performance.pageLoadTime`, `apiResponseTime`, `bundleSize` into `keyMetrics`. `lighthouseScore` → `overview.philosophy` text or omit.

**Decision rule for NEW projects:** default to A1 (teachback shape). Admin can rewrite to A2 if preferred.

---

## §B. `requirements` — two variants

### B1. teachback variant

```js
requirements: {
  os: [{ name: string, supported: boolean, notes?: string }],
  hardware: {
    minimum: { ram: string, cpu: string, disk: string },
    recommended: { ram: string, cpu: string, disk: string },
  },
  software: [{ name: string, version: string, required: boolean, purpose: string }],
  browsers: [{ name: string, version: string, supported: boolean, notes?: string }],
  externalServices: [{ name: string, purpose: string, freeTier: boolean }],
}
```

### B2. fincore variant

```js
requirements: {
  os: [{ name: string, version?: string, support: string }],  // "✅ Fully Supported"
  hardware: {
    minimum: { ram: string, cpu: string, disk: string, note: string },
    recommended: { ram: string, cpu: string, disk: string, note: string },
  },
  software: [{ name: string, version: string, required: boolean, note: string }],
  browsers: [{ name: string, version: string, status: string }],  // "✅ Recommended"
  externalServices: [{ name: string, purpose: string, freeTier: boolean }],
}
```

**Mapping from metadata.json:** `os: ["Windows 10/11", "macOS 12+"]` → `os: [{name:"Windows", supported:true, notes:"10/11"}, {name:"macOS", supported:true, notes:"12+"}]`. `browsers: ["Chrome 90+"]` → `browsers: [{name:"Chrome", version:"90+", supported:true}]`. `minRAM: "4GB"` → `hardware.minimum.ram: "4GB"`. `dependencies: ["Docker 20.10+"]` → `software: [{name:"Docker", version:"20.10+", required:true, purpose:"Container runtime"}]`.

**Decision rule for NEW projects:** default to B1 (teachback shape).

---

## §C. Field naming rules

- **kebab-case filename → camelCase export.** Split filename on `-`, capitalize each segment except first. `fullstack-template-data.js` → `fullStackTemplateData`.
- **No hardcoded icon imports.** `badges[].icon`, `features[].icon`, `architecture.services[].icon` are strings — they reference `lucide-react` icons by name. The consumer imports icons dynamically. Keep names from this set: Trophy, Mic, Languages, Brain, Construction, Building2, Building, Code2, Sparkles, Star, Rocket, Target, Zap, Server, Database, Award, Mail, Github, Linkedin, GraduationCap, Briefcase.

---

## §D. Badge icon inference (used in mapping)

| text prefix | icon |
|---|---|
| 🏆 | `Trophy` |
| 🥈 / 🥉 | `Award` |
| 🚧 | `Construction` |
| 🎨 | `Sparkles` |
| 🚀 | `Rocket` |
| 🧠 | `Brain` |
| 🎤 | `Mic` |
| 💬 | `MessagesSquare` (or `MessageCircle`) |
| 📊 | `BarChart3` |
| 🔊 | `Volume2` |
| 🔒 | `Lock` |
| ⭐ | `Star` |
| (no emoji, contains "Active" / "Development") | `Construction` |
| (no emoji, contains "Award" / "Winner") | `Trophy` |
| (no emoji, contains "AI" / "Voice") | `Brain` |
| (default) | `Sparkles` |

---

## §E. Tech-stack category inference (used in mapping)

Parse `"<Name> <Version>"` strings. Lookup table:

| name contains | category |
|---|---|
| React, Vue, Svelte, Next, Vite, Tailwind, HTML, CSS, JavaScript, TypeScript | `Frontend` |
| Django, Flask, FastAPI, Express, Node, Python, Ruby, Rails, Java, Spring, Go | `Backend` |
| PostgreSQL, MySQL, SQLite, MongoDB, Redis (also a cache), DynamoDB | `Database` (Redis → `Cache`) |
| Redis, Memcached | `Cache` |
| Celery, BullMQ, Sidekiq, RabbitMQ | `Task Queue` |
| Docker, Nginx, Kubernetes, GitHub Actions, CI/CD | `DevOps` |
| Deepgram, Groq, OpenAI, ElevenLabs, Stripe, SendGrid | `External Service` |
| WebSocket, Socket.IO, Channels | `Real-Time` |
| Framer Motion, GSAP, Three.js | `Animation` |
| (default) | `Styling` if name has "CSS"/"tailwind" else first matching above else `External Service` |

---

## §F. Rich-content TODO placeholders (for NEW projects)

When generating NEW data.js, fields with no source in `.website/` get empty defaults with a `// TODO:` comment so the admin fills them in:

```js
showcaseVideo: null,  // TODO: add showcase video URL from .website/media.md
mainFlow: { title: "", subtitle: "", description: "", oneLiner: "", steps: [], corePrinciples: [] },
  // TODO: hand-author from .website/overview.md "How It Works" section
apiEndpoints: [],  // TODO: hand-author from .website/architecture.md or backend code
setupSteps: [],    // TODO: hand-author from .website/setup.md
knownIssues: [],   // TODO: hand-author from .website/known-issues.md
futureEnhancements: [],  // TODO: hand-author from .website/future.md
architecture: {
  description: "",  // TODO: extract from .website/architecture.md first paragraph
  servicesTitle: "Services",
  servicesIntro: "",
  diagram: { title: "", description: "", layers: [] },  // TODO: extract ASCII diagram from .website/architecture.md
  services: [],  // TODO: extract services table from .website/architecture.md
},
overview: {
  description: "",  // populated by skill from .website/overview.md first paragraph
  problemIntro: "",
  problemStatement: [],
  howWeSolve: [],
  targetAudience: [],
  uniqueFeatures: [],
  useCases: [],
  comparison: { traditional: [], teachback: [] },
},
features: [],  // skeleton generated by skill; rich fields filled by admin
relatedProjects: [],  // TODO: hand-curate from cross-references in .website/features.md
```

---

## §G. Quality gate

For NEW data.js:
- [ ] Top-level fields present: `title`, `shortDescription`, `github`, `liveDemo`, `badges`, `techStack`, `awards`, `overview`, `features`, `architecture`, `screenshots`, `performance`, `requirements`, `relatedProjects`
- [ ] `badges[].icon` is a valid lucide-react name from §C set
- [ ] `techStack[].category` from §E set
- [ ] `overview.description` populated from `.website/overview.md` first paragraph (if exists)
- [ ] `screenshots[]` is empty array (synced later by 07) — bare filenames, no slug prefix
- [ ] `// TODO:` comments on all sacred rich-content fields (§F)
- [ ] Named export uses camelCase from filename
- [ ] No invented Lighthouse numbers (use `null` or omit)

For EXISTING data.js sync (by `04-sync-datajs-fields.md`):
- [ ] Rich-content fields untouched
- [ ] Only simple fields edited
- [ ] `screenshots[]` only appended to (never reorder/remove)
- [ ] `git diff` shows only the expected field changes
