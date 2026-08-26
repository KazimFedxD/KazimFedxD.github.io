# VoiceMatter Architecture

## System Overview

VoiceMatter is a single-process, multi-thread Python daemon with three
cooperating roles inside one OS process: the **daemon core** (audio +
state machine + Unix socket), the **formatter** (STT + LLM calls), and
the **overlay** (PySide6 floating window). All inter-role communication
happens over newline-delimited JSON on `/tmp/voicematter.sock`.

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
           │
           ▼
   ┌────────────────┐
   │  EventHandler  │   trigger / pause / cancel / stop
   │  (CLI / KDE)   │
   └────────────────┘
```

```
External services (network)
        ┌────────────────┐         ┌─────────────────────┐
        │  Deepgram API  │         │  LLM API (Anthropic)│
        │  Nova-3 STT    │         │  MiniMax-M3 model   │
        └────────┬───────┘         └─────────┬───────────┘
                 │ HTTPS                      │ HTTPS
                 ▼                            ▼
        (transcriber.transcribe)    (formatter.format)
```

## Request Flow Diagram

### Recording → Processing → Ready

```
Hotkey  →  voicematter trigger   →  AF_UNIX socket  →  daemon
                                                      │
   ┌──────────────────────────────────────────────────┘
   ▼
state: IDLE → RECORDING
   ├─ recorder.start_recording()        (sounddevice.InputStream)
   ├─ level emitter thread (20 Hz emit("level", level=...))
   └─ emit("state", state="recording")

──── user presses hotkey again ────

state: RECORDING → PROCESSING
   ├─ emit("step", name="transcribe", status="started")
   ├─ transcriber.transcribe(audio_bytes)        → Deepgram Nova-3
   ├─ emit("step", name="transcribe", status="done")
   ├─ emit("step", name="format",     status="started")
   ├─ formatter.format(transcript)              → Anthropic-API
   ├─ emit("step", name="format",     status="done")
   ├─ emit("step", name="copy",       status="started")
   ├─ writer.copy(formatted)                    → wl-copy
   ├─ emit("step", name="copy",       status="done")
   ├─ emit("step", name="insert",     status="started")
   ├─ writer.paste()                            → ydotool (optional)
   ├─ emit("step", name="insert",     status="done")
   ├─ state: PROCESSING → IDLE
   └─ emit("ready", text=formatted)
```

### Subscriber Event Stream

```
Subscriber.connect()
   │
   ├─ send: {"action":"subscribe"}\n
   ▼
daemon._serve_subscriber(conn):
   ├─ append conn to _subscribers
   ├─ emit("state", state=<current>)      ← state sync on connect
   ▼
forever:
   ├─ recv events pushed by daemon.emit()
   │     {event:"state"|"level"|"step"|"ready"|"error"|"shutdown"}
   ├─ recv commands from same socket:
   │     {"action":"pause"|"resume"|"cancel"|"copy"|"trigger"|"stop"}
   └─ dispatch command to daemon
```

### Cancel Mid-Pipeline

```
cancel received
   ├─ if RECORDING/PAUSED:  recorder.stop_recording() → state IDLE
   └─ if PROCESSING:        set _cancel_requested = True
                            └─ checked between every pipeline step
                            └─ on next checkpoint: _cancel_to_idle()
                            └─ emit("error", message="Cancelled")
