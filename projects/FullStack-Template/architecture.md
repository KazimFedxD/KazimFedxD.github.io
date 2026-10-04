# System Architecture

## Architecture Overview

This full-stack application follows a modern microservices-inspired architecture where each component runs in its own Docker container, communicating over a shared network. The architecture is designed for scalability, maintainability, and ease of deployment.

## High-Level System Design

The application consists of 7 containerized services:

1. **PostgreSQL Database** - Persistent data storage
2. **Redis** - Message broker and cache
3. **Django Backend** - REST API server
4. **Celery Worker** - Background task processor
5. **Celery Beat** - Periodic task scheduler
6. **React Frontend** - User interface
7. **Nginx** - Reverse proxy and load balancer

## Request Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         Nginx (Port 80)             │
│   ┌──────────────┬────────────────┐ │
│   │  Frontend    │   Backend API  │ │
│   │  (/)         │   (/api/)      │ │
│   └──────┬───────┴────────┬───────┘ │
└──────────┼────────────────┼─────────┘
           │                │
    ┌──────▼──────┐  ┌─────▼──────────┐
    │   React     │  │  Django REST   │
    │  Frontend   │  │   Framework    │
    │  (Port 3000)│  │  (Port 8000)   │
    └─────────────┘  └────┬───────────┘
                          │
                 ┌────────┼────────┐
                 │        │        │
          ┌──────▼──┐ ┌──▼────┐ ┌─▼──────────┐
          │PostgreSQL│ │ Redis │ │   Celery   │
          │   DB     │ │       │ │  Workers   │
          │(Port 5432│ │(Port  │ │            │
          │         )│ │ 6379) │ └────────────┘
          └──────────┘ └───────┘       │
                                  ┌────▼────────┐
                                  │ Celery Beat │
                                  │  Scheduler  │
                                  └─────────────┘
