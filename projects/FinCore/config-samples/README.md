# Configuration Samples# Configuration Samples



This folder contains **sanitized** configuration files from the FinCore project. All sensitive information (passwords, API keys, tokens) has been replaced with placeholders.These are sanitized configuration files from the FinCore project.

Sensitive information has been replaced with placeholders.

---

## Files Included

## Files Included

- `docker-compose.yml` - Docker services configuration

### 1. `docker-compose.yml`- `package.json` - Node.js dependencies (frontend)

- **What**: Docker Compose orchestration file for all 6 services- `requirements.txt` - Python dependencies (backend)

- **Services**: PostgreSQL, Django Backend, Celery Worker, Celery Beat, Redis, React Frontend, Nginx- `.env.example` - Environment variables template

- **Sanitized**: All passwords replaced with `YOUR_PASSWORD_HERE`

- **Usage**: Copy to project root and replace placeholders with actual values## Usage



### 2. `package.json`Copy these files to your project root and customize:

- **What**: Node.js dependencies for React frontend

- **Contains**: React 19, Tailwind CSS, Framer Motion, testing libraries1. Copy `.env.example` to `.env`

- **Safe to share**: No sensitive data2. Replace all `YOUR_*_HERE` placeholders with actual values

- **Usage**: Copy to `frontend/` directory and run `npm install`3. Change passwords to strong, unique values (20+ characters recommended)

4. Update URLs for your environment

### 3. `requirements.txt`5. Generate unique SECRET_KEY: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`

- **What**: Python dependencies for Django backend

- **Contains**: Django 5.2, DRF, Celery, PostgreSQL driver, Redis client## Security Notes

- **Safe to share**: No sensitive data

- **Usage**: Copy to `backend/` directory and run `pip install -r requirements.txt`- ⚠️ **Never commit `.env` file to Git**

- 🔒 Use strong passwords (20+ characters)

### 4. `.env.example`- 🔑 Generate unique SECRET_KEY for production

- **What**: Template for environment variables- 🗝️ Keep database credentials secret

- **Contains**: All required and optional environment variables with examples- 📧 Use Gmail App Passwords, not your main password

- **Usage**: Copy to `.env` and fill in actual values- 🌐 Restrict ALLOWED_HOSTS in production to specific domains

- 🔐 Set DEBUG=False in production

---

## Docker Compose

## How to Use These Files

The `docker-compose.yml` file defines 6 services:

### For Portfolio Viewers

These files demonstrate:1. **PostgreSQL** (db) - Database server

- **Tech stack expertise**: Docker, PostgreSQL, Redis, React, Django2. **Django Backend** (backend) - API server

- **DevOps knowledge**: Containerization, service orchestration3. **Celery Worker** (celery) - Background task processor

- **Dependency management**: Modern package managers (npm, pip)4. **Celery Beat** (celery-beat) - Task scheduler

- **Security awareness**: Sensitive data sanitized, not committed to Git5. **Redis** (redis) - Cache and message broker

6. **React Frontend** (frontend) - Web UI

### For Developers Wanting to Run FinCore7. **Nginx** (nginx) - Reverse proxy



1. **Clone the repository**:### Starting Services

   ```bash

   git clone https://github.com/KazimFedxD/FinCore.git```bash

   cd FinCore# Build images

   ```docker-compose build



2. **Copy and customize configurations**:# Start all services

   ```bashdocker-compose up -d

   # Docker Compose (already in project root)

   # Edit docker-compose.yml and replace YOUR_PASSWORD_HERE# View logs

   docker-compose logs -f

   # Backend environment variables

   cd backend# Stop services

   cp .env.example .envdocker-compose down

   # Edit .env and fill in actual values```

   

   # Frontend environment variables (if needed)## Python Dependencies (backend)

   cd ../frontend

   cp .env.example .envSee `requirements.txt` for complete list. Key packages:

   # Edit .env

   ```- Django 5.2 - Web framework

- Django REST Framework - API toolkit

3. **Start the application**:- Celery - Asynchronous tasks

   ```bash- PostgreSQL adapter - Database connection

   docker-compose up -d- JWT authentication - Token-based auth

   ```

Install: `pip install -r requirements.txt`

4. **Access the app**:

   - Frontend: http://localhost:3000## Node.js Dependencies (frontend)

   - Backend API: http://localhost:8000

   - Django Admin: http://localhost:8000/adminSee `package.json` for complete list. Key packages:



---- React 19 - UI library

- Tailwind CSS - Styling

## Security Notes- Framer Motion - Animations

- React Router - Navigation

### What Was Sanitized

Install: `npm install`

1. **Passwords**:

   - Database password: `fincore_password` → `YOUR_PASSWORD_HERE`## Production Deployment

   - Email password: (not in files, set via `.env`)

For production, make these changes:

2. **API Keys**:

   - Future Groq API key placeholder included in `.env.example`1. **Django**:

   - Set `DEBUG=False`

3. **Secret Keys**:   - Use strong `SECRET_KEY` (50+ random characters)

   - Django `SECRET_KEY` uses placeholder in `.env.example`   - Restrict `ALLOWED_HOSTS` to your domain

   - Enable SSL/HTTPS settings

4. **Domains**:

   - Production domains left as examples (`budget.fedxd.net`)2. **Database**:

   - Replace with your own domain in production   - Use managed PostgreSQL service (AWS RDS, DigitalOcean)

   - Strong password (20+ characters)

### What's Safe to Share   - Enable SSL connections



- Package dependency lists (`package.json`, `requirements.txt`)3. **Redis**:

- Docker service definitions (without credentials)   - Add authentication: `redis://:password@host:6379/0`

