# TeachBack Architecture

## System Overview

TeachBack is a full-stack application using a microservices-inspired architecture. The frontend is a React SPA, the backend is a Django REST API with WebSocket support, and all services are containerized with Docker Compose.

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

## Request Flow Diagram

### HTTP Requests (REST API)
```
Client → Nginx:80 → /api/* → Django:8000 → PostgreSQL
                                  ↓
                             Response
```

### WebSocket Connections (Real-Time)
```
Client → Nginx:80 → /ws/* → Django Channels → Redis Channel Layer
                                  ↓
                        Handlers (STT, AI, TTS)
                                  ↓
                      External APIs (Deepgram, Groq, ElevenLabs)
```

### Background Tasks
```
Django → Celery Task Queue (Redis) → Celery Worker → PostgreSQL
                                          ↓
                                   External APIs
```

---

## Tech Stack

### Frontend

#### React 19
- **Purpose**: Modern UI framework for building the SPA
- **Why Chosen**: Latest React with concurrent features, excellent ecosystem
- **Key Usage**: Component architecture, hooks, context for state

#### Vite 7
- **Purpose**: Lightning-fast build tool and dev server
- **Why Chosen**: Near-instant hot module replacement, faster than alternatives
- **Key Usage**: Development server, production bundling, env variable injection

#### Tailwind CSS 4
- **Purpose**: Utility-first CSS framework
- **Why Chosen**: Rapid styling, consistent design system, small bundle size
- **Key Usage**: All component styling, responsive design, dark theme

#### Framer Motion
- **Purpose**: Animation library for React
- **Why Chosen**: Declarative animations, excellent gesture support
- **Key Usage**: Page transitions, UI interactions, loading states

#### React Router v7
- **Purpose**: Client-side routing
- **Why Chosen**: Industry standard, excellent React integration
- **Key Usage**: Page navigation, protected routes, URL parameters

---

### Backend

#### Django 5.2
- **Purpose**: Python web framework for the REST API
- **Why Chosen**: Robust ORM, excellent security, rapid development
- **Key Usage**: Models, views, authentication, middleware

#### Django REST Framework
- **Purpose**: REST API toolkit for Django
- **Why Chosen**: Serialization, viewsets, permissions, throttling
- **Key Usage**: All API endpoints, JWT integration, rate limiting

#### Django Channels
- **Purpose**: WebSocket support for Django
- **Why Chosen**: Native Django integration, ASGI support
- **Key Usage**: Real-time audio streaming, live events

#### Celery
- **Purpose**: Distributed task queue
- **Why Chosen**: Reliable async task processing, retries, scheduling
- **Key Usage**: Background evaluation, email sending, cleanup tasks

#### Django Celery Beat
- **Purpose**: Periodic task scheduler
- **Why Chosen**: Database-backed scheduler, Django admin integration
- **Key Usage**: Scheduled cleanups, analytics aggregation

---

### Database & Cache

#### PostgreSQL 16
- **Purpose**: Primary relational database
- **Why Chosen**: ACID compliance, JSON support, excellent performance
- **Key Usage**: Users, sessions, evaluations, transcripts

#### Redis 7
- **Purpose**: In-memory data store for caching and message queue
- **Why Chosen**: Fast, reliable, excellent Django/Celery integration
- **Key Usage**: 
  - Celery broker (task queue)
  - Django cache backend
  - Channels channel layer
  - Rate limiting storage

---

## Main Real-Time Teaching Flow (Voice → AI → Voice)

This section describes the **core live interaction loop** of TeachBack.  
It shows how user voice input moves through the system, updates session state, and returns as AI voice output in real time.

---

### High-Level Flow

```
User speaks
   ↓
Frontend captures audio (Web Audio API)
   ↓
WebSocket audio stream
   ↓
Streaming STT (Speech-to-Text)
   ↓
SessionState updated (transcript + understanding)
   ↓
Real-time AI reasoning
   ↓
SessionState updated (questions, confidence, gaps)
   ↓
Text-to-Speech (TTS)
   ↓
Audio streamed back to frontend
   ↓
User hears AI and continues speaking
   ↺ (loop repeats)
```

---

### Detailed System Flow

