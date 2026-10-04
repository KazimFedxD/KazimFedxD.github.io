# Setup & Configuration Guide

## Prerequisites

### Required Software

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| **Docker** | 20.10+ | Container runtime |
| **Docker Compose** | 2.0+ | Service orchestration |
| **Git** | 2.30+ | Version control |

### Optional (for local development without Docker)

| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.11+ | Backend development |
| Node.js | 18+ | Frontend development |
| PostgreSQL | 14+ | Local database |
| Redis | 7+ | Local cache/broker |

### System Requirements

- **Operating System**: Windows 10/11, macOS 12+, or Linux (Ubuntu 20.04+, Debian 11+)
- **RAM**: Minimum 4GB (8GB recommended for smooth development)
- **Disk Space**: 5GB free space (for Docker images and volumes)
- **Network**: Internet connection for pulling Docker images and dependencies

---

## Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/FullStack-Template.git

# Navigate to project directory
cd FullStack-Template
```

**Note**: If you forked the repository, replace the URL with your fork's URL.

---

### Step 2: Environment Configuration

Create environment files for backend and frontend with required variables.

#### Backend Environment (.env in /backend/)

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env
```

Add the following configuration:

```env
# Database Configuration
DATABASE_URL=postgres://template_user:template_password@db:5432/template_db

# Django Security
SECRET_KEY=your-super-secret-key-change-this-in-production-make-it-long-and-random
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Email Configuration (Gmail example)
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# Celery Configuration
CELERY_BROKER_URL=redis://redis:6379/0

# Application Settings
WEBSITE_NAME=Your App Name
BASE_URL=http://localhost:8000

# Encryption Key (auto-generated if not provided)
# ENCRYPTION_KEY=will-be-auto-generated-on-first-run
```

**Important Notes**:

- **SECRET_KEY**: Generate a secure random key for production. Use Django's `get_random_secret_key()` or online generator.
- **EMAIL_PASS**: For Gmail, create an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password).
- **DEBUG**: Set to `False` in production.
- **ALLOWED_HOSTS**: Add your production domain in production.

#### Frontend Environment (.env in /frontend/)

Create a `.env` file in the `frontend/` directory:

```bash
cd ../frontend
touch .env
```

Add the following configuration:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000

# Application Branding
REACT_APP_APP_NAME=Your App Name
```

**Important Notes**:

- **REACT_APP_API_URL**: Change to your production API URL when deploying.
- All environment variables must start with `REACT_APP_` to be accessible in React.

---

### Step 3: Email Setup (Gmail Example)

To enable email verification, you need to configure SMTP credentials.

#### For Gmail:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Under "2-Step Verification", find "App passwords"
   - Select "Mail" and your device
   - Copy the 16-character password
3. **Add to .env file**:
   ```env
   EMAIL=youremail@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # Your app password
   ```

#### For Other Email Providers:

Update the SMTP settings in `backend/.env`:

```env
# For Outlook/Hotmail
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587

# For Yahoo
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=465

# For custom SMTP server
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587 or 465
```

---

### Step 4: Docker Deployment

#### Development Mode (with hot-reload):

```bash
# Return to project root
cd ..

# Start all services
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

**What happens**:
- Pulls required Docker images (first time only)
- Builds custom images for backend and frontend
- Creates Docker network and volumes
- Starts 7 containers: db, redis, backend, frontend, celery, celery-beat, nginx
- Backend and frontend have hot-reload enabled

**Access Points**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Nginx Proxy: http://localhost (routes to frontend and backend)
- Admin Panel: http://localhost:8000/admin

#### Production Mode:

```bash
# Start with production configuration
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

**Production differences**:
- DEBUG=False in Django
- Optimized React build
- Static files served by Nginx
- No hot-reload (better performance)

---

### Step 5: Database Initialization

After containers are running, initialize the database:

```bash
# Run migrations to create database tables
docker-compose exec backend python manage.py migrate

# Create a superuser for admin panel (optional)
docker-compose exec backend python manage.py createsuperuser

