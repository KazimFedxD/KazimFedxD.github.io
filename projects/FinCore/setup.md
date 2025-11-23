# Setup & Configuration# Setup & Configuration



This guide provides comprehensive instructions for setting up and deploying FinCore on your local machine or server.## Prerequisites



## Prerequisites### Required Software

- **Docker**: Version 20.10 or higher

Before you begin, ensure you have the following installed:- **Docker Compose**: Version 2.0 or higher

- **Git**: For cloning the repository

### Required Software- **Text Editor**: VS Code, Sublime, or any IDE

- **Docker**: Version 24.0+ ([Install Docker](https://docs.docker.com/get-docker/))

- **Docker Compose**: Version 2.20+ (usually included with Docker Desktop)### Optional (for non-Docker development)

- **Git**: For cloning the repository- **Python**: 3.11 or higher

- **Node.js**: 18.x or higher

### System Requirements- **PostgreSQL**: 14 or higher

- **RAM**: 4GB minimum, 8GB recommended- **Redis**: 7 or higher

- **Disk Space**: 5GB free space (2GB minimum)

- **CPU**: Dual-core 2.0GHz minimum### System Requirements

- **OS**: Windows 10/11, macOS 12+, or Ubuntu 20.04+- **RAM**: 4GB minimum, 8GB recommended

- **Disk Space**: 2GB free space

### Optional Tools- **Network**: Internet connection for downloading Docker images

- **Make**: For using Makefile commands (optional convenience)

- **Node.js 18+**: Only if developing frontend outside Docker---

- **Python 3.11+**: Only if developing backend outside Docker

## Installation

---

### 1. Clone Repository

## Installation

```bash

### 1. Clone Repositorygit clone https://github.com/KazimFedxD/FinCore.git

cd FinCore

```bash```

git clone https://github.com/KazimFedxD/FinCore.git

cd FinCore### 2. Environment Configuration

```

Create a `.env` file in the project root (optional for development):

### 2. Environment Configuration

```bash

#### 2.1 Backend Environment Variables# Database

DATABASE_URL=postgres://fincore_user:fincore_password@db:5432/fincore_db

Create a `.env` file in the project root:

# Celery

```bashCELERY_BROKER_URL=redis://redis:6379/0

cp .website/config-samples/.env.example .env

```# Django

SECRET_KEY=your-secret-key-here-change-in-production

**Edit `.env` and configure:**DEBUG=True

ALLOWED_HOSTS=*

```bash

# Database Configuration# Email (for verification emails - optional in development)

DATABASE_URL=postgresql://fincore_user:YOUR_SECURE_PASSWORD@db:5432/fincore_dbEMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

# Django Secret Key (generate new one for production!)EMAIL_USE_TLS=True

SECRET_KEY=your-secret-key-here-change-in-productionEMAIL_HOST_USER=your-email@gmail.com

EMAIL_HOST_PASSWORD=your-app-password

# Celery Configuration```

CELERY_BROKER_URL=redis://redis:6379/0

CELERY_RESULT_BACKEND=redis://redis:6379/0**Note**: The default `docker-compose.yml` includes these values, so `.env` is optional for local development.



# Email Configuration (for email verification)### 3. Build and Start Services

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend

EMAIL_HOST=smtp.gmail.com```bash

EMAIL_PORT=587# Build all Docker images

EMAIL_USE_TLS=Truedocker-compose build

EMAIL_HOST_USER=your-email@gmail.com

EMAIL_HOST_PASSWORD=your-app-password# Start all services in detached mode

DEFAULT_FROM_EMAIL=noreply@yourdomain.comdocker-compose up -d

```

# Frontend URL

FRONTEND_URL=http://localhost:3000This command will start:

- PostgreSQL database (port 5432)

# Development Settings- Redis (port 6379)

DEBUG=True- Django backend (port 8000)

ALLOWED_HOSTS=localhost,127.0.0.1,budget.fedxd.net- Celery worker

- Celery beat scheduler

# CORS Settings- React frontend (port 3000)

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000- Nginx reverse proxy (port 80/443)

```

### 4. Run Database Migrations

#### 2.2 Frontend Environment Variables

```bash

Create `.env` file in `frontend/` directory:# Run Django migrations to create database tables

docker-compose exec backend python manage.py migrate

```bash```

# API Endpoint

REACT_APP_API_URL=http://localhost:8000### 5. Create Default Categories



# Optional: Analytics, Feature FlagsThe application includes a migration that creates default root categories (Income and Expense). If they weren't created automatically, you can create them manually:

# REACT_APP_ANALYTICS_ID=your-analytics-id

``````bash

docker-compose exec backend python manage.py shell

#### 2.3 Generate Django Secret Key

# In the Python shell:

For production, generate a secure secret key:from api.models import Category

Category.objects.create(name="Income", root=True, description="Root category for all income")

```bashCategory.objects.create(name="Expense", root=True, description="Root category for all expenses")

python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"```

```

### 6. Create Superuser (Optional)

Copy the output and replace `your-secret-key-here-change-in-production` in `.env`.

To access the Django admin panel:

#### 2.4 Email Configuration

```bash

**For Gmail:**docker-compose exec backend python manage.py createsuperuser

1. Enable 2-Factor Authentication on your Google account```

2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)

3. Use the app password in `EMAIL_HOST_PASSWORD`Follow the prompts to create an admin account.



**For Other Providers:**### 7. Access the Application

- **SendGrid**: Use `smtp.sendgrid.net` with API key

- **Mailgun**: Use `smtp.mailgun.org` with credentials- **Frontend**: http://localhost:3000

- **AWS SES**: Use SES SMTP endpoint with credentials- **Backend API**: http://localhost:8000/api/

- **Django Admin**: http://localhost:8000/admin/

### 3. Docker Compose Configuration- **With Nginx**: http://localhost (routes to appropriate services)



The `docker-compose.yml` file defines 6 services:---



1. **db** (PostgreSQL 16): Database server## Configuration

2. **redis** (Redis 7): Cache and message broker

3. **backend** (Django): REST API server### Django Settings

4. **celery**: Async task worker

5. **celery-beat**: Scheduled task schedulerLocated in `backend/backend/settings.py`:

6. **frontend** (React 19): Web application

**Key configurations**:

**Update `docker-compose.yml` passwords** (if not using `.env`):

```python

```yaml# JWT Token Lifetimes

environment:SIMPLE_JWT = {

  - POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD  # Change this!    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),  # Short-lived

```    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),   # Long-lived

}