```
┌────────────────────────┐
│        User            │
│     (Speaking)         │
└──────────┬─────────────┘
           ▼
┌────────────────────────┐
│ Frontend (React SPA)   │
│ - Microphone Capture   │
│ - Web Audio API        │
└──────────┬─────────────┘
           ▼  WebSocket (audio frames)
┌────────────────────────┐
│ Django Channels        │
│ (Real-Time Orchestrator)
└──────────┬─────────────┘
           ▼
┌────────────────────────┐
│ Streaming STT          │
│ (Deepgram)             │
└──────────┬─────────────┘
           ▼  Partial transcripts
┌────────────────────────┐
│ SessionState           │
│ (Redis + DB snapshot)  │
│ - Transcript buffer    │
│ - Topic coverage       │
│ - Confidence levels    │
└──────────┬─────────────┘
           ▼
┌────────────────────────┐
│ Real-Time AI Logic     │
│ (LLM / OpenAI)         │
│ - Detect confusion     │
│ - Decide interruption  │
│ - Generate questions   │
└──────────┬─────────────┘
           ▼  AI response
┌────────────────────────┐
│ SessionState (Update)  │
│ - Questions asked      │
│ - Open gaps            │
│ - Confidence changes   │
└──────────┬─────────────┘
           ▼
┌────────────────────────┐
│ Text-to-Speech (TTS)   │
│ (ElevenLabs / DG)      │
└──────────┬─────────────┘
           ▼  Audio stream
┌────────────────────────┐
│ Frontend Playback      │
│ (Web Audio API)        │
└──────────┬─────────────┘
           ▼
      User listens and responds
           ↺
```

---

### Core Principles of the Flow

- SessionState is updated **after STT** and **after AI reasoning**
- AI responses are always grounded in current session state
- Interruptions are cancelable if the user starts speaking
- The system is fully real-time, not turn-based

---

### One-Line Summary

**Voice → Text → State → Reasoning → State → Voice → Repeat**
---


### Infrastructure

#### Docker Compose
- **Purpose**: Multi-container orchestration
- **Why Chosen**: Simple local development, consistent environments
- **Services**: db, backend, frontend, celery, celery-beat, redis, nginx

#### Nginx
- **Purpose**: Reverse proxy and static file serving
- **Why Chosen**: High performance, WebSocket support, SSL termination
- **Key Usage**: Route `/api/*` to backend, `/*` to frontend, WebSocket upgrade

---

### External Services

#### Deepgram
- **Purpose**: Speech-to-text transcription
- **Why Chosen**: Real-time streaming, high accuracy, developer-friendly API
- **Usage**: Convert user audio to text

#### Groq
- **Purpose**: LLM inference for AI responses and evaluation
- **Why Chosen**: Fast inference, cost-effective, OpenAI-compatible API
- **Usage**: Generate questions, analyze transcripts, produce evaluations

#### ElevenLabs / Deepgram TTS
- **Purpose**: Text-to-speech for AI voice responses
- **Why Chosen**: Natural-sounding voices, streaming support
- **Usage**: Convert AI text responses to spoken audio

---

## Component Breakdown

### Frontend Structure
```
frontend/src/
├── App.jsx              # Root component, routing
├── main.jsx             # React entry point
├── index.css            # Global styles, Tailwind imports
├── components/
│   ├── layout/
│   │   ├── Header.jsx   # Navigation bar
│   │   └── Footer.jsx   # Site footer
│   └── ui/              # Reusable UI components
├── contexts/
│   └── AuthContext.jsx  # Authentication state
├── hooks/
│   ├── useWebSocket.js  # WebSocket connection management
│   ├── useAlert.js      # Toast notifications
│   └── useErrorHandler.js
├── pages/
│   ├── HomePage.jsx     # Landing page
│   ├── SessionPage.jsx  # Teaching session interface
│   ├── SessionsPage.jsx # Session history list
│   ├── EvaluationPage.jsx # Evaluation results
│   ├── LoginPage.jsx    # User login
│   ├── RegisterPage.jsx # User registration
│   └── VerifyPage.jsx   # Email verification
└── utils/
    ├── api.js           # API utilities
    ├── apiClient.js     # Centralized API client
    ├── auth.js          # Auth utilities
    └── errorHandler.js  # Error processing
```

### Backend Structure
```
backend/
├── backend/             # Django project config
│   ├── settings.py      # Django settings
│   ├── urls.py          # URL routing
│   ├── celery.py        # Celery configuration
│   ├── middleware.py    # Custom middleware
│   └── asgi.py          # ASGI entry point
├── usermanagement/      # User auth app
│   ├── models.py        # User model
│   ├── views.py         # Auth endpoints
│   ├── serializers.py   # DRF serializers
│   └── middleware.py    # JWT cookie auth
├── sessions/            # Teaching sessions app
│   ├── models.py        # Session, Evaluation models
│   ├── views.py         # Session API endpoints
│   ├── tasks.py         # Celery tasks
│   └── serializers.py
├── stream/              # WebSocket app
│   ├── consumers.py     # WebSocket consumer
│   └── routing.py       # WebSocket URL routing
├── handlers/            # Business logic handlers
│   ├── stt.py           # Speech-to-text
│   ├── ai.py            # AI question generation
│   ├── tts.py           # Text-to-speech
│   └── evaluation.py    # Session evaluation
├── utils/               # Shared utilities
│   ├── mail.py          # Email sending
│   ├── error_handler.py # Standardized responses
│   ├── encryption.py    # Data encryption
│   └── permissions.py   # Custom permissions
└── email_templates/     # HTML email templates
```

