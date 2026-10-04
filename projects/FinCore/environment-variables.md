# Environment Variables Reference# Environment Variables Reference



This document provides a comprehensive reference for all environment variables used in FinCore.## Overview



---FinCore uses environment variables for configuration. This document provides a complete reference of all variables used throughout the application.



## OverviewFor Docker Compose deployment, most variables are pre-configured in `docker-compose.yml`. For custom deployments, create a `.env` file in the project root.



FinCore uses environment variables for configuration to separate sensitive data from code and allow different configurations for development, staging, and production environments.---



**Location**: Create a `.env` file in the `backend/` directory (this file is gitignored).## Required Variables



---### DATABASE_URL

- **Type**: String (PostgreSQL connection URL)

## Required Variables- **Format**: `postgresql://user:password@host:port/database`

- **Purpose**: PostgreSQL database connection string

### DATABASE_URL- **Example**: `postgresql://fincore_user:fincore_password@db:5432/fincore_db`

- **Type**: String (PostgreSQL connection URL)- **Default** (docker-compose): `postgres://fincore_user:fincore_password@db:5432/fincore_db`

- **Format**: `postgresql://user:password@host:port/database`- **Usage**: Backend (`backend/backend/settings.py`)

- **Purpose**: PostgreSQL database connection string- **Security**: ⚠️ Keep password secret! Never commit to version control

- **Example**: `postgresql://fincore_user:YOUR_PASSWORD@db:5432/fincore_db`

- **Development**: `postgresql://fincore_user:fincore_password@db:5432/fincore_db`**Notes**:

- **Production**: Use strong password and managed PostgreSQL service- For SQLite (development only): `sqlite:///db.sqlite3`

- **Security**: ⚠️ NEVER commit actual passwords to version control- For external database: Replace `db` with actual hostname/IP

- Connection pool managed automatically by Django

### SECRET_KEY

- **Type**: String (50+ random characters)---

- **Purpose**: Django secret key for cryptographic signing (sessions, CSRF tokens, passwords)

- **Example**: `django-insecure-4k3a4kybqv4ig34&y6#rvv-m(_-(esk30%2m^xwbyqfh(zeul#`### SECRET_KEY

- **Development**: Can use the default insecure key- **Type**: String (50+ random characters)

- **Production**: ⚠️ MUST generate new random key- **Purpose**: Django cryptographic signing (sessions, CSRF, passwords)

- **Generate**: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`- **Example**: `django-insecure-4k3a4kybqv4ig34&y6#rvv-m(_-(esk30%2m^xwbyqfh(zeul#`

- **Security**: Keep this secret! Change it if compromised.- **Default** (development): Hardcoded in `settings.py` (insecure!)

- **Production**: Generate unique key: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`

### CELERY_BROKER_URL- **Usage**: Backend (`backend/backend/settings.py`)

- **Type**: String (Redis connection URL)- **Security**: 🔒 **CRITICAL** - Never reuse across environments, never commit to Git

- **Format**: `redis://host:port/db`

- **Purpose**: Redis connection for Celery task queue---

- **Example**: `redis://redis:6379/0`

- **Development**: `redis://redis:6379/0` (Docker service name)### CELERY_BROKER_URL

- **Production**: `redis://your-redis-host:6379/0`- **Type**: String (Redis connection URL)

- **Notes**: `/0` indicates Redis database 0- **Format**: `redis://host:port/db`

- **Purpose**: Celery message broker for background tasks

---- **Example**: `redis://redis:6379/0`

- **Default** (docker-compose): `redis://redis:6379/0`

## Email Configuration (Required for Email Verification)- **Usage**: Backend (`backend/backend/settings.py`, Celery workers)

- **Security**: ✅ Safe for development, add authentication for production

### EMAIL_BACKEND

- **Type**: String**Production**:

- **Purpose**: Django email backend to use- Use Redis with password: `redis://:password@host:6379/0`

- **Development**: `django.core.mail.backends.console.EmailBackend` (prints to console)- Or managed Redis service (AWS ElastiCache, Redis Cloud)

