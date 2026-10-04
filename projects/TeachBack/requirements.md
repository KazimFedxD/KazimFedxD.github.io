# TeachBack System Requirements

## Operating Systems

| OS | Supported | Notes |
|----|-----------|-------|
| ✅ Windows 10/11 | Yes | Docker Desktop required |
| ✅ macOS 12+ (Monterey) | Yes | Docker Desktop or Colima |
| ✅ Ubuntu 20.04+ | Yes | Native Docker support |
| ✅ Debian 11+ | Yes | Native Docker support |
| ✅ Fedora 35+ | Yes | Native Docker support |
| ⚠️ Windows WSL2 | Partial | Through WSL2 backend |

---

## Hardware Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **CPU** | Dual-core 2.0 GHz (x64) |
| **RAM** | 4 GB |
| **Disk Space** | 5 GB free |
| **Network** | Broadband internet connection |

### Recommended Requirements

| Component | Requirement |
|-----------|-------------|
| **CPU** | Quad-core 2.5 GHz+ |
| **RAM** | 8 GB |
| **Disk Space** | 10 GB free (SSD preferred) |
| **Network** | Stable broadband for real-time audio |

### For Development

| Component | Requirement |
|-----------|-------------|
| **CPU** | Quad-core 3.0 GHz+ |
| **RAM** | 16 GB |
| **Disk Space** | 20 GB free (SSD required) |
| **Display** | 1920x1080 minimum |

---

## Software Dependencies

### Required (Docker Setup)

| Software | Version | Purpose |
|----------|---------|---------|
| Docker | 20.10+ | Container runtime |
| Docker Compose | 2.0+ | Container orchestration |
| Git | 2.30+ | Source code management |

### Optional (Local Development)

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18+ | Frontend development |
| npm | 9+ | Package management |
| Python | 3.11+ | Backend development |
| PostgreSQL | 14+ | Local database |
| Redis | 7+ | Local cache/queue |

---

## Browser Support

### Fully Supported

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| ✅ Google Chrome | 90+ | Recommended |
| ✅ Mozilla Firefox | 88+ | Full support |
| ✅ Microsoft Edge | 90+ | Chromium-based |
| ✅ Safari | 14+ | macOS/iOS |

### Limited Support

| Browser | Status | Issues |
|---------|--------|--------|
| ⚠️ Safari iOS | Partial | Web Audio API limitations |
| ⚠️ Opera | Partial | Not actively tested |
| ❌ Internet Explorer | Not supported | End of life |

### Browser Requirements

- **JavaScript**: ES2020+ support required
- **WebSocket**: Full support required
- **MediaRecorder API**: Required for audio capture
- **Web Audio API**: Required for TTS playback
- **Cookies**: Must be enabled for authentication

---

## External Services

### Required API Access

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Deepgram** | Speech-to-text | Yes (limited) |
| **Groq** | AI/LLM inference | Yes (rate limited) |
| **ElevenLabs** | Text-to-speech | Yes (limited characters) |

### Required Credentials

| Environment Variable | Service |
|---------------------|---------|
| `DEEPGRAM_API_KEY` | Deepgram |
| `GROQ_API_KEY` | Groq |
| `ELEVENLABS_API_KEY` | ElevenLabs |

### Optional Services

| Service | Purpose | When Needed |
|---------|---------|-------------|
| SMTP Server | Email delivery | User registration |
| Sentry | Error tracking | Production monitoring |
| AWS S3 | File storage | Audio recording storage |

---

## Network Requirements

### Ports Used

| Port | Service | Required |
|------|---------|----------|
| 80 | HTTP (Nginx) | Yes |
| 443 | HTTPS | Production |
| 5173 | Frontend dev | Development |
| 8000 | Backend API | Development |
| 5432 | PostgreSQL | Internal |
| 6379 | Redis | Internal |

### Bandwidth Requirements

| Activity | Minimum | Recommended |
|----------|---------|-------------|
| Page load | 1 Mbps | 5 Mbps |
| Audio streaming | 100 Kbps | 500 Kbps |
| TTS playback | 128 Kbps | 256 Kbps |

### Firewall Considerations

Outbound connections required to:
- `api.deepgram.com` (STT)
- `api.groq.com` (AI)
- `api.elevenlabs.io` (TTS)
- SMTP server (Email)

---

## Mobile Device Requirements

### Recommended Mobile Specs

| Component | Requirement |
|-----------|-------------|
| **OS** | iOS 14+ / Android 10+ |
| **Browser** | Chrome Mobile / Safari |
| **RAM** | 3 GB+ |
| **Microphone** | Required for voice input |
| **Network** | 4G or WiFi |

### Mobile Limitations

- Web Audio API may have autoplay restrictions
- Safari iOS requires user interaction to start audio
- Background audio may pause on some devices
- Screen sleep can interrupt sessions

---

## Docker Image Requirements

### Base Images Used

| Service | Image | Size |
|---------|-------|------|
| Database | postgres:16 | ~400 MB |
| Cache | redis:7 | ~30 MB |
| Backend | python:3.11-slim | ~150 MB |
| Frontend | node:18-alpine | ~120 MB |
| Proxy | nginx:alpine | ~20 MB |

### Total Docker Storage

| State | Disk Usage |
|-------|------------|
| Images only | ~700 MB |
| With volumes | ~2 GB |
| Development (with caches) | ~5 GB |

---

## Environment Compatibility Matrix

| Environment | Backend | Frontend | Database | Cache |
|-------------|---------|----------|----------|-------|
| Docker (recommended) | ✅ | ✅ | ✅ | ✅ |
| Local macOS | ✅ | ✅ | ✅ | ✅ |
| Local Linux | ✅ | ✅ | ✅ | ✅ |
| Local Windows | ⚠️ | ✅ | ✅ | ⚠️ |
| WSL2 | ✅ | ✅ | ✅ | ✅ |

Notes:
- Windows native may have path issues with Python
- Redis on Windows requires WSL2 or Docker
- Docker provides the most consistent experience
