# System Requirements# System Requirements



This document outlines the complete system requirements for running, developing, and deploying FinCore.## Operating Systems



## Table of Contents### Fully Supported ✅

- **Linux**

1. [Operating Systems](#operating-systems)  - Ubuntu 20.04 LTS or newer

2. [Hardware Requirements](#hardware-requirements)  - Debian 11 or newer

3. [Software Dependencies](#software-dependencies)  - Fedora 35 or newer

4. [Browser Compatibility](#browser-compatibility)  - Arch Linux (latest)

5. [Network Requirements](#network-requirements)  - CentOS Stream 8+

6. [Development Requirements](#development-requirements)

7. [Production Requirements](#production-requirements)- **macOS**

8. [Mobile Device Requirements](#mobile-device-requirements)  - macOS 12 Monterey or newer

  - macOS 13 Ventura

---  - macOS 14 Sonoma



## Operating Systems- **Windows**

  - Windows 10 (version 2004 or newer)

### Supported Operating Systems  - Windows 11

  - Windows Server 2019+

FinCore is designed to run on any system that supports Docker.

### Requirements

#### ✅ Fully Supported- 64-bit operating system

- Docker support (native or via WSL2 on Windows)

| OS | Version | Status | Notes |

|----|---------|--------|-------|---

| **Ubuntu** | 20.04, 22.04, 24.04 | ✅ Tested | Recommended for production |

| **Debian** | 11 (Bullseye), 12 (Bookworm) | ✅ Tested | Stable for servers |## Hardware Requirements

| **Windows** | 10, 11 (with WSL2) | ✅ Tested | WSL2 required for Docker |

| **macOS** | 12 (Monterey), 13 (Ventura), 14 (Sonoma) | ✅ Tested | Docker Desktop required |### Minimum Configuration

| **CentOS** | 8, 9 | ✅ Compatible | Community tested |**For Development/Testing**:

| **Rocky Linux** | 8, 9 | ✅ Compatible | CentOS alternative |- **CPU**: Dual-core processor, 2.0 GHz

- **RAM**: 4 GB

#### ⚠️ Partially Supported- **Disk Space**: 2 GB free space

- **Network**: Broadband internet connection (for initial Docker image downloads)

| OS | Version | Status | Notes |

|----|---------|--------|-------|**Expected Performance**:

| **Windows** | 10, 11 (native, no WSL) | ⚠️ Limited | May have performance issues |- Application startup: 30-60 seconds

| **Raspberry Pi OS** | Bullseye (64-bit) | ⚠️ Limited | Slow performance, testing only |- API response time: < 500ms

| **FreeBSD** | 13+ | ⚠️ Experimental | Docker via Linux compatibility layer |- Concurrent users: 5-10



#### ❌ Not Supported---



- Windows 7, 8, 8.1 (outdated, no Docker Desktop support)### Recommended Configuration

- macOS 10.x, 11.x (Big Sur and earlier)**For Smooth Development Experience**:

- 32-bit operating systems (Docker requires 64-bit)- **CPU**: Quad-core processor, 2.5 GHz or higher (Intel i5/i7, AMD Ryzen 5/7)

- **RAM**: 8 GB

---- **Disk Space**: 5 GB free space (includes Docker images, volumes, and logs)

- **Network**: Broadband internet connection

## Hardware Requirements- **SSD**: Recommended for faster Docker operations



### Minimum Requirements (Development)**Expected Performance**:

- Application startup: 15-30 seconds

**For running FinCore locally with Docker:**- API response time: < 200ms

- Concurrent users: 20-50

- **CPU**: Dual-core processor, 2.0 GHz or faster- Hot-reload: Near instant

  - Intel Core i3 (8th gen) or equivalent

  - AMD Ryzen 3 or equivalent---

  - Apple M1 or later

- **RAM**: 4 GB### Production Configuration

  - 2 GB for Docker containers**For Small-Scale Production (< 100 users)**:

  - 2 GB for OS and browser- **CPU**: 4-8 cores, 3.0 GHz

- **Disk Space**: 5 GB free space- **RAM**: 16 GB

  - 2 GB for Docker images- **Disk Space**: 20 GB SSD (or 50 GB HDD)

  - 1 GB for database- **Network**: 100 Mbps+ connection

  - 2 GB for logs, temp files, and growth- **Backup Storage**: 10 GB for database backups

- **Network**: Broadband internet connection (for initial setup)

**For Medium-Scale Production (100-1000 users)**:

**Expected performance**:- **CPU**: 8-16 cores, 3.5 GHz

- Page load: 3-5 seconds- **RAM**: 32 GB

- API response: 150-300ms- **Disk Space**: 50 GB SSD

- Database queries: 50-100ms- **Network**: 1 Gbps connection

- Suitable for: Testing, light development- **Load Balancer**: Required for horizontal scaling

- **Managed Database**: Recommended (AWS RDS, DigitalOcean Managed PostgreSQL)

### Recommended Requirements (Development)

---

**For smooth development experience:**

## Software Dependencies

- **CPU**: Quad-core processor, 2.5 GHz or faster

  - Intel Core i5 (10th gen) or equivalent### Required for Docker Deployment (Recommended)

  - AMD Ryzen 5 or equivalent

  - Apple M1 or M2#### Docker

- **RAM**: 8 GB- **Version**: 20.10 or newer

  - 4 GB for Docker containers- **Purpose**: Containerization platform

  - 2 GB for IDE (VS Code, PyCharm)- **Installation**: 

  - 2 GB for OS and browser  - Linux: `curl -fsSL https://get.docker.com | sh`

- **Disk Space**: 10 GB free space  - macOS: Docker Desktop for Mac

  - 3 GB for Docker images  - Windows: Docker Desktop for Windows (with WSL2 backend)

  - 2 GB for database (with test data)

  - 5 GB for dependencies, cache, and growth#### Docker Compose

- **SSD**: Recommended for faster container startup- **Version**: 2.0 or newer (bundled with Docker Desktop)

- **Network**: Broadband internet connection (5 Mbps+)- **Purpose**: Multi-container orchestration

- **Verify Installation**: `docker-compose --version`

**Expected performance**:

- Page load: 1.5-2.5 seconds#### Git

- API response: 80-150ms- **Version**: 2.x or newer

- Database queries: 20-50ms- **Purpose**: Repository cloning and version control

- Suitable for: Full-stack development, testing- **Installation**: Available in most OS package managers



### Production Requirements (Low Traffic)---



**For small to medium deployments (1-100 concurrent users):**### Required for Non-Docker Development



- **CPU**: Quad-core processor, 2.5 GHz or faster#### Backend Dependencies

  - Server-grade CPU recommended (Xeon, EPYC)

- **RAM**: 8 GB minimum, 16 GB recommended**Python**

  - 2 GB for database (PostgreSQL)- **Version**: 3.11 or newer (3.12 supported)

  - 2 GB for backend (Django + Celery)- **Purpose**: Backend runtime

  - 1 GB for Redis- **Installation**: https://www.python.org/downloads/

  - 1 GB for frontend (Nginx)- **Verify**: `python3 --version`

  - 2-8 GB for OS and overhead

- **Disk Space**: 20 GB free space**PostgreSQL**

  - 5 GB for Docker images- **Version**: 14 or newer (16 recommended)

  - 10 GB for database (scales with data)- **Purpose**: Relational database

  - 5 GB for logs, backups- **Installation**: https://www.postgresql.org/download/

- **SSD**: Highly recommended for database performance- **Alternative**: SQLite for development (not recommended for production)

- **Network**: 100 Mbps uplink (for serving users)

- **Bandwidth**: ~1 GB per month per user (estimated)**Redis**

- **Version**: 7.x (6.x supported)

**Expected capacity**:- **Purpose**: Cache and Celery message broker

- Concurrent users: 50-100- **Installation**: https://redis.io/download/

- Requests per second: 100-200- **Verify**: `redis-cli --version`

- Database size: Up to 10,000 transactions

**Python Packages** (see `backend/requirements.txt`):

### Production Requirements (High Traffic)```

Django>=5.2.4

**For large deployments (100-1,000+ concurrent users):**djangorestframework>=3.16.0

djangorestframework-simplejwt>=5.5.0

- **CPU**: 8+ cores, 3.0 GHz or fastercelery>=5.5.3

  - Multi-socket server configurationdjango-celery-beat>=2.6.0

  - Intel Xeon, AMD EPYC recommendedpsycopg2-binary>=2.9

- **RAM**: 32 GB minimum, 64 GB recommendedredis>=5.0

  - 8 GB for database (with connection pooling)python-dotenv>=1.1.1

  - 12 GB for backend cluster (3 instances × 4 GB)django-cors-headers>=4.7.0

  - 4 GB for Redis (caching + Celery)```

  - 2 GB for frontend

  - 8-30 GB for OS and overhead---

- **Disk Space**: 100 GB+ SSD

  - 10 GB for Docker images#### Frontend Dependencies

  - 50+ GB for database (scales with data)

  - 20 GB for logs and backups**Node.js**

  - 20 GB for growth- **Version**: 18.x or newer (20.x recommended)

- **Network**: 1 Gbps uplink- **Purpose**: JavaScript runtime for React development

- **Bandwidth**: ~1 TB per month (for 1,000 users)- **Installation**: https://nodejs.org/

- **Load Balancer**: Required (Nginx, HAProxy, or cloud LB)- **Verify**: `node --version`

- **Database**: Dedicated server or managed service (RDS, Cloud SQL)

**npm**

**Expected capacity**:- **Version**: 9.x or newer (bundled with Node.js)

- Concurrent users: 500-1,000+- **Purpose**: Package manager

- Requests per second: 500-1,000+- **Alternative**: Yarn 1.x or pnpm

- Database size: 100,000+ transactions- **Verify**: `npm --version`



---**Node Packages** (see `frontend/package.json`):

```

## Software Dependenciesreact: ^19.1.1

react-dom: ^19.1.1

### Docker Environment (Recommended)react-scripts: 5.0.1

framer-motion: ^12.23.12

**All dependencies are containerized. You only need:**tailwindcss: ^3.4.17

```

| Software | Version | Required | Purpose |

|----------|---------|----------|---------|---

| **Docker** | 24.0+ | ✅ Yes | Container runtime |

| **Docker Compose** | 2.20+ | ✅ Yes | Multi-container orchestration |## Browser Compatibility



**How to install**:### Desktop Browsers



- **Ubuntu/Debian**:#### Fully Supported ✅

  ```bash- **Google Chrome**: Version 90 or newer

  sudo apt update- **Microsoft Edge**: Version 90 or newer (Chromium-based)

  sudo apt install docker.io docker-compose-plugin- **Mozilla Firefox**: Version 88 or newer

  sudo usermod -aG docker $USER  # Add user to docker group- **Safari**: Version 14 or newer (macOS)

  ```- **Brave**: Latest version

- **Opera**: Version 76 or newer

- **macOS**:

  - Install Docker Desktop: https://www.docker.com/products/docker-desktop/#### Limited Support ⚠️

- **Internet Explorer**: ❌ **Not supported** (deprecated)

- **Windows**:- **Safari**: Versions 12-13 (partial CSS support)

  - Install WSL2: https://learn.microsoft.com/en-us/windows/wsl/install

  - Install Docker Desktop: https://www.docker.com/products/docker-desktop/### Features Requiring Modern Browsers

- **JavaScript**: ES6+ support (arrow functions, async/await, modules)

### Backend Dependencies (Python)- **CSS**: Flexbox, Grid, CSS variables, backdrop-filter

- **APIs**: Fetch API, LocalStorage, Cookies

**If running outside Docker**, you need:

---

| Software | Version | Required | Purpose |

|----------|---------|----------|---------|### Mobile Browsers

| **Python** | 3.11+ | ✅ Yes | Backend runtime |

| **pip** | Latest | ✅ Yes | Package manager |#### Fully Supported ✅

| **PostgreSQL** | 14+ | ✅ Yes | Database server |- **Chrome Mobile** (Android): Version 90+

| **Redis** | 7+ | ✅ Yes | Cache & message broker |- **Safari Mobile** (iOS): Version 14+

- **Samsung Internet**: Version 14+

**Python packages** (from `requirements.txt`):- **Firefox Mobile**: Version 88+



```#### Responsive Design Breakpoints

Django==5.2- **Mobile**: < 768px

djangorestframework==3.15.2- **Tablet**: 768px - 1024px

django-cors-headers==4.6.0- **Desktop**: > 1024px

djangorestframework-simplejwt==5.4.0

psycopg2-binary==2.9.10---

celery==5.4.0

redis==5.2.1## Mobile Device Requirements

python-dotenv==1.0.1

```### Minimum Specifications

- **Screen Size**: 4.7 inches (320px width minimum)

**Installation**:- **OS**: 

```bash  - iOS 14 or newer

pip install -r backend/requirements.txt  - Android 10 or newer

```- **RAM**: 2 GB

- **Browser**: Modern browser with JavaScript enabled

### Frontend Dependencies (Node.js)

### Recommended Specifications

**If running outside Docker**, you need:- **Screen Size**: 5.5 inches or larger

- **OS**: Latest version

| Software | Version | Required | Purpose |- **RAM**: 4 GB

|----------|---------|----------|---------|- **Connection**: 4G/LTE or Wi-Fi

| **Node.js** | 18+ (LTS) | ✅ Yes | JavaScript runtime |

| **npm** | 9+ | ✅ Yes | Package manager |**Note**: Mobile app not yet available. Currently accessible via mobile web browsers.



**Node packages** (from `package.json`):---



```json## Network Requirements

{

  "dependencies": {### Development Environment

    "react": "^19.0.0",- **Bandwidth**: 10 Mbps download (for Docker image downloads)

    "react-dom": "^19.0.0",- **Latency**: < 100ms to internet (for package downloads)

    "react-router-dom": "^7.1.1",- **Ports Required**:

    "framer-motion": "^11.15.0",  - 3000 (React frontend)

    "axios": "^1.7.9"  - 8000 (Django backend)

  },  - 5432 (PostgreSQL)

  "devDependencies": {  - 6379 (Redis)

    "tailwindcss": "^3.4.17",  - 80/443 (Nginx)

    "postcss": "^8.4.49",

    "autoprefixer": "^10.4.20",### Production Environment

    "@testing-library/react": "^16.1.0"- **Bandwidth**: 

  }  - Minimum: 10 Mbps symmetrical

}  - Recommended: 100 Mbps+ for 100+ concurrent users

```- **Latency**: < 50ms to database server (if external)

- **Ports Required**:

**Installation**:  - 80 (HTTP - redirects to HTTPS)

```bash  - 443 (HTTPS)

cd frontend  - 5432 (PostgreSQL - internal only, not exposed)

npm install  - 6379 (Redis - internal only)

```

### Firewall Configuration

### External Services**Inbound Rules** (production):

- Allow TCP 80, 443 from anywhere

| Service | Required | Purpose | Alternatives |- Allow TCP 22 from admin IPs (SSH)

|---------|----------|---------|--------------|- Deny all other inbound traffic

| **SMTP Server** | ⚠️ Yes (for email) | Email verification | Gmail, SendGrid, Mailgun, AWS SES |

| **Domain Name** | ❌ Optional | Production deployment | Use IP address or localhost |**Outbound Rules**:

| **SSL Certificate** | ⚠️ Yes (production) | HTTPS encryption | Let's Encrypt (free), Cloudflare |- Allow all outbound (for package updates, email sending)



------



## Browser Compatibility## External Services Requirements



### Desktop Browsers### Email Service (Optional - for email verification)



| Browser | Version | Support | Notes |**Supported Providers**:

|---------|---------|---------|-------|- Gmail SMTP (with App Passwords)

| **Google Chrome** | 90+ | ✅ Full | Recommended, tested extensively |- SendGrid

| **Microsoft Edge** | 90+ | ✅ Full | Chromium-based, fully compatible |- AWS SES (Simple Email Service)

| **Mozilla Firefox** | 88+ | ✅ Full | Tested, minor CSS differences |- Mailgun

| **Safari** | 14+ | ✅ Full | macOS/iOS, tested on Safari 16+ |- Custom SMTP server

| **Opera** | 76+ | ✅ Full | Chromium-based, compatible |

| **Brave** | 1.24+ | ✅ Full | Privacy-focused, compatible |**Configuration Required**:

- SMTP host and port

#### ⚠️ Limited Support- Authentication credentials

- TLS/SSL support

| Browser | Version | Support | Issues |

|---------|---------|---------|--------|---

| **Internet Explorer** | 11 | ❌ None | No support for modern JS (ES6+) |

| **Safari** | 12-13 | ⚠️ Partial | Some CSS features missing |### Cloud Storage (Planned - for receipts/documents)

| **Firefox** | <88 | ⚠️ Partial | Missing some ES2020 features |

**Supported Providers**:

### Mobile Browsers- MinIO (self-hosted, S3-compatible)

- AWS S3

| Browser | Platform | Support | Notes |- DigitalOcean Spaces

|---------|----------|---------|-------|- Backblaze B2

| **Chrome Mobile** | Android 10+ | ✅ Full | Recommended for Android |- Any S3-compatible service

| **Safari Mobile** | iOS 14+ | ✅ Full | Default on iPhone/iPad |

| **Firefox Mobile** | Android 10+ | ✅ Full | Alternative option |**Requirements**:

| **Samsung Internet** | Android 10+ | ✅ Full | Chromium-based |- API access credentials

| **Edge Mobile** | iOS 14+, Android 10+ | ✅ Full | Cross-platform |- Bucket/container with write permissions

- Public read access (or signed URL support)

### Required Browser Features

---

FinCore requires the following browser features:

## Development Tools (Optional)

- ✅ **ES6+ JavaScript** (arrow functions, async/await, modules)

- ✅ **CSS Grid & Flexbox** (layout)### Recommended IDE/Editors

- ✅ **CSS Custom Properties** (theming)- **VS Code** (recommended)

- ✅ **Fetch API** (HTTP requests)  - Extensions: Python, ESLint, Prettier, Docker

- ✅ **LocalStorage** (state persistence)- **PyCharm Professional** (Python development)

- ✅ **WebSockets** (planned for real-time features)- **WebStorm** (React development)

- **Sublime Text**

### Browser Settings- **Vim/Neovim** (with language servers)



For optimal experience:### Useful Tools

- **Postman** / **Insomnia**: API testing

- **Enable JavaScript** (required)- **pgAdmin** / **DBeaver**: PostgreSQL GUI

- **Enable Cookies** (for authentication)- **Redis Insight**: Redis GUI

- **Enable LocalStorage** (for state persistence)- **Docker Desktop**: Container management UI

- **Allow Popups** (for OAuth, if implemented)- **Git GUI**: GitKraken, SourceTree, GitHub Desktop



------



## Network Requirements## Platform-Specific Notes



### Development Environment### Windows (WSL2)



- **Internet Connection**: Required for initial setup (pulling Docker images, installing dependencies)**Recommended Setup**:

- **Bandwidth**: 1-2 GB download for first-time setup1. Enable WSL2: `wsl --install`

- **Ports**: The following ports must be available:2. Install Ubuntu 22.04 from Microsoft Store

  - `3000` - Frontend (React dev server)3. Install Docker Desktop with WSL2 backend

  - `8000` - Backend (Django)4. Clone repository inside WSL2 filesystem (not `/mnt/c/`)

  - `5432` - PostgreSQL database

  - `6379` - Redis cache**Performance Note**: Running Docker on Windows native filesystem (`/mnt/c/`) is significantly slower. Use WSL2 filesystem for best performance.



### Production Environment---



- **Minimum Bandwidth**:### macOS (Apple Silicon M1/M2/M3)

  - **Uplink**: 10 Mbps (for 10-50 users)

  - **Downlink**: 10 Mbps (for updates, backups)**Compatibility**:

- **Recommended Bandwidth**:- Docker Desktop supports ARM architecture

  - **Uplink**: 100 Mbps (for 100+ users)- All Python packages have ARM builds

  - **Downlink**: 50 Mbps- No Rosetta 2 emulation required

- **Latency**: <100ms to database (if hosted separately)- Performance: Native ARM performance (excellent)

- **Ports**: The following ports must be open:

  - `80` - HTTP (redirects to HTTPS)**Note**: Some Python packages may require Rosetta 2. Docker Desktop handles this automatically.

  - `443` - HTTPS (main application)

  - `22` - SSH (for server management, firewall recommended)---



**Firewall Rules**:### Linux

```bash

# Allow HTTP/HTTPS**Best Performance**:

sudo ufw allow 80/tcp- Native Docker support (no VM overhead)

sudo ufw allow 443/tcp- Fastest development experience

- Recommended for production deployment

# Allow SSH (restrict to your IP)

sudo ufw allow from YOUR_IP to any port 22**Package Managers**:

- **Ubuntu/Debian**: `apt-get install docker.io docker-compose`

# Block database ports from external access- **Fedora**: `dnf install docker docker-compose`

sudo ufw deny 5432/tcp- **Arch**: `pacman -S docker docker-compose`

sudo ufw deny 6379/tcp

```---



---## Accessibility Requirements



## Development Requirements### Screen Reader Compatibility

- **JAWS**: Version 2020 or newer

### For Frontend Development- **NVDA**: Version 2020 or newer

- **VoiceOver**: macOS 12+, iOS 14+

| Tool | Version | Purpose |

|------|---------|---------|### Keyboard Navigation

| **Node.js** | 18+ (LTS) | JavaScript runtime |- All interactive elements accessible via Tab key

| **npm** or **yarn** | Latest | Package management |- Focus indicators visible

| **Code Editor** | Any | VS Code recommended |- Keyboard shortcuts planned (future)

| **Browser DevTools** | - | Debugging |

### Visual Requirements

**Recommended VS Code Extensions**:- **Color Contrast**: WCAG AA compliance (planned)

- ESLint (code quality)- **Font Size**: Adjustable via browser zoom

- Prettier (code formatting)- **Screen Resolution**: Minimum 1024x768

- Tailwind CSS IntelliSense (CSS autocomplete)

- ES7+ React/Redux/React-Native snippets---



### For Backend Development## Storage Requirements Breakdown



| Tool | Version | Purpose |### Docker Images (~1.5 GB)

|------|---------|---------|- `postgres:16`: ~300 MB

| **Python** | 3.11+ | Backend runtime |- `redis:7`: ~40 MB

| **pip** | Latest | Package management |- `nginx:latest`: ~150 MB

| **Code Editor** | Any | PyCharm or VS Code recommended |- Backend image (Django + dependencies): ~600 MB

| **PostgreSQL Client** | - | Database management (optional) |- Frontend image (Node.js + dependencies): ~400 MB



**Recommended VS Code Extensions**:### Docker Volumes (~500 MB - varies with usage)

- Python (Microsoft)- `postgres_data`: ~100 MB (grows with data)

- Pylance (type checking)- `frontend_node_modules`: ~350 MB

- Django (syntax highlighting)- Application code: ~50 MB

- PostgreSQL (database explorer)

### Logs and Cache (~100 MB)

### For Full-Stack Development- Docker logs: ~50 MB

- Application logs: ~20 MB

**Recommended setup**:- Redis cache: ~10 MB (in-memory)

- **OS**: Ubuntu 22.04 or macOS 13+

- **RAM**: 16 GB (for running Docker + IDE + browser)---

- **CPU**: 6+ cores (for fast builds)

- **SSD**: 256 GB+ (for fast I/O)## Security Requirements

- **Monitor**: 1920x1080 or higher (for multitasking)

### TLS/SSL Certificate

---- **Development**: Self-signed certificate (included)

- **Production**: Let's Encrypt (free) or commercial certificate

## Production Requirements

### Password Requirements

### Server Specifications- **Minimum Length**: 8 characters

- **Complexity**: Django default validators

**Small deployment** (1-50 users):  - Not similar to username

- VPS or cloud instance: 2 vCPU, 4 GB RAM  - Not entirely numeric

- Examples: DigitalOcean Droplet ($24/mo), AWS t3.medium, Linode Dedicated 4GB  - Not a common password



**Medium deployment** (50-500 users):### Authentication

- VPS or cloud instance: 4 vCPU, 8 GB RAM- **JWT Tokens**: Automatic (no user action required)

- Examples: DigitalOcean Droplet ($48/mo), AWS t3.large, Linode Dedicated 8GB- **Two-Factor Authentication**: Planned (future)



**Large deployment** (500+ users):---

- Dedicated server or high-performance cloud instance: 8+ vCPU, 16+ GB RAM

- Examples: AWS c5.2xlarge, GCP n2-standard-8, dedicated server## Monitoring Requirements (Production)



### Database Requirements (Production)### Recommended Tools

- **Error Tracking**: Sentry (free tier available)

| Deployment Size | RAM | CPU | Disk | Notes |- **Uptime Monitoring**: UptimeRobot, Pingdom

|----------------|-----|-----|------|-------|- **Log Aggregation**: ELK Stack, Papertrail

| **Small** (1-50 users) | 2 GB | 2 cores | 20 GB SSD | Can run on same server |- **Performance Monitoring**: New Relic, Datadog

| **Medium** (50-500) | 4 GB | 2 cores | 50 GB SSD | Dedicated instance recommended |

| **Large** (500+) | 8+ GB | 4+ cores | 100+ GB SSD | Managed service recommended (RDS, Cloud SQL) |### Minimum Monitoring

- HTTP endpoint monitoring (uptime)

**PostgreSQL Configuration** (recommended for production):- Database connection monitoring

- Disk space monitoring

```- Error rate tracking

# postgresql.conf

max_connections = 200---

shared_buffers = 256MB

effective_cache_size = 1GB## Summary Table

work_mem = 16MB

maintenance_work_mem = 64MB| Component | Minimum | Recommended | Production |

```|-----------|---------|-------------|------------|

| **CPU** | 2 cores, 2.0 GHz | 4 cores, 2.5 GHz | 8+ cores, 3.0 GHz |

### Backup Requirements| **RAM** | 4 GB | 8 GB | 16-32 GB |

| **Disk** | 2 GB | 5 GB SSD | 50 GB SSD |

- **Disk Space**: 2-3x database size (for rolling backups)| **Python** | 3.11+ | 3.11+ | 3.11+ |

- **Backup Frequency**: Daily (minimum), hourly (recommended)| **Node.js** | 18.x | 20.x | 20.x |

- **Retention**: 30 days (minimum), 90 days (recommended)| **PostgreSQL** | 14+ | 16 | 16 (managed) |

- **Offsite Storage**: Recommended (AWS S3, Backblaze B2)| **Redis** | 7.x | 7.x | 7.x (cluster) |

| **Docker** | 20.10+ | 24.x | 24.x |

---| **Browser** | Chrome 90+ | Latest | Latest |



## Mobile Device Requirements---



### For Mobile Web Access## Troubleshooting System Requirements



**Android**:### Low RAM (< 4 GB)

- **OS**: Android 10 or later- Disable hot-reloading: `CHOKIDAR_USEPOLLING=false`

- **Browser**: Chrome 90+, Firefox 88+, or Samsung Internet 14+- Use SQLite instead of PostgreSQL for development

- **RAM**: 2 GB minimum, 4 GB recommended- Run fewer Docker services simultaneously

- **Screen**: 5" or larger (360x640 minimum resolution)

### Low Disk Space

**iOS**:- Prune Docker: `docker system prune -a`

- **OS**: iOS 14 or later- Clear logs: `docker-compose logs --tail=0`

- **Browser**: Safari 14+- Use external database (managed service)

- **RAM**: 2 GB minimum (iPhone 8 or later)

- **Screen**: 4.7" or larger (iPhone SE or later)### Slow Performance

- Upgrade to SSD (if using HDD)

### For Future Mobile Apps (Planned v0.4.0)- Increase Docker memory allocation (Docker Desktop settings)

- Use production build instead of development build

**Android App**:

- **OS**: Android 10 (API level 29) or later---

- **RAM**: 2 GB minimum

- **Storage**: 100 MB free space## Future Requirements

- **Permissions**: Internet, storage (for receipts)

### Planned Features & Requirements

**iOS App**:

- **OS**: iOS 14 or later**Mobile App** (Q3 2026):

- **Storage**: 100 MB free space- Native iOS app: iOS 15+

- **Permissions**: Internet, photo library (for receipts)- Native Android app: Android 11+

- Additional dependencies: React Native, Expo

---

**AI Features** (Q4 2026):

## Summary Table- GPU recommended (for local AI inference)

- Alternative: Cloud AI APIs (OpenAI, Groq)

### Quick Reference

**Advanced Analytics** (Q2 2026):

| Requirement | Minimum | Recommended | Production |- Pandas, NumPy (Python data science libraries)

|-------------|---------|-------------|------------|- Additional RAM: +2 GB recommended

| **CPU** | Dual-core 2.0 GHz | Quad-core 2.5 GHz | 8+ cores 3.0 GHz |
| **RAM** | 4 GB | 8 GB | 16-64 GB |
| **Disk** | 5 GB (HDD) | 10 GB (SSD) | 100+ GB (SSD) |
| **OS** | Windows 10, Ubuntu 20.04, macOS 12 | Ubuntu 22.04, macOS 13 | Ubuntu 24.04 LTS |
| **Docker** | 24.0+ | 24.0+ | 24.0+ |
| **Browser** | Chrome 90+, Firefox 88+, Safari 14+ | Latest version | Latest version |
| **Network** | 5 Mbps | 50 Mbps | 100+ Mbps |

---

## Compatibility Notes

### Known Issues

1. **Windows (without WSL2)**:
   - Docker performance is significantly slower
   - File system operations may be slow
   - **Solution**: Use WSL2 for better performance

2. **Apple Silicon (M1/M2)**:
   - Some Docker images may need platform specification: `--platform linux/amd64`
   - PostgreSQL works natively on ARM64
   - **Solution**: Use native ARM64 images where possible

3. **Low-end hardware**:
   - May experience slow startup times (2-3 minutes)
   - Database queries may be slower (100-200ms)
   - **Solution**: Use cloud deployment instead

---

## Upgrade Path

If your system doesn't meet requirements:

1. **Insufficient RAM**: Close other applications, or upgrade RAM
2. **Slow CPU**: Use cloud deployment (DigitalOcean, AWS, etc.)
3. **No Docker support**: Run backend/frontend separately (see `setup.md`)
4. **Outdated OS**: Upgrade to supported version or use cloud deployment

---

## Verification Commands

**Check your system:**

```bash
# Check OS version
lsb_release -a  # Linux
sw_vers  # macOS
ver  # Windows

# Check RAM
free -h  # Linux
sysctl hw.memsize  # macOS
wmic computersystem get TotalPhysicalMemory  # Windows

# Check Docker
docker --version
docker-compose --version

# Check Node.js (if needed)
node --version
npm --version

# Check Python (if needed)
python3 --version
pip3 --version
```

**Test Docker setup:**

```bash
# Run hello-world
docker run hello-world

# Check Docker resources
docker system df
docker system info
```

---

## Next Steps

After verifying requirements:

1. ✅ Ensure your system meets minimum requirements
2. ✅ Install Docker and Docker Compose
3. ✅ Proceed to `setup.md` for installation instructions
4. ✅ Check `known-issues.md` for platform-specific problems
