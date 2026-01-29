# TeachBack Environment Variables

## Backend Environment Variables

### Application Settings

#### APP_NAME
- **Type**: String
- **Required**: Yes
- **Purpose**: Application name displayed in emails and UI
- **Example**: `TeachBack`
- **Used In**: Email templates, API responses

#### DEBUG
- **Type**: Boolean
- **Required**: No
- **Default**: `False`
- **Purpose**: Enable Django debug mode (development only)
- **Example**: `True`
- **Security**: ⚠️ Never enable in production

#### SECRET_KEY
- **Type**: String
- **Required**: Yes
- **Purpose**: Django secret key for cryptographic signing
- **Example**: `your-super-secret-key-change-in-production-make-it-long`
- **Security**: 🔒 Keep secret, use strong random string (50+ chars)

#### ALLOWED_HOSTS
- **Type**: Comma-separated string
- **Required**: No
- **Default**: `localhost,127.0.0.1`
- **Purpose**: Domains allowed to serve the application
- **Example**: `localhost,127.0.0.1,teachback.example.com`

#### BASE_URL
- **Type**: URL string
- **Required**: Yes
- **Purpose**: Frontend URL for email links and redirects
- **Example**: `http://localhost` (dev) or `https://teachback.example.com` (prod)

---

### Database Configuration

#### DATABASE_URL
- **Type**: Database URL string
- **Required**: Yes
- **Format**: `postgresql://user:password@host:port/database`
- **Purpose**: PostgreSQL database connection
- **Example**: `postgresql://template_user:template_password@db:5432/template_db`
- **Docker Default**: Uses `db` service hostname

---

### Cache & Message Queue

#### REDIS_URL
- **Type**: Redis URL string
- **Required**: Yes
- **Format**: `redis://host:port/db_number`
- **Purpose**: Redis connection for Django cache
- **Example**: `redis://redis:6379/1`

#### CACHE_PREFIX
- **Type**: String
- **Required**: No
- **Default**: `app`
- **Purpose**: Prefix for cache keys to avoid collisions
- **Example**: `teachback`

#### CELERY_BROKER_URL
- **Type**: Redis URL string
- **Required**: Yes
- **Format**: `redis://host:port/db_number`
- **Purpose**: Celery task queue broker
- **Example**: `redis://redis:6379/0`
- **Note**: Use different db number than REDIS_URL

---

### Email Configuration

#### EMAIL_HOST
- **Type**: String
- **Required**: Yes
- **Purpose**: SMTP server hostname
- **Examples**:
  - Gmail: `smtp.gmail.com`
  - Outlook: `smtp-mail.outlook.com`
  - SendGrid: `smtp.sendgrid.net`

#### EMAIL_PORT
- **Type**: Integer
- **Required**: Yes
- **Purpose**: SMTP server port
- **Examples**:
  - TLS: `587`
  - SSL: `465`
  - Unencrypted: `25`

#### EMAIL_USE_TLS
- **Type**: Boolean
- **Required**: No
- **Default**: `True`
- **Purpose**: Use TLS for email connection
- **Example**: `True`

#### EMAIL
- **Type**: Email address
- **Required**: Yes
- **Purpose**: Sender email address (From field)
- **Example**: `noreply@teachback.com`

#### EMAIL_PASS
- **Type**: String
- **Required**: Yes
- **Purpose**: SMTP authentication password
- **Example**: `your-app-password-here`
- **Security**: 🔒 Use App Password for Gmail, not your account password

---

### External API Keys

#### DEEPGRAM_API_KEY
- **Type**: String
- **Required**: Yes
- **Purpose**: Deepgram API for speech-to-text
- **Example**: `YOUR_DEEPGRAM_API_KEY_HERE`
- **Get Key**: https://deepgram.com
- **Security**: 🔒 Keep secret

#### GROQ_API_KEY
- **Type**: String
- **Required**: Yes
- **Purpose**: Groq API for AI/LLM inference
- **Example**: `YOUR_GROQ_API_KEY_HERE`
- **Get Key**: https://groq.com
- **Security**: 🔒 Keep secret

#### ELEVENLABS_API_KEY
- **Type**: String
- **Required**: Yes
- **Purpose**: ElevenLabs API for text-to-speech
- **Example**: `YOUR_ELEVENLABS_API_KEY_HERE`
- **Get Key**: https://elevenlabs.io
- **Security**: 🔒 Keep secret

---