- **Production**: `django.core.mail.backends.smtp.EmailBackend`

- **Example**: `django.core.mail.backends.smtp.EmailBackend`---



### EMAIL_HOST## Optional Variables (Development)

- **Type**: String

- **Purpose**: SMTP server hostname### DEBUG

- **Example**: `smtp.gmail.com` (Gmail), `smtp.sendgrid.net` (SendGrid)- **Type**: Boolean

- **Required**: Only for production email sending- **Values**: `True`, `False`

- **Purpose**: Enable Django debug mode (detailed error pages, debug toolbar)

### EMAIL_PORT- **Example**: `DEBUG=True`

- **Type**: Integer- **Default**: `True` (hardcoded in settings.py)

- **Purpose**: SMTP server port- **Usage**: Backend (`backend/backend/settings.py`)

- **Common Values**: - **Security**: ⚠️ **MUST be False in production**

  - `587` (TLS - recommended)

  - `465` (SSL)**Effects**:

  - `25` (unencrypted - not recommended)- `True`: Detailed error pages, static files served by Django, SQL query logging

- **Example**: `587`- `False`: Generic error pages, static files via Nginx/CDN, minimal logging



### EMAIL_USE_TLS---

- **Type**: Boolean (`True` or `False`)

- **Purpose**: Use TLS encryption### ALLOWED_HOSTS

- **Example**: `True`- **Type**: Comma-separated string

- **Recommended**: `True` for security- **Purpose**: Allowed hostnames for Django application

- **Example**: `ALLOWED_HOSTS=localhost,127.0.0.1,budget.fedxd.net`

### EMAIL_HOST_USER- **Default**: `*` (all hosts - development only)

- **Type**: String (email address)- **Usage**: Backend (`backend/backend/settings.py`)

- **Purpose**: SMTP authentication username- **Security**: ⚠️ Restrict in production to specific domains

- **Example**: `noreply@yourfincore.com`

- **Gmail**: Your Gmail address**Production Example**:

- **SendGrid**: Usually `apikey````bash

ALLOWED_HOSTS=budget.fedxd.net,www.budget.fedxd.net

### EMAIL_HOST_PASSWORD```

- **Type**: String

- **Purpose**: SMTP authentication password---

- **Example**: `YOUR_EMAIL_PASSWORD_HERE`

- **Gmail**: App-specific password (not your Gmail password!)## Email Configuration (Optional)

- **SendGrid**: Your SendGrid API key

- **Security**: ⚠️ NEVER commit to version control### EMAIL_HOST

- **Type**: String (SMTP hostname)

### DEFAULT_FROM_EMAIL- **Purpose**: SMTP server for sending emails

- **Type**: String (email address)- **Example**: `EMAIL_HOST=smtp.gmail.com`

- **Purpose**: Default sender email address- **Default**: Not set (email disabled)

- **Example**: `noreply@yourfincore.com`- **Usage**: Backend (email verification, password reset)

- **Format**: Can include name: `"FinCore" <noreply@yourfincore.com>`- **Providers**: Gmail, SendGrid, AWS SES, Mailgun



------



## Optional Variables### EMAIL_PORT

- **Type**: Integer

### DEBUG- **Purpose**: SMTP server port

- **Type**: Boolean (`True` or `False`)- **Example**: `EMAIL_PORT=587` (TLS) or `EMAIL_PORT=465` (SSL)

- **Default**: `True` (in settings.py)- **Default**: Not set

- **Purpose**: Enable Django debug mode- **Usage**: Backend (with EMAIL_HOST)

- **Development**: `True` (shows detailed error pages)

- **Production**: ⚠️ MUST be `False` (security risk if enabled)---

- **Example**: `DEBUG=False`

### EMAIL_USE_TLS

### ALLOWED_HOSTS- **Type**: Boolean

- **Type**: String (comma-separated domains)- **Purpose**: Enable TLS encryption for SMTP

