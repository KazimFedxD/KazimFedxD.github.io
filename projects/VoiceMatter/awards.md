# VoiceMatter Awards & Recognition

## Overview

VoiceMatter is a personal / portfolio project in active development
(0.1.0 alpha). It has not been entered into competitions and has no
external recognition yet. The milestones below document the project's
internal progress.

---

## Competitions

### 🏆 No competition entries yet

VoiceMatter has not been entered into hackathons, conferences, or
online competitions. The maintainers may consider submission to a
Linux / open-source showcase in a future release.

---

## Project Milestones

### Development Achievements

| Milestone | Date | Description |
|-----------|------|-------------|
| Initial scaffold | 2026-06-17 | `pyproject.toml`, `voicematter` package layout, sounddevice + Deepgram + Anthropic integrations |
| Daemon + Unix socket pub/sub | 2026-06-19 | State machine (`IDLE / RECORDING / PAUSED / PROCESSING`), `emit()` event broadcast, one-shot + subscriber clients |
| Overlay v1 (PySide6) | 2026-06-19 | Frameless floating pill at bottom-middle, 6 states, custom QPainter rendering |
| LLM formatter with editor-not-writer prompt | 2026-07-08 | `prompt.md` §0 (transcript-is-data), `dict.json` variable substitution |
| Smoke test for daemon protocol | 2026-06-19 | Spawns daemon, walks state machine via Subscriber |
| Step-event test | 2026-06-19 | Asserts `step` events fire in order: transcribe → format → copy → insert |
| systemd user service | 2026-08-15 | `~/.config/systemd/user/voicematter.service` for autostart |
| `.website/` portfolio bundle | 2026-08-26 | 15-file documentation bundle for portfolio hosting |

---

## Technical Achievements

### Architecture
- ✅ Single-process daemon + overlay (no IPC overhead beyond Unix socket)
- ✅ Pub/sub state machine over a single AF_UNIX socket — one control surface for CLI, overlay, and external hotkey wrappers
- ✅ Editor-not-writer LLM prompt that defends against prompt injection via transcript content

### Performance
- ✅ Audio-level emitter at 20 Hz (`emit("level", level=...)`)
- ✅ Custom RMS computation in the sounddevice callback — no extra thread for level
- ✅ End-to-end pipeline latency of ~3–9 s for typical dictation clips `[estimated]`

### Security
- ✅ API keys loaded from `.env` (not committed — listed in `.gitignore`)
- ✅ `<transcript>` tag wrapping prevents LLM prompt injection from spoken text
- ✅ Overlay uses `Qt.WA_ShowWithoutActivating` so it never steals focus
- ✅ `ydotool` failure is silently skipped — no zombie state

---

## GitHub Statistics

*(Update with actual numbers)*

| Metric | Count |
|--------|-------|
| ⭐ Stars | — |
| 🔀 Forks | — |
| 👥 Contributors | 1 |
| 📝 Commits | — |
| 📁 Releases | 0 (pre-release) |

---

## User Testimonials

*(Add testimonials after user testing)*

> *"Testimonial placeholder — add after user testing."*
> — User Name, Role

---

## Media Coverage

*(Add media mentions when available)*

| Publication | Type | Date | Link |
|-------------|------|------|------|
| — | — | — | — |

---

## Presentations

*(Add presentation links when available)*

| Event | Date | Materials |
|-------|------|-----------|
| — | — | — |

---

## Future Recognition Goals

- [ ] AUR package of the week
- [ ] Featured in a Linux desktop podcast (e.g. Destination Linux, LINUX Unplugged)
- [ ] KDE Plasma Store listing
- [ ] Hacker News "Show HN" launch
- [ ] Academic paper on editor-not-writer LLM prompting for dictation

---

## About the Project

VoiceMatter is a personal project by Kazim Abbas (FedxD). It is not
affiliated with Deepgram, Anthropic, KDE, or any other organisation
named in the dependencies. All trademarks belong to their respective
owners.

---

## How to Support

- ⭐ Star the repository
- 🔀 Fork and contribute
- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features
- 📖 Improve documentation
- 🎨 Design a logo
- 📦 Package for your distro (AUR, PPA, COPR)