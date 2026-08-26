# Screenshots

This folder contains visual assets for the VoiceMatter project
documentation.

## Required Screenshots

### Desktop

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `overlay-recording.png` | Recording state — red mic, live audio meter, mm:ss timer, 3 buttons | ⬜ Pending |
| 2 | `overlay-paused.png` | Paused state — amber mic, frozen audio meter | ⬜ Pending |
| 3 | `overlay-processing.png` | Processing state — blue mic, 12-dot spinner, 4-row checklist | ⬜ Pending |
| 4 | `overlay-ready.png` | Success state — emerald mic, checkmark, 2-second auto-dismiss | ⬜ Pending |
| 5 | `overlay-error.png` | Error state — red mic, error message, Dismiss button | ⬜ Pending |
| 6 | `kde-shortcut-config.png` | KDE Custom Shortcuts setup with three `voicematter` commands | ⬜ Pending |
| 7 | `systemd-status.png` | `systemctl --user status voicematter` showing active | ⬜ Pending |

### Mobile

Not applicable — VoiceMatter is a desktop-only Linux application.

### GIFs

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `feature-hotkey.gif` | Hotkey binding → trigger → overlay appears | ⬜ Pending |
| 2 | `feature-processing.gif` | Four processing steps ticking through | ⬜ Pending |
| 3 | `feature-cancel.gif` | Recording → Esc → audio discarded | ⬜ Pending |
| 4 | `feature-pause.gif` | Recording → pause (amber) → resume (red) | ⬜ Pending |
| 5 | `feature-paste.gif` | Dictation → formatted text via ydotool | ⬜ Pending |

### Video

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `demo.mp4` | 60-second end-to-end demo | ⬜ Pending |

## Screenshot Guidelines

### Resolution
- Desktop: 1920×1080 minimum (16:9)
- Format: PNG preferred; JPEG acceptable for photographic backgrounds

### Format
- Static images: PNG
- Animations: GIF, <5MB each, 10–15 FPS
- Video: MP4 (H.264), 1080p

## How to Capture (manual fallback)

The overlay is rendered live by the running daemon — Playwright
capture does not apply. Capture manually while VoiceMatter is running.

### Desktop overlay screenshots

1. Start the daemon: `voicematter daemon`
2. Open a target application so the paste has somewhere to land.
3. Press F8 (or run `voicematter trigger`) to start recording.
4. **Recording state**: capture immediately while audio meter animates.
5. Press F9 (or `voicematter pause`) for the **paused** state.
6. Press F8 again to stop; while processing, capture the
   **processing** state.
7. After success, capture the **ready** state quickly (auto-dismiss
   is 2 s).
8. For the **error** state, kill the daemon's LLM access (e.g. set an
   invalid `MINIMAX_API_KEY`, restart, then trigger a recording).
9. Use `spectacle`, `flameshot`, or `gnome-screenshot` to grab the
   region containing the overlay pill. Save with the filename from the
   table above.

### KDE shortcut + systemd status screenshots

- Open **System Settings → Keyboard → Shortcuts → Custom Shortcuts**
  and capture the list with the three VoiceMatter commands.
- Run `systemctl --user status voicematter` in a terminal and capture
  the output.

### GIFs

1. Use `peek` (Linux) or `ScreenToGif` (via Wine).
2. Capture the desktop region around the overlay.
3. Optimise: `gifsicle -O3 < input.gif > output.gif`.
4. Save with the filename from the table above.

### Demo video

1. Use `OBS Studio`, `ffmpeg -f x11grab`, or `SimpleScreenRecorder`.
2. Capture the entire cycle: bind shortcut → record → process →
   paste into a focused editor.
3. Save as `.website/screenshots/demo.mp4` (H.264).
4. Optional: upload to YouTube and update `media.md` + `metadata.json`.