# Website Specification

> **Portfolio website of Kazim Abbas (fedxd.net)**
> Source of truth: existing React SPA. This document records what the website contains and how it works.
> No redesign, refactoring, or improvements are described here — only what exists.

---

## 1. Top-Level Information

| Field | Value |
| --- | --- |
| Site type | Single Page Application (SPA) — React 19 |
| Site author | Kazim Abbas |
| Live domain (CNAME) | `fedxd.net` |
| Hosting | GitHub Pages (static CDN) |
| Public repository | https://github.com/KazimFedxD/KazimFedxD.github.io |
| Build tool | Create React App (`react-scripts` 5.0.1) |
| Styling | Tailwind CSS 3.4.17 with custom purple theme |
| Animations | Framer Motion 12.23.24 + custom Tailwind keyframes |
| Routing | React Router DOM 7.9.4 (BrowserRouter) |
| Primary language | JavaScript (ES modules, JSX) — no TypeScript files present |
| Theme support | Light + Dark mode via `html.light` / `html.dark` classes |
| Deployment | `npm run deploy` → `gh-pages -d build` |

---

## 2. Site Structure

### 2.1 Routes

| Route | Page Component | Purpose |
| --- | --- | --- |
| `/` | `src/pages/Home.js` | Hero, typing animation, stats, featured achievement, quick links |
| `/about` | `src/pages/About.js` | Bio, interests, values, timeline, GitHub stats, resume download |
| `/skills` | `src/pages/Skills.js` | Categorized skills with proficiency levels and filtering |
| `/projects` | `src/pages/Projects.js` | Searchable/filterable project grid with detail-page links |
| `/projects/:projectName` | `src/pages/ProjectDetail.js` | Tabbed project documentation (overview, features, architecture, API, setup, screenshots, performance, requirements, issues, roadmap) |
| `/achievements` | `src/pages/Achievements.js` | NASA Space Apps 2nd place, certifications, stats |
| `/experience` | `src/pages/Experience.js` | KayzBlog management + Disutils lead-developer timeline |
| `/education` | `src/pages/Education.js` | Formal schooling (Fatimiyah Boys College, Happy Home HS) and self-taught topics |
| `/contact` | `src/pages/Contact.js` | EmailJS contact form, contact info, social links |

### 2.2 Dynamic route params

`/projects/:projectName` is the only dynamic route. The page maps the URL param to one of the project data modules via this map (inside `src/pages/ProjectDetail.js`):

| URL param | Data file |
| --- | --- |
| `Full-Stack-Template` | `src/data/fullstack-template-data.js` |
| `FedxD-Data-Container-FxDC` | `src/data/fedxd-data-container-data.js` |
| `FxPy` | `src/data/fxpy-data.js` |
| `FeXoBot` | `src/data/fexobot-data.js` |
| `FxQuest` | `src/data/fxquest-data.js` |
| `Portfolio-Website` | `src/data/portfolio-website-data.js` |
| `FinCore` | `src/data/fincore-data.js` |
| `TeachBack` | `src/data/teachback-data.js` |

### 2.3 Navigation

Implemented by the `Navigation` component in `src/App.js`. The component:

- Renders 8 desktop links (Home, About, Skills, Projects, Achievements, Experience, Education, Contact).
- Renders the same 8 links inside a mobile menu toggled with `lucide-react`'s `Menu` / `X` icons.
- Highlights the active link using a `motion.div` with `layoutId="activeNav"`.
- Auto-closes the mobile menu on route change via `useLocation()` + `useEffect`.
- Sets a scrolled state (>50px) for translucent backdrop styling.
- Has a brand link to `/` that displays the name "Kazim Abbas" in a gradient.

### 2.4 Top-level Layout (`App.js`)

`App` returns a `Router` containing:

- `<ScrollToTop />` (inline helper) — scrolls to `0,0` on `pathname` change.
- `<ScrollToTopButton />` — fixed-position "scroll to top" button.
- `<ThemeToggle />` — fixed-position dark/light switcher.
- `<Navigation />` — fixed top nav.
- `<HireMeCTA />` — fixed bottom-right "Hire Me" button.
- `<AnimatePresence mode="wait">` wrapping the 8 `<Route>` elements.

---

## 3. Pages (per page)

### 3.1 Home (`src/pages/Home.js`)

| Field | Value |
| --- | --- |
| Route | `/` |
| Purpose | Personal landing page introducing Kazim Abbas with hero animation, typing effect, stats, featured project, and quick-link tiles. |
| Components used | `ParticlesBackground`, `AnimatedSection`, `AnimatedGradientText`, `Tilt` (from `react-parallax-tilt`), `TypeAnimation` (from `react-type-animation`), `motion` (Framer Motion), `projectsData` (data). |
| Data sources | `src/data/projectsData.js` (filters to badge containing "NASA"). |
| Hard-coded hero content | Greeting: "👋 Hello, I'm". Name: "Kazim Abbas". Typing animation cycles: `Software Developer 💻`, `Backend Engineer 🚀`, `Python Specialist 🐍`, `Django Expert ⚡`, `NASA Challenge Winner 🏆`, `Problem Solver 🧩` (each held 2000ms). Hero summary mentions NASA Space Apps 2025 Winner, Python, Django, Discord bots, e-commerce. Stats: `11+ Projects`, `5+ Tech Stacks`, `2+ Years Exp`, `NASA Winner`. |
| Social links (Home) | GitHub `https://github.com/KazimFedxD`, LinkedIn `https://www.linkedin.com/in/kazim-abbas-60b1b5257/`, Email `mailto:kazimfedxd@gmail.com`. |
| Profile image | `/dp.jpg` (in `public/`). |
| Resume download | `/resume.pdf` (in `public/`, links to `Kazim Abbas CV.pdf`). |
| Quick links | `/projects` (Projects), `/skills` (Skills), `/experience` (Experience). |
| Mouse-tracking | Container ref tracks pointer on desktop; mobile uses static transform. |

### 3.2 About (`src/pages/About.js`)

| Field | Value |
| --- | --- |
| Route | `/about` |
| Purpose | Bio card ("Who I Am"), "What I Do" card, Core Values, My Journey timeline, GitHub stats, resume download. |
| Components used | `Tilt`, `GitHubStats`, `ResumeDownload`, `AnimatedSection`, `AnimatedGradientText`. |
| Data sources | None external — all copy is hard-coded inside the component. |
| Hard-coded content | Bio text: "I'm a passionate Software Developer from Karachi, Pakistan, specializing in backend engineering and full-stack development. Currently in 12th grade at Fatimiyah Boys College studying Computer Science..." Mentions: 2nd place at NASA Space Apps Challenge 2025 with Skyntel, managing KayzBlog with 40,000+ views, Discord bots in 10+ servers, self-taught developer, Python/Django focus. Open to remote backend development opportunities. |
| Interests | Backend Development, Automation, Hardware-Software Integration, Innovation. |
| Values | Problem Solver, Passionate Learner, Professional, Team Player. |
| Timeline | 2025 — NASA Space Apps Challenge Winner; 2024 — Started KayzBlog Management; 2023 — Began Self-Taught Developer Journey. |

