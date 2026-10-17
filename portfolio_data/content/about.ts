// ponytail: this is a 1:1 mirror of portfolio_data/content/about.md, kept
// here as a typed-string module so the CRT engine can `import aboutRaw from
// '@/portfolio_data/content/about.ts'` and get the same text the .md file
// has, with no Turbopack/webpack raw-loader rules or new deps. Keep both in
// sync - the .md is the human-edited source, this .ts is the build-time
// import target. Updating one means updating the other.
export default `# About - Content Extract

> Source: \`src/pages/About.js\` (extracted verbatim - no rewriting or improvements).

## Bio (Who I Am)

I'm a **Software Engineering** student at **Bahria University Karachi Campus**, specializing in backend engineering and full-stack development. Currently in Semester 1 of the BSe program (Aug 2026 - June 2030), I combine academic coursework with hands-on experience shipping production systems.

My journey in tech is driven by curiosity and a desire to create solutions that make a difference. From winning **2nd place at NASA Space Apps Challenge 2025** with Skyntel, to **Best Use of AI at AI Preneur '26** with TeachBack, to shipping **VoiceMatter** (a Linux voice-dictation daemon) - I thrive on challenges that push me to learn and grow.

As a **self-taught developer** running in parallel with formal education, I've built a strong foundation in modern web, AI, and systems technologies, with a particular focus on Python, Django, and building scalable systems.

Status banner: "Open to Remote Backend Development Opportunities"

## What I Do (Interests)

- **Backend Development** - Building robust and scalable server-side applications
- **AI & Voice Systems** - STT/LLM/TTS pipelines, voice-first UX, real-time WebSocket dialogue
- **Linux & Systems** - Wayland, PipeWire, PySide6, low-level desktop tooling
- **Automation** - Creating efficient workflows and automated solutions
- **Hardware-Software Integration** - Bridging physical and digital worlds

## Core Values

- **Problem Solver** - Analytical approach to complex challenges
- **Passionate Learner** - Constantly expanding my skillset
- **Professional** - Committed to quality and best practices
- **Team Player** - Collaborative and communicative

## My Journey (Timeline)

- **2026** - Locked into Bahria University Karachi Campus (BSe Software Engineering); won Best Use of AI at AI Preneur '26 with TeachBack; shipped VoiceMatter v0.1.0 (Linux voice-dictation daemon)
- **2025** - NASA Space Apps Challenge Karachi - 2nd Place (Skyntel)
- **2024** - Started KayzBlog Management
- **2023** - Began Self-Taught Developer Journey

## GitHub Stats (component)

\`src/components/GitHubStats.js\` renders:
- GitHub contribution heatmap for user \`KazimFedxD\` (react-github-calendar with custom purple theme).
- Stat cards:
  - Total Contributions: 1,500+
  - Public Repos: 50+
  - Current Streak: Active
  - Languages: 10+
`;