- **Default**: `*` (allows all hosts - insecure for production)- **Example**: `EMAIL_USE_TLS=True`

- **Purpose**: List of domains that can serve the app- **Default**: `False`

- **Development**: `localhost,127.0.0.1`- **Usage**: Backend (recommended for Gmail, SendGrid)

- **Production**: `yourfincore.com,www.yourfincore.com`

- **Example**: `ALLOWED_HOSTS=budget.fedxd.net,localhost`---



### CORS_ALLOWED_ORIGINS### EMAIL_USE_SSL

- **Type**: String (comma-separated URLs)- **Type**: Boolean

- **Purpose**: Frontend origins allowed to make API requests- **Purpose**: Enable SSL encryption for SMTP

- **Development**: `http://localhost:3000`- **Example**: `EMAIL_USE_SSL=False`

- **Production**: `https://yourfincore.com,https://www.yourfincore.com`- **Default**: `False`

- **Example**: `CORS_ALLOWED_ORIGINS=http://localhost:3000,https://budget.fedxd.net`- **Usage**: Backend (use TLS instead for most providers)



### REDIS_URL---

- **Type**: String (Redis connection URL)

- **Default**: Uses `CELERY_BROKER_URL`### EMAIL_HOST_USER

- **Purpose**: Redis connection for caching (if different from Celery)- **Type**: String (email address)

- **Example**: `redis://redis:6379/1`- **Purpose**: SMTP authentication username

- **Notes**: Use different database number (`/1`) than Celery if needed- **Example**: `EMAIL_HOST_USER=your-app@gmail.com`

- **Default**: Not set

### GROQ_API_KEY (Future Feature)- **Usage**: Backend (SMTP login)

- **Type**: String- **Security**: 🔒 Keep secret

- **Purpose**: Groq AI API key for future AI-powered features

- **Example**: `gsk_YOUR_API_KEY_HERE`**Gmail Note**: Use App Passwords, not your main password

- **Status**: Not currently used, planned for v2.01. Enable 2FA on Google Account

- **Security**: Keep this secret2. Generate App Password: https://myaccount.google.com/apppasswords

3. Use generated 16-character password

---

---

## Frontend Environment Variables

### EMAIL_HOST_PASSWORD

**Location**: Create `.env` file in `frontend/` directory- **Type**: String

- **Purpose**: SMTP authentication password

### REACT_APP_API_URL- **Example**: `EMAIL_HOST_PASSWORD=your-app-password`

- **Type**: String (URL)- **Default**: Not set

- **Purpose**: Backend API base URL- **Usage**: Backend (SMTP login)

- **Development**: `http://localhost:8000`- **Security**: 🔒 **CRITICAL** - Never commit to Git

- **Production**: `https://api.yourfincore.com`

- **Example**: `REACT_APP_API_URL=http://localhost:8000`---

- **Note**: Must start with `REACT_APP_` to be accessible in React

### DEFAULT_FROM_EMAIL

### REACT_APP_DOMAIN- **Type**: String (email address)

- **Type**: String (domain name)- **Purpose**: Default sender address for emails

- **Purpose**: Frontend domain for authentication cookies- **Example**: `DEFAULT_FROM_EMAIL=FinCore <noreply@budget.fedxd.net>`

- **Development**: `localhost`- **Default**: `webmaster@localhost`

- **Production**: `yourfincore.com`- **Usage**: Backend (email headers)

- **Example**: `REACT_APP_DOMAIN=localhost`

---

---

## Frontend Variables

## Example .env File (Backend)

### REACT_APP_API_URL

```bash- **Type**: String (URL)

# Database- **Purpose**: Backend API base URL

DATABASE_URL=postgresql://fincore_user:YOUR_STRONG_PASSWORD@db:5432/fincore_db- **Example**: `REACT_APP_API_URL=http://localhost:8000`

- **Default**: `http://localhost:8000` (in code)

# Django Secret- **Usage**: Frontend (`frontend/src/config/app.js`)