```

## Tech Stack

### Audio Capture

#### sounddevice
- **Purpose**: PortAudio bindings for cross-platform audio input
- **Why Chosen**: Mature, well-supported, NumPy-friendly
- **Key Usage**: `sd.InputStream(device=..., callback=self.callback)`

#### NumPy
- **Purpose**: Vectorised audio math (RMS for the level meter)
- **Why Chosen**: Stdlib-adjacent for numeric work; already a transitive dep
- **Key Usage**: `np.sqrt(np.mean(indata ** 2))` per audio block

### Speech & LLM

#### Deepgram SDK (Nova-3)
- **Purpose**: Speech-to-text with built-in punctuation/capitalisation
- **Why Chosen**: Best latency/accuracy tradeoff for dictation; multi-language
- **Usage**: `client.listen.v1.media.transcribe_file(...)` with `smart_format=True`

#### Anthropic SDK
- **Purpose**: Format transcripts with a Claude-class LLM
- **Why Chosen**: Compatible with any Anthropic-API endpoint (not just Anthropic)
- **Usage**: `client.messages.create(model="MiniMax-M3", system=..., messages=[...])`

### UI

#### PySide6 (Qt 6)
- **Purpose**: Frameless, always-on-top floating overlay
- **Why Chosen**: Best Linux desktop integration; supports Wayland
- **Key Usage**: `Qt.WindowStaysOnTopHint | Qt.Tool | Qt.WA_ShowWithoutActivating`

#### Custom QPainter rendering
- **Purpose**: Draw the pill manually (translucent fill, rounded corners)
- **Why Chosen**: No CSS engine needed; full control over animation timing

### Integration

#### wl-copy
- **Purpose**: Write formatted text to the Wayland clipboard
- **Why Chosen**: Default on every modern Linux desktop; no daemon to spawn

#### ydotool
- **Purpose**: Synthesise `Ctrl+V` keystrokes at the compositor level
- **Why Chosen**: Works under Wayland where xdotool fails
- **Optional**: Auto-paste silently degrades to clipboard-only if missing

#### PipeWire + WirePlumber
- **Purpose**: System audio graph; default source selection
- **Why Chosen**: Required by `sounddevice` on modern Linux

### Plumbing

#### python-dotenv
- **Purpose**: Load `.env` at import time
- **Usage**: `load_dotenv()` at module top in `transcriber.py` /
  `formatter.py`

#### Unix domain socket
- **Purpose**: Single control surface for all clients
- **Protocol**: Newline-delimited JSON; commands and events share the
  same socket for subscribers.

## Component Breakdown

```
voicematter/
├── __init__.py             # Re-exports VoiceMatterDaemon as VoiceMatter
├── cli.py                  # Subcommand dispatcher (daemon / trigger / pause / cancel / stop / dict)
├── daemon.py               # VoiceMatterDaemon — state machine + socket server + processing pipeline
├── recorder.py             # Recorder — sounddevice.InputStream wrapper with RMS meter
├── transcriber.py          # Transcriber — Deepgram Nova-3 wrapper
├── formatter.py            # Formatter — Anthropic-API LLM call
├── writer.py               # Writer — wl-copy + ydotool injection
├── overlay.py              # Overlay — PySide6 frameless floating pill
├── events.py               # EventHandler + Subscriber — Unix-socket clients
├── dict.py                 # DictManager — persisted variable substitution
├── helper.py               # debug() printer
└── data/
    ├── prompt.md           # LLM system prompt (editor-not-writer spec)
    └── dict.json           # Variables injected into the formatter prompt
```

```
tests/
├── smoke_test.py           # End-to-end daemon pub/sub walk
└── test_step_events.py     # Per-step event ordering assertions
```

## API Design

VoiceMatter has no HTTP API. The control surface is the Unix socket at
`/tmp/voicematter.sock` using newline-delimited JSON. Two client modes:

### Commands (any client may send)

| Action | Effect | Allowed in state |
|--------|--------|------------------|
| `trigger` | `IDLE → RECORDING` or `RECORDING/PAUSED → PROCESSING` | any except PROCESSING |
| `pause` | `RECORDING → PAUSED` (toggle) | RECORDING / PAUSED |
| `resume` | `PAUSED → RECORDING` | PAUSED |
| `cancel` | Drop in-flight audio; return to `IDLE` | any |
| `copy` | Re-copy the last transcription | any (no-op if empty) |
| `subscribe` | Promote connection to persistent event subscriber | any |
| `stop` | Shut down the daemon | any |

### Events (daemon → subscriber)

| Event | Payload | When |
|-------|---------|------|
| `state` | `{state}` | Every transition (also emitted once on subscribe) |
| `level` | `{level: 0.0..1.0}` | 20 Hz while recording |
| `step` | `{name, status}` | Each pipeline step (`started`/`done`) |
| `ready` | `{text}` | After successful paste |
| `error` | `{message}` | On any failure or cancellation |
| `shutdown` | `{}` | When `stop` is received |

## Security Architecture

### Trust Boundaries

```
┌──────────────────────────────────────────────────────────┐
│                  User's desktop session                  │
│                                                          │
│  ┌─────────────┐  AF_UNIX socket   ┌────────────────┐   │
│  │ trusted:    │◄────────────────►│ trusted:        │   │
│  │ user shell  │  /tmp/voicematter │ daemon process │   │
│  │ (uid=user)  │   .sock           │ (uid=user)     │   │
│  └─────────────┘                   └────────┬─────────┘   │
│                                            │             │
└────────────────────────────────────────────┼─────────────┘
                                             │ HTTPS (TLS)
                                             ▼
                              ┌─────────────────────────────┐
                              │  untrusted: external APIs    │
                              │  Deepgram, Anthropic-API    │
                              └─────────────────────────────┘
