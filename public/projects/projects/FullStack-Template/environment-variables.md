# Environment Variables Reference

## Overview

This document provides a comprehensive reference for all environment variables used in the Full-Stack Template. Environment variables are used to configure the application for different environments (development, staging, production) without modifying code.

---

## Backend Environment Variables

Location: `backend/.env`

### Required Variables

#### DATABASE_URL

- **Type**: String (PostgreSQL connection URL)
- **Format**: `postgresql://user:password@host:port/database`
- **Purpose**: PostgreSQL database connection string
- **Example**: `postgresql://template_user:template_password@db:5432/template_db`
- **Default**: `sqlite:///db.sqlite3` (if not provided, falls back to SQLite)
- **Production**: Change credentials to strong, unique values
- **Security**: ⚠️ **Keep secret!** Contains database password

**Usage in code**:
```python
# backend/backend/settings.py
DATABASES = {
    "default": dj_database_url.config(
        default=os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
    )
}
```

---

#### SECRET_KEY

- **Type**: String (cryptographic key)
- **Purpose**: Django secret key for cryptographic signing (sessions, CSRF, passwords)
- **Example**: `django-insecure-4k3a4kybqv4ig34&y6#rvv-m(_-(esk30%2m^xwbyqfh(zeul#`
- **Default**: Hardcoded in settings (INSECURE, change in production!)
- **Production**: Generate a long, random, unique key (50+ characters)
- **Security**: 🔒 **CRITICAL!** Never commit to version control or share

**How to generate**:
```bash
# Method 1: Python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Method 2: OpenSSL
openssl rand -base64 50
```

**Usage in code**:
```python
# backend/backend/settings.py
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-default")
```

---

#### EMAIL

- **Type**: String (email address)
- **Purpose**: Sender email address for outgoing emails (verification, notifications)
- **Example**: `youremail@gmail.com`
- **Default**: None (raises warning if not set)
- **Production**: Use a dedicated email account or service
- **Security**: ⚠️ Paired with EMAIL_PASS, keep secure

**Supported providers**: Gmail, Outlook, Yahoo, SendGrid, custom SMTP

**Usage in code**:
```python
# backend/custom.py
SENDER = os.getenv("EMAIL")
if not SENDER:
    print("WARNING: Email not set in .env file")
```

---

#### EMAIL_PASS

- **Type**: String (password or app-specific password)
- **Purpose**: Password for SMTP authentication
- **Example**: `abcd efgh ijkl mnop` (Gmail App Password)
- **Default**: None (raises warning if not set)
- **Production**: Use app-specific passwords (not account password)
- **Security**: 🔒 **CRITICAL!** Never commit or share

**Gmail Setup**:
1. Enable 2-Factor Authentication
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Copy 16-character password

**Usage in code**:
```python
# backend/custom.py
S_PASS = os.getenv("EMAIL_PASS")
if not S_PASS:
    print("WARNING: Email password not set in .env file")
```

---

#### CELERY_BROKER_URL

- **Type**: String (Redis connection URL)
- **Format**: `redis://host:port/db_number`
- **Purpose**: Redis connection for Celery task queue
- **Example**: `redis://redis:6379/0`
- **Default**: `redis://localhost:6379/0`
- **Production**: Use dedicated Redis instance or managed service
- **Security**: ✅ Internal Docker network, no authentication needed by default

**Usage in code**:
```python
# backend/backend/settings.py
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
```

---

### Optional Variables

#### DEBUG

- **Type**: Boolean (True/False)
- **Purpose**: Enable Django debug mode (detailed error pages, query logging)
- **Example**: `True`
- **Default**: `True` (hardcoded in settings.py)
- **Production**: ⚠️ **MUST be False** for security
- **Security**: 🔒 Debug mode exposes sensitive information

**Effects when enabled**:
- Detailed error pages with stack traces
- SQL query logging
- Static files served by Django (slow)
- Security warnings ignored

**Usage in code**:
```python
# backend/backend/settings.py
DEBUG = os.getenv("DEBUG", "True") == "True"
```

---

#### ALLOWED_HOSTS

- **Type**: String (comma-separated list)
- **Purpose**: Allowed hostnames that can serve the application
- **Example**: `localhost,127.0.0.1,yourdomain.com`
- **Default**: `*` (all hosts, insecure)
- **Production**: ⚠️ **MUST** specify exact domains
- **Security**: 🔒 Prevents host header attacks

**Usage in code**:
```python
# backend/backend/settings.py
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")
```