SECRET_KEY=YOUR_GENERATED_SECRET_KEY_HERE_50_PLUS_CHARACTERS- **Production**: `https://api.budget.fedxd.net` or `https://budget.fedxd.net`



# Celery & Redis**Note**: Must start with `REACT_APP_` to be accessible in React (Create React App convention)

CELERY_BROKER_URL=redis://redis:6379/0

---

# Email Configuration (Development - Console)

EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend### CHOKIDAR_USEPOLLING

- **Type**: Boolean

# Email Configuration (Production - SMTP)- **Purpose**: Enable polling-based file watching (for Docker volumes)

# EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend- **Example**: `CHOKIDAR_USEPOLLING=true`

# EMAIL_HOST=smtp.gmail.com- **Default**: Not set (auto-detect)

# EMAIL_PORT=587- **Usage**: Frontend (hot-reload in Docker)

# EMAIL_USE_TLS=True- **Performance**: Increases CPU usage, but necessary for Docker on Windows/Mac

# EMAIL_HOST_USER=noreply@yourfincore.com

# EMAIL_HOST_PASSWORD=YOUR_APP_SPECIFIC_PASSWORD---

# DEFAULT_FROM_EMAIL="FinCore" <noreply@yourfincore.com>

## Database-Specific Variables

# Django Settings

DEBUG=True### POSTGRES_USER

ALLOWED_HOSTS=*- **Type**: String

- **Purpose**: PostgreSQL superuser username

# CORS- **Example**: `POSTGRES_USER=fincore_user`

CORS_ALLOWED_ORIGINS=http://localhost:3000- **Default** (docker-compose): `fincore_user`

- **Usage**: PostgreSQL container initialization

# Optional

# GROQ_API_KEY=gsk_YOUR_API_KEY_HERE---

```

### POSTGRES_PASSWORD

---- **Type**: String

- **Purpose**: PostgreSQL superuser password

## Example .env File (Frontend)- **Example**: `POSTGRES_PASSWORD=fincore_password`

- **Default** (docker-compose): `fincore_password`

```bash- **Usage**: PostgreSQL container initialization

# API Configuration- **Security**: 🔒 Change for production

REACT_APP_API_URL=http://localhost:8000

---

# Domain

REACT_APP_DOMAIN=localhost### POSTGRES_DB

```- **Type**: String

- **Purpose**: PostgreSQL database name

---- **Example**: `POSTGRES_DB=fincore_db`

- **Default** (docker-compose): `fincore_db`

## Docker Compose Environment Variables- **Usage**: PostgreSQL container initialization



Variables can also be set in `docker-compose.yml` under `environment:` sections:---



```yaml## JWT Configuration (settings.py)

backend:

  environment:These are configured in Django settings, not environment variables:

    DATABASE_URL: postgres://fincore_user:${DB_PASSWORD}@db:5432/fincore_db

    CELERY_BROKER_URL: redis://redis:6379/0### ACCESS_TOKEN_LIFETIME

```- **Type**: timedelta

- **Purpose**: JWT access token expiration time

**Note**: `${DB_PASSWORD}` reads from a `.env` file in the project root or from system environment variables.- **Value**: `timedelta(minutes=5)`

- **Location**: `backend/backend/settings.py`

---- **Rationale**: Short-lived for security, auto-refreshed by frontend



## Security Best Practices---



### 1. Never Commit Secrets### REFRESH_TOKEN_LIFETIME

```bash- **Type**: timedelta

# Add to .gitignore- **Purpose**: JWT refresh token expiration time

.env- **Value**: `timedelta(days=7)`

.env.local- **Location**: `backend/backend/settings.py`

.env.production- **Rationale**: Long-lived for user convenience, stored in HTTP-only cookie

.env.*.local