```

### Security Measures

| Risk | Mitigation |
|------|------------|
| Local privilege escalation via socket | Socket is owned by the user; file mode defaults to `0600` on bind. Other users cannot connect. |
| API key theft from disk | `.env` is `.gitignore`d; keys are never logged. |
| Prompt injection via spoken text | `prompt.md` §0 explicitly forbids the LLM from executing commands embedded in the transcript. Wrapping `<transcript>` tags separate user data from instructions. |
| LLM leaking user variables | `dict.json` is local; variables are appended to the system prompt, not user content. |
| Audio capture leak when idle | Recorder's stream is created on `start_recording()` and closed on `stop_recording()`; no continuous capture. |
| `ydotool` injection failure | `check=False` swallows errors; user pastes manually. No silent retry. |

## Deployment Architecture

VoiceMatter is a single-user desktop tool. There is no Docker, no
reverse proxy, no managed database.

### Single-Process Services

| Process | Image / Runtime | Port | Purpose |
|---------|----------------|------|---------|
| `voicematter daemon` | Python 3.11 + uv | `/tmp/voicematter.sock` | Audio + STT + LLM + clipboard + overlay |

### systemd User Service

| Unit | Path | Auto-start |
|------|------|------------|
| `voicematter.service` | `~/.config/systemd/user/voicematter.service` | Yes (`WantedBy=default.target`) |

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

### Volume Mounts / Files

| Path | Purpose |
|------|---------|
| `~/.config/systemd/user/voicematter.service` | systemd unit |
| `~/.local/share/voicematter/` | *(reserved — not currently used)* |
| `/tmp/voicematter.sock` | Daemon control socket |
| `.env` (project root) | API keys (user-owned, mode 0600) |

## Project Directory Structure

```
VoiceMatter/
├── voicematter/             # Python package — all runtime code
│   ├── cli.py               # Entry point
│   ├── daemon.py            # State machine + socket server
│   ├── recorder.py          # Audio capture
│   ├── transcriber.py       # Deepgram wrapper
│   ├── formatter.py         # LLM call
│   ├── writer.py            # wl-copy + ydotool
│   ├── overlay.py           # PySide6 floating window
│   ├── events.py            # Socket clients
│   ├── dict.py              # Persisted variables
│   ├── helper.py            # debug() helper
│   └── data/
│       ├── prompt.md        # LLM system prompt
│       └── dict.json        # Variables for the prompt
├── tests/                   # Smoke + step-event tests
│   ├── smoke_test.py
│   └── test_step_events.py
├── design/                  # Overlay mockup + design spec
│   ├── overlay_design.md
│   └── overlay-design.png
├── build/                   # Distribution artifacts
├── .venv/                   # Virtual environment (uv)
├── pyproject.toml           # PEP 621 metadata
├── uv.lock                  # Resolved dependency tree
├── .python-version          # 3.11
├── .env.example             # Sanitized env template
└── README.md                # User-facing quickstart
```