**Production example**:
```env
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com
```

---

#### EMAIL_HOST

- **Type**: String (SMTP server hostname)
- **Purpose**: SMTP server for sending emails
- **Example**: `smtp.gmail.com`
- **Default**: `smtp.gmail.com`
- **Production**: Use your email provider's SMTP server

**Common values**:
```env
# Gmail
EMAIL_HOST=smtp.gmail.com

# Outlook/Hotmail
EMAIL_HOST=smtp-mail.outlook.com

# Yahoo
EMAIL_HOST=smtp.mail.yahoo.com

# SendGrid
EMAIL_HOST=smtp.sendgrid.net

# Amazon SES
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
```

---

#### EMAIL_PORT

- **Type**: Integer (port number)
- **Purpose**: SMTP server port
- **Example**: `465`
- **Default**: `465`
- **Production**: Use provider's recommended port

**Common values**:
```env
# SSL (secure)
EMAIL_PORT=465

# TLS/STARTTLS (secure)
EMAIL_PORT=587

# Unencrypted (NOT recommended)
EMAIL_PORT=25
```

---

#### WEBSITE_NAME

- **Type**: String
- **Purpose**: Application name used in emails and templates
- **Example**: `My Awesome App`
- **Default**: `Template`
- **Production**: Your application's branding name

**Usage in code**:
```python
# backend/usermanagement/views.py
WEBSITE_NAME = os.getenv("WEBSITE_NAME", "Template")

mail_template = get_template(
    "verify_email",
    WEBSITE_NAME=WEBSITE_NAME,
    # ...
)
```

---

#### BASE_URL

- **Type**: String (URL)
- **Purpose**: Base URL for email verification links
- **Example**: `http://localhost:8000`
- **Default**: `http://localhost:8000`
- **Production**: Your production domain (e.g., `https://yourdomain.com`)

**Usage in code**:
```python
# backend/usermanagement/views.py
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# Generates link: {BASE_URL}/verify?token={token}
```

---

#### ENCRYPTION_KEY

- **Type**: String (Fernet key)
- **Purpose**: Symmetric encryption key for sensitive data
- **Example**: `abcdefghijklmnopqrstuvwxyz012345678901234=`
- **Default**: Auto-generated on first run and added to .env
- **Production**: Generate securely and keep safe
- **Security**: 🔒 **CRITICAL!** Used for encrypting sensitive data

**Auto-generation**:
```python
# backend/custom.py
if not ENCRYPTION_KEY:
    key = Fernet.generate_key()
    with open(".env", "a") as f:
        f.write(f"\nENCRYPTION_KEY={key.decode()}")
```

**Manual generation**:
```python
from cryptography.fernet import Fernet
print(Fernet.generate_key().decode())
```

---

## Frontend Environment Variables

Location: `frontend/.env`

**Important**: All React environment variables must start with `REACT_APP_` to be accessible.

### Required Variables

#### REACT_APP_API_URL

- **Type**: String (URL)
- **Purpose**: Backend API base URL for all API requests
- **Example**: `http://localhost:8000`
- **Default**: None (must be set)
- **Production**: Your production API URL (e.g., `https://api.yourdomain.com`)
- **Security**: ✅ Public (embedded in frontend bundle)

**Usage in code**:
```javascript
// frontend/src/config/app.js
export const APP_CONFIG = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL,
    endpoints: {
      login: '/api/auth/login/',
      register: '/api/auth/register/',
      // ...
    }
  }
};
```

---

### Optional Variables

#### REACT_APP_APP_NAME

- **Type**: String
- **Purpose**: Application name displayed in UI (navbar, page titles)
- **Example**: `My Awesome App`
- **Default**: None (falls back to hardcoded value if not set)
- **Production**: Your application branding

**Usage in code**:
```javascript
// frontend/src/components/ui/Navbar.js
<h1>{process.env.REACT_APP_APP_NAME || 'App Name'}</h1>
```

---

## Docker Compose Environment Variables

These are set directly in `docker-compose.yml` and can be overridden via `.env` in the project root.

### Database Service (PostgreSQL)

#### POSTGRES_USER

- **Type**: String
- **Default**: `template_user`
- **Purpose**: PostgreSQL superuser name
- **Production**: Change to unique value

#### POSTGRES_PASSWORD

- **Type**: String
- **Default**: `template_password`
- **Purpose**: PostgreSQL superuser password
- **Production**: ⚠️ Change to strong password
- **Security**: 🔒 Keep secret

#### POSTGRES_DB