```

## Technology Stack Breakdown

### Backend: Django REST Framework

**Purpose**: API server, business logic, authentication, database management

**Implementation Details**:
- Django 5.2 with Python 3.11+
- REST API endpoints using Django REST Framework
- Custom user model with email-based authentication
- JWT token generation and validation
- Database ORM for PostgreSQL interaction
- Middleware for cookie-based authentication
- Email template rendering and sending

**Key Features Used**:
- **ViewSets & Serializers**: Clean API design with automatic CRUD operations
- **JWT Authentication**: djangorestframework-simplejwt for token management
- **Custom Middleware**: Cookie-based JWT authentication integration
- **Django ORM**: Complex queries, migrations, and relationships
- **Celery Integration**: Task queuing and scheduling

**Why Chosen**:
- Mature, well-documented framework with large ecosystem
- Built-in admin panel for data management
- Excellent ORM for database operations
- Strong security features (CSRF, SQL injection prevention)
- Easy integration with Celery for async tasks

**Configuration**:
```python
# Key settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "usermanagement.middleware.CookieJWTAuthentication",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
```

---

### Frontend: React 19

**Purpose**: User interface, state management, API communication

**Implementation Details**:
- React 19 with latest hooks (useState, useEffect, useContext)
- Context API for global authentication state
- Custom hooks for reusable logic (useErrorHandler, useAuth)
- React Router for client-side routing
- Fetch API for HTTP requests with retry logic

**Key Features Used**:
- **Context API**: Global state for authentication without Redux
- **Custom Hooks**: Encapsulated logic for auth, errors, API calls
- **Concurrent Features**: Improved rendering performance
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Lazy loading for optimized bundle size

**Why Chosen**:
- Industry-standard for modern web apps
- Rich ecosystem of libraries and tools
- Virtual DOM for efficient updates
- Strong community support
- Easy integration with Django REST APIs

**Project Structure**:
```
src/
├── components/      # Reusable UI components
│   ├── Auth/       # Login, Register forms
│   ├── elements/   # Buttons, Inputs
│   └── ui/         # Layout components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── utils/          # Helper functions
└── config/         # Configuration files
```

---

### Database: PostgreSQL 16

**Purpose**: Primary data store for users, tokens, application data

**Implementation Details**:
- PostgreSQL 16 with official Docker image
- Persistent volume for data storage
- Health checks for container orchestration
- Connection pooling via Django
- Indexed queries for performance

**Key Features Used**:
- **ACID Compliance**: Data integrity and consistency
- **JSON/JSONB Support**: Flexible schema when needed
- **Full-Text Search**: Advanced search capabilities
- **Foreign Keys**: Relational data modeling
- **Transactions**: Atomic operations

**Why Chosen**:
- Most advanced open-source relational database
- Excellent performance for complex queries
- Strong data integrity guarantees
- Supports advanced data types (arrays, JSON)
- Wide Django ORM support

**Database Schema**:
```sql
-- Custom User Model
CREATE TABLE usermanagement_authacc (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JWT Blacklist for logged out tokens
CREATE TABLE token_blacklist_outstandingtoken (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usermanagement_authacc(id),
    jti VARCHAR(255) UNIQUE NOT NULL,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL
);
```

---

### Cache/Message Broker: Redis 7

**Purpose**: Celery message broker, caching layer, session storage

**Implementation Details**:
- Redis 7 with official Docker image
- In-memory data structure store
- Pub/Sub for real-time messaging
- Persistence configured for task queue durability

**Key Features Used**:
- **Message Queue**: Broker for Celery task distribution
- **Result Backend**: Store task results
- **Caching**: Fast data retrieval for frequently accessed data
- **Atomic Operations**: Counters, sets, sorted sets

**Why Chosen**:
- Extremely fast in-memory storage
- Perfect for message queuing
- Low latency for caching
- Simple setup and configuration
- Excellent Celery integration

**Configuration**:
```python
# Django settings
CELERY_BROKER_URL = "redis://redis:6379/0"
CELERY_RESULT_BACKEND = "redis://redis:6379/0"
```

---

### Task Queue: Celery + Beat

**Purpose**: Asynchronous task processing and scheduled jobs

**Implementation Details**:
- Celery 5.5 for distributed task queue
- Celery Beat for periodic task scheduling
- Redis as message broker
- Separate containers for workers and scheduler
- Django Celery Beat for database-backed schedules

**Key Features Used**:
- **Async Tasks**: Email sending, data processing
- **Periodic Tasks**: Token cleanup, scheduled notifications
- **Task Retry**: Automatic retry with exponential backoff
- **Task Chains**: Sequential task execution
- **Task Results**: Store and retrieve task outcomes

**Why Chosen**:
- Industry standard for Python async tasks
- Scales horizontally (add more workers)
- Robust failure handling
- Flexible scheduling with cron syntax
- Excellent Django integration

**Task Examples**:
```python
# Periodic task (every 60 seconds)
@shared_task
def clear_verification_tokens():
    # Clean up expired tokens
    pass


# Manual task invocation
send_email_async.delay(user.email, "Subject", content)
```

---

### Reverse Proxy: Nginx

**Purpose**: Route requests, serve static files, load balancing

**Implementation Details**:
- Nginx latest version
- Reverse proxy for frontend and backend
- Static file serving
- Request buffering and timeout configuration
- CORS and proxy header management

**Key Features Used**:
- **Reverse Proxy**: Route `/api/` to Django, `/` to React
- **Load Balancing**: Can distribute across multiple backend instances
- **Static Files**: Serve React build files in production
- **SSL/TLS Termination**: HTTPS support
- **Request Buffering**: Handle slow clients

**Why Chosen**:
- High performance and low memory footprint
- Industry standard for reverse proxying
- Excellent documentation and community
- Easy configuration
- Handles thousands of concurrent connections

**Nginx Configuration**:
```nginx
server {
    listen 80;
    
    # Frontend (React)
    location / {
        proxy_pass http://frontend:3000/;
        proxy_set_header Host $host;
    }
    
    # Backend API (Django)
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### UI Framework: Tailwind CSS

**Purpose**: Utility-first CSS framework for rapid UI development

**Implementation Details**:
- Tailwind CSS 3.4 with JIT compiler
- Custom theme configuration
- PostCSS for processing
- PurgeCSS for production optimization

**Key Features Used**:
- **Utility Classes**: Rapid prototyping with pre-defined classes
- **Responsive Design**: Mobile-first breakpoints
- **Custom Theme**: Extended colors and spacing
- **JIT Mode**: On-demand class generation
- **Backdrop Filters**: Glassmorphism effects

**Why Chosen**:
- Faster development than writing custom CSS
- Highly customizable and extensible
- Excellent documentation
- Small production bundle size
- Great developer experience

---

### Animation: Framer Motion

**Purpose**: Smooth animations and transitions

**Implementation Details**:
- Framer Motion 12.x for React animations
- Declarative animation API
- Gesture support (drag, hover, tap)
- Layout animations

**Key Features Used**:
- **Motion Components**: Animated divs, buttons, etc.
- **Variants**: Reusable animation states
- **Transitions**: Custom timing and easing
- **Gestures**: Interactive animations
- **Layout Animations**: Smooth layout changes

**Why Chosen**:
- Best-in-class React animation library
- Production-ready and performant
- Simple API with powerful features
- Excellent TypeScript support
- Great community and examples

---

## Component Breakdown

### Authentication Flow

1. **Registration**:
   - User submits email/password
   - Backend validates and creates user (verified=False)
   - Celery task sends verification email
   - Frontend redirects to verification page

2. **Email Verification**:
   - User receives email with 6-character token
   - Token valid for 10 minutes
   - User submits token via frontend
   - Backend validates and sets verified=True
   - User can now login

3. **Login**:
   - User submits credentials
   - Backend validates and generates JWT tokens
   - Access token (5min) and refresh token (7 days) set as httpOnly cookies
   - Frontend stores user info in localStorage
   - Frontend redirects to dashboard

4. **Token Refresh**:
   - Access token expires after 5 minutes
   - Middleware automatically sends refresh request
   - New access token issued if refresh token valid
   - User session continues seamlessly

5. **Logout**:
   - Frontend calls logout endpoint
   - Backend blacklists tokens
   - Cookies cleared
   - localStorage cleared
   - Frontend redirects to login

---

## API Design

### Endpoints

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/auth/register/` | No | Create new user account |
| POST | `/api/auth/login/` | No | Authenticate and get tokens |
| POST | `/api/auth/verify/` | No | Verify email with token |
| POST | `/api/auth/refresh/` | Yes (refresh token) | Get new access token |
| POST | `/api/auth/logout/` | Yes | Invalidate tokens |
| GET | `/api/user/profile/` | Yes | Get user information |
| PUT | `/api/user/profile/` | Yes | Update user information |

### Request/Response Examples

**Registration**:
```json
// Request
POST /api/auth/register/
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Response (201 Created)
{
  "message": "Verification Email Sent To user@example.com",
  "user_id": 42
}
```

**Login**:
```json
// Request
POST /api/auth/login/
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Response (200 OK) + httpOnly cookies set
{
  "message": "Login successful",
  "user_id": 42,
  "email": "user@example.com"
}
```

---

## Security Architecture

### Authentication Security

- **HttpOnly Cookies**: Prevents XSS attacks on tokens
- **SameSite Cookie Attribute**: CSRF protection
- **Token Blacklisting**: Prevents reuse of logged out tokens
- **Short-Lived Access Tokens**: Limits damage if token leaked
- **Refresh Token Rotation**: New refresh token on each use

### API Security

- **CORS Configuration**: Restrict allowed origins
- **CSRF Protection**: Django middleware validation
- **Rate Limiting**: Prevent brute force attacks (can be added)
- **Input Validation**: Serializers validate all input
- **SQL Injection Prevention**: ORM parameterized queries

### Data Security

- **Password Hashing**: Django's PBKDF2 with salt
- **Encryption**: Sensitive data encrypted with Fernet
- **Environment Variables**: Secrets not in source code
- **HTTPS Ready**: SSL/TLS configuration for production

---

## Deployment Architecture

### Development Environment

```
Docker Compose (dev mode)
├── Hot-reload enabled for backend and frontend
├── Debug mode active
├── Volume mounting for live code changes
├── Exposed ports for debugging
└── Development database with sample data
```

### Production Environment

```
Docker Compose (production mode)
├── Optimized builds (no dev dependencies)
├── Multi-stage Dockerfiles
├── Static file serving via Nginx
├── Environment variables from secrets
├── SSL/TLS certificates
├── Database backups configured
└── Logging to external service
```

---

## External APIs & Integrations

### Email Service (SMTP)

- **Provider**: Gmail SMTP (configurable)
- **Purpose**: Send verification emails, notifications
- **Configuration**: Environment variables (EMAIL, EMAIL_PASS)
- **Implementation**: Python smtplib with email templates

### Future Integration Points

The architecture supports easy integration of:
- Payment processors (Stripe, PayPal)
- Cloud storage (AWS S3, Google Cloud Storage)
- Analytics (Google Analytics, Mixpanel)
- Monitoring (Sentry, DataDog)
- CDN (Cloudflare, CloudFront)

---

## Project Directory Structure

```
FullStack-Template/
├── backend/                    # Django backend
│   ├── backend/               # Project settings
│   │   ├── __init__.py
│   │   ├── settings.py        # Django configuration
│   │   ├── urls.py            # URL routing
│   │   ├── wsgi.py            # WSGI server
│   │   └── celery.py          # Celery configuration
│   ├── usermanagement/        # Authentication app
│   │   ├── models.py          # User model, tokens
│   │   ├── views.py           # Auth endpoints
│   │   ├── serializers.py     # Data validation
│   │   ├── middleware.py      # Cookie JWT auth
│   │   └── urls.py            # Auth routes
│   ├── api/                   # Main API app
│   │   ├── models.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── email_templates/       # HTML email templates
│   ├── custom.py              # Utility functions
│   ├── manage.py              # Django CLI
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile             # Backend container
├── frontend/                  # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/          # Login, Register
│   │   │   ├── elements/      # Reusable UI
│   │   │   └── ui/            # Layout components
│   │   ├── contexts/          # React Context
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Route pages
│   │   ├── utils/             # Helper functions
│   │   ├── config/            # App configuration
│   │   ├── App.js             # Main component
│   │   └── index.js           # Entry point
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind settings
│   └── Dockerfile             # Frontend container
├── nginx/
│   └── nginx.conf             # Reverse proxy config
├── docker-compose.yml         # Service orchestration
├── .gitignore
├── LICENSE
└── README.md
```

---

## Scalability Considerations

### Horizontal Scaling

- **Celery Workers**: Add more worker containers as load increases
- **Backend Instances**: Multiple Django containers behind Nginx load balancer
- **Database**: PostgreSQL replication (master-slave)
- **Redis**: Redis Cluster for distributed caching

### Vertical Scaling

- Increase container resource limits (CPU, RAM)
- Optimize database queries with indexes
- Enable query caching in Django
- Use CDN for static assets

### Performance Optimization

- Database connection pooling
- Redis caching layer
- Lazy loading and code splitting in React
- Nginx gzip compression
- Database query optimization
- API response caching