### 4. Build and Start Services

# CORS Settings (allow frontend to access backend)

#### 4.1 First-Time SetupCORS_ALLOWED_ORIGINS = [

    "http://localhost:3000",

Build all Docker images:    "http://budget.fedxd.net",

]

```bashCORS_ALLOW_CREDENTIALS = True  # For cookie-based auth

docker-compose build

```# Database (uses environment variable)

DATABASES = {

**Expected output:**    "default": dj_database_url.config(

- Building backend (Django): ~3-5 minutes        default=os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")

- Building frontend (React): ~2-4 minutes    )

- Pulling db, redis images: ~1-2 minutes}

```

#### 4.2 Start All Services

### React Configuration

```bash

docker-compose up -dLocated in `frontend/src/config/app.js`:

```

```javascript

**Verify services are running:**// API Base URL

export const API_BASE_URL = 

```bash  process.env.REACT_APP_API_URL || 'http://localhost:8000';

docker-compose ps

```// Navigation menu items

export const navigationItems = [

Expected status:  { name: 'Dashboard', path: '/dashboard', icon: '📊' },

```  { name: 'Categories', path: '/categories', icon: '📂' },

NAME                COMMAND                  STATUS  { name: 'Incomes', path: '/incomes', icon: '💰' },

fincore-backend-1   "sh -c 'python manag…"   Up (healthy)  { name: 'Expenses', path: '/expenses', icon: '💸' },

fincore-celery-1    "celery -A backend w…"   Up  { name: 'Reports', path: '/reports', icon: '📈' },

fincore-celery-beat-1 "celery -A backend b…"  Up];

fincore-db-1        "docker-entrypoint.s…"   Up (healthy)```

fincore-frontend-1  "docker-entrypoint.s…"   Up

fincore-redis-1     "docker-entrypoint.s…"   Up (healthy)### Docker Compose Configuration

```

Located in `docker-compose.yml`:

#### 4.3 Check Logs

**Service dependencies**:

```bash```yaml

# All servicesbackend:

docker-compose logs -f  depends_on:

    db:

# Specific service      condition: service_healthy  # Waits for PostgreSQL to be ready

docker-compose logs -f backend    redis:

docker-compose logs -f frontend      condition: service_started

``````



### 5. Database Initialization**Health checks**:

```yaml

#### 5.1 Run Migrationsdb:

  healthcheck:

```bash    test: ["CMD-SHELL", "pg_isready -U fincore_user -d fincore_db"]

docker-compose exec backend python manage.py migrate    interval: 2s

```    timeout: 2s

    retries: 10

**Expected output:**```

```

Operations to perform:### Nginx Configuration

  Apply all migrations: admin, api, auth, authtoken, contenttypes, sessions, usermanagement

Running migrations:Located in `nginx/nginx.conf`:

  Applying api.0001_initial... OK

  Applying api.0002_category_root... OK```nginx

  Applying api.0003_alter_expense_date_alter_income_date... OKserver {

  Applying api.0004_add_default_categories... OK    listen 80;

  ...    server_name budget.fedxd.net localhost;

```

    # API requests go to Django

#### 5.2 Create Superuser (Optional)    location /api/ {

        proxy_pass http://backend:8000;

For admin panel access:        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;

```bash    }

docker-compose exec backend python manage.py createsuperuser

```    # Admin panel

    location /admin/ {

Enter username, email, and password when prompted.        proxy_pass http://backend:8000;

    }

#### 5.3 Load Default Categories

    # Everything else goes to React

Default categories are created automatically by migration `0004_add_default_categories.py`. These include:    location / {

- Root categories (protected, cannot be deleted by users)        proxy_pass http://frontend:3000;

- Default Islamic finance categories (Zakat, Khums, etc.)    }

}

