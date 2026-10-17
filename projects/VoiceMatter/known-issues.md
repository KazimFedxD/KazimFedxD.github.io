# VoiceMatter Known Issues & Limitations

> **Last Updated**: 2026-08-26
> **Version**: 0.1.0

---

## Table of Contents

1. [Current Limitations](#current-limitations)
2. [Known Bugs](#known-bugs)
3. [Platform-Specific Issues](#platform-issues)
4. [Performance Bottlenecks](#performance-bottlenecks)
5. [Security Considerations](#security-considerations)
6. [Workarounds](#workarounds)

---

## Current Limitations

### Cross-Platform Support
- ❌ **Windows** — PipeWire / Wayland / `wl-copy` are Linux-only
- ❌ **macOS** — Same as Windows
- ⚠️ **WSL2** — Daemon can run but audio capture via PipeWire is unreliable
- ✅ **Linux (Arch / Fedora / Ubuntu 22.04+ / Debian 12+ / KDE neon)** — Fully supported

### Audio
- ⚠️ **Single microphone only** — Uses the first device named `"USB PnP Audio Device"`; cannot pick from a list
- ⚠️ **No device configuration UI** — Microphone selection happens via PipeWire / `pavucontrol` only
- ⚠️ **No multi-channel recording** — Always mono

### Dictation Features
- ❌ **No voice command shortcuts** — Cannot trigger actions by saying "delete that"
- ❌ **No streaming transcription** — Records the entire clip before sending to Deepgram
- ❌ **No streaming LLM output** — Waits for the full LLM response
- ⚠️ **English-only formatter prompt** — Multilingual transcripts work but the prompt is English

### Overlay
- ⚠️ **Single overlay at a time** — No multi-monitor support
- ⚠️ **No custom themes** — Colors are hard-coded per state
- ⚠️ **No position control** — Always bottom-middle of the primary monitor

### Distribution
- ❌ **No packaging** — No `.deb`, `.rpm`, Flatpak, or AUR package
- ❌ **No auto-update** — Manual `git pull` + `uv sync`

---

## Known Bugs

### Issue: Microphone name match is hard-coded
- **ID**: #AUDIO-001
- **Severity**: High
- **Affected**: All users with a non-default microphone name
- **Description**: `Recorder.find_microphone()` only matches devices
  whose name contains the literal string `"USB PnP Audio Device"`.
  Users with a different mic name get a `RuntimeError("Microphone not
  found")` at startup.
- **Impact**: The daemon refuses to start.
- **Workaround**: Edit `voicematter/recorder.py` to match your mic's
  name, or follow the README's instruction to rename the device.
- **Status**: Open

### Issue: `ydotool` keycode sequence is X11-derived
- **ID**: #INPUT-001
- **Severity**: Low
- **Affected**: All users
- **Description**: `Writer.paste()` sends `29:1 47:1 47:0 29:0`
  (Ctrl+V). Keycodes 29 / 47 are X11-style; on some Wayland
  compositors they may not map to `Ctrl` and `V`.
- **Impact**: Auto-paste silently does nothing on some setups.
- **Workaround**: Paste manually with `Ctrl+V`. Future versions should
  use ydotool's named keys (`CTRL+V`).
- **Status**: Open

### Issue: Long recordings hold all audio in memory
- **ID**: #PERF-001
- **Severity**: Medium
- **Affected**: Users recording > 30 minutes continuously
- **Description**: `Recorder.chunks` accumulates the entire float32
  audio as a list of NumPy arrays. A 30-minute mono clip at 44.1 kHz
  is ~ 300 MB.
- **Impact**: High memory use; potential `MemoryError` for very long
  recordings.
- **Workaround**: Stop and restart recording periodically.
- **Status**: Open

### Issue: No graceful shutdown if Qt app never starts
- **ID**: #STATE-001
- **Severity**: Low
- **Affected**: Headless / no-display environments
- **Description**: `VoiceMatterDaemon._request_shutdown()` tries
  `QApplication.instance().quit()` and falls back to `os._exit(0)`
  after 500 ms. In a no-display environment the Qt app may not be
  reachable; the hard exit is the only path.
- **Impact**: Minor — the fallback is fine.
- **Workaround**: None needed.
- **Status**: Won't Fix

### Issue: Dict `dict.json` is overwritten by package reinstall
- **ID**: #BUILD-001
- **Severity**: Low
- **Affected**: Users who customised `voicematter/data/dict.json`
- **Description**: Editing the bundled `dict.json` directly is wiped
  on every `uv pip install --force-reinstall`. The CLI's
  `voicematter dict set ...` is also written back to the bundled
  path.
- **Impact**: Custom prompts lost on reinstall.
- **Workaround**: Back up the file before reinstalling.
- **Status**: Open

---

## Platform Issues

### Arch Linux

| Issue | Status | Workaround |
|-------|--------|------------|
| `ydotool` requires manual service enable | Open | `sudo systemctl enable --now ydotool` |
| KDE Plasma 6 shortcuts may need absolute paths | Open | Use full path in shortcut |

### Fedora

| Issue | Status | Workaround |
|-------|--------|------------|
| SELinux may block `wl-copy` between users | Open | Run VoiceMatter as your user, not root |
| `ydotool` requires `inotify-tools` | Open | `sudo dnf install inotify-tools ydotool` |

### Ubuntu / Debian

| Issue | Status | Workaround |
|-------|--------|------------|
| Default audio is PulseAudio on Ubuntu 20.04 | Open | `sudo apt install pipewire wireplumber` and reboot |
| `ydotool` not in default repos | Open | Build from source or use PPA |

---

## Performance Bottlenecks

### Long LLM Round-Trip
- **Issue**: LLM formatting takes 2–6 s per recording
- **Threshold**: Transcripts > 1000 words
- **Mitigation**: Future work — stream LLM response and copy chunks to clipboard

### Full-Clip STT
- **Issue**: Records the entire clip before sending to Deepgram
- **Threshold**: Clips > 60 s
- **Mitigation**: Future work — Deepgram streaming endpoint

### Memory Growth
- **Issue**: Audio chunks accumulate in a list
- **Threshold**: Clips > 30 minutes
- **Mitigation**: Stop/restart recording

---

## Security Considerations

### API keys stored in plaintext `.env`
- **Risk**: Anyone with read access to the user's home directory can
  read Deepgram + LLM keys.
- **Mitigation**: `.env` is in `.gitignore`. `chmod 600 .env` after
  creation. Deepgram + LLM dashboards allow key rotation.
- **Status**: Mitigated (operational)

### Unix socket world-readable by default
- **Risk**: Other local users can send commands to VoiceMatter.
- **Mitigation**: `chmod 700 /tmp/voicematter.sock` (Python's
  `bind()` defaults to the umask — tighten umask before launching).
- **Status**: Open

### LLM provider sees all transcripts
- **Risk**: Voice content leaves the machine.
- **Mitigation**: User chooses the LLM provider. Local-only models
  (e.g. Ollama) can be substituted by setting `MINIMAX_BASE_URL`.
- **Status**: Accepted Risk

### No transcript retention
- **Risk**: None — VoiceMatter does not write transcripts to disk.
  `last_transcription` is held in memory only and lost on daemon
  restart.
- **Mitigation**: By design.
- **Status**: Mitigated

---

## Workarounds

| Issue | Quick Fix |
|-------|-----------|
| Microphone not detected | Rename your mic to include "USB PnP Audio Device" or edit `Recorder.find_microphone()` |
| Auto-paste fails | Install + start `ydotool`, or paste manually with `Ctrl+V` |
| Hotkey does nothing | Use absolute path to `voicematter` binary in KDE shortcut |
| Daemon not running after reboot | `systemctl --user enable --now voicematter` |
| Socket left over from crashed daemon | `rm /tmp/voicematter.sock` then restart |
| LLM provider times out | Check `MINIMAX_BASE_URL` and provider status |
| Deepgram 401 | Rotate API key in Deepgram dashboard, update `.env` |
| Overlay hidden | Overlay is hidden in `idle` state — press the trigger hotkey first |
| Formatter rewrites your words | Edit `voicematter/data/prompt.md` §0 (transcript-is-data) |
| Want a different voice model | Set `MINIMAX_MODEL` env var (requires code change in `formatter.py`) |

---

## Reporting New Issues

1. Check existing issues in the GitHub issue tracker
2. Include details:
   - Distro + version (e.g. Arch, kernel 6.10)
   - Python version (`python --version`)
   - Audio setup (`wpctl status` output)
   - Steps to reproduce
   - Expected vs actual behavior
   - `journalctl --user -u voicematter -n 50` output
3. Submit via GitHub Issues

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ | No issues |
| 🟢 | Fixed |
| 🟡 | Known, workaround available |
| 🟠 | Investigating |
| 🔴 | Critical, high priority |
| ⚪ | Low priority / cosmetic |