```---



### 2. Use Strong Passwords## Production-Only Variables

- Minimum 16 characters

- Mix of uppercase, lowercase, numbers, symbols### CORS_ALLOWED_ORIGINS

- Use password generator (e.g., 1Password, LastPass)- **Type**: List of strings (in settings.py)

- **Purpose**: Allowed origins for CORS requests

### 3. Rotate Secrets Regularly- **Example**: `['https://budget.fedxd.net', 'https://www.budget.fedxd.net']`

- Change `SECRET_KEY` quarterly- **Default**: `['http://localhost:3000']`

- Rotate database passwords annually- **Location**: `backend/backend/settings.py`

- Update API keys when services require- **Security**: ⚠️ Restrict to production domains only



### 4. Separate Development and Production---

- Different `.env` files for each environment

- Production secrets never in development### SECURE_SSL_REDIRECT

- Use environment-specific values- **Type**: Boolean

- **Purpose**: Redirect all HTTP requests to HTTPS

### 5. Use Secret Management Tools (Production)- **Example**: `SECURE_SSL_REDIRECT=True`

- AWS Secrets Manager- **Default**: `False` (development)

- HashiCorp Vault- **Location**: `backend/backend/settings.py`

- Azure Key Vault- **Production**: Enable for HTTPS enforcement

- Google Secret Manager

---

---

### SESSION_COOKIE_SECURE

## Validation Checklist- **Type**: Boolean

- **Purpose**: Send cookies only over HTTPS

Before deploying, verify:- **Example**: `SESSION_COOKIE_SECURE=True`

- **Default**: `False`

- [ ] `DATABASE_URL` is set with strong password- **Production**: Enable for security

- [ ] `SECRET_KEY` is unique and random (not the default)

- [ ] `DEBUG=False` in production---

- [ ] `ALLOWED_HOSTS` includes only your domains

- [ ] Email credentials are valid and tested### CSRF_COOKIE_SECURE

- [ ] `.env` file is in `.gitignore`- **Type**: Boolean

- [ ] No secrets committed to Git repository- **Purpose**: Send CSRF cookies only over HTTPS

- [ ] CORS origins include only trusted domains- **Example**: `CSRF_COOKIE_SECURE=True`

- [ ] All required environment variables are set- **Default**: `False`

- **Production**: Enable for security

---

---

## Troubleshooting

## Example .env File

### "SECRET_KEY not found"

- Create `.env` file in `backend/` directory### Development

- Add `SECRET_KEY=your-secret-key-here````bash

- Restart backend container# Database

DATABASE_URL=postgresql://fincore_user:fincore_password@localhost:5432/fincore_db

### "Database connection failed"

- Check `DATABASE_URL` format# Django

- Verify PostgreSQL container is running: `docker ps`SECRET_KEY=your-development-secret-key-here

- Check database credentials match between `.env` and `docker-compose.yml`DEBUG=True

ALLOWED_HOSTS=*

### "Email verification not working"

- Development: Check console/terminal for email output# Celery

- Production: Verify SMTP credentials with email providerCELERY_BROKER_URL=redis://localhost:6379/0

- Check `EMAIL_BACKEND` is set correctly

# Email (optional for development)

### "CORS errors in browser"# EMAIL_HOST=smtp.gmail.com

- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL# EMAIL_PORT=587

- Check frontend URL matches exactly (http vs https, port number)# EMAIL_USE_TLS=True

- Restart backend after changing CORS settings# EMAIL_HOST_USER=your-email@gmail.com

# EMAIL_HOST_PASSWORD=your-app-password

---

# Frontend

**For more configuration details, see [setup.md](setup.md).**  REACT_APP_API_URL=http://localhost:8000

**For architecture overview, see [architecture.md](architecture.md).**CHOKIDAR_USEPOLLING=true

```

---

### Production
```bash
# Database (managed service)
DATABASE_URL=postgresql://prod_user:STRONG_PASSWORD@db.example.com:5432/fincore_prod

# Django
SECRET_KEY=GENERATE_NEW_RANDOM_50_CHAR_STRING_HERE
DEBUG=False
ALLOWED_HOSTS=budget.fedxd.net,www.budget.fedxd.net