### 6. Access the Application```



After successful startup:---



- **Frontend**: http://localhost:3000## Deployment

- **Backend API**: http://localhost:8000/api/

- **Django Admin**: http://localhost:8000/admin/### Development Deployment (Docker Compose)

- **API Documentation**: http://localhost:8000/api/docs/ (if configured)

**Current setup** - Already configured for local development:

### 7. First-Time User Setup

```bash

1. **Register Account**:# Start services

   - Navigate to http://localhost:3000docker-compose up -d

   - Click "Sign Up"

   - Enter username, email, password# View logs

   - Submit registrationdocker-compose logs -f



2. **Verify Email**:# Stop services

   - Check email inbox for verification linkdocker-compose down

   - Click verification link (opens in browser)

   - Account is now verified# Stop and remove volumes (clean slate)

docker-compose down -v

3. **Login**:```

   - Navigate to login page

   - Enter credentials### Production Deployment (Future)

   - Access dashboard

**Recommended stack**:

4. **Create Categories**:- **Cloud Provider**: AWS, DigitalOcean, or Linode

   - Go to Categories page- **Database**: Managed PostgreSQL (AWS RDS, DigitalOcean Managed DB)

   - Add custom categories (e.g., "Groceries", "Rent", "Salary")- **Cache**: Managed Redis (AWS ElastiCache, Redis Cloud)

   - Organize with parent-child relationships- **Static Files**: AWS S3 + CloudFront CDN

- **SSL/TLS**: Let's Encrypt via Certbot

5. **Add Transactions**:- **Process Manager**: Docker Swarm or Kubernetes

   - Add income entries (salary, freelance, etc.)

   - Add expense entries (bills, shopping, etc.)**Production checklist**:

   - View dashboard for summary1. Set `DEBUG=False` in Django settings

2. Generate strong `SECRET_KEY`

---3. Configure `ALLOWED_HOSTS` with production domain

4. Set up SSL certificates

## Deployment5. Configure database backups

6. Set up monitoring (Sentry, New Relic)

### Production Deployment (Docker)7. Enable HTTPS redirect in Nginx

8. Configure firewall rules

#### 1. Update Environment Variables9. Set up CI/CD pipeline (GitHub Actions)

10. Configure email service (SendGrid, AWS SES)

