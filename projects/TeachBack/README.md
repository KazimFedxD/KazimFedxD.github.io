# TeachBack

> Learn by teaching — A revolutionary learning platform where you teach the AI.

<div align="center">

![TeachBack](https://img.shields.io/badge/TeachBack-AI%20Preneur%20'26-6B5DD3?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-F4B860?style=for-the-badge)
![Private](https://img.shields.io/badge/License-Private-E26D6D?style=for-the-badge)

</div>

---

## 🎯 What is TeachBack?

TeachBack is a learning platform built on a simple but powerful principle:

> **You learn best by teaching.**

Instead of the AI teaching you, the roles are reversed:
- **You explain** a topic verbally
- **The AI listens**, interrupts, and asks questions  
- **You discover** gaps in your understanding through dialogue

Learning happens through **active explanation**, not passive consumption.

---

## ✨ Core Features

| Feature | Description |
|---------|-------------|
| 🎤 **Voice-First** | Explain topics in your own words. Voice-first design keeps you focused. |
| 🧠 **AI as Student** | The AI plays a curious learner—asking questions and seeking clarity. |
| 💬 **Real-Time Feedback** | Get interrupted when unclear. Learn through dialogue, not lectures. |
| 📊 **Understanding Metrics** | Receive scores on clarity, coverage, and reasoning—not memorization. |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** — Modern UI framework
- **Vite 7** — Lightning-fast build tool
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Smooth animations
- **Lucide React** — Beautiful icons

### Backend
- **Django 5.2** — Robust Python framework
- **Django REST Framework** — Powerful API toolkit
- **Celery** — Background task processing
- **PostgreSQL 16** — Reliable database
- **Redis 7** — Caching & message queue

### Infrastructure
- **Docker Compose** — Container orchestration
- **Nginx** — Reverse proxy
- **JWT** — Secure authentication (httpOnly cookies)

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TeachBack
   ```

2. **Copy environment files**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Configure environment variables** (edit `.env` files)

4. **Start the application**
   ```bash
   docker compose up
   ```

5. **Access the app**
   - Frontend: http://localhost
   - Backend API: http://localhost/api/

---

## 📁 Project Structure

```
TeachBack/
├── AI/                     # AI-generated docs & references
│   ├── implementation-docs/
│   ├── plans/
│   └── references/
├── backend/                # Django REST API
│   ├── api/               # API endpoints
│   ├── backend/           # Django settings
│   ├── usermanagement/    # Auth & users
│   ├── email_templates/   # Email templates
│   └── utils/             # Shared utilities
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── public/
├── nginx/                 # Nginx configuration
├── certs/                 # SSL certificates
└── docker-compose.yml
```

---

## 🔐 Authentication

TeachBack uses secure JWT-based authentication:

- **httpOnly cookies** — Tokens stored securely, immune to XSS
- **Auto-refresh** — Seamless token renewal
- **Email verification** — Required before login
- **Multi-tab sync** — Auth state synced across tabs

---

## 🎨 Design System

The UI follows "The Curious Mind" theme:

| Token | Value | Usage |
|-------|-------|-------|
| Indigo | `#2E2A72` | Primary brand |
| Violet | `#6B5DD3` | Accents & focus |
| Cyan | `#6FE3E1` | Highlights |
| Background | `#0F1220` | Base |
| Elevated | `#161A2E` | Cards |

---

## 🛠️ Development

### Running Services

```bash
# Start all services
docker compose up

# View logs
docker compose logs -f

# Specific service logs
docker compose logs backend -f
docker compose logs frontend -f
```

### Database Migrations

```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

### Django Shell

```bash
docker compose exec backend python manage.py shell
```

---

## 📝 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login user |
| POST | `/api/auth/logout/` | Logout user |
| GET | `/api/auth/verify/` | Verify email |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| GET | `/api/auth/user/authenticated/` | Check auth status |
| GET | `/api/auth/user/profile/` | Get user profile |

---

## 🤝 Contributing

This is a private project. Contributions are by invitation only.

---

## 📄 License

**PROPRIETARY AND CONFIDENTIAL**

This project is private and developed for AI Preneur '26.
See [LICENSE](LICENSE) for details.

---

<div align="center">

**TeachBack** — *The best way to learn is to explain.*

Made with 💜 for AI Preneur '26

</div>
