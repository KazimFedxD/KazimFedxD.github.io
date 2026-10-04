# TeachBack Video & Media Assets

## Demo Video

### Main Demo
- **File**: `teachback.mp4` (located in `.website/screenshots/`)
- **YouTube**: [Project Demo](placeholder)
- **Duration**: Full feature showcase
- **Status**: ✅ Video created, 📋 Needs YouTube upload

**Note**: The video file `teachback.mp4` has been created and is ready for upload to YouTube. Follow the instructions in `admin_instructions.md` Task 2 to upload and update this link.

### Demo Script Outline
1. **Intro** (30s) — What is TeachBack? The "learn by teaching" concept
2. **Registration & Login** (30s) — Quick signup flow
3. **Starting a Session** (30s) — Topic selection, session creation
4. **Teaching Demo** (90s) — Speaking, seeing transcript, AI questions
5. **AI Interaction** (60s) — Being interrupted, answering questions
6. **Evaluation** (30s) — Viewing scores and feedback
7. **Outro** (30s) — Summary and call to action

---

## Feature Animations

### Teaching Session Flow
![Teaching Session](screenshots/session-flow.gif)
- **Duration**: 10-15 seconds
- **Content**: User speaking → Transcript appearing → AI interrupting
- **Status**: 📋 Pending creation

### Real-Time Transcript
![Transcript](screenshots/transcript.gif)
- **Duration**: 5-8 seconds
- **Content**: Words appearing as user speaks
- **Status**: 📋 Pending creation

### Evaluation Results
![Evaluation](screenshots/evaluation.gif)
- **Duration**: 5-8 seconds
- **Content**: Score bars animating, verdict appearing
- **Status**: 📋 Pending creation

### AI Question Popup
![AI Question](screenshots/ai-question.gif)
- **Duration**: 3-5 seconds
- **Content**: Question card sliding in, audio playing indicator
- **Status**: 📋 Pending creation

---

## Architecture Diagrams

### System Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│   │ React SPA   │  │  WebSocket  │  │  Web Audio API      │    │
│   │ (UI/State)  │  │  Client     │  │  (TTS Playback)     │    │
│   └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘    │
└──────────┼────────────────┼────────────────────┼────────────────┘
           │                │                    │
           ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Nginx Reverse Proxy (:80)                   │
│         /api/* → Backend     /* → Frontend (dev server)        │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Backend    │    │    Celery    │    │ Celery Beat  │
│  Django :8000│    │   Worker     │    │  Scheduler   │
│  + Channels  │    └──────┬───────┘    └──────┬───────┘
└──────┬───────┘           │                   │
       │                   └───────────────────┘
       │                           │
       ▼                           ▼
┌──────────────┐           ┌──────────────┐
│ PostgreSQL   │           │    Redis     │
│   :5432      │           │    :6379     │
│  (Database)  │           │ (Cache/Queue)│
└──────────────┘           └──────────────┘
```

### Audio Flow Diagram
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Browser    │    │   Backend    │    │  Deepgram    │
│  Microphone  │───▶│  WebSocket   │───▶│   STT API    │
└──────────────┘    └──────┬───────┘    └──────────────┘
                           │
                           ▼ Transcript
                    ┌──────────────┐
                    │   Groq AI    │
                    │  (Analysis)  │
                    └──────┬───────┘
                           │
                           ▼ Question
                    ┌──────────────┐
                    │  ElevenLabs  │
                    │   TTS API    │
                    └──────┬───────┘
                           │
                           ▼ Audio
┌──────────────┐    ┌──────────────┐
│   Browser    │◀───│   Backend    │
│ Web Audio API│    │  WebSocket   │
└──────────────┘    └──────────────┘
```

### Session State Machine
```
┌────────┐
│  IDLE  │
└───┬────┘
    │ Create Session
    ▼
┌────────┐     User Pause     ┌────────┐
│ ACTIVE │◄──────────────────▶│ PAUSED │
└───┬────┘     Resume         └────────┘
    │ End Session
    ▼
┌────────────┐
│ EVALUATING │
└─────┬──────┘
      │ Evaluation Complete
      ▼
┌───────────┐
│ COMPLETED │
└───────────┘
```

---

## Screenshot Catalog

### Desktop Screenshots

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `homepage.png` | Landing page with hero section | ✅ Complete |
| 2 | `session-active.png` | Active teaching session with transcript | ✅ Complete |
| 3 | `session-ai-question.png` | AI question interruption | ✅ Complete |
| 4 | `sessions-list.png` | Session history page | ✅ Complete |
| 5 | `evaluation.png` | Evaluation results page | ✅ Complete |

### Mobile Screenshots

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `mobile-homepage.png` | Mobile homepage | ✅ Complete |
| 2 | `mobile-session.png` | Mobile session view | ✅ Complete |

### Video Assets

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `teachback.mp4` | Full feature showcase video | ✅ Created, 📋 Needs YouTube upload |

| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `mobile-home.png` | Mobile homepage | 📋 Pending |
| 2 | `mobile-nav.png` | Mobile navigation menu | 📋 Pending |
| 3 | `mobile-session.png` | Mobile session view | 📋 Pending |
| 4 | `mobile-evaluation.png` | Mobile evaluation | 📋 Pending |

---

## Screenshot Specifications

### Resolution Requirements
- **Desktop**: 1920×1080 minimum (16:9)
- **Mobile**: 390×844 (iPhone 14 Pro ratio)
- **Format**: PNG (preferred) or JPEG
- **Quality**: High quality, minimal compression

### Content Guidelines
- Show real functionality (not lorem ipsum)
- Use example topic like "The Water Cycle" or "Photosynthesis"
- Blur any personal/sensitive information
- Consistent browser window size
- Clean browser (no extra tabs/extensions visible)

### Capture Tools
- **Full Page**: GoFullPage extension, Screely
- **Annotated**: Cleanshot, Skitch
- **GIF**: LICEcap, ScreenToGif, Kap

---

## Presentation Materials

### Slide Deck
- **Format**: PDF / Google Slides
- **Location**: `.website/presentation.pdf`
- **Status**: 📋 Pending creation

### Slide Outline
1. Title slide — TeachBack: Learn by Teaching
2. Problem — Why passive learning fails
3. Solution — The "protégé effect"
4. How it works — Core learning loop
5. Technology — Tech stack overview
6. Demo — Key screenshots
7. Results — Sample evaluation
8. Future — Roadmap highlights
9. Team — Contributor info
10. Contact — Links and next steps

---

## Brand Assets

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Indigo | `#2E2A72` | Primary brand |
| Violet | `#6B5DD3` | Accents, focus |
| Cyan | `#6FE3E1` | Highlights |
| Deep Navy | `#0B2A44` | Dark backgrounds |
| Teal Blue | `#1FB5B8` | CTAs, links |

### Typography
- **Headings**: System font stack (SF Pro, Segoe UI, Roboto)
- **Body**: System font stack
- **Monospace**: JetBrains Mono, Consolas

### Logo
- **Status**: 📋 Pending design
- **Location**: `.website/screenshots/logo.png`
- **Variants**: Light, dark, icon-only

---

## Media File Sizes

Target sizes for web optimization:

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