### 3.3 Skills (`src/pages/Skills.js`)

| Field | Value |
| --- | --- |
| Route | `/skills` |
| Purpose | Categorized skills with proficiency percentages and category filter buttons. |
| Components used | `AnimatedSection`, `AnimatedGradientText`, `Tilt`, `motion`, `AnimatePresence`. |
| Data sources | None external — `skillCategories` array is hard-coded in the component. |
| Categories & skills (with proficiency) | **Languages**: Python 95, JavaScript 85, C++ 75, C 75, SQL 85, Bash 80. **Frameworks & Libraries**: Django 95, Django REST Framework 90, React 85, Framer Motion 80, Tailwind CSS 90. **Databases**: PostgreSQL 90, SQLite 85, Redis 75, MinIO 70. **DevOps & Tools**: Docker 85, Git 90, GitHub 90, Nginx 80, Celery 80, Linux 85. |
| Filters | "All" plus each category title (Languages, Frameworks & Libraries, Databases, DevOps & Tools). |
| Stats grid | 6+ Languages, 10+ Frameworks, 4+ Databases, 15+ Tools. |
| Proficiency legend | 90-100% Expert (green), 80-89% Advanced (blue), 70-79% Proficient (yellow), 60-69% Intermediate (orange). |

### 3.4 Projects (`src/pages/Projects.js`)

| Field | Value |
| --- | --- |
| Route | `/projects` |
| Purpose | Searchable, filterable project grid. Filters by tech, "Featured" (badge presence), or "All". |
| Components used | `TechIcon`, `AnimatedSection`, `AnimatedGradientText`, `Tilt`, `motion`, `AnimatePresence`. |
| Data sources | `getSortedProjects`, `getFeaturedLabel`, `hasProjectDetails` from `src/data/projectsData.js`. |
| Card contents | Icon, optional "Featured" badge, project title, optional badge text (e.g. "🏆 2nd Place - NASA..."), description, up to 6 `TechIcon` chips (+N more), key features list, "View Details" link (only when `hasProjectDetails(project.title)` is true) and "Code" link to GitHub. |
| Project link generation | Detail-page link is `/projects/<title-with-spaces-and-parens-stripped>`. |

### 3.5 ProjectDetail (`src/pages/ProjectDetail.js`)

| Field | Value |
| --- | --- |
| Route | `/projects/:projectName` |
| Purpose | Per-project documentation page with tabbed navigation. |
| Components used | `FeatureCard`, `TechStackTable`, `CodeSnippet`, `PerformanceMetrics`, `KnownIssuesPanel`, `FutureRoadmap`, `ScreenshotGallery`, `ArchitectureDiagram`, `ApiReference`, `CommandReference`, `ProjectBadges`, `RelatedProjects`, `SetupGuide`, `ShowcaseVideo` (all in `src/components/project-detail/`). |
| Tabs (dynamic) | overview, features, architecture, **api** (only when `apiEndpoints` present) **or** **api** renamed to "Commands" (only when `commands` present), setup, screenshots, performance, requirements, issues, future. |
| Behavior | Horizontal tab strip with wheel-scroll-to-horizontal, arrow-key navigation, `useNavigate(-1)` back button, GitHub link from data. |
| Resolves data via | `projectDataMap` (8 entries) → one of the project data files. |

### 3.6 Achievements (`src/pages/Achievements.js`)

| Field | Value |
| --- | --- |
| Route | `/achievements` |
| Purpose | Showcase awards and recognitions, with stat highlights. |
| Components used | `TechIcon`, `AnimatedSection`, `AnimatedGradientText`, `Tilt`, `motion`. |
| Data sources | Hard-coded in component. |
| Hard-coded achievements | One achievement: 2025 — NASA Space Apps Challenge - Karachi — 2nd Place — Global Competition — Skyntel description. Highlights: built full-stack weather app, integrated Groq AI, Celery + Redis, Docker + Nginx, presented to judges. Tech: Django, React, PostgreSQL, Redis, Celery, Docker, Nginx, Groq AI. Link: https://github.com/KazimFedxD/Skyntel. |
| Certifications | "Self-Taught Developer Journey" — Independent Learning — 2023-Present — skills: Python, Django, React, PostgreSQL, Docker, REST APIs. |
| Stats | 2nd NASA Space Apps, 40K+ Blog Views, 10+ Projects, 4K+ Followers. |

### 3.7 Experience (`src/pages/Experience.js`)

| Field | Value |
| --- | --- |
| Route | `/experience` |
| Purpose | Timeline of professional work and projects. |
| Components used | `TechIcon`, `AnimatedSection`, `AnimatedGradientText`, `Tilt`, `motion`. |
| Data sources | Hard-coded in component. |
| Hard-coded experiences | **(1) July 2024 - Present — Manager & Content Creator — KayzBlog — Medical Blog Platform — Karachi, Pakistan.** Responsibilities: 6-8 videos/month, 12-15 articles/month, 4,000+ followers, 40,000+ views, 1,200+ likes, custom admin panels, SEO. Tech: Content Management, SEO, Video Editing, Social Media, Admin Panels. **(2) Nov 2024 - Jan 2025 — Lead Developer — Disutils — Discord Gaming Bot — Remote.** Responsibilities: database-backed user mgmt, async tasks, deployed in 10+ servers, 99%+ uptime, game mechanics. Tech: Python, Discord.py, SQLite, Async Programming, Game Logic, Database Design. |
| Skills Gained section | Management, Development, Growth categories with sub-items. |

### 3.8 Education (`src/pages/Education.js`)

| Field | Value |
| --- | --- |
| Route | `/education` |
| Purpose | Formal education and self-learning path. |
| Components used | `AnimatedSection`, `AnimatedGradientText`, `Tilt`, `motion`. |
| Data sources | Hard-coded in component. |
| Formal education | **(1) Intermediate (11-12), Computer Science — Fatimiyah Boys College — Karachi, Pakistan — 2024-Present — Currently in 12th Grade (current=true).** Courses: Computer Science, Mathematics, Physics, Programming Fundamentals, Data Structures, Web Development. **(2) Matriculation, Computer Science — Happy Home High School (HHS) — Karachi, Pakistan — 2016-2024 — Completed.** Courses: Computer Science, Mathematics, Science, Basic Programming, Computer Fundamentals, English. |
| Self-learning categories | Backend Development, Frontend Development, DevOps & Tools, Computer Science Fundamentals (each with topic list). |
| Philosophy | "Continuous Learning" closing card. |