**Change `.env` for production:**

---

```bash

# CRITICAL: Change these values!## Development Workflow

DEBUG=False

SECRET_KEY=generate-new-secret-key-using-command-above### Hot Reloading



# Production domainsBoth frontend and backend support hot-reloading during development:

ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

FRONTEND_URL=https://yourdomain.com- **React**: Changes to JS files automatically refresh browser

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com- **Django**: Changes to Python files automatically restart server

- **Docker volumes** mount local code into containers

# Secure database password

DATABASE_URL=postgresql://fincore_user:STRONG_PASSWORD_HERE@db:5432/fincore_db### Running Individual Services



# Production email (use professional SMTP)```bash

EMAIL_HOST=smtp.sendgrid.net# Run only backend services (no frontend)

EMAIL_HOST_USER=apikeydocker-compose up db redis backend celery celery-beat

EMAIL_HOST_PASSWORD=YOUR_SENDGRID_API_KEY

DEFAULT_FROM_EMAIL=noreply@yourdomain.com# Run only database

```docker-compose up db



#### 2. SSL/TLS Configuration# Rebuild specific service

docker-compose build backend

**Option A: Using Nginx with Let's Encrypt (Recommended)**docker-compose up -d backend

```

Add to `docker-compose.yml`:

### Accessing Service Shells

```yaml

nginx:```bash

  image: nginx:alpine# Django shell (Python REPL with models loaded)

  ports:docker-compose exec backend python manage.py shell

    - "80:80"

    - "443:443"# PostgreSQL shell

  volumes:docker-compose exec db psql -U fincore_user -d fincore_db

    - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro

    - ./certs:/etc/nginx/certs:ro# Redis CLI

    - ./nginx/html:/usr/share/nginx/html:rodocker-compose exec redis redis-cli

  depends_on:

    - backend# Backend bash shell

    - frontenddocker-compose exec backend bash

```

# Frontend bash shell

**Obtain SSL certificate:**docker-compose exec frontend bash

```

```bash

# Install certbot### Viewing Logs

sudo apt install certbot

```bash

# Get certificate# All services

sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.comdocker-compose logs -f



# Copy certificates# Specific service

sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./certs/docker-compose logs -f backend

sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./certs/

```# Last 100 lines

docker-compose logs --tail=100 backend

**Update `nginx/nginx.conf` for SSL:**```



