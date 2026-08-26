# VoiceMatter System Requirements

## Operating Systems

| OS | Supported | Notes |
|----|-----------|-------|
| ✅ Arch Linux | Yes | Primary development target |
| ✅ Fedora 35+ | Yes | PipeWire + WirePlumber required |
| ✅ Ubuntu 22.04+ | Yes | PipeWire + WirePlumber required |
| ✅ Debian 12+ | Yes | PipeWire + WirePlumber required |
| ✅ KDE neon | Yes | Recommended for global hotkeys |
| ⚠️ Ubuntu 20.04 LTS | Partial | PulseAudio works, but PipeWire preferred |
| ❌ Windows | No | Relies on PipeWire + Wayland + ydotool |
| ❌ macOS | No | Different audio stack + no `wl-copy` |

> VoiceMatter is Linux-only. It depends on PipeWire, Wayland, `wl-copy`,
> and `ydotool` — none of which are available on Windows or macOS.

---

## Hardware Requirements

### Minimum

| Component | Requirement |
|-----------|-------------|
| **CPU** | x86_64 or arm64, 2+ cores |
| **RAM** | 2 GB (Python + PySide6 + Deepgram HTTPS call) |
| **Disk** | 200 MB (deps + venv) |
| **Network** | 5 Mbps up, latency <200 ms to Deepgram + LLM provider |
| **Microphone** | Any PipeWire-compatible input device |

### Recommended

| Component | Requirement |
|-----------|-------------|
| **CPU** | 4+ cores |
| **RAM** | 4 GB (room for the IDE alongside VoiceMatter) |
| **Disk** | 500 MB |
| **Network** | 20 Mbps up, <80 ms latency to API endpoints |
| **Microphone** | USB headset or dedicated condenser mic |

### For Development

| Component | Requirement |
|-----------|-------------|
| **CPU** | 4+ cores |
| **RAM** | 8 GB |
| **Disk** | 2 GB (venv + build artefacts) |
| **Display** | 1920×1080+ (KDE Plasma recommended) |

---

## Software Dependencies

### Required

| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.11+ | Runtime |
| uv | 0.4+ | Package management |
| PipeWire | 0.3.50+ | Audio server |
| WirePlumber | 0.4+ | PipeWire session manager |
| wl-clipboard (`wl-copy`) | 2.0+ | Wayland clipboard write |

### Optional (Auto-Paste)

| Software | Version | Purpose |
|----------|---------|---------|
| ydotool | 1.6+ | Synthetic input daemon |

### Optional (Autostart)

| Software | Version | Purpose |
|----------|---------|---------|
| systemd | 250+ | User service management |

---

## External Services

### Required API Access

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| Deepgram | Nova-3 STT | Yes (pay-as-you-go, $200 credit on signup) |
| Anthropic-API-compatible LLM | Transcript formatting | Provider-dependent |

### Required Environment Variables

| Environment Variable | Service |
|---------------------|---------|
| `DEEPGRAM_API_KEY` | Deepgram |
| `MINIMAX_API_KEY` | LLM provider |
| `MINIMAX_BASE_URL` | LLM provider |

### Optional Services

| Service | Purpose | When Needed |
|---------|---------|-------------|
| None | — | — |

---

## Network Requirements

### Ports Used

VoiceMatter opens **no listening TCP/UDP ports**. All communication is
local via a Unix domain socket.

| Port | Service | Required |
|------|---------|----------|
| `/tmp/voicematter.sock` (Unix socket) | daemon control surface | Yes |
| 443 (outbound HTTPS) | Deepgram + LLM provider | Yes |

### Bandwidth Requirements

| Activity | Minimum | Recommended |
|----------|---------|-------------|
| Audio upload to STT | 1 Mbps up | 5 Mbps up |
| LLM API call | <100 kB per request | <100 kB per request |

### Firewall Considerations

Outbound connections required to:

- `api.deepgram.com` (Deepgram) — HTTPS 443
- `<MINIMAX_BASE_URL>` (LLM provider) — HTTPS 443

No inbound connections are required.

---

## Browser Support

VoiceMatter has **no browser component**. The overlay is a native
PySide6 window, not a web view.

---

## Environment Compatibility Matrix

| Environment | Daemon | Overlay | Recorder | STT | LLM |
|-------------|--------|---------|----------|-----|-----|
| Arch Linux + KDE Plasma | ✅ | ✅ | ✅ | ✅ | ✅ |
| Arch Linux + GNOME | ✅ | ✅ | ✅ | ✅ | ✅ |
| Fedora + KDE Plasma | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ubuntu 22.04+ + KDE | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debian 12+ + KDE | ✅ | ✅ | ✅ | ✅ | ✅ |
| WSL2 | ❌ | ❌ | ⚠️ | ✅ | ✅ |
| Docker (Linux) | ⚠️ | ❌ | ⚠️ | ✅ | ✅ |
| Windows | ❌ | ❌ | ❌ | ✅ | ✅ |
| macOS | ❌ | ❌ | ❌ | ✅ | ✅ |

> Notes: WSL2 lacks the audio stack VoiceMatter uses. Docker works for
> the daemon CLI but has no display for the overlay.