### Security Settings

#### API_KEY
- **Type**: String
- **Required**: No
- **Purpose**: Internal API key for system-to-system calls
- **Example**: `internal-api-key-for-protected-endpoints`
- **Security**: 🔒 Keep secret

#### ENCRYPTION_KEY
- **Type**: String (Fernet key)
- **Required**: No
- **Default**: Auto-generated
- **Purpose**: Key for encrypting sensitive data
- **Example**: Auto-generated 32-byte Fernet key
- **Security**: 🔒 Keep secret, backup if using custom key

---

## Frontend Environment Variables

All frontend variables must be prefixed with `VITE_` for Vite to expose them.

#### VITE_API_URL
- **Type**: URL string
- **Required**: Yes
- **Purpose**: Backend API base URL
- **Example**: `http://localhost/api` (through Nginx)
- **Note**: Include `/api` suffix

#### VITE_APP_NAME
- **Type**: String
- **Required**: Yes
- **Purpose**: Application name for display
- **Example**: `TeachBack`
- **Usage**: Page titles, headers, branding

#### VITE_ENV
- **Type**: String
- **Required**: No
- **Default**: `development`
- **Purpose**: Environment identifier
- **Values**: `development`, `staging`, `production`
- **Usage**: Conditional feature flags

---

## Example .env Files

### backend/.env (Development)

```env
# Application
APP_NAME=TeachBack
DEBUG=True
SECRET_KEY=dev-secret-key-not-for-production-use
BASE_URL=http://localhost
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://template_user:template_password@db:5432/template_db

# Redis & Cache
REDIS_URL=redis://redis:6379/1
CACHE_PREFIX=teachback
CELERY_BROKER_URL=redis://redis:6379/0

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password

# External APIs
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY_HERE
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
ELEVENLABS_API_KEY=YOUR_ELEVENLABS_API_KEY_HERE
```

### backend/.env (Production)

```env
# Application
APP_NAME=TeachBack
DEBUG=False
SECRET_KEY=generate-a-very-long-random-string-here
BASE_URL=https://teachback.example.com
ALLOWED_HOSTS=teachback.example.com,www.teachback.example.com

# Database (use managed service)
DATABASE_URL=postgresql://prod_user:secure_password@your-db-host:5432/teachback_prod

# Redis (use managed service)
REDIS_URL=redis://your-redis-host:6379/1
CACHE_PREFIX=teachback_prod
CELERY_BROKER_URL=redis://your-redis-host:6379/0

# Email (production SMTP)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL=noreply@teachback.example.com
EMAIL_PASS=your-sendgrid-api-key

# External APIs
DEEPGRAM_API_KEY=prod-deepgram-key
GROQ_API_KEY=prod-groq-key
ELEVENLABS_API_KEY=prod-elevenlabs-key

# Security
API_KEY=strong-internal-api-key
```

### frontend/.env

```env
VITE_API_URL=http://localhost/api
VITE_APP_NAME=TeachBack
VITE_ENV=development
```

---

## Variable Reference Table

| Variable | Required | Default | Location |
|----------|----------|---------|----------|
| `APP_NAME` | Yes | - | Backend |
| `DEBUG` | No | False | Backend |
| `SECRET_KEY` | Yes | - | Backend |
| `ALLOWED_HOSTS` | No | localhost,127.0.0.1 | Backend |
| `BASE_URL` | Yes | - | Backend |
| `DATABASE_URL` | Yes | - | Backend |
| `REDIS_URL` | Yes | - | Backend |
| `CACHE_PREFIX` | No | app | Backend |
| `CELERY_BROKER_URL` | Yes | - | Backend |
| `EMAIL_HOST` | Yes | - | Backend |
| `EMAIL_PORT` | Yes | - | Backend |
| `EMAIL_USE_TLS` | No | True | Backend |
| `EMAIL` | Yes | - | Backend |
| `EMAIL_PASS` | Yes | - | Backend |
| `DEEPGRAM_API_KEY` | Yes | - | Backend |
| `GROQ_API_KEY` | Yes | - | Backend |
| `ELEVENLABS_API_KEY` | Yes | - | Backend |
| `API_KEY` | No | - | Backend |
| `ENCRYPTION_KEY` | No | Auto | Backend |
| `VITE_API_URL` | Yes | - | Frontend |
| `VITE_APP_NAME` | Yes | - | Frontend |
| `VITE_ENV` | No | development | Frontend |