- Environment variable templates (without actual values)   - Use managed Redis (AWS ElastiCache, Redis Cloud)

- Configuration file structure

4. **Email**:

---   - Use production email service (SendGrid, AWS SES)

   - Configure SPF/DKIM records

## Configuration Best Practices

5. **Nginx**:

### Development Environment   - Configure SSL/TLS certificates (Let's Encrypt)

   - Enable HTTPS redirect

1. **Use default credentials** for local development:   - Set up rate limiting

   - Database: `fincore_user` / `fincore_password`

   - No email credentials needed (console backend)## Support



2. **Enable debug mode**:For questions or issues:

   ```bash

   DEBUG=True- **Documentation**: See `.website/` folder

   ```- **GitHub**: https://github.com/KazimFedxD/FinCore

- **Setup Guide**: `.website/setup.md`

3. **Allow all hosts**:
   ```bash
   ALLOWED_HOSTS=*
   ```

### Production Environment

1. **Change ALL default credentials**:
   - Strong database password (16+ characters)
   - Unique Django `SECRET_KEY`
   - Valid SMTP credentials

2. **Disable debug mode**:
   ```bash
   DEBUG=False
   ```

3. **Restrict allowed hosts**:
   ```bash
   ALLOWED_HOSTS=yourfincore.com,www.yourfincore.com
   ```

4. **Use HTTPS**:
   - Setup SSL certificates (Let's Encrypt)
   - Configure Nginx for HTTPS

5. **Use managed services**:
   - Managed PostgreSQL (AWS RDS, DigitalOcean Databases)
   - Managed Redis (AWS ElastiCache, Redis Cloud)
   - Email service (SendGrid, Mailgun, SES)

---

## Environment Variables

See [environment-variables.md](../environment-variables.md) for complete reference of all environment variables.

**Quick reference**:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Django cryptographic key
- `CELERY_BROKER_URL`: Redis connection for Celery
- `EMAIL_*`: SMTP configuration for email sending
- `DEBUG`: Enable/disable debug mode
- `ALLOWED_HOSTS`: Allowed domains to serve app

---

## Deployment Checklist

Before deploying to production:

- [ ] All passwords changed from defaults
- [ ] `SECRET_KEY` regenerated (not the Django default)
- [ ] `DEBUG=False` in production `.env`
- [ ] `ALLOWED_HOSTS` set to your domain only
- [ ] SMTP credentials tested and working
- [ ] HTTPS/SSL configured
- [ ] Database backups configured
- [ ] Firewall rules configured
- [ ] Resource limits set (RAM, CPU for containers)
- [ ] Logging configured (centralized logs)
- [ ] Monitoring setup (Sentry, CloudWatch, etc.)

---

## Common Issues

### "docker-compose.yml not found"
- These are sample files; actual `docker-compose.yml` is in project root
- Copy from this directory only if you need a clean template

### "Permission denied" errors
- Ensure Docker has permissions to access volumes
- On Linux, you may need to run with `sudo` or add user to docker group

### "Port already in use"
- Check if another service is using port 3000, 8000, 5432, or 6379
- Change port mappings in `docker-compose.yml` if needed
- Example: `"8001:8000"` to use port 8001 instead of 8000

### "Database connection failed"
- Verify PostgreSQL container is running: `docker ps`
- Check `DATABASE_URL` in backend `.env` matches `docker-compose.yml`
- Ensure database service is healthy: `docker-compose logs db`

---

## Additional Resources

- **Full Setup Guide**: See [setup.md](../setup.md)
- **Architecture Details**: See [architecture.md](../architecture.md)
- **Environment Variables**: See [environment-variables.md](../environment-variables.md)
- **Project README**: See [README.md](../README.md)

---

## Questions?

- **GitHub Issues**: https://github.com/KazimFedxD/FinCore/issues
- **Documentation**: All `.md` files in `.website/` folder
- **Base Template**: https://github.com/KazimFedxD/FullStack-Template

---

**Remember**: These are configuration samples for educational and portfolio purposes. Always use strong, unique credentials in production environments!