### 3.9 Contact (`src/pages/Contact.js`)

| Field | Value |
| --- | --- |
| Route | `/contact` |
| Purpose | EmailJS contact form + contact info + social links. |
| Components used | `Toast`, `ToastContainer` (`useToast` hook from `src/components/Toast.js`), `AnimatedSection`, `AnimatedGradientText`, `Tilt`. |
| Data sources | None external — `contactInfo` array hard-coded. |
| Form fields | Name (required), Email (required, validated), Subject (optional), Message (required, 6 rows). |
| EmailJS config | `service_quay1th`, two templates: `template_4fsca3d` (notification to site owner) and `template_i0a3otb` (confirmation to visitor), public key `Si2AYHuddQeZRlp7G`. |
| Status messaging | Toasts via `useToast` plus inline success/error block. Auto-dismiss after 5s. |
| Contact info (cards) | Email `abbaskazim135@gmail.com` (mailto), GitHub `KazimFedxD` (https://github.com/KazimFedxD), LinkedIn `Kazim Abbas` (https://www.linkedin.com/in/kazim-abbas-60b1b5257/). |
| Tags shown | "Backend Development", "Django", "Python", "APIs", "Automation". |
| Response time statement | "I typically respond within 24-48 hours." |

---

## 4. Components Inventory

### 4.1 Top-level / shared components (in `src/components/`)

| Name | File | Purpose | Props | Pages using it |
| --- | --- | --- | --- | --- |
| `AnimatedSection` | `AnimatedSection.js` | Wraps content in a Framer Motion `motion.div` triggered by `react-intersection-observer`. | `children`, `className`, `delay`, `direction` (`up`/`down`/`left`/`right`). | All pages. |
| `AnimatedGradientText` | `AnimatedGradientText.js` | Renders gradient text with hover-driven animation. | `children`, `gradient` (Tailwind classes), `animateOnHover`. | Home, About, Skills, Projects, Achievements, Experience, Education, Contact, ProjectDetail. |
| `ParticlesBackground` | `ParticlesBackground.js` | Animated particles background (uses `react-tsparticles` + `tsparticles-slim`). | (none). | Home. |
| `TechIcon` | `TechIcon.js` | Maps a tech name to a `react-icons/si` Simple Icon plus text. | `tech`, `name`, `size` (`sm`/`md`), `className`. | Skills, Projects, Achievements, Experience. |
| `HireMeCTA` | `HireMeCTA.js` | Floating "Hire Me" button (or inline variant). | `inline` (boolean). | App.js (floating) and is configurable. |
| `ScrollToTop` | `ScrollToTop.js` | Floating "scroll back to top" button. | (none). | App.js. |
| `ThemeToggle` | `ThemeToggle.js` | Light/Dark toggle (persists to `localStorage` key `theme`). | (none). | App.js. |
| `ResumeDownload` | `ResumeDownload.js` | Reusable "Download Resume" CTA linked to `/Kazim Abbas CV.pdf`. | (none, hard-coded). | About. |
| `GitHubStats` | `GitHubStats.js` | Embeds `react-github-calendar` for `KazimFedxD` with custom purple theme + stat cards. | (none). | About. |
| `LoadingSpinner` | `LoadingSpinner.js` | Reusable loading indicator. | (likely size/className). | Available but not used by current pages. |
| `SkeletonLoaders` | `SkeletonLoaders.js` | Skeleton placeholders for loading states. | (likely count/className). | Available but not used by current pages. |
| `Toast` + `useToast` hook | `Toast.js` | Imperative toast notifications with auto-dismiss and types (`success`/`error`/`info`). | `useToast()` returns `{toasts, addToast, removeToast}`. | Contact. |

### 4.2 Architecture diagram components (in `src/components/architecture-diagrams/`)

Each renders a custom architecture diagram component for one project. They are imported by `ArchitectureDiagram.jsx` and selected by project name.

| Name | File |
| --- | --- |
| `FeXoBotArchitectureDiagram.jsx` | Architecture diagram for FeXoBot. |
| `FinCoreArchitectureDiagram.jsx` | Architecture diagram for FinCore. |
| `FullStackArchitectureDiagram.jsx` | Architecture diagram for Full-Stack Template. |
| `FxDCArchitectureDiagram.jsx` | Architecture diagram for FedxD Data Container. |
| `FxPyArchitectureDiagram.jsx` | Architecture diagram for FxPy. |
| `FxQuestArchitectureDiagram.jsx` | Architecture diagram for FxQuest. |
| `PortfolioWebsiteArchitectureDiagram.jsx` | Architecture diagram for the portfolio website itself. |
| `TeachBackArchitectureDiagram.jsx` | Architecture diagram for TeachBack. |

### 4.3 Project detail components (in `src/components/project-detail/`)

All are `.jsx` files. Used inside `ProjectDetail.js` tabs.

| Name | Purpose |
| --- | --- |
| `ApiReference.jsx` | Renders `apiEndpoints` array (method, path, auth, description). |
| `ArchitectureDiagram.jsx` | Picks one of the 8 architecture diagrams by project name. |
| `CodeSnippet.jsx` | Syntax-highlighted code block (uses `react-syntax-highlighter`). |
| `CommandReference.jsx` | Renders Discord command list (`category`, `name`, `description`, `usage`, `permissions`, `location`). |
| `EnvironmentVariables.jsx` | Renders environment variables list. |
| `FeatureCard.jsx` | Renders a feature card with title, icon, description, "Why it matters", "How it works", code snippets. |
| `FutureRoadmap.jsx` | Renders versioned roadmap with themes/features. |
| `ImageCarousel.jsx` | Carousel for image arrays. |
| `KnownIssuesPanel.jsx` | Renders issue cards with severity, status, explanations, code examples. |
| `PerformanceMetrics.jsx` | Renders perf metrics (page load, response times, etc.). |
| `ProjectBadges.jsx` | Renders icon + text badge chips. |
| `RelatedProjects.jsx` | Renders linked related projects (uses `relatedProjects` array). |
| `ScreenshotGallery.jsx` | Renders screenshot grid. |
| `SetupGuide.jsx` | Renders numbered setup steps with commands. |
| `ShowcaseVideo.jsx` | Embeds a YouTube showcase video (`showcaseVideo` from data). |
| `TechStackTable.jsx` | Renders tech stack table. |

---

## 5. Data Inventory

### 5.1 Central data files in `src/data/`

All files export JavaScript objects / arrays. Below documents each file with its export names, top-level structure, and consumers.

#### 5.1.1 `src/data/projectsData.js`

- **Exports:** `projectsData` (array), `getSortedProjects` (function), `getTotalProjects` (function), `getFeaturedLabel` (function), `projectsWithDetails` (array), `hasProjectDetails` (function).
- **Records (12):**
  1. **TeachBack** (order 1) — badge: "🏆 Best Use Of AI - AI Preneur '26". Tech: React 19, Django 5.2, Django Channels, WebSockets, PostgreSQL, Redis, Deepgram, Groq, ElevenLabs. GitHub: https://github.com/KazimFedxD/TeachBack
  2. **Skyntel** (order 2) — badge: "🏆 2nd Place - NASA Space Apps Challenge 2025". Tech: Django REST Framework, Celery, PostgreSQL, Redis, Docker, Nginx, Groq AI. GitHub: https://github.com/KazimFedxD/Skyntel
  3. **FinCore** (order 6) — badge: "🚧 In Development". Tech: Django 5.2, React 19, PostgreSQL, Redis, Celery, Docker, Tailwind CSS. GitHub: https://github.com/KazimFedxD/FinCore
  4. **FedxD Data Container (FxDC)** (order 3). Tech: Python, Lexer, Parser, Custom Object System, Decorators. GitHub: https://github.com/KazimFedxD/FedxD-Data-Container
  5. **FxPy** (order 4). Tech: Python, Lexer, Parser, Interpreter, AST. GitHub: https://github.com/KazimFedxD/FxPy
  6. **FeXoBot** (order 7). Tech: Python 3.12, Discord.py 2.0, SQLite, Celery, Multiple APIs. GitHub: https://github.com/KazimFedxD/FeXoBot
  7. **FxQuest** (order 8). Tech: Python 3.12, Discord.py 2.0, SQLite, PyPokerEngine, Discord UI. GitHub: https://github.com/KazimFedxD/FxQuest
  8. **Portfolio Website** (order -2 = second last) — badge: "🎨 This Website". Tech: React 19, Tailwind CSS, Framer Motion, EmailJS, React Router, GitHub Pages. GitHub: https://github.com/KazimFedxD/KazimFedxD.github.io
  9. **Full-Stack Template** (order 5). Tech: Django 5.2, React 19, PostgreSQL, Redis, Nginx, Docker, Celery. GitHub: https://github.com/KazimFedxD/FullStack-Template
  10. **FedxD-PiPy** (order -1 = last). Tech: Python, openpyxl, discord.py, pygame. GitHub: https://github.com/KazimFedxD/FedxD-pypackage
  11. **FxChange** (order 9). Tech: Django, SQLite, JavaScript, External APIs, Email Verification. GitHub: https://github.com/KazimFedxD
  12. **Webstore** (order 10). Tech: Django, SQLite, JavaScript, Admin Panels, Email Verification. GitHub: https://github.com/KazimFedxD
- **Ordering rule:** positive numbers = position from start; negative numbers count from end (-1 = last, -2 = second last). `getSortedProjects()` normalizes and sorts ascending.
- **`projectsWithDetails` (8):** "Full-Stack Template", "FedxD Data Container (FxDC)", "FxPy", "FeXoBot", "FxQuest", "Portfolio Website", "FinCore", "TeachBack". `hasProjectDetails(title)` returns boolean.
- **Consumed by:** `src/pages/Home.js` (filters by NASA badge), `src/pages/Projects.js` (grid, sort, filter, hasProjectDetails), `src/data/projectsData.js` (internally).

#### 5.1.2 `src/data/portfolio-website-data.js`

- **Export:** `portfolioWebsiteData` (object).
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `Portfolio-Website`.
- **Top-level fields:** `title`, `shortDescription`, `github`, `liveDemo` (`https://fedxd.net`), `badges` (4), `techStack` (11), `overview` (object with `description`, `problemIntro`, `problemStatement[]`, `howWeSolve[]`, `targetAudience[]`, `uniqueFeatures[]`, `useCases[]`), `features` (7 features with title, icon, description, whyItMatters, howItWorks[], codeSnippets[]), `architecture` (object with description, services, diagram layers/dataFlow), `screenshots` (1 entry), `performance` (object with key metrics, strengths, bottlenecks, bestUseCases, notRecommendedFor), `requirements` (OS, hardware, software, browsers, external services), `setupSteps` (8 steps), `knownIssues` (5 issues with severity/impact/workaround/codeExample), `futureEnhancements` (3 versions with features), `relatedProjects` (1 entry: "Full-Stack Web Application Template").

#### 5.1.3 `src/data/teachback-data.js`

- **Export:** `teachbackData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `TeachBack`.
- **Top-level fields:** `title`, `shortDescription`, `github` (https://github.com/KazimFedxD/TeachBack), `liveDemo` (empty), `showcaseVideo` (YouTube id `4MdjZQ5lL4E`), `badges` (5), `techStack` (16), `awards` (1: "Best Use Of AI" — AI Preneur '26 — 2026), `overview` (description, problemStatement, howWeSolve, targetAudience, uniqueFeatures, useCases, comparison), `mainFlow` (10-step real-time teaching flow), `features` (8 features: voice-first, AI student, WebSocket, multi-dim evaluation, TTS, JWT auth, session management, email notifications), `architecture` (7 Docker services: PostgreSQL, Redis, Django+Channels, React+Vite, Celery Worker, Celery Beat, Nginx), `apiEndpoints` (11 endpoints across Authentication, Sessions, WebSocket), `setupSteps` (6 steps), `screenshots` (7 entries), `performance` (page load, API times, WebSocket latency, lighthouse, bundle size), `requirements` (OS, hardware, software, browsers, external services), `knownIssues` (4), `futureEnhancements` (3 versions), `relatedProjects` (2: "Full-Stack Template", "FinCore").

#### 5.1.4 `src/data/fincore-data.js`

- **Export:** `fincoreData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `FinCore`.
- **Top-level fields:** `title` ("FinCore - Personal Finance & Islamic Wealth Management System"), `shortDescription`, `github` (https://github.com/KazimFedxD/FinCore), `badges` (3), `techStack` (12), `overview` (description, problemStatement, howWeSolve, targetAudience, uniqueFeatures, useCases), `features` (6 features: JWT auth, hierarchical categories, real-time dashboard, income/expense tracking, detailed reporting, responsive UI), `architecture` (7 services: Nginx, React, Django, Celery Worker, Celery Beat, PostgreSQL, Redis), `screenshots` (5), `performance` (keyMetrics, codebaseMetrics, strengths, bottlenecks), `requirements` (OS, hardware, software, browsers), `setupSteps` (8 steps), `knownIssues` (5), `futureEnhancements` (3 versions), `relatedProjects` (1: "Full-Stack Web Application Template").

#### 5.1.5 `src/data/fedxd-data-container-data.js`

- **Export:** `fedxdDataContainerData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `FedxD-Data-Container-FxDC`.
- **Top-level fields:** `title` ("FedxD Data Container (FxDC)"), `shortDescription`, `github` (https://github.com/KazimFedxD/FedxD-Data-Container), `liveDemo` (https://pypi.org/project/fxdc/), `badges` (4), `techStack` (9), `overview` (description, problemStatement, howWeSolve, targetAudience, uniqueFeatures, useCases), `features` (10 features including custom lexer/parser, type-safe serialization, automatic class mapping, direct JSON conversion, pre-built types, config export, indentation syntax, flexible type hinting, verbose names, default values), `architecture` (7 services: Lexer, Parser, Config, FxDCField, Serialization, Deserialization, Default Classes), `setupSteps` (10 steps), `screenshots` (4), `performance` (parse/serialize, round-trip, JSON comparison, large file handling), `requirements` (OS, hardware, software, no browsers), `knownIssues` (2: No streaming parser, circular references), `futureEnhancements` (3 versions), `relatedProjects` (1: "FxPy").

#### 5.1.6 `src/data/fxpy-data.js`

- **Export:** `fxpyData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `FxPy`.
- **Top-level fields:** `title` ("FxPy - Custom Programming Language"), `shortDescription`, `github` (https://github.com/KazimFedxD/FxPy), `badges` (4), `techStack` (6: Python 3.11+, Custom Lexer 305 lines, Recursive Descent Parser 1,407 lines, Tree-Walking Interpreter 1,393 lines, Visitor Pattern, Symbol Tables), `overview`, `features` (10 features: dynamic type system, first-class functions, advanced module system, variadic functions, rich error reporting, interactive REPL, rich data structures, control flow, 25+ built-in functions, operator overloading), `architecture` (7 services: Lexer, Parser, Interpreter, Error Handler, REPL, Runner, String Arrows), `setupSteps` (5), `screenshots` (7), `performance` (10 benchmarks, language comparison, codebase metrics, scalability, optimization opportunities), `requirements` (OS, hardware, software, no browsers), `knownIssues` (4: performance, no stdlib, no module caching, limited stack traces), `futureEnhancements` (4 versions: 1.1, 1.2, 2.0, 3.0), `relatedProjects` (1: "FedxD Data Container").

#### 5.1.7 `src/data/fexobot-data.js`

- **Export:** `fexobotData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `FeXoBot`.
- **Top-level fields:** `title` ("FeXoBot - Feature-Rich Discord Bot"), `shortDescription`, `github` (https://github.com/KazimFedxD/FeXoBot), `badges` (5), `techStack` (8: Python 3.12, Discord.py 2.0+, SQLite 3, GPT-4 Free g4f, Easy-PIL, Asyncio, aiohttp, Translators), `overview`, `features` (20 features covering moderation, games, AI integration, API integrations, leveling, tickets, calculator, polls, embeds, giveaways, reaction roles, translation, welcome system, logging, currency converter, security tools, NASA, AFK, code execution, fun), `architecture` (8 services: Main Bot Core, Command Cogs, Handler Cogs, SQLite, View System, Image Generation, AI Integration, External API Layer), `commands` (100+ commands across Moderator (20+), Games (4), Utility (40+), Fun (15+), Context Menu (6) categories), `setupSteps` (6), `screenshots` (10), `performance` (key metrics, codebase metrics, strengths, bottlenecks), `requirements` (OS, hardware, software, no browsers), `knownIssues` (3), `futureEnhancements` (3 versions: 2.0, 2.1, 3.0), `relatedProjects` (1: "FxQuest").

#### 5.1.8 `src/data/fxquest-data.js`

- **Export:** `fxquestData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `FxQuest`.
- **Top-level fields:** `title` ("FxQuest - Advanced Discord Gaming & Leveling Bot"), `shortDescription`, `github` (https://github.com/KazimFedxD/FxQuest), `badges` (4), `techStack` (9: Python 3.12+, Discord.py 2.0+, SQLite 3, asyncsqlite3, PyPokerEngine, Easy-PIL, Asyncio, Python-dotenv, Akinator.py), `overview`, `features` (12 features including multi-player games, economy, XP leveling, Minecraft mining, custom DB layer, automation, giveaways, chat games, transactions, profile stats, achievement system, anti-cheat), `architecture` (modular cog-based with custom DB layer, 7 services), `commands` (8+ games: UNO, Poker, Blackjack, Hangman, Tic-Tac-Toe, Bluff, Rock-Paper-Scissors, Chat Games), `setupSteps`, `screenshots`, `performance`, `requirements`, `knownIssues`, `futureEnhancements`, `relatedProjects`.

#### 5.1.9 `src/data/fullstack-template-data.js`

- **Export:** `fullStackTemplateData`.
- **Used by:** `src/pages/ProjectDetail.js` when projectName === `Full-Stack-Template`.
- **Top-level fields:** `title` ("Full-Stack Web Application Template"), `shortDescription`, `github` (https://github.com/KazimFedxD/FullStack-Template), `badges` (3), `techStack` (11: React 19, Django 5.2, DRF, PostgreSQL 16, Redis 7, Celery, Docker, Nginx, JWT, Tailwind CSS, Framer Motion), `overview`, `features` (11 features: JWT auth, email verification, glassmorphism UI, Docker containerization, Celery tasks, persistent auth, email system, data encryption, centralized config, Nginx, custom user model), `screenshots` (11), `performance` (container startup, API response times, frontend metrics, bundle size), `requirements` (OS, hardware, software, browsers), `architecture` (7 services: PostgreSQL, Redis, Django, React, Celery Worker, Celery Beat, Nginx), `knownIssues`, `futureEnhancements`, `relatedProjects`.

### 5.2 `src/App.js` and inline data

- `navLinks` array of 8 entries: `{name, path}`.
- `socialLinks` (Home): 3 entries (GitHub, LinkedIn, Email).
- `stats` (Home): 4 entries (11+ Projects, 5+ Tech Stacks, 2+ Years Exp, NASA Winner).
- `interests` (About): 4 entries.
- `values` (About): 4 entries.
- `timeline` (About): 3 entries (2025, 2024, 2023).
- `contactInfo` (Contact): 3 entries.
- `skillCategories` (Skills): 4 categories, 21 total skills.
- `experiences` (Experience): 2 entries.
- `education` (Education): 2 entries.
- `selfLearning` (Education): 4 categories.
- `achievements` (Achievements): 1 entry.
- `certifications` (Achievements): 1 entry.
- `stats` (Achievements): 4 entries.

### 5.3 Public / static files

- `public/index.html` — title "Kazim Abbas - Software Developer", description "Kazim Abbas - Software Developer | Backend Engineer | Tech Enthusiast. Specializing in Python, Django, and modern web technologies.", SPA redirect script for GitHub Pages.
- `public/404.html` — 404 fallback that stores original URL in `sessionStorage` and redirects to `/`.
- `public/CNAME` — domain `fedxd.net`.
- `public/manifest.json` — PWA manifest.
- `public/robots.txt` — `User-agent: * / Allow: / / Sitemap: https://fedxd.net/sitemap.xml`.
- `public/sitemap.xml` — `https://fedxd.net/`.
- `public/dp.jpg` — profile image (also referenced by Home).
- `public/favicon.jpg` — favicon.
- `public/Kazim Abbas CV.pdf` — resume download.
- `public/screenshots/<ProjectName>/<file>.png` — per-project screenshots referenced by `data/*.js` (FxDC, FeXoBot, FxQuest, FxPy, FinCore, TeachBack, Full-Stack-Template, etc.).

### 5.4 Project documentation source folders

These folders are NOT part of the React app — they are author-time content sources referenced (mirrored) inside `src/data/*-data.js`:

- `projects/TeachBack/` (admin_instructions.md, architecture.md, awards.md, environment-variables.md, features.md, future.md, INDEX.md, known-issues.md, media.md, metadata.json, overview.md, performance.md, README.md, requirements.md, setup.md, screenshots/)
- `projects/FeXoBot/` (same structure)
- `projects/FinCore/` (same structure)
- `projects/Full-Stack-Template/` (same structure)
- `projects/FxPy/` (same structure)
- `projects/FxQuest/` (same structure)
- `projects/FedxD-Data-Container-FxDC/` (same structure)

Mirror data at `.website/` for the **Portfolio Website** project itself (admin_instructions.md, architecture.md, awards.md, environment-variables.md, features.md, future.md, INDEX.md, known-issues.md, media.md, metadata.json, overview.md, performance.md, README.md, requirements.md, setup.md, screenshots/README.md).

### 5.5 Implementation docs

- `.implementation-docs/project-detail-pages.md`
- `.implementation-docs/project-structure-update.md`

---

## 6. Assets Inventory

| File path | Usage | Referenced by |
| --- | --- | --- |
| `public/dp.jpg` | Profile photo (avatar with purple ring). | `src/pages/Home.js` (`<img src="/dp.jpg" alt="Kazim Abbas" />`). |
| `public/favicon.jpg` | Favicon. | `public/index.html` (`<link rel="icon">`, `apple-touch-icon`). |
| `public/Kazim Abbas CV.pdf` | Resume PDF download. | `src/components/ResumeDownload.js`; `src/pages/Home.js` (`/resume.pdf`); `src/pages/About.js` (via ResumeDownload). |
| `public/404.html` | SPA 404 fallback. | Static (GitHub Pages serves on missing route). |
| `public/CNAME` | Custom domain. | Static (GitHub Pages). |
| `public/manifest.json` | PWA manifest. | `public/index.html`. |
| `public/robots.txt` | Crawler directives. | Static. |
| `public/sitemap.xml` | Sitemap (single URL). | Static. |
| `public/index.html` | HTML shell with SPA redirect script and SEO meta tags. | Root. |
| `public/screenshots/<ProjectName>/<file>.png` | Per-project screenshots. | `src/data/*-data.js` `screenshots[]` (consumed by `ScreenshotGallery.jsx`). |
| `tailwind.config.js` | Custom purple palette, animations, keyframes. | Build. |
| `postcss.config.js` | PostCSS config. | Build. |
| `package.json` | Dependencies and scripts. | Build. |

### Icons

- `lucide-react` (`0.554.0`) — used widely across pages.
- `react-icons` (`5.5.0`) with `si` (Simple Icons) module — used inside `TechIcon.js` and the projects' `techStack` icons.
- `react-simple-icons` (`1.0.0-beta.5`) — installed but exact usage unclear; SafeIcons appear in `TechIcon.js` (which actually imports from `react-icons/si`).

---

## 7. Functional Features

| Feature | Purpose | Implementation | Dependencies |
| --- | --- | --- | --- |
| SPA routing | Client-side navigation between 8 pages + dynamic project detail. | `BrowserRouter`, `Routes`, `Route` (with `:projectName`), `useLocation`, `useNavigate`, `useParams`, `AnimatePresence mode="wait"`. | `react-router-dom` 7.9.4, `framer-motion`. |
| Scroll to top on route change | Reset scroll on navigation. | `useEffect` listening to `pathname` in inline `ScrollToTop` inside `App.js`. | `react-router-dom`. |
| Scroll to top floating button | Manual scroll-to-top control. | `src/components/ScrollToTop.js`. | None. |
| Theme toggle (dark/light) | Persist user theme preference. | `src/components/ThemeToggle.js` toggles `html.light`/`html.dark` and writes `localStorage.theme`. | `lucide-react`. |
| Animated page transitions | Smooth fade between routes. | `AnimatePresence mode="wait"` wrapping `<Routes>`. | `framer-motion`. |
| 3D tilt on cards | React-parallax-tilt wrapping interactive cards. | `Tilt` from `react-parallax-tilt`. | `react-parallax-tilt`. |
| Particles background | Decorative background on Home. | `src/components/ParticlesBackground.js` (uses `react-tsparticles` + `tsparticles-slim`). | `react-tsparticles`, `tsparticles-slim`. |
| Typing animation (Home) | Animated rotating role text. | `TypeAnimation` from `react-type-animation` with 6 strings held for 2000ms each. | `react-type-animation`. |
| Section reveal on scroll | Animate sections when they enter viewport. | `AnimatedSection` uses `useInView` from `react-intersection-observer` + Framer Motion variants. | `react-intersection-observer`, `framer-motion`. |
| Tech-icon mapping | Visual badges for technology names. | `src/components/TechIcon.js` `techIconMap` (Django, Python, PostgreSQL, SQLite, Redis, Docker, Nginx, Celery, Tailwind, Framer Motion, JavaScript, Discord.py, GitHub Pages, GitHub). Fallback to text-only badge. | `react-icons/si`. |
| Project search/filter | Text search + filter chips (All, Featured, top 8 techs). | `src/pages/Projects.js` filters `getSortedProjects()` by `selectedFilter` and `searchTerm`. | `projectsData.js`. |
| Dynamic project detail (tabbed) | Multi-tab project documentation. | `src/pages/ProjectDetail.js` resolves data via `projectDataMap` and renders 9–10 tabs using the `project-detail` component set. | All `src/data/*-data.js` files + 16 sub-components. |
| Featured project highlight on Home | Show NASA-winning project on home. | `projectsData.filter(p => p.badge && p.badge.includes('NASA')).slice(0,1)`. | `projectsData.js`. |
| GitHub contribution heatmap | Show recent activity. | `src/components/GitHubStats.js` uses `react-github-calendar` for user `KazimFedxD` with custom purple theme + 4 stat cards (Total Contributions, Public Repos, Current Streak, Languages). | `react-github-calendar`. |
| Resume download | Trigger PDF download. | `src/components/ResumeDownload.js` anchors to `/Kazim Abbas CV.pdf`. | Public file. |
| Contact form (EmailJS dual-send) | Send notification to site owner + confirmation to visitor. | `src/pages/Contact.js` uses `emailjs.send` twice (templates `template_4fsca3d` and `template_i0a3otb`) with service `service_quay1th` and public key `Si2AYHuddQeZRlp7G`. Client-side validation, toast feedback, error fallback `abbaskazim135@gmail.com`. | `@emailjs/browser` 4.4.1. |
| Toast notifications | Non-blocking feedback for form. | `useToast` hook from `src/components/Toast.js`. | None. |
| Hire Me floating CTA | Persistent call-to-action. | `src/components/HireMeCTA.js` fixed bottom-right. | None. |
| 404 SPA redirect | Restore intended route on refresh of deep links. | `public/404.html` writes `sessionStorage.redirect = location.href` then meta-refreshes to `/`; `public/index.html` reads it and `history.replaceState`s back. | Static. |
| Mobile menu | Collapsible nav for small screens. | `Navigation` in `App.js` with `lucide-react` Menu/X icons + `AnimatePresence`. | `framer-motion`, `lucide-react`. |
| Mobile responsive layout | Adapt UI to small screens. | Tailwind responsive utilities (`md:`, `lg:`) and 3D tilt disabled when `isMobile`. | `tailwindcss`. |
| Mouse-tracking parallax on Hero name | Cursor-driven transform. | `useEffect` adds mousemove listener on desktop, applies `transform: translate(x, y)` to the H1. | None. |
| Keyboard navigation for project detail tabs | Left/Right arrows switch tabs. | `useEffect` keydown handler in `ProjectDetail.js`. | None. |
| Wheel-scroll for tab strip | Horizontal scroll on mouse wheel. | `handleWheel` in `ProjectDetail.js` translates vertical wheel into horizontal scroll. | None. |
| Lazy page transition animation | Each page remounts via `key={location.pathname}`. | `AnimatePresence mode="wait"` exit animations. | `framer-motion`. |
| Skeleton loaders / spinners | Loading states (available). | `src/components/SkeletonLoaders.js`, `src/components/LoadingSpinner.js` exist but are not currently used by any page. | None. |
| Deployment automation | Build + push to gh-pages. | `npm run deploy` → `gh-pages -d build -r https://github.com/KazimFedxD/KazimFedxD.github.io.git`. `deploy.sh` runs the same flow (in repo root). | `gh-pages` 6.3.0. |

---

## 8. Dependencies Inventory

### 8.1 Runtime dependencies (from `package.json`)

| Package | Version | Why it is present |
| --- | --- | --- |
| `@emailjs/browser` | ^4.4.1 | Contact form email delivery. |
| `framer-motion` | ^12.23.24 | Page transitions, scroll reveals, hover effects, layout animations. |
| `gsap` | ^3.12.5 | Installed but not used by any source file. |
| `lucide-react` | ^0.554.0 | Icon library (Menu, X, Mail, Github, Linkedin, ArrowRight, etc.). |
| `react` | ^19.2.0 | UI library. |
| `react-dom` | ^19.2.0 | React renderer. |
| `react-github-calendar` | ^4.5.11 | GitHub contribution heatmap. |
| `react-icons` | ^5.5.0 | Simple Icons (Si*) for technology logos. |
| `react-intersection-observer` | ^9.13.1 | Detect section visibility for animations. |
| `react-markdown` | ^10.1.0 | Markdown rendering (available; not used directly by current pages). |
| `react-parallax-tilt` | ^1.7.239 | 3D tilt effect on cards. |
| `react-router-dom` | ^7.9.4 | SPA routing. |
| `react-scripts` | ^5.0.1 | Create React App build tool. |
| `react-simple-icons` | ^1.0.0-beta.5 | Simple Icons (note: project uses `react-icons/si` directly in `TechIcon.js`). |
| `react-swipeable` | ^7.0.2 | Swipe gestures (available; use unclear). |
| `react-syntax-highlighter` | ^16.1.0 | Code snippet rendering in `CodeSnippet.jsx`. |
| `react-tsparticles` | ^2.12.2 | Particles background on Home. |
| `react-type-animation` | ^3.2.0 | Typing effect on Home. |
| `simple-icons` | ^15.17.0 | Icon data (used by `react-simple-icons` / `react-icons/si`). |
| `tsparticles` | ^2.12.0 | Particles engine. |
| `tsparticles-slim` | ^2.12.0 | Slim particle bundle. |

### 8.2 Dev dependencies

| Package | Version | Why |
| --- | --- | --- |
| `autoprefixer` | ^10.4.21 | PostCSS plugin for vendor prefixes. |
| `gh-pages` | ^6.3.0 | Deploy `build/` to `gh-pages` branch. |
| `postcss` | ^8.5.6 | CSS processing (required by Tailwind). |
| `tailwindcss` | ^3.4.17 | Utility-first CSS framework with custom purple theme. |

### 8.3 Configuration files

- `tailwind.config.js` — purple color scale 50–950, custom animations (`fade-in`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `glow`, `float`), custom gradients (`gradient-radial`, `gradient-purple`, `gradient-purple-soft`), dark mode class strategy.
- `postcss.config.js` — uses `tailwindcss` and `autoprefixer`.
- `package.json` — see §8.1 and §8.2.

---

## 9. Navigation and Internal Link Map

```
Navigation (App.js)
├── /              → Home
├── /about         → About
├── /skills        → Skills
├── /projects      → Projects
│   └── /projects/:projectName → ProjectDetail (8 possible)
│       ├── /projects/TeachBack
│       ├── /projects/FinCore
│       ├── /projects/Full-Stack-Template
│       ├── /projects/FedxD-Data-Container-FxDC
│       ├── /projects/FxPy
│       ├── /projects/FeXoBot
│       ├── /projects/FxQuest
│       └── /projects/Portfolio-Website
├── /achievements  → Achievements
├── /experience    → Experience
├── /education     → Education
└── /contact       → Contact

HireMeCTA → /contact
Home Quick Links:
  /projects, /skills, /experience
About Resume Download → /Kazim Abbas CV.pdf
Skills CTAs:
  /projects, /contact
Projects cards:
  "View Details" → /projects/:projectName (only when hasProjectDetails)
  "Code" → external GitHub URL
Experience card technologies → rendered with TechIcon
Achievements card → external link https://github.com/KazimFedxD/Skyntel
Contact cards:
  Email → mailto:abbaskazim135@gmail.com
  GitHub → https://github.com/KazimFedxD
  LinkedIn → https://www.linkedin.com/in/kazim-abbas-60b1b5257/
```

---

## 10. SEO / Metadata

| Location | Value |
| --- | --- |
| `public/index.html` `<title>` | "Kazim Abbas - Software Developer" |
| `public/index.html` meta description | "Kazim Abbas - Software Developer \| Backend Engineer \| Tech Enthusiast. Specializing in Python, Django, and modern web technologies." |
| `public/index.html` theme-color | `#a855f7` |
| Hidden SEO section | "Kazim Abbas — Software Developer, Backend Engineer, Django Specialist." |
| `public/manifest.json` | PWA manifest (image references `favicon.jpg`). |
| `public/robots.txt` | `User-agent: *`, `Allow: /`, `Sitemap: https://fedxd.net/sitemap.xml` |
| `public/sitemap.xml` | Single URL `https://fedxd.net/` |

No Open Graph / Twitter Card tags are present in the served HTML.

---

## 11. Custom Theme / Design System (configuration only)

- **Color:** custom purple palette (50–950) plus standard slate/gray/yellow/green/red/orange utilities.
- **Background:** body uses a moving linear gradient between `#1e1b4b`, `#581c87`, `#6b21a8`, `#581c87`, `#1e1b4b` (15s shift). In light mode it switches to `from-slate-50 via-purple-50 to-slate-100` (no animation).
- **Custom keyframes:** `gradientShift`, `gradient`, `float`, `glow`, `slide-in-left/right`, `scale-in`, `fade-in-up`, `bounce-in`, `rotate-360`, `pulse-glow`.
- **Component classes:** `gradient-text`, `card-gradient`, `hover-glow`, `glass`, `card-3d`, `gradient-animation`, `particles-container`, `scrollbar-hide`, `scrollbar-thin`.
- **Utility classes:** `animate-float`, `animate-glow`, `animate-slide-in-left/right`, `animate-scale-in`, `animate-fade-in-up`, `animate-bounce-in`, `animate-rotate`, `animate-pulse-glow`, `perspective-1000`, `perspective-2000`, `transform-3d`.
- **Mobile performance overrides:** backdrop-blur and hover scale effects are disabled at `max-width: 768px`.

---

## 12. Per-Project Screenshot Manifest

| Project | Screenshots folder | Files (per data `screenshots[]`) |
| --- | --- | --- |
| TeachBack | `public/screenshots/TeachBack/` | homepage.png, session-active.png, session-ai-question.png, evaluation.png, sessions-list.png, mobile-homepage.png, mobile-session.png |
| FinCore | `public/screenshots/FinCore/` | dashboard.png, categories.png, incomes.png, expenses.png, reports.png |
| Full-Stack Template | `public/screenshots/Full-Stack-Template/` (or `FullStack-Template/`) | homepage.png, login.png, register.png, verification.png, dashboard.png, admin-panel.png, mobile-homepage.jpeg, mobile-login.jpeg, mobile-register.jpeg, mobile-dashboard.jpeg, mobile-navbar.jpeg |
| FxDC | `public/screenshots/FxDC/` (referenced) | terminal-usage.png, vscode-fxdc-file.png, error-message.png, class-registration.png |
| FxPy | `public/screenshots/FxPy/` (referenced) | repl-startup.png, repl-interactive.png, repl-error.png, script-execution.png, import.png, from-import.png, code-functions.png |
| FeXoBot | `public/screenshots/FeXoBot/` | setup-wizard.png, help-commands.png, help-wizard.png, level-card-example.png, ticket-interface.png, hangman.png, calculator-interface.png, poll-system.png, giveaway-system.png, nasa-apod.png |
| FxQuest | `public/screenshots/FxQuest/` (referenced) | blackjack.png, hangman.png, rps.png, profile-dashboard.png |
| Portfolio Website | n/a (the website itself) | `meta-project` placeholder entry only. |

---

## 13. EmailJS Identifiers (Recorded As-Is)

> These credentials are part of the existing implementation and were found in source. They are recorded here for completeness, not to be reused.

| Item | Value |
| --- | --- |
| Service ID | `service_quay1th` |
| Notification template ID | `template_4fsca3d` |
| Confirmation template ID | `template_i0a3otb` |
| Public key | `Si2AYHuddQeZRlp7G` |
| Fallback contact email | `abbaskazim135@gmail.com` |

---

## 14. Open Items / Observations

- `src/components/LoadingSpinner.js` and `src/components/SkeletonLoaders.js` exist but no page currently imports them.
- `react-markdown` and `react-swipeable` are installed but not used by any current source file.
- `react-simple-icons` is listed in `package.json`; `TechIcon.js` actually imports from `react-icons/si` (which depends on `simple-icons`).
- `gsap` is installed but not imported in any source file.
- Two project-data exports are used in the central `projectsData.js` but lack dedicated detail pages (and therefore a data file): `Skyntel`, `FxChange`, `Webstore`, `FedxD-PiPy`. The `Portfolio Website` is in `portfolio-website-data.js` (with detail page).
- The `ProjectDetail.js` route map includes a key `FedxD-Data-Container-FxDC` while the `TechIcon` and other paths use `FedxD-Data-Container` — both spellings exist and are preserved as-is.
- `react-intersection-observer` is used in `AnimatedSection.js`.
- `framer-motion` is used throughout for animations, transitions, hover effects.
- `lucide-react` icons are imported per-page as needed (e.g. `Github`, `Linkedin`, `Mail`, `ArrowRight`, `Code2`, `Sparkles`, `Rocket`, `Award`, `Star` on Home).
- The website is built on JavaScript only — no `.ts` or `.tsx` files exist anywhere in the source tree.

---

*End of specification.*