# Celery (managed Redis)
CELERY_BROKER_URL=redis://:REDIS_PASSWORD@redis.example.com:6379/0

# Email (production service)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=SG.XXXXXXXXXXXXXXXXXXXXXXXX
DEFAULT_FROM_EMAIL=FinCore <noreply@budget.fedxd.net>

# Frontend
REACT_APP_API_URL=https://budget.fedxd.net

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

---

## Environment Variable Loading

### Django (python-dotenv)
```python
# backend/backend/settings.py
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
SECRET_KEY = os.getenv('SECRET_KEY', 'default-insecure-key')
DEBUG = os.getenv('DEBUG', 'False') == 'True'
```

---

### React (Create React App)
```javascript
// frontend/src/config/app.js
export const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

**Note**: React environment variables:
- Must start with `REACT_APP_`
- Loaded at build time (not runtime)
- Rebuild required after changes: `npm run build`

---

### Docker Compose
```yaml
services:
  backend:
    environment:
      DATABASE_URL: postgres://fincore_user:fincore_password@db:5432/fincore_db
      CELERY_BROKER_URL: redis://redis:6379/0
    # Or load from .env file:
    env_file:
      - .env
```

---

## Security Best Practices

### ✅ DO:
- Use strong, random passwords (20+ characters)
- Generate unique SECRET_KEY for each environment
- Use environment variables for all secrets
- Add `.env` to `.gitignore`
- Use different credentials for dev/staging/prod
- Rotate secrets regularly (quarterly)
- Use managed services for production (AWS RDS, ElastiCache)

### ❌ DON'T:
- Commit `.env` file to Git
- Reuse SECRET_KEY across environments
- Use default passwords in production
- Store secrets in code
- Share production credentials in chat/email
- Use DEBUG=True in production

---

## Troubleshooting

### Environment Variables Not Loading

**Symptoms**: App uses default values instead of .env values

**Solutions**:
1. Verify `.env` file location (project root)
2. Check file permissions: `chmod 600 .env`
3. Restart Docker containers: `docker-compose down && docker-compose up -d`
4. Check syntax (no spaces around `=`): `KEY=value` not `KEY = value`

---

### Database Connection Errors

**Symptoms**: `django.db.utils.OperationalError: could not connect to server`

**Solutions**:
1. Verify DATABASE_URL format
2. Check PostgreSQL is running: `docker-compose ps db`
3. Test connection: `docker-compose exec db psql -U fincore_user -d fincore_db`
4. Check network: `docker-compose exec backend ping db`

---

### Email Sending Fails

**Symptoms**: Verification emails not received

**Solutions**:
1. Verify all EMAIL_* variables set correctly
2. Test SMTP credentials manually
3. Check spam folder
4. Enable "Less secure app access" (Gmail) or use App Passwords
5. Check email provider logs (SendGrid dashboard, etc.)

---

## Variable Precedence

When multiple sources define the same variable:

1. **Environment variables** (highest priority)
2. **.env file**
3. **docker-compose.yml** environment section
4. **Default values in code** (lowest priority)

Example:
```bash
# Terminal
export DATABASE_URL=postgresql://user:pass@localhost/db

# .env file
DATABASE_URL=postgresql://other:pass@localhost/db

# Result: Terminal export wins
```

---

## Future Variables (Planned)

### MinIO/S3 Storage
```bash
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=fincore-receipts
```

### OAuth (Google/GitHub Login)
```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret
```

### Monitoring (Sentry)
```bash
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ENVIRONMENT=production
```

---

## Validation Checklist

Before deploying to production, verify:

- [ ] SECRET_KEY is unique and random (50+ characters)
- [ ] DEBUG=False
- [ ] ALLOWED_HOSTS restricted to production domains
- [ ] Database uses strong password
- [ ] Redis has authentication enabled
- [ ] Email credentials are valid
- [ ] CORS_ALLOWED_ORIGINS restricted
- [ ] SSL/TLS variables enabled
- [ ] `.env` file in `.gitignore`
- [ ] All secrets rotated from development values
