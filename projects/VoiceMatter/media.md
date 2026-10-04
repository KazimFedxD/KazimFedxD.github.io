# VoiceMatter Video & Media Assets

## Demo Video

### Main Demo
- **File**: TBD — capture with screen recorder while the daemon is running
- **YouTube**: [Project Demo](https://youtube.com) *(placeholder)*
- **Duration**: ~60 seconds target
- **Status**: 📋 Pending creation

### Demo Script Outline

1. **Intro (0:00–0:05)** — Title card "VoiceMatter — talk, format, paste" over a recording of the desktop idle.
2. **Hotkey bound (0:05–0:15)** — Open KDE shortcuts, show F8 → `voicematter trigger`. Press F8. Overlay appears red.
3. **Dictation (0:15–0:30)** — User speaks a short, naturally-false-started sentence. Live audio meter animates.
4. **Processing (0:30–0:40)** — Press F8 again. Pill turns blue, 12-dot spinner rotates, 4-row checklist ticks through (transcribe / format / copy / insert).
5. **Success (0:40–0:50)** — Pill turns emerald, checkmark appears, text lands in the focused editor. 2-second auto-dismiss.
6. **Outro (0:50–0:60)** — Title card with GitHub link + install snippet.

---

## Feature Animations

### Press-to-Record Hotkey
- **Filename**: `feature-hotkey.gif`
- **Duration**: ~6 s
- **Content**: Show F8 binding → trigger → overlay appears → audio meter reacts
- **Status**: 📋 Pending

### Processing Pipeline
- **Filename**: `feature-processing.gif`
- **Duration**: ~10 s
- **Content**: Show the four processing steps ticking through (transcribe → format → copy → insert)
- **Status**: 📋 Pending

### Cancel Mid-Recording
- **Filename**: `feature-cancel.gif`
- **Duration**: ~4 s
- **Content**: Start recording → press Esc → overlay disappears, audio discarded
- **Status**: 📋 Pending

### Pause / Resume
- **Filename**: `feature-pause.gif`
- **Duration**: ~5 s
- **Content**: Recording → pause (amber, frozen meter) → resume (red, animated again)
- **Status**: 📋 Pending

### ydotool Auto-Paste
- **Filename**: `feature-paste.gif`
- **Duration**: ~6 s
- **Content**: Dictate → formatted text lands in focused editor via ydotool keystroke
- **Status**: 📋 Pending

---

## Architecture Diagrams

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                   voicematter daemon (single process)                │
│                                                                      │
│   ┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐    │
│   │  accept loop│    │  state       │    │  processing pipeline │    │
│   │  (Unix sock)│◄──►│  machine     │───►│  recorder → STT →    │    │
│   │  + pub/sub  │    │  IDLE/REC/   │    │  formatter → writer  │    │
│   └──────┬──────┘    │  PAUSED/PROC │    └──────────┬──────────┘    │
│          │           └──────────────┘               │               │
│          ▼                                           ▼               │
│   ┌─────────────┐                         ┌──────────────────────┐   │
│   │  Subscriber │◄──────events────────────│  emit(state/step/    │   │
│   │  (overlay)  │                         │      level/ready/err)│   │
│   └──────┬──────┘                         └──────────────────────┘   │
└──────────┼───────────────────────────────────────────────────────────┘
           │  Unix domain socket (newline-delimited JSON)
           ▼
   ┌────────────────┐
   │  EventHandler  │   trigger / pause / cancel / stop
   │  (CLI / KDE)   │
   └────────────────┘
```

### State Machine

```
                 ┌──── cancel ────┐
                 ▼                │
   ┌──────┐  trigger  ┌──────────┐ │    ┌────────────┐
   │ IDLE │ ─────────►│ RECORDING│ ├────►│ PROCESSING │ ──── ready ───► IDLE
   └──────┘           └────┬─────┘ │    └────────────┘
       ▲                   │ pause │           │
       │              ┌────▼─────┐ │  cancel    │
       │  resume      │  PAUSED  │ │   (soft)   │
       └──────────────┘──────────┘ ◄────────────┘
```

---

## Screenshot Catalog

### Desktop Screenshots

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `overlay-recording.png` | Recording state — red mic, audio meter, mm:ss timer, 3 buttons | 📋 Pending |
| 2 | `overlay-paused.png` | Paused state — amber mic, frozen meter | 📋 Pending |
| 3 | `overlay-processing.png` | Processing state — blue mic, 12-dot spinner, 4-row checklist | 📋 Pending |
| 4 | `overlay-ready.png` | Success state — emerald mic, checkmark, 2s auto-dismiss | 📋 Pending |
| 5 | `overlay-error.png` | Error state — red mic, error message, Dismiss button | 📋 Pending |
| 6 | `kde-shortcut-config.png` | KDE Custom Shortcuts setup with the three `voicematter` commands | 📋 Pending |
| 7 | `systemd-status.png` | `systemctl --user status voicematter` output showing active | 📋 Pending |

### Mobile Screenshots

Not applicable — VoiceMatter is a desktop-only application.

### Video Assets

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `demo.mp4` | 60-second end-to-end demo | 📋 Pending |

---

## Screenshot Specifications

### Resolution
- **Desktop**: 1920×1080 minimum (16:9)
- **Mobile**: not applicable
- **Format**: PNG preferred

### Content Guidelines
- Show real functionality (real mic input, real Deepgram transcription)
- Use example dictation content like "send the email to, no wait, to John, not Jane"
- Blur any personal/sensitive information
- Capture the full overlay pill including drop shadow if visible
- Keep the desktop background clean (no chat windows, no notifications)

### Capture Tools
- **Static**: `spectacle` (KDE), `flameshot`, or `gnome-screenshot`
- **Animated**: `peek` (Linux), `ScreenToGif` (Windows / Wine)
- **Terminal output**: `asciinema` for `.cast` files

---

## Brand Assets

### Colors (from `voicematter/overlay.py`)

| Name | Hex | Usage |
|------|-----|-------|
| Pill background | `rgba(17, 24, 39, 235)` | Pill fill (gray-900, near-opaque) |
| Pill border | `rgba(255, 255, 255, 30)` | 1 px inset border |
| Idle state | `#1F2937` | gray-800 |
| Recording state | `#EF4444` | red-500 |
| Paused state | `#F59E0B` | amber-500 |
| Processing state | `#3B82F6` | blue-500 |
| Ready state | `#10B981` | emerald-500 |
| Error state | `#DC2626` | red-600 |
| Text primary | `#F9FAFB` | gray-50 |
| Text muted | `#9CA3AF` | gray-400 |

### Typography
- **Headings**: System default sans (KDE Breeze / Noto Sans)
- **Body**: System default sans
- **Monospace**: System default mono (terminal output only)

### Logo
- **Status**: 📋 Pending design
- **Location**: `.website/screenshots/logo.png`
- **Variants**: Light, dark, icon-only

---

## Media File Sizes

| Type | Max Size |
|------|----------|
| Screenshots | < 500 KB each |
| GIFs | < 5 MB each |
| Video (YouTube) | HD 1080p |
| Logo | < 50 KB |

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Complete |
| 🚧 | In Progress |
| 📋 | Pending |