# Follow prompts to set email and password
```

**Troubleshooting**:
- If migrations fail, ensure the database container is healthy: `docker-compose ps`
- Wait a few seconds for PostgreSQL to be ready and retry

---

### Step 6: Verify Installation

#### Check All Services Are Running:

```bash
docker-compose ps
```

Expected output:
```
NAME                    STATUS              PORTS
template_backend        Up                  0.0.0.0:8000->8000/tcp
template_celery         Up
template_celery_beat    Up
template_frontend       Up                  0.0.0.0:3000->3000/tcp
template_postgres       Up (healthy)        0.0.0.0:5432->5432/tcp
nginx                   Up                  0.0.0.0:80->80/tcp
redis                   Up                  0.0.0.0:6379->6379/tcp
```

#### Test the Application:

1. **Frontend**: Open http://localhost:3000 - should see login/register page
2. **Backend API**: Open http://localhost:8000 - should see JSON response or Django page
3. **Admin Panel**: Open http://localhost:8000/admin - login with superuser credentials

#### Test Email Functionality:

1. Register a new user at http://localhost:3000
2. Check your email for verification code
3. If email doesn't arrive, check backend logs: `docker-compose logs backend`

---

## Configuration Details

### Database Configuration

The default database is PostgreSQL with these credentials (defined in `docker-compose.yml`):

- **Host**: `db` (Docker service name)
- **Port**: `5432`
- **Database**: `template_db`
- **User**: `template_user`
- **Password**: `template_password`

**Change for Production**:

Edit `docker-compose.yml` and update environment variables:

```yaml
db:
  environment:
    POSTGRES_USER: your_user
    POSTGRES_PASSWORD: strong_password_here
    POSTGRES_DB: your_database
```

Then update `backend/.env`:

```env
DATABASE_URL=postgres://your_user:strong_password_here@db:5432/your_database
```

---

### JWT Token Configuration

Token lifetimes are configured in `backend/backend/settings.py`:

```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
```

**Recommendations**:
- **Development**: Short access tokens (5min) are fine for testing
- **Production**: Consider 15-30 minute access tokens for better UX
- **Refresh tokens**: 7-30 days depending on security requirements

---

### Celery Configuration

Celery tasks and schedules are configured in `backend/backend/settings.py`:

```python
CELERY_BEAT_SCHEDULE = {
    "clear-verification-tokens": {
        "task": "usermanagement.models.clear_verification_tokens",
        "schedule": 60.0,  # Every 60 seconds
    },
    "custom-task": {
        "task": "your_app.tasks.your_task",
        "schedule": crontab(hour=12, minute=0),  # Daily at noon
    },
}
```

**Add Custom Periodic Tasks**:

1. Define task in your app:
   ```python
   from celery import shared_task
   
   @shared_task
   def my_periodic_task():
       # Your logic here
       pass
   ```

2. Add to `CELERY_BEAT_SCHEDULE` in settings.py

3. Restart Celery Beat:
   ```bash
   docker-compose restart celery-beat
   ```

---

### CORS Configuration

CORS is configured in `backend/backend/settings.py`:

```python
# Development (allow all origins)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True

# Production (restrict to specific domains)
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
CORS_ALLOWS_CREDENTIALS = True
```

---

## Local Development (Without Docker)

If you prefer to run services locally without Docker:

### Backend Setup:

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver

# In separate terminal, start Celery worker
celery -A backend worker --loglevel=info

# In another terminal, start Celery Beat
celery -A backend beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

**Prerequisites**: PostgreSQL and Redis must be running locally.

Update `backend/.env`:
```env
DATABASE_URL=postgres://user:password@localhost:5432/your_db
CELERY_BROKER_URL=redis://localhost:6379/0
```

### Frontend Setup:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Access at http://localhost:3000

---

## Deployment to Production

### 1. Update Environment Variables

- Set `DEBUG=False` in backend/.env
- Update `ALLOWED_HOSTS` with your domain
- Change `SECRET_KEY` to a strong random value
- Update `REACT_APP_API_URL` to your production API URL

### 2. Configure HTTPS (Nginx + Certbot)

Add SSL certificates:

```bash
# Install Certbot in Nginx container
docker-compose exec nginx apt-get update
docker-compose exec nginx apt-get install certbot python3-certbot-nginx