- **Type**: String
- **Default**: `template_db`
- **Purpose**: Initial database name
- **Production**: Change to your database name

**Example in docker-compose.yml**:
```yaml
db:
  environment:
    POSTGRES_USER: ${POSTGRES_USER:-template_user}
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-template_password}
    POSTGRES_DB: ${POSTGRES_DB:-template_db}
```

**Override in project root .env**:
```env
POSTGRES_USER=myapp_user
POSTGRES_PASSWORD=super_secure_password_123
POSTGRES_DB=myapp_production
```

---

### Frontend Service (React)

#### CHOKIDAR_USEPOLLING

- **Type**: Boolean (true/false)
- **Default**: `true`
- **Purpose**: Enable file watching in Docker for hot-reload
- **Production**: Not needed (build mode)

**Why needed**: Docker volume mounting doesn't trigger native file system events on some platforms.

---

## Environment Variable Precedence

Variables are loaded in this order (later overrides earlier):

1. **Hardcoded defaults** in code
2. **docker-compose.yml** environment section
3. **Project root .env** file (if exists)
4. **Service-specific .env** files (`backend/.env`, `frontend/.env`)
5. **Shell environment variables**

---

## Security Best Practices

### ❌ Never Commit These

- `SECRET_KEY`
- `EMAIL_PASS`
- `ENCRYPTION_KEY`
- `POSTGRES_PASSWORD`
- Any production credentials

### ✅ Safe to Commit

- `.env.example` files (with placeholder values)
- Default development values in `docker-compose.yml`
- Documentation of environment variables

### 🔒 Production Security

```env
# Development
DEBUG=True
SECRET_KEY=insecure-dev-key
ALLOWED_HOSTS=*

# Production
DEBUG=False
SECRET_KEY=long-random-cryptographically-secure-key-50-characters-minimum
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

---

## Complete Environment File Examples

### Backend .env (Development)

```env
# Database
DATABASE_URL=postgres://template_user:template_password@db:5432/template_db

# Django
SECRET_KEY=dev-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Email
EMAIL=your-dev-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# Celery
CELERY_BROKER_URL=redis://redis:6379/0

# App
WEBSITE_NAME=My Dev App
BASE_URL=http://localhost:8000
```

### Backend .env (Production)

```env
# Database
DATABASE_URL=postgres://prod_user:StrongPassword123!@db.server.com:5432/prod_db

# Django
SECRET_KEY=your-super-long-random-secret-key-generated-with-get-random-secret-key-function
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

# Email
EMAIL=notifications@yourdomain.com
EMAIL_PASS=your-production-email-password
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587

# Celery
CELERY_BROKER_URL=redis://redis.internal:6379/0

# App
WEBSITE_NAME=Your Production App
BASE_URL=https://yourdomain.com
```

### Frontend .env (Development)

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_APP_NAME=My Dev App
```

### Frontend .env (Production)

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_APP_NAME=Your Production App
```

---

## Troubleshooting

### Variables Not Loading

**Check**:
1. File named exactly `.env` (not `env.txt` or `.env.txt`)
2. File in correct directory (`backend/.env` for backend, `frontend/.env` for frontend)
3. No spaces around `=` sign: `VAR=value` (not `VAR = value`)
4. Restart Docker containers after changes: `docker-compose restart`

### React Variables Not Accessible

**Remember**:
- Must start with `REACT_APP_`
- Restart `npm start` or rebuild Docker container
- Variables are embedded at build time (not runtime)

### Database Connection Issues

**Check**:
- `DATABASE_URL` format is correct
- Host is `db` (Docker service name) not `localhost`
- Credentials match `docker-compose.yml` postgres environment

---

## Quick Reference Table

| Variable | Location | Required | Default | Production Change |
|----------|----------|----------|---------|-------------------|
| DATABASE_URL | backend/.env | Yes | SQLite | Use managed PostgreSQL |
| SECRET_KEY | backend/.env | Yes | Insecure default | Generate random 50+ chars |
| DEBUG | backend/.env | No | True | **False** |
| EMAIL | backend/.env | Yes* | None | Production email |
| EMAIL_PASS | backend/.env | Yes* | None | App password |
| CELERY_BROKER_URL | backend/.env | Yes | redis://localhost:6379/0 | Managed Redis URL |
| REACT_APP_API_URL | frontend/.env | Yes | None | https://api.yourdomain.com |
| ALLOWED_HOSTS | backend/.env | No | * | Exact domains |

*Required for email features to work
