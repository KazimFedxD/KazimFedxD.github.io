# Product

## Register

brand

> **Hybrid note:** Career surfaces (Skills, Education, Experience, Contact) read as **product** — information-first, structured, scannable. Brand surfaces (Home, About, Projects, Project Detail, Achievements) read as **brand** — voice and craft lead. Register is set to `brand` as the default; the surface-by-surface split is captured under Design Principles.

## Users

Four audiences, all of whom must leave with a clear next step:

- **Hiring managers and recruiters** (primary outcome). Scanning for proof-of-skill, relevant stack (Django REST Framework, Python, PostgreSQL, Redis, Celery, Docker), and a low-friction contact path. They decide in 30 seconds whether to read further. They email, open a chat, or save the URL.
- **Senior engineers and peers**. Will actually look at architecture decisions, the NASA Space Apps project writeup, code quality signals, and the Discord bots serving 10+ servers. Outcome: respect, possible collaboration or referral.
- **Hackathon and award judges**. Evaluating the NASA Space Apps Challenge 2025 win (Karachi) and any future competition entries. Outcome: they read the project detail in depth.
- **General curious visitors** landing from GitHub, social, or referral. No specific job in mind. Outcome: a strong, specific impression of taste and craft — "this person is a real engineer" rather than "this is a template".

Kazim is a 12th-grade student from Karachi. The audience spans students his age through senior staff engineers. The site has to read as serious craft to the senior end and as authentic (not try-hard) to the peer end. Generic student-portfolio energy alienates the senior audience; generic senior-portfolio energy alienates the peer audience.

## Product Purpose

Kazim is currently open to remote backend development opportunities in Django REST Framework and Python. The portfolio exists to:

1. **Convert visitors into contacts** — the resume, the contact form, the Hire Me CTA, and the email path are the actual product. Everything else is supporting evidence.
2. **Prove the work is real** — NASA Space Apps 2025 win, 40,000+ views on a managed content platform (KayzBlog), Discord bots deployed across 10+ servers, the project detail pages with real architecture and tech-stack depth. The site is the resume; the resume is the proof.
3. **Establish voice and taste** — a backend developer who ships production work and whose portfolio reads with the same confidence. The site shouldn't sell Kazim; it should let the work sell Kazim.

Success = qualified inbound (email, recruiter outreach, collaboration proposals). Failure = a portfolio that reads as a template, even if the underlying work is strong.

## Brand Personality

**Three words: Confident. Technical. Calm.**

The voice is senior-engineer energy from a 12th-grader. Doesn't shout. Doesn't apologize. Doesn't over-decorate. The work is already hireable; the site should read as "already-hireable" rather than "please-hire-me". Curiosity shows through specificity, not exclamation points.

**Tone in practice:**
- Specific over generic. "Built a Django REST API serving 10+ Discord bots across 8 months" beats "passionate about building scalable systems".
- Restrained, not cold. Allow warmth through concrete details (the project that started as a 2 a.m. idea, the dataset that took three weeks to clean) — never through exclamation or emoji.
- Code-native where it serves. Use monospace for the things that ARE code; use prose for the things that aren't. Don't decorate the prose with code-style fonts.

## Anti-references

Two specific lanes the site must NOT drift into:

- **The "AI dev portfolio" template.** The current design lives in this lane: purple gradient body, `bg-clip-text` gradient text on every heading, `backdrop-blur` glassmorphism panels, `card-3d` tilt on every image, `react-tsparticles` background, identical glowing stat cards ("11+ Projects · 5+ Tech Stacks · 2+ Years Exp · NASA Winner"), small all-caps tracked kicker above every section, identical three-up project card grids. Visitors will read this as template before they read it as Kazim. Strip the entire vocabulary. None of it survives.
- **Designer portfolio affectation.** The 2026 editorial-typographic reflex — display italic serif headlines, drop caps, ruled three-column layouts, monochromatic restraint applied as costume. It's the trap one tier deeper than the AI dev portfolio. If a section reads like a magazine spread, it's wrong for a backend developer.

