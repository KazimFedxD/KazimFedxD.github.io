# `portfolio_data/content/` — content reference

This directory is the single source of truth for every text, number, and
link the CRT terminal in `components/machine/box-computer-engine.ts`
displays in its About / Projects / Contact / Hire windows. Edit these
files, save, and the running dev server picks the change up on the next
mount — no engine edits required.

Two files use the same name on purpose:

- **`about.md`** — the human-edited source. Open this one to write.
- **`about.ts`** — `export default \`...\`` template-string mirror of the
  `.md`. The engine imports this. **After every edit to `about.md`,
  paste the same content into the template string in `about.ts`** (keep
  the backticks, escape any inner backticks as `` \` ``, escape `${` as
  `\${`).

The rest are plain JSON. Edit and save.

---

## File map

| File | What it feeds | Edit to change |
|---|---|---|
| `home.json` | Boot screen identity — name, summary, typing lines, stats | Your name, tagline, the rotating typing lines, the four stat tiles |
| `about.md` + `about.ts` | About window body | The bio paragraphs. Use `## h2`, `### h3`, `**bold**`, `- bullet`, `> quote` — the engine's tiny `mdInline()` only renders those four |
| `experience.json` | About window → "Where I've been" cards | The two work entries under `experiences[]` (period, role, company, description, location) |
| `achievements.json` | About window → "Highlights" bullets + achievement stats line | `achievements[]` items (title, position, year, description) and the `stats[]` numbers |
| `education.json` | "Based in ..." line in Contact + Hire windows | Top of `formalEducation[0]` — its `location` is what the sim shows as your location |
| `contact.json` | Contact window, `contact`/`hire` shell commands, response-time, tag chips | `header.subtitle`, every `contactInfo[]` entry (title, value, link), `responseTime`, `tags[]` |
| `skills.json` | Hire window's skill categories + levels | `header.subtitle`, every `categories[].skills[]` entry (name, level 0-100) |
| `links.json` (in `portfolio_data/`, not `content/`) | Project repo URLs in the shell + browser windows | One key per project name, value = full GitHub URL |

---

## Field gotchas

- **Add a project** — edit `portfolio_data/projectsData.js` (NOT inside
  `content/`). Add a `slug` entry; it will be picked up by
  `getSortedProjects()` and shown in the Projects window + Files app.
  The repo URL lives in `links.json`.
- **Change your name / handle** — only `home.json → header.name`. The
  shell prompt, login screen, and `whoami` command all derive from it.
  The handle is the first whitespace-delimited token, lowercased
  (so "Kazim Abbas" → handle `kazim`).
- **Change your email / GitHub** — first matching entry in
  `contact.json → contactInfo[]`. The engine scans for `/email/i` and
  `/github/i` in the `title` field, so renaming "Email" to "E-mail"
  still works.
- **Skill `level` is 0–100** — used as "Level X/100" in the Hire
  window. No unit conversion.
- **`quickLinks` in `home.json` is NOT currently used by the CRT** —
  it's legacy data from the old site. Safe to ignore or remove.
- **`form.emailJs` in `contact.json`** — also legacy, not wired into
  the CRT. The CRT's "Contact" window is read-only.
- **`certifications`, `selfLearning`, `philosophy`, `skillsGained`,
  `proficiencyLegend`, `stats` blocks** — read by the old React pages
  (not in scope here), not by the CRT engine. The CRT only consumes
  the slices listed in the table above.

---

## Adding a new shell command

Shell commands live as code in `box-computer-engine.ts` (the
`runShellCommand` function and its `HELP` array). Adding a new
command is an engine edit, not a content edit — but if the new
command's output text should come from data, put the text in the
relevant JSON and read it from there.
