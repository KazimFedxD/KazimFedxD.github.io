# VoiceMatter Future Enhancements

## Current Status

- **Version**: 0.1.0
- **Completion**: ~70% [estimated]
- **Last Release**: 2026-08-26

---

## Roadmap

### Version 0.2.0 (Q4 2026)

#### Core Stability
- [ ] **Multi-microphone selection** — list devices and let the user pick in a config file
- [ ] **Configurable device-name matcher** — env var instead of hard-coded `"USB PnP Audio Device"`
- [ ] **Streaming STT** — Deepgram live endpoint cuts perceived latency
- [ ] **Streaming LLM** — copy formatted chunks to clipboard as they arrive
- [ ] **Drain audio chunks to disk** for >30 min recordings

#### Overlay
- [ ] **Reposition control** — drag the pill or pick a corner
- [ ] **Multi-monitor awareness** — render on the focused monitor
- [ ] **Light theme** toggle

#### Distribution
- [ ] **AUR package** for Arch
- [ ] **Flatpak** for cross-distro installation
- [ ] **Standalone binary** via PyInstaller

---

### Version 0.3.0 (Q2 2027)

#### Voice Commands
- [ ] **Wake-word activation** — say "voice matter start" instead of pressing a key
- [ ] **Punctuation commands** — "period", "comma", "new line"
- [ ] **Edit commands** — "delete last sentence", "scratch that"

#### Integrations
- [ ] **GNOME Shell extension** alongside the KDE shortcut setup
- [ ] **Wayland-only** — drop xdotool mentions entirely; rely on ydotool
- [ ] **Plasma 6 widget** for one-click record toggle

#### Robustness
- [ ] **Per-recording LLM cost estimate** before sending
- [ ] **Offline mode** with a local Whisper model when Deepgram is unreachable
- [ ] **Encrypted transcript cache** for the "last transcription" buffer

---

### Version 1.0.0 (Q4 2027)

#### Multi-User
- [ ] **Per-user systemd templates** — multiple users on the same machine, distinct sockets
- [ ] **Permission model** — let a user allow another to inject text

#### Enterprise
- [ ] **Centralised config** — IT pushes a `.env` to all users
- [ ] **Audit log** — record every formatted transcript (opt-in)
- [ ] **Custom LLM providers** — Ollama, vLLM, LM Studio

---

## Community Requests

### High Priority
| Request | Status | Target |
|---------|--------|--------|
| Streaming transcription | 📋 Planned | v0.2.0 |
| Configurable microphone | 📋 Planned | v0.2.0 |
| AUR / Flatpak packages | 📋 Planned | v0.2.0 |
| Multi-monitor overlay | 📋 Planned | v0.2.0 |

### Medium Priority
| Request | Status | Target |
|---------|--------|--------|
| Streaming LLM output | 📋 Planned | v0.2.0 |
| Wake-word activation | 📋 Planned | v0.3.0 |
| Punctuation commands | 📋 Planned | v0.3.0 |
| Offline Whisper mode | 📋 Planned | v0.3.0 |

### Under Consideration
| Request | Status | Notes |
|---------|--------|-------|
| Voice command grammar | 🤔 Considering | Complex; needs careful prompt engineering |
| Plugin system for formatters | 🤔 Considering | Risk of API churn |
| macOS port | 🤔 Considering | Requires `wl-copy` + `ydotool` substitutes |
| Windows port | 🤔 Considering | Major audio-stack work; not a near-term goal |
| iOS / Android clients for the daemon | 🤔 Considering | Mobile dictation would need its own UX |
| Real-time translation before formatting | 🤔 Considering | Adds latency; needs separate translator |

---

## Technical Improvements

### Infrastructure
- [ ] **Move from hard-coded `"USB PnP Audio Device"` to PipeWire's `wpctl` API** — survives renames
- [ ] **Move socket under `XDG_RUNTIME_DIR`** instead of `/tmp` — survives reboots better
- [ ] **Replace `print()` with `logging`** throughout the package — structured logs for journald
- [ ] **Type hints** — currently partial; reach 100% mypy coverage

### Performance
- [ ] **Streaming Deepgram** — perceived latency halved
- [ ] **Streaming LLM** — formatted text appears in clipboard in chunks
- [ ] **Audio chunk GC** — free recorded chunks after each successful processing
- [ ] **Overlay repaint coalescing** — fewer `paintEvent` calls per second

### Security
- [ ] **Tighten socket permissions** — `chmod 700` on bind
- [ ] **Optional end-to-end encryption** of audio before STT (provider-specific)
- [ ] **Optional transcript disk cache** with age-out policy
- [ ] **Sandbox the formatter prompt** — periodic red-team reviews

---

## Long-Term Vision

### Year 1–2: Best Linux Dictation
- Match or beat commercial dictation tools on accuracy + UX
- Become the default voice-input layer on KDE neon
- AUR / Flatpak / native package on every major distro

### Year 2–3: Multi-Modal Input
- Combine voice + keyboard shortcuts for hybrid workflows
- Editor plug-ins for VS Code, JetBrains, Vim that understand the dictation context
- Project-specific vocabularies (e.g. dictation into a chat client vs. a code review)

### Year 3–5: Open Voice Stack
- Forkable LLM formatter prompt — communities ship custom editor profiles
- Plugin ecosystem for custom STT engines (Whisper, NVIDIA Riva, Vosk)
- Reference implementation for "voice-first desktop UX" that other projects can adopt

---

## Research Directions

### Streaming LLM UX
- How fast can we copy text to the clipboard without overwhelming the user?
- Is per-token copy better than per-paragraph copy?

### Editor-Not-Writer Prompting
- Are there better ways to constrain the LLM to "preserve meaning" than prompt rules?
- Can we use a constrained-decoding or grammar-based approach?

### Voice Command Robustness
- Wake-word detection on commodity hardware without burning battery?
- Punctuation commands that survive noisy environments?

### Latent User Intent
- Can the formatter detect "this sentence was a false start" without the user flagging it?
- Can it learn user-specific vocabulary over time?

---

## How to Contribute Ideas

Have a feature idea? Here's how to share:

1. **GitHub Issues** — open a feature request issue
2. **Discussions** — start a thread for design-level conversation
3. **Email** — contact the maintainers directly

When submitting ideas, please include:

- **Problem**: What problem does this solve?
- **Solution**: How do you envision it working?
- **Impact**: Who benefits and how?
- **Alternatives**: Other ways this could be addressed?

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Completed |
| 🚧 | In Progress |
| 📋 | Planned |
| 🔍 | Researching |
| 🤔 | Considering |
| ❌ | Not Planned |