The test: in one sentence, describe the site the way a competitor would describe theirs. If that sentence fits the modal 2026 portfolio, restart.

## Design Principles

1. **Quiet craft over loud effects.** No glow, no particles, no 3D tilt, no animated gradient body, no glassmorphism. The site is allowed to be visually striking; it is not allowed to be visually loud. Restraint signals competence. Decoration signals template.
2. **Code and data as visual material.** Use the terminal-native vocabulary where it serves: monospace, code blocks, log-shaped callouts, query syntax, ASCII-style structure diagrams. The site is built by a developer for an audience that includes developers — the medium should match the work. Treat the technical content (Django models, REST endpoints, deployment topology, GitHub stats) as the design, not as content to be wrapped in decoration.
3. **One accent, used deliberately.** Pick a single accent and use it for one or two roles only (active nav state, primary CTA, the line that names the work). Backgrounds, surfaces, and text stay near-monochrome. The accent is a signal, not a theme.
4. **Shipped work over promises.** Surface the proof: NASA Space Apps 2025 winner, 40,000+ views on KayzBlog, Discord bots serving 10+ servers, the four-to-six projects with real depth. The portfolio is a portfolio, not a brochure — the work leads.
5. **Hybrid register, by surface.** Home, About, Projects, Achievements read as brand — voice leads, the work supports. Skills, Experience, Education read as product — structured information, scannable facts, no decorative copy. Contact is the bridge: functional with brand voice. Each surface earns its register; no surface borrows from the other.
6. **Earned motion, never reflexive.** Motion is allowed where it carries information (a state change, a real-time data refresh, a deliberate page-load orchestration). Motion is not allowed as ambient atmosphere. No entrance animations on every element; no staggered reveals as a section template; no animated gradient body. Every animation needs a `prefers-reduced-motion` alternative.

## Accessibility & Inclusion

- **WCAG 2.1 AA.** Body text ≥ 4.5:1 against its background. Large text (≥ 18px, or bold ≥ 14px) ≥ 3:1. Placeholder text hits the same 4.5:1, not the muted-gray default. Focus rings visible and high-contrast on every interactive element. The current dark-mode body uses gradient backgrounds with text laid on top — that combination is the single most common contrast failure in 2026 portfolio sites; verify on every section.
- **`prefers-reduced-motion: reduce` honored everywhere.** Every entrance animation, page transition, hover effect, and decorative motion has a reduced-motion alternative (typically a crossfade or instant transition). The current `framer-motion` + `gsap` + `react-tsparticles` stack has motion baked into the background; almost all of it must either be gated or replaced.
- **Keyboard navigable end-to-end.** Tab order is logical, focus is never trapped, all CTAs and links are reachable without a mouse. The mobile swipe navigation (currently a key feature) must not be the only way to navigate.
- **No information conveyed by color alone.** Active nav state, status indicators, and any "live" / "deployed" / "in progress" badges pair color with text or shape.
- **Color is not the only cue for the dark/light theme switch** — the toggle is reachable by keyboard, labeled, and announces its state.

## Notes for follow-up

These are the rough edges the codebase crawl surfaced, for reference when picking the next command:

- **Animation stack is heavy**: `framer-motion` + `gsap` + `react-tsparticles` + `react-type-animation` + `react-parallax-tilt` + `react-intersection-observer` + `react-swipeable` + `react-markdown` + `react-syntax-highlighter` + `react-github-calendar` + `react-simple-icons` + `lucide-react`. The brand principles above imply most of the motion libraries will be cut or gated.
- **8 pages, 13 components, 9 data files** — significant surface area. The light-mode CSS overrides in `index.css` (lines 159-298) are a sprawling maintenance burden and fight the brand identity.
- **Tailwind purple palette (50-950) is committed** but the principles imply it should be replaced. `tailwind.config.js` will need restructuring; the `gradient-purple*` and `gradient-radial` backgroundImages will likely be removed entirely.
- **No real photography / project imagery yet** — the README notes "Project Screenshots/GIFs - Visual previews of projects (coming soon)". The brand register demands imagery on portfolio surfaces. This is a real gap, not a stylistic choice.
