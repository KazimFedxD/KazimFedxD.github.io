# System Requirements

## Operating System Compatibility

### ✅ Fully Supported

| Operating System | Minimum Version | Notes |
|-----------------|----------------|-------|
| **Ubuntu** | 20.04 LTS | Best Linux support, recommended |
| **Debian** | 11 (Bullseye) | Excellent Docker compatibility |
| **Fedora** | 35+ | Modern kernel, good performance |
| **CentOS / Rocky Linux** | 8+ | Enterprise-grade stability |
| **macOS** | 12 (Monterey) | Docker Desktop required |
| **Windows** | 10/11 Pro/Enterprise | WSL2 required for optimal performance |

### ⚠️ Partial Support

| Operating System | Limitations |
|-----------------|-------------|
| **Windows Home** | Requires WSL2 backend for Docker |
| **macOS** < 12 | May have Docker performance issues |
| **Arch Linux** | Fully functional but requires manual Docker setup |

### ❌ Not Supported

- Windows 7/8
- macOS < 10.15
- 32-bit operating systems

---

## Hardware Requirements

### Minimum Configuration

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **CPU** | Dual-core 2.0 GHz | Docker container orchestration |
| **RAM** | 4 GB | Minimum for all services |
| **Disk Space** | 5 GB free | Docker images and volumes |
| **Network** | Broadband internet | Pulling Docker images, dependencies |

**Expected Performance**: Functional but may be slow during builds and under load.

### Recommended Configuration

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **CPU** | Quad-core 2.5 GHz+ | Smooth development experience |
| **RAM** | 8 GB+ | Comfortable multi-service operation |
| **Disk Space** | 10 GB+ free | Logs, databases, build artifacts |
| **Network** | High-speed internet | Fast initial setup |
| **SSD** | Recommended | Significantly faster Docker I/O |

**Expected Performance**: Smooth development with hot-reload and multiple services.

### Optimal Configuration (Production)

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **CPU** | 8+ cores 3.0 GHz+ | High concurrency handling |
| **RAM** | 16 GB+ | Multiple workers, caching |
| **Disk Space** | 50 GB+ SSD | Database growth, logs |
| **Network** | Dedicated server/VPS | Production traffic |

---

## Software Dependencies

### Required Software

#### Docker & Docker Compose