# Obtain certificate
docker-compose exec nginx certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Update `nginx/nginx.conf` to redirect HTTP to HTTPS.

### 3. Database Backups

Set up automated backups:

```bash
# Manual backup
docker-compose exec db pg_dump -U template_user template_db > backup.sql

# Restore from backup
docker-compose exec -T db psql -U template_user template_db < backup.sql
```

### 4. Monitoring and Logging

Add environment variables for external logging:

```env
# Sentry for error tracking
SENTRY_DSN=your_sentry_dsn

# Log level
LOG_LEVEL=INFO
```

---

## Common Commands

### Docker Commands:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service_name]

# Restart a service
docker-compose restart [service_name]

# Rebuild a service
docker-compose up -d --build [service_name]

# Execute command in container
docker-compose exec [service_name] [command]

# Remove all containers and volumes (CAUTION: deletes data)
docker-compose down -v
```

### Django Management Commands:

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Collect static files
docker-compose exec backend python manage.py collectstatic

# Django shell
docker-compose exec backend python manage.py shell

# Create new app
docker-compose exec backend python manage.py startapp myapp
```

---

## Troubleshooting

### Issue 1: Database Connection Errors

**Symptoms**: Backend fails to start, "connection refused" errors

**Solution**:
```bash
# Check database health
docker-compose ps

# View database logs
docker-compose logs db

# Restart database
docker-compose restart db

# Wait for PostgreSQL to be ready, then restart backend
docker-compose restart backend
```

---

### Issue 2: Frontend Can't Connect to Backend

**Symptoms**: API calls fail with CORS errors or network errors

**Solution**:
1. Verify `REACT_APP_API_URL` in frontend/.env matches backend URL
2. Check CORS settings in backend/settings.py
3. Ensure backend is running: `docker-compose ps`
4. Test backend directly: `curl http://localhost:8000/api/`

---

### Issue 3: Email Not Sending

**Symptoms**: No verification email received after registration

**Solution**:
1. Check backend logs: `docker-compose logs backend`
2. Verify email credentials in backend/.env
3. Ensure EMAIL_PASS is an app password (for Gmail)
4. Check spam folder
5. Test SMTP connection:
   ```bash
   docker-compose exec backend python manage.py shell
   >>> from custom import sendmail
   >>> sendmail("test@example.com", "Test", "<h1>Test</h1>")
   ```

---

### Issue 4: Celery Tasks Not Running

**Symptoms**: Emails not sent, periodic tasks not executing

**Solution**:
```bash
# Check Celery worker logs
docker-compose logs celery

# Check Celery Beat logs
docker-compose logs celery-beat

# Restart Celery services
docker-compose restart celery celery-beat

# Verify Redis is running
docker-compose ps redis
```

---

### Issue 5: Port Already in Use

**Symptoms**: "port is already allocated" error on startup

**Solution**:
```bash
# Find process using the port (e.g., 8000)
lsof -i :8000  # On macOS/Linux
netstat -ano | findstr :8000  # On Windows

# Kill the process or change port in docker-compose.yml
ports:
  - "8001:8000"  # Change host port
```

---

## Performance Optimization Tips

1. **Enable Query Caching**: Add Redis caching for database queries
2. **Use CDN**: Serve static files from CDN in production
3. **Database Indexing**: Add indexes to frequently queried fields
4. **Code Splitting**: Use React.lazy() for route-based code splitting
5. **Image Optimization**: Compress images and use WebP format
6. **Gzip Compression**: Enable in Nginx for faster transfers

---

## Next Steps After Setup

1. **Customize the UI**: Update colors, logos, and branding in frontend
2. **Add Features**: Implement your application-specific functionality
3. **Create API Endpoints**: Add new endpoints in backend/api/
4. **Configure Email Templates**: Customize email_templates/ for your brand
5. **Set Up CI/CD**: Automate testing and deployment
6. **Add Testing**: Write unit tests and integration tests
7. **Documentation**: Document your custom features and APIs