---

## Database Design

### Core Models

#### User (Django Auth)
```
users
├── id (UUID)
├── email (unique)
├── username
├── password (hashed)
├── is_verified
├── is_active
└── created_at
```

#### Session
```
sessions
├── id (UUID)
├── user_id (FK → users)
├── topic
├── grade_level
├── status (idle/active/paused/evaluating/completed/ended)
├── created_at
├── updated_at
└── completed_at
```

#### SessionState
```
session_states
├── id
├── session_id (FK → sessions)
├── state_data (JSON) — Full session state snapshot
└── updated_at
```

#### Evaluation
```
evaluations
├── id (UUID)
├── session_id (FK → sessions)
├── verdict (text)
├── explanation_readiness
├── scores (JSON)
├── feedback_points (JSON)
└── created_at
```

### Relationships
```
User ──1:N──→ Session ──1:1──→ SessionState
                    └──1:1──→ Evaluation
```

---

## API Design

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login, set cookies | No |
| POST | `/api/auth/logout/` | Logout, clear cookies | Yes |
| GET | `/api/auth/verify/` | Verify email with code | No |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |
| GET | `/api/auth/user/authenticated/` | Check auth status | Yes |
| GET | `/api/auth/user/profile/` | Get user profile | Yes |

### Session Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/sessions/create/` | Create new session | Yes |
| GET | `/api/sessions/` | List user's sessions | Yes |
| GET | `/api/sessions/{id}/` | Get session details | Yes |
| POST | `/api/sessions/end/` | End current session | Yes |
| GET | `/api/sessions/{id}/evaluation/` | Get evaluation | Yes |

### WebSocket Endpoint

| Endpoint | Description |
|----------|-------------|
| `/ws/session/{session_id}/` | Teaching session connection |

---

## Deployment Architecture

### Docker Compose Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| db | postgres:16 | 5432 | Database |
| redis | redis:7 | 6379 | Cache/Queue |
| backend | ./backend | 8000 | Django API |
| frontend | ./frontend | 5173 | Vite dev server |
| celery | ./backend | - | Task worker |
| celery-beat | ./backend | - | Task scheduler |
| nginx | nginx:alpine | 80 | Reverse proxy |

### Volume Mounts
- `postgres_data` — Database persistence
- `./backend` → `/app` — Backend code (dev)
- `./frontend` → `/app` — Frontend code (dev)

---

## Security Architecture

### Authentication Flow
```
1. Register → Hash password → Store user
2. Login → Verify password → Generate JWT → Set httpOnly cookies
3. Request → Cookie sent automatically → JWT validated → User identified
4. Token expires → Auto-refresh from refresh token cookie
```

### Security Measures

| Measure | Implementation |
|---------|----------------|
| Password Hashing | Django's PBKDF2 |
| JWT Tokens | httpOnly, Secure, SameSite cookies |
| CSRF Protection | Django middleware |
| Rate Limiting | django-ratelimit with Redis |
| Input Validation | DRF serializers |
| Email Verification | Required before login |
| SQL Injection | Django ORM parameterization |
| XSS Prevention | React's automatic escaping |

---

## Project Directory Structure

```
TeachBack/
├── AI/                        # AI-generated documentation
│   ├── implementation-docs/   # Feature implementation docs
│   ├── plan/                  # Implementation plans
│   └── references/            # Reference documents
├── backend/                   # Django REST API
│   ├── api/                   # General API endpoints
│   ├── backend/               # Django project settings
│   ├── email_templates/       # HTML email templates
│   ├── handlers/              # Business logic (STT, AI, TTS)
│   ├── sessions/              # Sessions app
│   ├── stream/                # WebSocket consumers
│   ├── usermanagement/        # Auth & users
│   └── utils/                 # Shared utilities
├── frontend/                  # React application
│   ├── public/                # Static assets
│   └── src/                   # Source code
├── nginx/                     # Nginx configuration
├── certs/                     # SSL certificates
├── .github/                   # GitHub config & instructions
└── docker-compose.yml         # Container orchestration
```