```nginx---

server {

    listen 443 ssl http2;## Challenges & Solutions

    server_name yourdomain.com www.yourdomain.com;

### Challenge 1: JWT Token Refresh

    ssl_certificate /etc/nginx/certs/fullchain.pem;

    ssl_certificate_key /etc/nginx/certs/privkey.pem;**Problem**: Access tokens expire every 5 minutes, causing API calls to fail.



    # Strong SSL configuration**Solution**: Implemented automatic token refresh in `AuthContext`:

    ssl_protocols TLSv1.2 TLSv1.3;

    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';```javascript

    ssl_prefer_server_ciphers on;useEffect(() => {

  const refreshInterval = setInterval(async () => {

    # Proxy to backend    const response = await fetch('/auth/refresh/', {

    location /api/ {      method: 'POST',

        proxy_pass http://backend:8000;      credentials: 'include', // Send cookies

        proxy_set_header Host $host;    });

        proxy_set_header X-Real-IP $remote_addr;    if (!response.ok) {

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;      // Refresh failed, logout user

        proxy_set_header X-Forwarded-Proto $scheme;      logout();

    }    }

  }, 4 * 60 * 1000); // Refresh every 4 minutes (before 5-min expiration)

    # Proxy to frontend

    location / {  return () => clearInterval(refreshInterval);

        proxy_pass http://frontend:3000;}, []);

        proxy_set_header Host $host;```

        proxy_set_header X-Real-IP $remote_addr;

    }**Result**: Users never experience auth errors during normal usage.

}

---

# Redirect HTTP to HTTPS

server {### Challenge 2: Category Filtering for Income/Expense

    listen 80;

    server_name yourdomain.com www.yourdomain.com;**Problem**: Users should only see income categories when adding income, not expense categories.

    return 301 https://$server_name$request_uri;

}**Solution**: Filter categories based on parent in frontend:

```

```javascript

**Option B: Using Cloudflare (Easier)**// Fetch all categories

const categories = await getCategories();

1. Point domain DNS to your server IP

2. Enable Cloudflare proxy (orange cloud)// Filter for income categories (parent = "Income")

3. Set SSL/TLS mode to "Full (strict)"const incomeCategories = categories.filter(

4. Cloudflare handles SSL automatically  cat => cat.parent__name === 'Income' && !cat.root

);

#### 3. Database Backup Strategy

// Filter for expense categories (parent = "Expense")

**Automated daily backups:**const expenseCategories = categories.filter(

  cat => cat.parent__name === 'Expense' && !cat.root

Create `backup.sh`:);

```

```bash

#!/bin/bash**Result**: Clean UX with only relevant categories shown.

BACKUP_DIR="/backups/fincore"

DATE=$(date +%Y%m%d_%H%M%S)---

FILENAME="fincore_backup_$DATE.sql"

### Challenge 3: Database Initialization

# Create backup

docker-compose exec -T db pg_dump -U fincore_user fincore_db > "$BACKUP_DIR/$FILENAME"**Problem**: Backend starts before PostgreSQL is fully ready, causing connection errors.



# Compress backup**Solution**: Added health checks to docker-compose:

gzip "$BACKUP_DIR/$FILENAME"

```yaml

# Keep only last 30 daysdb:

find "$BACKUP_DIR" -type f -mtime +30 -delete  healthcheck:

    test: ["CMD-SHELL", "pg_isready -U fincore_user"]

echo "Backup completed: $FILENAME.gz"    interval: 2s

```    retries: 10



**Add to crontab:**backend:

  depends_on:

```bash    db:

# Run daily at 2 AM      condition: service_healthy  # Wait for health check to pass

0 2 * * * /path/to/backup.sh >> /var/log/fincore_backup.log 2>&1```

```

**Result**: Services start in correct order without manual intervention.

#### 4. Monitoring & Logging

---

**View production logs:**

### Challenge 4: CORS Errors

```bash

# Tail all logs**Problem**: React frontend (localhost:3000) couldn't access Django API (localhost:8000) due to CORS policy.

docker-compose logs -f --tail=100

**Solution**: Configured `django-cors-headers`:

# Check error logs only

docker-compose logs | grep ERROR```python

INSTALLED_APPS = [

# Export logs to file    'corsheaders',

docker-compose logs > logs_$(date +%Y%m%d).txt    # ...

```]



**Set up log rotation** (add to `docker-compose.yml`):MIDDLEWARE = [

    'corsheaders.middleware.CorsMiddleware',

```yaml    # ... (must be early in middleware list)

logging:]

  driver: "json-file"

  options:CORS_ALLOWED_ORIGINS = [

    max-size: "10m"    "http://localhost:3000",

    max-file: "3"]

```CORS_ALLOW_CREDENTIALS = True  # Allow cookies

```

#### 5. Performance Optimization

**Result**: Seamless API communication between frontend and backend.

**Enable production optimizations:**

---

```bash

# Collect static files (if serving via Django)### Challenge 5: Email Verification in Development

docker-compose exec backend python manage.py collectstatic --noinput

**Problem**: No email server configured during development.

# Optimize frontend build

docker-compose exec frontend npm run build**Solution**: 

```1. **Short-term**: Print verification codes to console (Django logs)

2. **Future**: Use Celery to queue emails, configure Gmail SMTP for testing

**Update `backend/settings.py` for production:**

```python

```python# Development workaround

# Disable debug toolbarif DEBUG:

DEBUG = False    print(f"Verification code for {user.email}: {token}")

else:

# Use production database connection pooling    # Send actual email via Celery

DATABASES = {    send_verification_email.delay(user.email, token)

    'default': {```

        'ENGINE': 'django.db.backends.postgresql',

        'CONN_MAX_AGE': 600,  # 10 minutes**Result**: Can test email verification flow without email server.

        'OPTIONS': {

            'connect_timeout': 10,---

        }

    }## Troubleshooting

}

### Services Won't Start

# Enable caching

CACHES = {```bash

    'default': {# Check container status

        'BACKEND': 'django_redis.cache.RedisCache',docker-compose ps

        'LOCATION': 'redis://redis:6379/1',

        'OPTIONS': {# View error logs

            'CLIENT_CLASS': 'django_redis.client.DefaultClient',docker-compose logs backend

        }

    }# Rebuild containers

}docker-compose down

```docker-compose build --no-cache

docker-compose up -d

---```



## Challenges Faced & Solutions### Database Connection Errors



### Challenge 1: JWT Token Refresh Strategy```bash

# Ensure PostgreSQL is running

**Problem**: Access tokens expire in 5 minutes, causing frequent login prompts.docker-compose ps db



**Solution**: Implemented automatic token refresh using interceptors:# Check database logs

docker-compose logs db

```javascript

// frontend/src/utils/apiClient.js# Try connecting manually

axios.interceptors.response.use(docker-compose exec db psql -U fincore_user -d fincore_db

  response => response,```

  async error => {

    if (error.response?.status === 401) {### Frontend Can't Reach Backend

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {- Verify backend is running: `docker-compose ps backend`

        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });- Check CORS settings in `backend/backend/settings.py`

        localStorage.setItem('accessToken', response.data.access);- Verify API_BASE_URL in `frontend/src/config/app.js`

        error.config.headers['Authorization'] = `Bearer ${response.data.access}`;- Check browser console for error details

        return axios(error.config);

      }### Migrations Fail

    }

    return Promise.reject(error);```bash

  }# Reset database (WARNING: deletes all data)

);docker-compose down -v

```docker-compose up -d db

docker-compose exec backend python manage.py migrate

**Impact**: Seamless user experience with enhanced security.

# Or manually create tables

### Challenge 2: Email Verification in Dockerdocker-compose exec backend python manage.py makemigrations

docker-compose exec backend python manage.py migrate

**Problem**: Email sending failed from Docker container due to SMTP restrictions.```



**Solution**: Used Celery for async email sending + Gmail App Passwords:---



```python## Next Steps

# backend/backend/celery.py

@shared_taskAfter successful installation:

def send_verification_email(user_id, verification_code):

    user = AuthAcc.objects.get(id=user_id)1. **Create an account**: Navigate to http://localhost:3000 and register

    send_mail(2. **Verify email**: Check console logs for verification code

        subject='Verify Your Email',3. **Add categories**: Create subcategories under Income and Expense

        message=f'Your code: {verification_code}',4. **Add transactions**: Start tracking income and expenses

        from_email=settings.DEFAULT_FROM_EMAIL,5. **View dashboard**: See your financial overview

        recipient_list=[user.email],6. **Explore reports**: Analyze category breakdowns

    )

```---



**Impact**: Reliable email delivery with retry mechanism.## Additional Resources



### Challenge 3: Database Migrations with Default Categories- **Django Documentation**: https://docs.djangoproject.com/

- **React Documentation**: https://react.dev/

**Problem**: Need to create default categories for all users, but can't assume user IDs.- **Docker Compose Reference**: https://docs.docker.com/compose/

- **PostgreSQL Docs**: https://www.postgresql.org/docs/

**Solution**: Created data migration with root categories (no user FK):- **FullStack-Template**: https://github.com/KazimFedxD/FullStack-Template


```python
# backend/api/migrations/0004_add_default_categories.py
def create_default_categories(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    categories = [
        {'name': 'Income', 'root': True},
        {'name': 'Expenses', 'root': True},
        {'name': 'Zakat', 'root': True},
        {'name': 'Khums', 'root': True},
    ]
    for cat in categories:
        Category.objects.create(**cat, user_id=None)
```

**Impact**: Consistent category structure across all users.

### Challenge 4: CORS Issues with Cookies

**Problem**: JWT tokens in cookies not sent from frontend (localhost:3000) to backend (localhost:8000).

**Solution**: Configured CORS to allow credentials:

```python
# backend/backend/settings.py
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')

# Also configure cookies as SameSite=None in production
SESSION_COOKIE_SAMESITE = 'None' if not DEBUG else 'Lax'
SESSION_COOKIE_SECURE = not DEBUG
```

**Impact**: Cookies work correctly across different origins.

### Challenge 5: React State Loss on Page Refresh

**Problem**: Dashboard data lost when user refreshes page.

**Solution**: Implemented state preservation with localStorage:

```javascript
// frontend/src/utils/statePreservation.js
export const saveState = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const loadState = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

// Usage in DashboardPage.js
useEffect(() => {
  if (reportData) saveState('dashboard', reportData);
}, [reportData]);
```

**Impact**: Improved UX with persistent data across sessions.

---

## Troubleshooting

### Issue: Docker containers won't start

**Symptoms**: `docker-compose up` fails or containers exit immediately.

**Solutions**:
1. Check logs: `docker-compose logs backend`
2. Verify `.env` file exists and has correct values
3. Ensure ports 3000, 8000, 5432, 6379 are not in use:
   ```bash
   sudo lsof -i :3000
   sudo lsof -i :8000
   ```
4. Rebuild containers: `docker-compose build --no-cache`

### Issue: Database connection errors

**Symptoms**: `django.db.utils.OperationalError: could not connect to server`

**Solutions**:
1. Wait for PostgreSQL to fully start (check with `docker-compose logs db`)
2. Verify `DATABASE_URL` in `.env` matches `docker-compose.yml`
3. Check database health: `docker-compose exec db pg_isready`

### Issue: Frontend not loading

**Symptoms**: Blank page or "Cannot connect to backend" error.

**Solutions**:
1. Check if backend is running: `curl http://localhost:8000/api/`
2. Verify `REACT_APP_API_URL` in `frontend/.env`
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check CORS settings in `backend/settings.py`

### Issue: Email verification not working

**Symptoms**: No verification email received.

**Solutions**:
1. Check Celery logs: `docker-compose logs celery`
2. Verify email credentials in `.env`
3. For Gmail, ensure App Password is correct (not regular password)
4. Check spam folder
5. Test email manually:
   ```bash
   docker-compose exec backend python manage.py shell
   >>> from django.core.mail import send_mail
   >>> send_mail('Test', 'Message', 'from@example.com', ['to@example.com'])
   ```

### Issue: JWT token expired errors

**Symptoms**: Frequent "Authentication credentials were not provided" errors.

**Solutions**:
1. Check token expiry settings in `backend/settings.py`
2. Ensure frontend refresh logic is working
3. Clear localStorage and re-login
4. Verify system clocks are synchronized (important for JWT)

### Issue: Migrations fail

**Symptoms**: `django.db.migrations.exceptions.InconsistentMigrationHistory`

**Solutions**:
1. Drop database and recreate:
   ```bash
   docker-compose down -v
   docker-compose up -d db
   docker-compose exec backend python manage.py migrate
   ```
2. If in development, delete migration files (except `__init__.py`) and remake:
   ```bash
   docker-compose exec backend python manage.py makemigrations
   docker-compose exec backend python manage.py migrate
   ```

---

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: React dev server auto-reloads on file changes
- **Backend**: Django dev server auto-reloads on `.py` file changes

### Running Tests

```bash
# Backend tests
docker-compose exec backend python manage.py test

# Frontend tests
docker-compose exec frontend npm test
```

### Accessing Django Shell

```bash
docker-compose exec backend python manage.py shell
```

### Database Shell

```bash
# PostgreSQL shell
docker-compose exec db psql -U fincore_user fincore_db

# Django dbshell
docker-compose exec backend python manage.py dbshell
```

### Linting & Formatting

```bash
# Backend (flake8)
docker-compose exec backend flake8 .

# Frontend (ESLint)
docker-compose exec frontend npm run lint
```

---

## Next Steps

After successful setup:

1. ✅ **Add Sample Data**: Create categories, add transactions to test features
2. ✅ **Explore Dashboard**: View financial summary and reports
3. ✅ **Test Email Verification**: Register a new account and verify email flow
4. ✅ **Read API Documentation**: Explore available endpoints
5. ✅ **Contribute**: Check `CONTRIBUTING.md` for development guidelines (if available)

**Need Help?**
- Check `known-issues.md` for common problems
- Review `architecture.md` for system design details
- Open an issue on GitHub: https://github.com/KazimFedxD/FinCore/issues