| Software | Minimum Version | Installation |
|----------|----------------|--------------|
| **Docker Engine** | 20.10+ | [Install Docker](https://docs.docker.com/get-docker/) |
| **Docker Compose** | 2.0+ | Included with Docker Desktop, or [install separately](https://docs.docker.com/compose/install/) |

**Why Required**: All services run in Docker containers for consistency and easy deployment.

**Installation Instructions**:

**Ubuntu/Debian**:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose (if not included)
sudo apt-get install docker-compose-plugin
```

**macOS**:
```bash
# Download and install Docker Desktop
# https://www.docker.com/products/docker-desktop
```

**Windows**:
```bash
# Download and install Docker Desktop
# https://www.docker.com/products/docker-desktop
# Enable WSL2 backend for better performance
```

#### Git

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| **Git** | 2.30+ | Version control, cloning repository |

**Installation**:
- **Ubuntu/Debian**: `sudo apt-get install git`
- **macOS**: `brew install git` or install Xcode Command Line Tools
- **Windows**: Download from [git-scm.com](https://git-scm.com/)

---

### Optional Software (for local development)

#### Python Development

| Software | Version | Purpose |
|----------|---------|---------|
| **Python** | 3.11+ | Local backend development without Docker |
| **pip** | Latest | Python package manager |
| **virtualenv** | Latest | Isolated Python environments |

**Installation**:
```bash
# Ubuntu/Debian
sudo apt-get install python3.11 python3-pip python3-venv

# macOS
brew install python@3.11

# Windows
# Download from python.org
```

#### Node.js Development

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18+ LTS | Local frontend development without Docker |
| **npm** | 9+ | Package manager (included with Node.js) |

**Installation**:
```bash
# Ubuntu/Debian (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@18

# Windows
# Download from nodejs.org
```

#### Database (for local development)

| Software | Version | Purpose |
|----------|---------|---------|
| **PostgreSQL** | 14+ | Local database without Docker |
| **Redis** | 7+ | Local cache/broker without Docker |

**Only needed if running services outside Docker**.

---

## Browser Compatibility

### Desktop Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Google Chrome** | 90+ | Best performance, recommended |
| **Mozilla Firefox** | 88+ | Full support |
| **Microsoft Edge** | 90+ (Chromium) | Full support |
| **Safari** | 14+ | macOS only, full support |
| **Opera** | 76+ | Chromium-based, full support |
| **Brave** | 1.25+ | Chromium-based, full support |

### Mobile Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Chrome Mobile** | 90+ | Android, full support |
| **Safari Mobile** | iOS 14+ | Full support |
| **Firefox Mobile** | 88+ | Full support |
| **Samsung Internet** | 14+ | Full support |

### Browser Features Required

- **JavaScript**: ES6+ (modern JavaScript)
- **CSS**: Grid, Flexbox, Custom Properties
- **APIs**: Fetch API, LocalStorage, Cookies
- **Security**: HTTPS support (for production)

### Not Supported

- Internet Explorer (all versions)
- Legacy browsers without ES6 support
- Browsers with JavaScript disabled

---

## Network Requirements

### Development

| Requirement | Details |
|-------------|---------|
| **Initial Setup** | 2-5 GB download (Docker images, npm packages) |
| **Bandwidth** | 5 Mbps minimum for image pulls |
| **Latency** | Any (local development) |

### Production

| Requirement | Details |
|-------------|---------|
| **Bandwidth** | 100 Mbps+ recommended |
| **Latency** | < 100ms for API responses |
| **Uptime** | 99.9%+ (server reliability) |

### Firewall / Port Requirements

**Ports to Open** (for Docker services):

| Port | Service | Access |
|------|---------|--------|
| 3000 | React Frontend | Public (development) |
| 8000 | Django Backend | Public (development) |
| 80 | Nginx Reverse Proxy | Public |
| 443 | Nginx (HTTPS) | Public (production) |
| 5432 | PostgreSQL | Internal only (Docker network) |
| 6379 | Redis | Internal only (Docker network) |

**External Port Access Not Needed** (Docker internal networking):
- Celery workers communicate via Redis (internal)
- Backend connects to database via internal network
- No direct external database access required

---

## External Service Dependencies

### Email Service (SMTP)

**Required for**: Email verification, password reset, notifications

| Provider | Requirement | Notes |
|----------|-------------|-------|
| **Gmail** | Google account + App Password | Recommended for development |
| **SendGrid** | Free tier account | Production-grade, 100 emails/day free |
| **Amazon SES** | AWS account | Scalable, pay-as-you-go |
| **Mailgun** | Free tier account | 5,000 emails/month free |
| **Custom SMTP** | Any SMTP server | Self-hosted or third-party |

**Configuration**: Set in `backend/.env`:
```env
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```

**Not Required**: Application runs without email, but verification features will not work.

---

## Development Tools (Recommended)

### Code Editors

| Tool | Notes |
|------|-------|
| **Visual Studio Code** | Recommended, excellent Docker/Python/React support |
| **PyCharm Professional** | Great for Django development |
| **WebStorm** | Excellent for React development |
| **Sublime Text** | Lightweight alternative |

### Useful VS Code Extensions

- **Docker** (ms-azuretools.vscode-docker)
- **Python** (ms-python.python)
- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

### Database Management Tools

| Tool | Purpose |
|------|---------|
| **pgAdmin 4** | PostgreSQL GUI management |
| **DBeaver** | Universal database tool |
| **TablePlus** | Modern database GUI (macOS/Windows) |
| **psql** | Command-line PostgreSQL client |

### API Testing Tools

| Tool | Purpose |
|------|---------|
| **Postman** | API testing and documentation |
| **Insomnia** | REST/GraphQL API client |
| **cURL** | Command-line HTTP testing |
| **HTTPie** | User-friendly CLI HTTP client |

---

## Python Package Dependencies

Full list from `backend/requirements.txt`:

| Package | Version | Purpose |
|---------|---------|---------|
| **django** | 5.2.4 | Web framework |
| **djangorestframework** | 3.16.0 | REST API framework |
| **djangorestframework-simplejwt** | 5.5.0 | JWT authentication |
| **psycopg2-binary** | 2.9+ | PostgreSQL adapter |
| **celery** | 5.5.3 | Task queue |
| **django-celery-beat** | 2.6.0 | Periodic task scheduler |
| **redis** | 5.0+ | Redis client |
| **django-cors-headers** | 4.7.0 | CORS handling |
| **python-dotenv** | 1.1.1 | Environment variable loading |
| **email-validator** | 2.2.0 | Email validation |
| **cryptography** | 45.0.5 | Encryption utilities |
| **dj-database-url** | Latest | Database URL parsing |
| **requests** | Latest | HTTP library |
| **groq** | Latest | AI integration (optional) |

**Total Installation Size**: ~300-500 MB

---

## Node.js Package Dependencies

Key dependencies from `frontend/package.json`:

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | 19.1.1 | UI library |
| **react-dom** | 19.1.1 | React rendering |
| **react-scripts** | 5.0.1 | Build tooling |
| **framer-motion** | 12.23.12 | Animations |
| **lucide-react** | 0.541.0 | Icons |
| **tailwindcss** | 3.4.17 | CSS framework |
| **autoprefixer** | 10.4.21 | CSS vendor prefixes |
| **postcss** | 8.5.6 | CSS processing |

**Total Installation Size**: ~400-600 MB (node_modules)

---

## Docker Image Sizes

| Image | Size | Purpose |
|-------|------|---------|
| **postgres:16** | ~400 MB | Database |
| **redis:7** | ~130 MB | Cache/broker |
| **nginx:latest** | ~180 MB | Reverse proxy |
| **python:3.11-slim** | ~150 MB | Backend base |
| **node:18-alpine** | ~180 MB | Frontend base |
| **Custom backend** | ~600 MB | With all dependencies |
| **Custom frontend** | ~800 MB | With node_modules |

**Total Docker Storage**: ~2.5-3.5 GB (all images + volumes)

---

## Production Deployment Requirements

### Cloud Hosting Options

| Provider | Minimum Specs | Estimated Cost |
|----------|--------------|----------------|
| **DigitalOcean** | 2 GB RAM, 1 vCPU | $12/month |
| **AWS EC2** | t3.small | $15-20/month |
| **Google Cloud** | e2-small | $15-20/month |
| **Heroku** | Hobby dyno | $7/month (per service) |
| **Railway** | 8 GB RAM | $5-10/month |
| **Render** | Starter | $7-10/month |

### SSL/TLS Certificate

**Free Options**:
- **Let's Encrypt** (recommended, auto-renewal)
- **Cloudflare SSL** (if using Cloudflare)

**Configuration**: Use Certbot with Nginx

---

## Compatibility Matrix

### Docker Version Compatibility

| Docker Version | Status | Notes |
|----------------|--------|-------|
| 24.x | ✅ Recommended | Latest features |
| 23.x | ✅ Fully supported | Stable |
| 20.10 - 22.x | ✅ Supported | Minimum version |
| < 20.10 | ❌ Not supported | Missing features |

### Python Version Compatibility

| Python Version | Status | Notes |
|----------------|--------|-------|
| 3.12 | ✅ Supported | Latest stable |
| 3.11 | ✅ Recommended | Best compatibility |
| 3.10 | ⚠️ Should work | Not tested |
| 3.9 | ⚠️ May work | Some dependencies may fail |
| < 3.9 | ❌ Not supported | Django 5.2 requires 3.10+ |

### Node.js Version Compatibility

| Node Version | Status | Notes |
|--------------|--------|-------|
| 20.x LTS | ✅ Recommended | Latest LTS |
| 18.x LTS | ✅ Fully supported | Tested version |
| 16.x | ⚠️ Should work | Approaching EOL |
| < 16 | ❌ Not supported | React 19 requires 16+ |

---

## Accessibility Requirements

### WCAG Compliance

- **Target**: WCAG 2.1 Level AA
- **Keyboard Navigation**: Full support
- **Screen Readers**: Compatible
- **Color Contrast**: Meets AA standards

### Assistive Technology Support

- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

---

## Summary Checklist

Before starting, ensure you have:

- [ ] Operating System: Windows 10/11, macOS 12+, or Linux (Ubuntu 20.04+)
- [ ] RAM: 4 GB minimum (8 GB recommended)
- [ ] Disk Space: 5 GB free (10 GB recommended)
- [ ] Docker: Version 20.10+
- [ ] Docker Compose: Version 2.0+
- [ ] Git: Version 2.30+
- [ ] Internet Connection: Broadband (for initial setup)
- [ ] Browser: Chrome 90+, Firefox 88+, or equivalent
- [ ] Email Account: For SMTP configuration (Gmail, SendGrid, etc.)
- [ ] (Optional) Python 3.11+ for local development
- [ ] (Optional) Node.js 18+ for local development
