# VoiceMatter Setup & Configuration

## Prerequisites

### Required

- **Python 3.11+** — `python --version`
- **[uv](https://docs.astral.sh/uv/)** — Astral's Python package manager
- **[PipeWire](https://pipewire.org/)** — Modern Linux audio server
- **[WirePlumber](https://pipewire.pages.freedesktop.org/wireplumber/)** — PipeWire session manager
- **Deepgram API key** — Sign up at <https://deepgram.com>
- **Anthropic-compatible LLM endpoint + key** — Any service exposing the Anthropic Messages API

### Optional (auto-paste)

- **[ydotool](https://github.com/ReimuNotMoe/ydotool)** — Synthetic input daemon

Without `ydotool`, VoiceMatter still works — text lands in the clipboard
and you paste manually with `Ctrl+V`.

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd VoiceMatter
```

### 2. Create the virtual environment

```bash
uv sync
source .venv/bin/activate
```

### 3. Install the CLI in editable mode

```bash
uv pip install -e .
```

Verify the install:

```bash
voicematter --help
```

### 4. Configure environment variables

```bash
cp .env.example .env
$EDITOR .env
```

Add three variables (see [`environment-variables.md`](environment-variables.md)):

```env
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY_HERE
MINIMAX_API_KEY=YOUR_MINIMAX_API_KEY_HERE
MINIMAX_BASE_URL=https://api.example.com/anthropic
```

### 5. Start the daemon

```bash
voicematter daemon
```

The daemon binds `/tmp/voicematter.sock` and starts the floating overlay.

### 6. Bind global hotkeys (KDE)

Open **System Settings → Keyboard → Shortcuts → Custom Shortcuts** and
create three entries that each run an absolute-path CLI command:

| Action | Command |
|--------|---------|
| Record toggle | `/absolute/path/to/.venv/bin/voicematter trigger` |
| Pause / resume | `/absolute/path/to/.venv/bin/voicematter pause` |
| Cancel | `/absolute/path/to/.venv/bin/voicematter cancel` |

Suggested bindings: F8 → trigger, F9 → pause, Esc → cancel.

---

## Configuration

### Microphone Selection

VoiceMatter uses the system default PipeWire source. To verify or
change it:

```bash
wpctl status
```

Change the default source via **KDE System Settings → Audio** or
`pavucontrol`. VoiceMatter picks up the new default automatically on the
next recording.

> Do not configure device indices — VoiceMatter ignores them. The current
> recorder does, however, prefer a device named `"USB PnP Audio Device"`
> when one is present (see [`known-issues.md`](known-issues.md)).

### Optional: `ydotool` for automatic paste

#### Arch

```bash
sudo pacman -S ydotool
sudo systemctl enable --now ydotool
```

#### Fedora

```bash
sudo dnf install ydotool
sudo systemctl enable --now ydotool
```

Without `ydotool`, VoiceMatter copies to the clipboard and stops. Paste
manually with `Ctrl+V`.

### Optional: systemd user service (autostart on login)

Create `~/.config/systemd/user/voicematter.service` with absolute paths:

```ini
[Unit]
Description=VoiceMatter

[Service]
ExecStart=/absolute/path/to/project/.venv/bin/voicematter daemon
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Reload, enable, start:

```bash
systemctl --user daemon-reload
systemctl --user enable voicematter
systemctl --user start voicematter
systemctl --user status voicematter
journalctl --user -u voicematter -f
```

---

## API Keys

| Service | Purpose | Sign-up |
|---------|---------|---------|
| [Deepgram](https://deepgram.com) | Speech-to-text (`nova-3`) | <https://console.deepgram.com/signup> |
| LLM provider (Anthropic-API compatible) | Transcript formatting | Provider-specific |

The Deepgram free tier is enough for personal use. LLM costs depend on
the provider and per-minute usage.

---

## Development Commands

```bash
uv sync                       # Install deps from lockfile
uv pip install -e .           # Install CLI in editable mode
uv run python -m voicematter.cli daemon   # Run daemon from source
uv run pytest tests/          # Smoke + step-event tests
```

The daemon accepts a few operational signals via the existing CLI
subcommands (`trigger`, `pause`, `cancel`, `stop`) and accepts arbitrary
external commands via the same Unix socket — see
[`architecture.md`](architecture.md) for the protocol.

---

## Deployment

VoiceMatter is single-user desktop software. There is no production /
staging distinction. "Deployment" is the systemd user service above.

### Production Checklist

1. **Absolute paths** — systemd `ExecStart` must point to the actual
   installed `voicematter` binary, not just `voicematter`. Run
   `which voicematter` to find it.
2. **`.env` permissions** — `chmod 600 .env` so only your user can read
   the API keys.
3. **`ydotool` running** — if you want auto-paste, ensure the service is
   active (`systemctl status ydotool`).
4. **KDE shortcuts use absolute paths** — KDE doesn't always inherit the
   shell's `PATH`.
5. **Microphone is the system default** — VoiceMatter follows PipeWire's
   default source; configure via `pavucontrol` or KDE Audio Settings.

---

## Challenges & Solutions

### Challenge 1: Microphone identification across reboots

**Problem**: Device indices from `sd.query_devices()` change every time
USB devices are plugged in. Hard-coding an index breaks the moment the
headset is replugged.

**Solution**: VoiceMatter's recorder picks the first device whose name
contains `"USB PnP Audio Device"`. The default PipeWire source is used
implicitly because it's the only one with that name on the user's box.
If you have a different mic, the lookup raises — fix by changing the
device name to match.

```python
# voicematter/recorder.py
@staticmethod
def find_microphone() -> int:
    for i, dev in enumerate(sd.query_devices()):
        if "USB PnP Audio Device" in dev["name"]:
            return i
    raise RuntimeError("Microphone not found")
```

### Challenge 2: PipeWire default source changing mid-recording

**Problem**: A `wpctl set-default` command during a long recording
should not invalidate the open stream.

**Solution**: The daemon opens the stream *once* per recording, copies
device data by closure, and never re-queries. The next recording picks
up the new default automatically.

### Challenge 3: ydotool missing on the user's machine

**Problem**: Auto-paste is the entire UX. If `ydotool` isn't there, the
tool feels broken.

**Solution**: `Writer.paste()` runs `ydotool` with `check=False` — the
exception is swallowed and the user is left with a working clipboard
write. There is no silent retry or fallback spawn.

```python
# voicematter/writer.py
def paste(self):
    subprocess.run(
        ["ydotool", "key", "29:1", "47:1", "47:0", "29:0"],
        check=False,
    )
```

### Challenge 4: LLM hijacked by transcript content

**Problem**: A user dictating "send an email to john about the deploy"
should *not* cause the LLM to attempt to send an email. The transcript
is data, not instructions.

**Solution**: The system prompt's §0 explicitly forbids the model from
acting on transcript content, plus wraps the user message in
`<transcript>` tags so the model sees a clear data boundary.

### Challenge 5: PySide6 stealing focus from the focused app

**Problem**: Showing a window normally gives it keyboard focus, which
breaks dictation into the focused application.

**Solution**: The overlay sets `Qt.WA_ShowWithoutActivating` plus
`Qt.Tool` flag. The window appears on top without taking focus.

```python
# voicematter/overlay.py
self.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.Tool)
self.setAttribute(Qt.WA_TranslucentBackground)
self.setAttribute(Qt.WA_ShowWithoutActivating)
```

### Challenge 6: Cancel race during processing

**Problem**: The user hits `cancel` while the formatter is mid-LLM-call.
A naive `state = IDLE` in the command handler doesn't actually cancel
the in-flight HTTP request.

**Solution**: The cancel handler sets a `_cancel_requested` flag; the
processing pipeline checks the flag *between every step* (after
recording stops, after transcription, after formatting, after copy,
after insert) and short-circuits to `IDLE` on the next checkpoint.

### Challenge 7: Sockets left behind on crash

**Problem**: A previous daemon that died (segfault, kill -9) leaves
`/tmp/voicematter.sock` on disk. The next daemon fails to bind.

**Solution**: The daemon's `setup_daemon` removes any existing socket
file before `bind()`.

```python
# voicematter/daemon.py
def setup_daemon(self):
    if os.path.exists(SOCKET_PATH):
        os.remove(SOCKET_PATH)
    self.server.bind(SOCKET_PATH)
```

---

## Troubleshooting

### `voicematter` command not found

```bash
source .venv/bin/activate
which voicematter
uv pip install -e .
```

### Hotkeys do nothing

KDE shortcuts don't inherit your shell's `PATH`. Use the absolute
binary path (run `which voicematter`) in the shortcut definition.

Verify the daemon is running:

```bash
voicematter trigger   # should toggle recording on the focused mic
```

If even that fails, check the socket:

```bash
ls -l /tmp/voicematter.sock
nc -U /tmp/voicematter.sock <<< '{"action":"trigger"}'
```

### Microphone not detected

```bash
wpctl status                  # is the default source set?
pavucontrol                   # change default source visually
```

VoiceMatter looks for a device named `"USB PnP Audio Device"`. If yours
is named differently, edit `Recorder.find_microphone()` in
`voicematter/recorder.py` to match.

### Daemon not running

```bash
systemctl --user status voicematter
journalctl --user -u voicematter -n 50
```

If the unit is not loaded:

```bash
systemctl --user daemon-reload
systemctl --user enable --now voicematter
```

### Automatic paste not working

```bash
ydotool --version
systemctl status ydotool
```

Clipboard still works without `ydotool` — paste manually with `Ctrl+V`.

### Socket already in use

```bash
ls -l /tmp/voicematter.sock
# If a previous daemon crashed:
rm /tmp/voicematter.sock
voicematter daemon
```

### Tests failing with "socket never appeared"

The smoke test spawns the daemon via `uv run python main.py daemon`. If
`uv` is not on PATH in the test environment:

```bash
which uv
# add to PATH or set UV_BIN
```