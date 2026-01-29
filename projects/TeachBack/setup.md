# TeachBack Setup & Configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** — Version 20.10+
- **Docker Compose** — Version 2.0+ (included with Docker Desktop)
- **Git** — For cloning the repository

### Optional (for local development without Docker)
- **Node.js** — Version 18+ (for frontend)
- **Python** — Version 3.11+ (for backend)
- **PostgreSQL** — Version 14+ (local database)
- **Redis** — Version 7+ (local cache/queue)

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/KazimFedxD/TeachBack.git
cd TeachBack
```

### 2. Create Environment Files

Copy the example environment files:

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### 3. Configure Environment Variables

Edit `backend/.env` with your settings:

```env
# Application
APP_NAME=TeachBack
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
BASE_URL=http://localhost

# Database (Docker default)
DATABASE_URL=postgres://template_user:template_password@db:5432/template_db

# Redis (Docker default)
REDIS_URL=redis://redis:6379/1
CELERY_BROKER_URL=redis://redis:6379/0

# Email (Gmail example)
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True

# External APIs
DEEPGRAM_API_KEY=your-deepgram-key
GROQ_API_KEY=your-groq-key
ELEVENLABS_API_KEY=your-elevenlabs-key
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost/api
VITE_APP_NAME=TeachBack
VITE_ENV=development
```

### 4. Start the Application

```bash
# Start all services
docker compose up

# Or run in background
docker compose up -d
```

### 5. Run Database Migrations

In a separate terminal (first time only):

```bash
docker compose exec backend python manage.py migrate
```

### 6. Access the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost/api |
| Direct Frontend (dev) | http://localhost:5173 |
| Direct Backend | http://localhost:8000 |
| Admin Panel | http://localhost:8000/admin |

---

## Configuration

### Creating a Superuser (Admin)

```bash
docker compose exec backend python manage.py createsuperuser
```

Follow the prompts to create an admin account. Access the admin panel at `/admin`.

### Email Configuration

TeachBack requires email for user verification. For Gmail:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the 16-character App Password as `EMAIL_PASS`

For other providers, adjust `EMAIL_HOST` and `EMAIL_PORT` accordingly.

### API Keys

You'll need API keys from these services:

| Service | Purpose | Sign Up |
|---------|---------|---------|
| Deepgram | Speech-to-text | https://deepgram.com |
| Groq | AI/LLM inference | https://groq.com |
| ElevenLabs | Text-to-speech | https://elevenlabs.io |

---

## Development Commands

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs backend -f
docker compose logs frontend -f
docker compose logs celery -f
```

### Database Operations

```bash
# Make migrations
docker compose exec backend python manage.py makemigrations

# Apply migrations
docker compose exec backend python manage.py migrate

# Django shell
docker compose exec backend python manage.py shell
```

### Rebuilding Containers

```bash
# Rebuild after Dockerfile changes
docker compose up -d --build

# Full rebuild (removes volumes)
docker compose down -v
docker compose up -d --build
```

### Stopping Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (clears database)
docker compose down -v
```

---

## Deployment

### Production Considerations

1. **Environment Variables**
   - Set `DEBUG=False`
   - Use a strong, unique `SECRET_KEY`
   - Set proper `ALLOWED_HOSTS`
   - Use production database credentials

2. **HTTPS**
   - Configure SSL certificates
   - Update Nginx configuration for SSL
   - Set `Secure` flag on cookies

3. **Static Files**
   ```bash
   docker compose exec backend python manage.py collectstatic --noinput
   ```

4. **Database**
   - Use managed PostgreSQL (AWS RDS, Supabase, etc.)
   - Regular backups
   - Connection pooling

5. **Monitoring**
   - Application logging
   - Error tracking (Sentry)
   - Performance monitoring

---

## Challenges & Solutions

### Challenge 1: WebSocket Connection Drops

**Problem**: WebSocket connections would randomly drop, especially on network changes.

**Solution**: Implemented automatic reconnection with exponential backoff:
```javascript
const reconnect = () => {
  reconnectAttempts++;
  const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
  setTimeout(() => connect(), delay);
};
```

### Challenge 2: Audio Playback Jittering

**Problem**: TTS audio would stutter and have gaps during playback.

**Solution**: 
- Implemented prebuffering (5 chunks before playback starts)
- Dynamic sample rate detection from TTS provider
- Seamless chunk scheduling without overlaps

### Challenge 3: Session State Persistence

**Problem**: Users would lose session progress on page refresh or disconnect.

**Solution**:
- Session state saved to database (SessionStateModel)
- Background evaluation via Celery continues even after disconnect
- State recovery on reconnection

### Challenge 4: JWT Token Management

**Problem**: Needed secure token storage without XSS vulnerability.

**Solution**:
- httpOnly cookies for token storage
- Automatic token refresh before expiration
- Custom middleware for cookie-based JWT authentication

### Challenge 5: Real-Time Transcript Display

**Problem**: Needed to show live transcript as user speaks.

**Solution**:
- Streaming STT with Deepgram
- WebSocket events for real-time updates
- Batched transcript processing for AI analysis (every 10 seconds)

---

## Troubleshooting

### Common Issues

**"Connection refused" errors**
```bash
# Ensure all containers are running
docker compose ps

# Check container logs for errors
docker compose logs db
docker compose logs backend
```

**Database migration errors**
```bash
# Reset and recreate database
docker compose down -v
docker compose up -d
docker compose exec backend python manage.py migrate
```

**Frontend not loading**
```bash
# Check if frontend container is running
docker compose logs frontend

# Ensure Nginx is routing correctly
docker compose logs nginx
```

**Celery tasks not running**
```bash
# Check Celery worker logs
docker compose logs celery

# Verify Redis is running
docker compose logs redis
```

**Email not sending**
- Verify `EMAIL_*` environment variables
- Check if using App Password (not regular password) for Gmail
- Check backend logs for SMTP errors
