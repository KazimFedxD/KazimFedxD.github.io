# System Architecture# System Architecture



This document provides a comprehensive technical overview of FinCore's architecture, technology stack, and design decisions.## System Overview



---FinCore follows a **microservices-inspired architecture** with clear separation between frontend, backend, database, cache, and task queue. The application is containerized using Docker Compose, making deployment consistent across development and production environments.



## System OverviewThe architecture emphasizes:

- **API-First Design**: RESTful endpoints enable future mobile/desktop clients

FinCore follows a **microservices-inspired architecture** with clear separation of concerns across six containerized services orchestrated by Docker Compose. The architecture emphasizes:- **Asynchronous Processing**: Celery handles background tasks (email, token cleanup)

- **Caching Layer**: Redis improves performance for frequently accessed data

- **Modularity**: Each service has a single, well-defined responsibility- **Data Isolation**: User-specific queries prevent data leakage

- **Scalability**: Horizontal scaling through containerization- **Scalability**: Stateless design allows horizontal scaling

- **Resilience**: Health checks and automatic restarts

- **Developer Experience**: Hot-reloading in development mode## Request Flow Diagram

- **Production-Ready**: Environment-based configuration

```

### High-Level Architecture Diagram[User Browser] 

    ↓ HTTPS (443)

```[Nginx Reverse Proxy]

┌─────────────────────────────────────────────────────────────────┐    ↓ HTTP (Internal)

│                         CLIENT BROWSER                           │    ├─→ [React Frontend:3000] (Static assets, React app)

│                    (React 19 Application)                        │    └─→ [Django Backend:8000] (API endpoints)

└────────────────────────┬────────────────────────────────────────┘            ↓

                         │ HTTP/HTTPS        [JWT Middleware] (Authentication)

                         ▼            ↓

┌─────────────────────────────────────────────────────────────────┐        [Django REST Framework] (Business logic)

│                      NGINX REVERSE PROXY                         │            ↓

│               (SSL/TLS Termination, Routing)                    │        ├─→ [PostgreSQL:5432] (Data persistence)

└──────────┬──────────────────────────────────────┬───────────────┘        ├─→ [Redis:6379] (Cache & Celery broker)

           │                                       │        └─→ [Celery Workers] (Background tasks)

           │ /api/*                                │ /*                ↓

           ▼                                       ▼            [Celery Beat] (Scheduled tasks)

┌──────────────────────────┐          ┌──────────────────────────┐```

│   DJANGO BACKEND API     │          │   REACT FRONTEND SPA     │

│  (Django REST Framework) │          │   (Static Files Served)  │## Tech Stack Breakdown

│                          │          └──────────────────────────┘

│  ┌────────────────────┐  │### Django REST Framework

│  │ JWT Authentication │  │- **Purpose**: Backend API development and business logic

│  │ API ViewSets      │  │- **Implementation**: 

│  │ Business Logic    │  │  - RESTful endpoints for CRUD operations

│  └────────────────────┘  │  - Model serialization to JSON

└────┬──────────────┬──────┘  - JWT authentication middleware

     │              │  - Permission-based access control

     │ ORM          │ Celery Tasks- **Why Chosen**: 

     ▼              ▼  - Robust ORM for complex queries

┌────────────┐  ┌─────────────────┐  - Built-in admin interface for data management

│ PostgreSQL │  │ CELERY WORKERS  │  - Excellent documentation and community support

│  Database  │  │                 │  - Seamless integration with Celery and PostgreSQL

│            │  │  ┌───────────┐  │- **Key Features Used**: 

│  ┌──────┐  │  │  │ Worker    │  │  - `APIView` class-based views

│  │Users │  │  │  │ Process   │  │  - `@permission_classes` decorator for authentication

│  │      │  │  │  └─────┬─────┘  │  - Django ORM for database operations

│  ├──────┤  │  │        │        │  - `django-cors-headers` for cross-origin requests

│  │Cats  │  │  │  ┌─────▼─────┐  │

│  │      │  │  │  │ Beat      │  │**Example API Endpoint**:

│  ├──────┤  │  │  │ Scheduler │  │```python

│  │Incomes│ │  │  └───────────┘  │class IncomeView(APIView):

│  │      │  │  └─────────────────┘    permission_classes = [IsAuthenticated]

│  ├──────┤  │           │

│  │Expenses│ │           │ Message Queue    def get(self, request: Request) -> Response:

│  └──────┘  │           ▼        # User-specific query ensures data isolation

└────────────┘  ┌─────────────────┐        incomes = Income.objects.filter(

                │  REDIS CACHE    │            user=request.user

                │                 │        ).values('id', 'amount', 'date', 'category__name', 'description')

                │  ┌───────────┐  │        

                │  │ Message   │  │        return Response(list(incomes))

                │  │ Broker    │  │```

                │  ├───────────┤  │

                │  │ Session   │  │---

                │  │ Storage   │  │

                │  └───────────┘  │### React 19

                └─────────────────┘- **Purpose**: Frontend user interface and client-side logic

```- **Implementation**:

  - Component-based architecture

---  - Context API for global state (authentication)

  - Custom hooks for API communication (`useErrorHandler`)

## Request Flow  - React Router DOM for client-side routing

- **Why Chosen**:

### 1. User Authentication Flow  - Virtual DOM for efficient rendering

  - Large ecosystem of libraries

```  - Concurrent rendering features (React 19)

Client                Nginx           Backend               Redis        PostgreSQL  - Easy integration with Tailwind CSS

  │                     │                │                    │               │- **Key Features Used**:

  │ POST /api/auth/login                 │                    │               │  - Functional components with hooks

  ├──────────────────►  │                │                    │               │  - `useEffect` for data fetching

  │                     │ Forward        │                    │               │  - `useState` for local state management

  │                     ├────────────────►                    │               │  - Context providers for authentication state

  │                     │                │ Validate Creds     │               │

  │                     │                ├────────────────────────────────────►**Example Component Pattern**:

  │                     │                │                    │    Query User │```javascript

  │                     │                ◄────────────────────────────────────┤export default function DashboardPage() {

  │                     │                │ Generate JWT       │               │  const [reportData, setReportData] = useState(null);

  │                     │                │ Store in Redis     │               │  const [loading, setLoading] = useState(true);

  │                     │                ├────────────────────►               │

  │                     │                │                Store Token         │  useEffect(() => {

  │                     │  Response      │                    │               │    const fetchData = async () => {

  │                     ◄────────────────┤                    │               │      const response = await getReport();

  │   JWT Tokens        │                │                    │               │      if (response.ok) {

  ◄─────────────────────┤                │                    │               │        setReportData(response.data);

  │ (HTTP-only cookies) │                │                    │               │      }

```      setLoading(false);

    };

### 2. API Request Flow (Authenticated)    fetchData();

  }, []); // Fetch on component mount

```

Client                Nginx           Backend               PostgreSQL  if (loading) return <LoadingSpinner />;

  │                     │                │                       │  

  │ GET /api/report/    │                │                       │  return <Dashboard data={reportData} />;

  ├──────────────────►  │                │                       │}

  │ (with JWT cookie)   │ Forward + JWT  │                       │```

  │                     ├────────────────►                       │

  │                     │                │ Verify JWT            │---

  │                     │                │ Extract User ID       │

  │                     │                │ Query Transactions    │### PostgreSQL 16

  │                     │                ├───────────────────────►- **Purpose**: Primary relational database for persistent data storage

  │                     │                │                       │- **Implementation**:

  │                     │                │  Income & Expense Data│  - Stores user accounts, categories, incomes, expenses

  │                     │                ◄───────────────────────┤  - Foreign key relationships ensure data integrity

  │                     │                │ Calculate Totals      │  - Indexes on user_id for fast user-specific queries

  │                     │                │ Build Response        │  - Migrations track schema changes

  │                     │   JSON Data    │                       │- **Why Chosen**:

  │                     ◄────────────────┤                       │  - ACID compliance for financial data accuracy

  │  Report Data        │                │                       │  - Advanced querying capabilities (aggregations, joins)

  ◄─────────────────────┤                │                       │  - Excellent Django ORM support

```  - Industry-standard for production applications

- **Key Features Used**:

---  - Foreign key constraints

  - ON DELETE CASCADE/SET_NULL for referential integrity

## Tech Stack Breakdown  - PostgreSQL-specific field types

  - Connection pooling via Django

### Backend Technologies

**Database Design Philosophy**:

#### 1. **Django 5.2**- Every model has `user` foreign key for multi-tenancy

- **Purpose**: Web framework providing ORM, admin interface, security features- Soft deletes considered for audit trails (future feature)

- **Why Chosen**: - Normalized design prevents data duplication

  - Batteries-included framework with excellent documentation

  - Robust ORM for database interactions---

  - Built-in admin panel for data management

  - Mature ecosystem with extensive packages### Redis 7

  - Strong security defaults (CSRF protection, SQL injection prevention)- **Purpose**: In-memory cache and Celery message broker

- **Key Features Used**:- **Implementation**:

  - Models for database schema  - Celery broker URL: `redis://redis:6379/0`

  - Migrations for version-controlled schema changes  - Future: Cache frequently accessed report data

  - Template system for email templates  - Session storage for Django (future)

  - Middleware for request/response processing- **Why Chosen**:

  - Settings system for environment configuration  - Extremely fast (in-memory)

  - Simple setup and integration

**Example - Model Definition**:  - Dual-purpose (cache + message broker)

```python  - Persistence options for reliability

from django.db.models import *- **Key Features Used**:

from usermanagement.models import AuthAcc  - Pub/Sub for Celery task queues

  - Key-value storage for caching (planned)

class Expense(Model):

    amount = FloatField()---

    description = TextField(blank=True, null=True)

    date = DateField()### Celery + Celery Beat

    category = ForeignKey(Category, on_delete=SET_NULL, null=True)- **Purpose**: Asynchronous task queue and scheduled job execution

    user = ForeignKey(AuthAcc, on_delete=CASCADE)- **Implementation**:

      - **Celery**: Processes background tasks (email sending, token cleanup)

    class Meta:  - **Celery Beat**: Runs scheduled tasks (token expiration check every minute)

        ordering = ['-date']  - Worker process runs in separate Docker container

        indexes = [- **Why Chosen**:

            Index(fields=['user', 'date']),  - Non-blocking operations improve user experience

            Index(fields=['category']),  - Email sending doesn't delay API responses

        ]  - Scheduled tasks automate maintenance

```  - Scalable worker pool architecture

- **Key Features Used**:

---  - `@shared_task` decorator

  - Periodic task scheduling with `crontab`

#### 2. **Django REST Framework (DRF)**  - Django Celery Beat for database-stored schedules

- **Purpose**: Building RESTful APIs with proper serialization and authentication

- **Why Chosen**:**Example Celery Task**:

  - Seamless integration with Django```python

  - Built-in serializers for JSON conversionfrom celery import shared_task

  - Browsable API for development

  - Flexible permission system@shared_task

  - ViewSets and routers for rapid API developmentdef clear_verification_tokens() -> None:

- **Key Features Used**:    """Remove expired email verification tokens"""

  - `APIView` classes for custom endpoints    global VERIFICATION_TOKENS

  - Permission classes (`IsAuthenticated`)    expired = []

  - Response objects for consistent API responses    for token in VERIFICATION_TOKENS:

  - Request parsing (JSON, form data)        token.timeout -= 1

        if token.timeout <= 0:

**Example - API View**:            expired.append(token)

```python    for token in expired:

from rest_framework.views import APIView        token.del_self()

from rest_framework.permissions import IsAuthenticated```

from rest_framework.response import Response

**Celery Beat Configuration**:

class ExpenseView(APIView):```python

    permission_classes = [IsAuthenticated]from celery.schedules import crontab

    

    def get(self, request):CELERY_BEAT_SCHEDULE = {

        expenses = Expense.objects.filter(    'clear-expired-tokens': {

            user=request.user        'task': 'usermanagement.models.clear_verification_tokens',

        ).values('id', 'amount', 'date', 'category__name', 'description')        'schedule': crontab(minute='*/1'),  # Every minute

            },

        sorted_expenses = sorted(expenses, key=lambda x: x['date'], reverse=True)}

        return Response(list(sorted_expenses))```

```

---

---

### Docker Compose

#### 3. **PostgreSQL 16**- **Purpose**: Container orchestration for development and deployment

- **Purpose**: Primary relational database for structured financial data- **Implementation**:

- **Why Chosen**:  - 6 services: PostgreSQL, Backend, Celery, Celery Beat, Redis, Frontend, Nginx

  - ACID compliance for data integrity (critical for financial apps)  - Volume mounts for hot-reloading during development

  - Advanced features: JSON support, full-text search, complex queries  - Health checks ensure service readiness

  - Excellent performance for read-heavy workloads  - Service dependencies prevent startup race conditions

  - Strong Django ORM support- **Why Chosen**:

  - Open-source with enterprise reliability  - Consistent environments (dev = production)

- **Key Features Used**:  - Easy onboarding for new developers

  - Foreign keys for relational integrity  - Single-command deployment

  - Indexes for query performance  - Isolated services prevent conflicts

  - Transactions for atomic operations- **Key Features Used**:

  - CASCADE/SET_NULL delete behaviors  - `depends_on` with health checks

  - Named volumes for data persistence

**Database Schema**:  - Environment variable injection

```sql  - Network isolation

-- Users table (from usermanagement app)

CREATE TABLE authacc (---

    id SERIAL PRIMARY KEY,

    email VARCHAR(254) UNIQUE NOT NULL,### Nginx

    password VARCHAR(128) NOT NULL,- **Purpose**: Reverse proxy and static file serving

    verified BOOLEAN DEFAULT FALSE,- **Implementation**:

    is_active BOOLEAN DEFAULT TRUE  - Routes `/api/*` to Django backend

);  - Routes `/*` to React frontend

  - SSL/TLS termination (HTTPS)

-- Categories table  - Load balancing (future: multiple backend instances)

CREATE TABLE category (- **Why Chosen**:

    id SERIAL PRIMARY KEY,  - Industry-standard web server

    name VARCHAR(100) UNIQUE NOT NULL,  - Excellent performance for static files

    description TEXT,  - Built-in caching and compression

    parent_id INTEGER REFERENCES category(id) ON DELETE CASCADE,  - Simple configuration syntax

    user_id INTEGER REFERENCES authacc(id) ON DELETE CASCADE,- **Key Features Used**:

    root BOOLEAN DEFAULT FALSE  - Proxy pass to upstream services

);  - WebSocket support (future)

  - HTTPS certificate management

-- Income table

CREATE TABLE income (**Nginx Configuration Snippet**:

    id SERIAL PRIMARY KEY,```nginx

    amount FLOAT NOT NULL,server {

    description TEXT,    listen 80;

    date DATE NOT NULL,    server_name budget.fedxd.net;

    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,

    user_id INTEGER REFERENCES authacc(id) ON DELETE CASCADE NOT NULL    # Proxy API requests to Django

);    location /api/ {

        proxy_pass http://backend:8000;

-- Expense table          proxy_set_header Host $host;

CREATE TABLE expense (        proxy_set_header X-Real-IP $remote_addr;

    id SERIAL PRIMARY KEY,    }

    amount FLOAT NOT NULL,

    description TEXT,    # Serve React frontend

    date DATE NOT NULL,    location / {

    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,        proxy_pass http://frontend:3000;

    user_id INTEGER REFERENCES authacc(id) ON DELETE CASCADE NOT NULL    }

);}

```

-- Indexes for performance

CREATE INDEX idx_income_user_date ON income(user_id, date);---

CREATE INDEX idx_expense_user_date ON expense(user_id, date);

CREATE INDEX idx_category_user ON category(user_id);### JWT (JSON Web Tokens)

CREATE INDEX idx_category_parent ON category(parent_id);- **Purpose**: Stateless authentication mechanism

```- **Implementation**:

  - Access token (5 min) + Refresh token (7 days)

---  - Stored in HTTP-only cookies (XSS protection)

  - Custom middleware validates tokens on every request

#### 4. **Redis 7**  - Automatic refresh before expiration

- **Purpose**: In-memory cache and Celery message broker- **Why Chosen**:

- **Why Chosen**:  - Stateless (no server-side session storage)

  - Extremely fast (sub-millisecond latency)  - Scalable across multiple servers

  - Supports multiple data structures (strings, lists, sets, hashes)  - Industry-standard for APIs

  - Pub/Sub for real-time messaging  - Built-in expiration mechanism

  - Persistence options (RDB, AOF)- **Key Features Used**:

  - Perfect for session storage and task queues  - djangorestframework-simplejwt

- **Key Features Used**:  - Custom `CookieJWTAuthentication` middleware

  - Message broker for Celery tasks  - Token blacklist on logout

  - Session caching (future feature)

  - JWT token blacklist storage---

  - Rate limiting (future feature)

### Tailwind CSS

**Redis Usage**:- **Purpose**: Utility-first CSS framework for rapid UI development

```python- **Implementation**:

# Celery configuration using Redis  - Configured with custom color palette

CELERY_BROKER_URL = 'redis://redis:6379/0'  - Responsive breakpoints (mobile-first)

CELERY_RESULT_BACKEND = 'redis://redis:6379/0'  - Glassmorphism via `backdrop-blur-lg`

  - JIT (Just-In-Time) compilation for small bundle size

# Token blacklist (future implementation)- **Why Chosen**:

import redis  - No context switching (styles in JSX)

r = redis.Redis(host='redis', port=6379, db=1)  - Consistent design system

  - Tree-shaking removes unused styles

def blacklist_token(token_jti, expiry_seconds):  - Excellent documentation

    r.setex(f"blacklist:{token_jti}", expiry_seconds, "1")- **Key Features Used**:

  - Grid and Flexbox utilities

def is_token_blacklisted(token_jti):  - Responsive prefixes (`md:`, `lg:`)

    return r.exists(f"blacklist:{token_jti}") == 1  - Color opacity modifiers (`bg-white/10`)

```  - Custom configuration via `tailwind.config.js`



------



#### 5. **Celery + Celery Beat**### Framer Motion

- **Purpose**: Asynchronous task processing and scheduled jobs- **Purpose**: Animation library for React

- **Why Chosen**:- **Implementation**:

  - Handles time-consuming tasks without blocking web requests  - Page transition animations

  - Distributed task execution across workers  - Card entrance effects (`initial`, `animate`)

  - Retry logic for failed tasks  - Background gradient animations

  - Scheduling with Celery Beat  - Loading spinner animations

  - Django integration via django-celery-beat- **Why Chosen**:

- **Key Features Used**:  - Declarative animation API

  - Email sending (verification codes, notifications)  - Performance-optimized

  - Token cleanup (expired JWT tokens)  - Spring physics for natural motion

  - Future: Zakat/Khums calculations  - Gesture support (future: swipe actions)

  - Future: Recurring transaction creation- **Key Features Used**:

  - `motion.div` components

**Example - Celery Task**:  - Variants for animation sequences

```python  - Auto-animations for layout changes

from celery import shared_task

from django.core.mail import send_mail---



@shared_task(bind=True, max_retries=3)## Component Breakdown

def send_verification_email(self, user_email, verification_code):

    try:### Backend Components

        send_mail(

            subject='Verify Your FinCore Account',#### 1. Authentication System (`usermanagement/`)

            message=f'Your verification code: {verification_code}',- **Models**: `AuthAcc` (custom user model), `VerificationToken`

            from_email='noreply@fincore.app',- **Views**: Login, Register, Verify Email, Logout, Refresh Token

            recipient_list=[user_email],- **Middleware**: `CookieJWTAuthenticationMiddleware`

            fail_silently=False,- **Responsibilities**:

        )  - User registration with email validation

    except Exception as exc:  - JWT token issuance and validation

        # Retry after 60 seconds if email fails  - Email verification code generation and checking

        raise self.retry(exc=exc, countdown=60)  - Token refresh mechanism

```

#### 2. Finance API (`api/`)

**Celery Beat Schedule**:- **Models**: `Category`, `Income`, `Expense`

```python- **Views**: `CategoryView`, `IncomeView`, `ExpenseView`, `get_report`

from celery.schedules import crontab- **Responsibilities**:

  - CRUD operations for financial entities

CELERY_BEAT_SCHEDULE = {  - User-specific data filtering

    'cleanup-expired-tokens': {  - Report generation and aggregation

        'task': 'usermanagement.tasks.cleanup_expired_tokens',  - Category hierarchy management

        'schedule': crontab(hour=2, minute=0),  # Daily at 2 AM

    },#### 3. Background Tasks (`backend/celery.py`)

    'calculate-zakat': {- **Tasks**: 

        'task': 'api.tasks.calculate_annual_zakat',  - `clear_verification_tokens`: Remove expired tokens

        'schedule': crontab(0, 0, day_of_month='1'),  # Monthly  - `send_verification_email`: Queue email sending (future)

    },- **Beat Schedule**: Periodic task execution

}- **Responsibilities**:

```  - Non-blocking email delivery

  - Scheduled maintenance tasks

---  - Future: Report generation, data backups



### Frontend Technologies---



#### 6. **React 19**### Frontend Components

- **Purpose**: Building interactive, component-based user interfaces

- **Why Chosen**:#### 1. Pages

  - Latest React version with improved performance- **AuthPage**: Login and registration forms

  - Component reusability for maintainable code- **DashboardPage**: Financial overview and metrics

  - Virtual DOM for efficient updates- **CategoriesPage**: Category management interface

  - Huge ecosystem and community support- **IncomesPage**: Income transaction list and form

  - Hooks API for clean state management- **ExpensesPage**: Expense transaction list and form

- **Key Features Used**:- **ReportsPage**: Detailed financial analytics

  - Functional components with hooks (`useState`, `useEffect`, `useContext`)

  - Context API for global auth state#### 2. Contexts

  - Custom hooks for reusable logic- **AuthContext**: Global authentication state

  - Conditional rendering  - `user` object

  - Event handling  - `login()`, `logout()`, `register()` functions

  - Automatic token refresh logic

**Example - Custom Hook**:

```javascript#### 3. Utilities

// useAuth.js - Custom hook for authentication- **api.js**: Generic API wrapper functions

import { useContext } from 'react';  - `apiGet`, `apiPost`, `apiDelete` with error handling

import { AuthContext } from '../contexts/AuthContext';  - Automatic token inclusion in headers

- **financeApi.js**: Finance-specific API calls

export function useAuth() {  - `getCategories()`, `createIncome()`, etc.

  const context = useContext(AuthContext);- **errorHandler.js**: Centralized error processing

  if (!context) {

    throw new Error('useAuth must be used within AuthProvider');---

  }

  return context;## Database Schema

}

### Tables and Relationships

// Usage in component

function DashboardPage() {```

  const { user, logout } = useAuth();┌─────────────────┐

  │    AuthAcc      │ (User accounts)

  return (├─────────────────┤

    <div>│ id (PK)         │

      <h1>Welcome, {user.email}</h1>│ email (unique)  │

      <button onClick={logout}>Logout</button>│ password (hash) │

    </div>│ verified (bool) │

  );└────────┬────────┘

}         │ 1:N

```         ├──────────────────────────┐

         │                          │

---┌────────▼─────────┐       ┌────────▼─────────┐

│    Category      │       │     Income       │

#### 7. **Tailwind CSS**├──────────────────┤       ├──────────────────┤

- **Purpose**: Utility-first CSS framework for rapid UI development│ id (PK)          │◄──────┤ id (PK)          │

- **Why Chosen**:│ name (unique)    │  N:1  │ amount           │

  - No need to write custom CSS classes│ description      │       │ date             │

  - Consistent design system with predefined spacing, colors│ parent (FK self) │       │ description      │

  - Excellent responsive design utilities│ user (FK)        │       │ category (FK)    │

  - Purges unused CSS in production (tiny bundle size)│ root (bool)      │       │ user (FK)        │

  - Easy to customize via config file└──────────────────┘       └──────────────────┘

- **Key Features Used**:         ▲

  - Responsive breakpoints (`md:`, `lg:`, `xl:`)         │ N:1

  - Flexbox and Grid layouts┌────────┴─────────┐

  - Color palette (customized for finance theme)│     Expense      │

  - Backdrop blur for glassmorphism├──────────────────┤

  - Transitions and animations│ id (PK)          │

│ amount           │

**Tailwind Configuration**:│ date             │

```javascript│ description      │

// tailwind.config.js│ category (FK)    │

module.exports = {│ user (FK)        │

  content: ["./src/**/*.{js,jsx,ts,tsx}"],└──────────────────┘

  theme: {```

    extend: {

      colors: {### Key Relationships

        income: {- **User → Categories**: One user has many categories (1:N)

          light: '#34D399',- **User → Incomes**: One user has many incomes (1:N)

          DEFAULT: '#10B981',- **User → Expenses**: One user has many expenses (1:N)

          dark: '#059669',- **Category → Self**: Self-referencing for hierarchy (parent-child)

        },- **Category → Incomes**: One category has many incomes (1:N, SET_NULL on delete)

        expense: {- **Category → Expenses**: One category has many expenses (1:N, SET_NULL on delete)

          light: '#F87171',

          DEFAULT: '#EF4444',### Indexing Strategy

          dark: '#DC2626',- Primary keys (automatic)

        },- `user_id` indexed on all user-linked tables (query optimization)

      },- `email` unique index on AuthAcc

      backdropBlur: {- `name` unique index on Category

        xs: '2px',- Future: Composite index on `(user_id, date)` for date-range queries

      },

      animation: {---

        blob: 'blob 7s infinite',

      },## API Design

      keyframes: {

        blob: {### Authentication Endpoints

          '0%': { transform: 'translate(0px, 0px) scale(1)' },

          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },| Method | Endpoint | Description | Auth Required |

          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },|--------|----------|-------------|---------------|

          '100%': { transform: 'translate(0px, 0px) scale(1)' },| POST | `/auth/register/` | Create new user account | No |

        },| POST | `/auth/login/` | Obtain JWT tokens | No |

      },| POST | `/auth/verify/` | Verify email with code | No |

    },| POST | `/auth/refresh/` | Refresh access token | No (refresh token) |

  },| POST | `/auth/logout/` | Invalidate tokens | Yes |

  plugins: [],

}### Finance Endpoints

```

| Method | Endpoint | Description | Auth Required |

---|--------|----------|-------------|---------------|

| GET | `/api/categories/` | List user's categories | Yes |

#### 8. **Framer Motion**| POST | `/api/categories/` | Create category | Yes |

- **Purpose**: Production-ready animation library for React| DELETE | `/api/categories/` | Delete category | Yes |

- **Why Chosen**:| GET | `/api/incomes/` | List user's incomes | Yes |

  - Declarative API for complex animations| POST | `/api/incomes/` | Create income | Yes |

  - Smooth page transitions| DELETE | `/api/incomes/` | Delete income | Yes |

  - Gesture support (drag, pan, hover)| GET | `/api/expenses/` | List user's expenses | Yes |

  - Layout animations without manual calculations| POST | `/api/expenses/` | Create expense | Yes |

  - Excellent performance| DELETE | `/api/expenses/` | Delete expense | Yes |

- **Key Features Used**:| GET | `/api/report/` | Generate financial report | Yes |

  - Page enter/exit animations

  - Button hover effects### Request/Response Format

  - Loading spinners

  - Stagger animations for lists**Example: Create Income**



**Example - Page Transition**:Request:

```javascript```http

import { motion } from 'framer-motion';POST /api/incomes/

Content-Type: application/json

function ReportsPage() {Cookie: access_token=eyJ0eXAiOiJKV1QiLCJhbGc...

  return (

    <motion.div{

      initial={{ opacity: 0, y: 20 }}  "amount": 5000,

      animate={{ opacity: 1, y: 0 }}  "date": "2025-11-15",

      exit={{ opacity: 0, y: -20 }}  "category": "Salary",

      transition={{ duration: 0.3, ease: 'easeOut' }}  "description": "November paycheck"

    >}

      <h1>Financial Reports</h1>```

      {/* Page content */}

    </motion.div>Response (Success):

  );```json

}{

  "id": 42,

// Stagger children animation  "amount": 5000.0,

function CategoryList({ categories }) {  "date": "2025-11-15",

  return (  "category__name": "Salary",

    <motion.ul  "description": "November paycheck"

      variants={{}

        hidden: { opacity: 0 },```

        show: {

          opacity: 1,Response (Error):

          transition: { staggerChildren: 0.1 }```json

        }{

      }}  "error": "Category does not exist",

      initial="hidden"  "status": 400

      animate="show"}

    >```

      {categories.map(cat => (

        <motion.li### Rate Limiting

          key={cat.id}- **Current**: None (development)

          variants={{- **Planned**: 100 requests/minute per user (production)

            hidden: { opacity: 0, x: -20 },

            show: { opacity: 1, x: 0 }### API Versioning

          }}- **Current**: v1 (implicit in URL structure)

        >- **Future**: `/api/v2/` for breaking changes

          {cat.name}

        </motion.li>---

      ))}

    </motion.ul>## Deployment Architecture

  );

}### Development Environment

``````

Docker Compose (docker-compose.yml)

---├── PostgreSQL (port 5432)

├── Redis (port 6379)

### Infrastructure Technologies├── Django Backend (port 8000)

│   └── Hot-reload enabled (volume mount)

#### 9. **Docker & Docker Compose**├── Celery Worker

- **Purpose**: Containerization and service orchestration├── Celery Beat

- **Why Chosen**:├── React Frontend (port 3000)

  - Consistent development and production environments│   └── Hot-reload enabled (volume mount)

  - Easy dependency management└── Nginx (port 80/443)

  - Service isolation```

  - Simple deployment process

  - Version-controlled infrastructure### Production Deployment (Planned)

- **Key Features Used**:```

  - Multi-container orchestration[Internet]

  - Volume mounts for persistence    ↓

  - Health checks[Load Balancer (AWS ELB / Cloudflare)]

  - Automatic restarts    ↓

  - Environment variable injection[Nginx (Multiple instances)]

    ↓

**Docker Compose Services**:├─→ [Django Backend Cluster]

```yaml│       ├── Instance 1

version: "3.9"│       ├── Instance 2

│       └── Instance 3

services:├─→ [Static Files (AWS S3 / CDN)]

  # PostgreSQL Database└─→ [PostgreSQL RDS]

  db:        └── Read replicas

    image: postgres:16

    environment:[Redis Cluster (AWS ElastiCache)]

      POSTGRES_USER: fincore_user[Celery Workers (Auto-scaling group)]

      POSTGRES_PASSWORD: ${DB_PASSWORD}```

      POSTGRES_DB: fincore_db

    volumes:---

      - postgres_data:/var/lib/postgresql/data

    healthcheck:## Security Architecture

      test: ["CMD-SHELL", "pg_isready -U fincore_user"]

      interval: 2s### Authentication Flow

      timeout: 2s1. User submits credentials → Django validates

      retries: 102. If valid, generate JWT access + refresh tokens

3. Store tokens in HTTP-only cookies (prevents XSS)

  # Django Backend4. Client includes cookies automatically on requests

  backend:5. Middleware validates token on each request

    build: ./backend6. Access token expires after 5 minutes

    volumes:7. Frontend auto-refreshes using refresh token

      - ./backend:/app

    ports:### Data Protection

      - "8000:8000"- **Password Hashing**: Django's PBKDF2 algorithm

    depends_on:- **HTTPS**: All production traffic encrypted (Nginx SSL)

      db:- **CORS**: Configured to allow only frontend domain

        condition: service_healthy- **CSRF**: Disabled for API (token-based auth)

    environment:- **SQL Injection**: Django ORM parameterizes queries

      DATABASE_URL: postgres://fincore_user:${DB_PASSWORD}@db:5432/fincore_db- **XSS**: React escapes HTML by default

      CELERY_BROKER_URL: redis://redis:6379/0

### User Data Isolation

  # Celery Worker```python

  celery:# Every query filters by user

    build: ./backendincomes = Income.objects.filter(user=request.user)

    command: celery -A backend worker --loglevel=info

    depends_on:# Prevents users from accessing others' data

      - backend# Even if they know the ID, they can't delete it

      - redisIncome.objects.get(id=income_id, user=request.user).delete()

```

  # Celery Beat Scheduler

  celery-beat:---

    build: ./backend

    command: celery -A backend beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler## Future Architecture Enhancements

    depends_on:

      - backend### Planned Integrations



  # Redis Cache/Broker#### 1. MinIO (S3-compatible storage)

  redis:- **Purpose**: Store receipt images and documents

    image: redis:7- **Architecture**: 

    ports:  - New Docker service: `minio`

      - "6379:6379"  - Backend model: `Receipt` with file URL

  - Frontend: File upload component

  # React Frontend

  frontend:#### 2. WebSocket (Real-time updates)

    build: ./frontend- **Purpose**: Live dashboard updates across devices

    volumes:- **Architecture**:

      - ./frontend:/app  - Django Channels for WebSocket support

      - frontend_node_modules:/app/node_modules  - Redis as channel layer

    ports:  - Frontend subscribes to user-specific channels

      - "3000:3000"

    environment:#### 3. Analytics Engine

      CHOKIDAR_USEPOLLING: "true"  # Hot reload in Docker- **Purpose**: Advanced financial insights and predictions

- **Architecture**:

  # Nginx Reverse Proxy  - Separate service: Python + Pandas/NumPy

  nginx:  - Processes historical data

    image: nginx:latest  - Generates trends, forecasts, anomaly detection

    ports:

      - "80:80"#### 4. Mobile API

      - "443:443"- **Purpose**: Native mobile app support

    volumes:- **Architecture**:

      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro  - Same Django REST API

      - ./certs:/etc/ssl/certs:ro  - JWT auth works identically

    depends_on:  - New endpoints for mobile-specific features

      - frontend

      - backend---



volumes:## Performance Optimization Strategy

  postgres_data:

  frontend_node_modules:### Database Optimization

```- **Indexing**: User-specific queries optimized

- **Query Optimization**: Use `values()` to select only needed fields

---- **Connection Pooling**: Django manages PostgreSQL connections

- **Future**: Read replicas for heavy report queries

#### 10. **Nginx**

- **Purpose**: Reverse proxy and web server### Caching Strategy

- **Why Chosen**:- **Current**: None (Redis available but not used)

  - High performance for static file serving- **Planned**:

  - SSL/TLS termination  - Cache report data (5-minute TTL)

  - Load balancing capabilities  - Cache category lists (1-hour TTL)

  - Request routing based on path  - Invalidate on data changes

  - Compression and caching

- **Key Features Used**:### Frontend Optimization

  - Proxying `/api/*` to Django backend- **Code Splitting**: React lazy loading (future)

  - Serving React static files- **Bundle Size**: Tailwind purges unused CSS

  - SSL certificate management- **API Calls**: Debounce search inputs

  - CORS headers- **Images**: Lazy load screenshots, WebP format

  - Gzip compression

### Backend Optimization

**Nginx Configuration**:- **Celery**: Offload email sending

```nginx- **Async Views**: Django async views for I/O-bound tasks (future)

server {- **Database Queries**: `select_related()` for foreign keys (future)

    listen 80;
    server_name budget.fedxd.net;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name budget.fedxd.net;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # API requests to Django
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend React app
    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Component Architecture

### Backend Components

```
backend/
├── backend/                 # Project configuration
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   ├── celery.py            # Celery configuration
│   └── wsgi.py              # WSGI entry point
│
├── api/                     # Finance API app
│   ├── models.py            # Database models (Category, Income, Expense)
│   ├── views.py             # API endpoints
│   ├── urls.py              # API URL routing
│   └── migrations/          # Database migrations
│
├── usermanagement/          # Authentication app
│   ├── models.py            # AuthAcc model
│   ├── views.py             # Auth endpoints (login, register, verify)
│   ├── serializers.py       # Data serialization
│   ├── middleware.py        # JWT cookie authentication
│   └── tasks.py             # Celery tasks (email sending)
│
└── email_templates/         # HTML email templates
    ├── base.html
    └── verify_email.html
```

### Frontend Components

```
frontend/src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.js         # Login form component
│   │   ├── RegisterForm.js      # Registration form
│   │   └── PasswordInput.js     # Password field with toggle
│   │
│   ├── elements/
│   │   ├── Button.js            # Reusable button component
│   │   ├── Input.js             # Styled input field
│   │   └── LoadingSpinner.js    # Loading indicator
│   │
│   └── ui/
│       ├── Background.js        # Animated gradient background
│       └── Navbar.js            # Navigation bar
│
├── contexts/
│   └── AuthContext.js           # Global authentication state
│
├── hooks/
│   └── useErrorHandler.js       # Error handling hook
│
├── pages/
│   ├── AuthPage.js              # Login/Register page
│   ├── DashboardPage.js         # Main dashboard
│   ├── CategoriesPage.js        # Category management
│   ├── IncomesPage.js           # Income tracking
│   ├── ExpensesPage.js          # Expense tracking
│   ├── ReportsPage.js           # Financial reports
│   └── VerifyPage.js            # Email verification
│
├── utils/
│   ├── api.js                   # Generic API functions
│   ├── apiClient.js             # Axios instance configuration
│   ├── auth.js                  # Auth utility functions
│   ├── financeApi.js            # Finance-specific API calls
│   └── errorHandler.js          # Centralized error handling
│
└── App.js                       # Main app component with routing
```

---

## API Design

### Endpoints

**Authentication**:
- `POST /auth/register/` - Create new user account
- `POST /auth/verify/` - Verify email with code
- `POST /auth/login/` - Login and receive JWT tokens
- `POST /auth/logout/` - Blacklist tokens and logout
- `POST /auth/refresh/` - Refresh access token

**Categories**:
- `GET /api/categories/` - List all user categories
- `POST /api/categories/` - Create new category
- `DELETE /api/categories/` - Delete category

**Income**:
- `GET /api/incomes/` - List all user incomes
- `POST /api/incomes/` - Create income transaction
- `DELETE /api/incomes/` - Delete income

**Expenses**:
- `GET /api/expenses/` - List all user expenses
- `POST /api/expenses/` - Create expense transaction
- `DELETE /api/expenses/` - Delete expense

**Reports**:
- `GET /api/report/` - Get financial summary and breakdowns

### Authentication

All API endpoints (except auth endpoints) require JWT authentication:

```http
GET /api/report/
Cookie: access_token=<JWT>; refresh_token=<JWT>
```

**Token Flow**:
1. Login returns `access_token` (5 min) and `refresh_token` (7 days)
2. Frontend includes `access_token` in cookies for all requests
3. When `access_token` expires, frontend automatically calls refresh endpoint
4. Backend validates `refresh_token` and issues new `access_token`
5. User stays logged in for 7 days without re-entering credentials

### Rate Limiting

*Future feature - planned implementation*:
- 100 requests per hour per IP for auth endpoints
- 1000 requests per hour per user for API endpoints
- Implemented using Redis and custom middleware

---

## Security Architecture

### Authentication & Authorization

1. **Password Security**:
   - Hashed using Django's PBKDF2 with SHA256
   - Salted with per-user random salt
   - 600,000 iterations (Django 5.2 default)

2. **JWT Token Security**:
   - Access tokens stored in HTTP-only cookies (not accessible via JS)
   - Short lifespan (5 minutes) minimizes exposure
   - Refresh tokens rotated on each use (future enhancement)
   - Token blacklisting prevents reuse after logout

3. **CORS Configuration**:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "https://budget.fedxd.net",
   ]
   CORS_ALLOW_CREDENTIALS = True  # Allow cookies
   ```

4. **CSRF Protection**:
   - Django's CSRF middleware enabled
   - CSRF tokens embedded in forms
   - API endpoints use JWT, CSRF exempted for `/api/*`

### Data Privacy

1. **User Data Isolation**:
   - All queries filtered by `user=request.user`
   - Foreign keys enforce user ownership
   - No cross-user data access possible

2. **Input Validation**:
   - DRF serializers validate all input data
   - Type checking (amount must be float)
   - Required field validation
   - SQL injection prevention via ORM

3. **Output Sanitization**:
   - Django templates auto-escape HTML
   - JSON responses properly encoded
   - No sensitive data in error messages

### Future Security Enhancements

- Two-factor authentication (2FA)
- Rate limiting per user/IP
- Session timeout and inactivity logout
- Audit logs for all financial transactions
- Encrypted database fields for sensitive data

---

## Performance Optimization

### Current Optimizations

1. **Database**:
   - Indexes on frequently queried fields (`user_id`, `date`)
   - `select_related()` and `prefetch_related()` to reduce queries
   - Connection pooling via Django ORM

2. **Frontend**:
   - Code splitting (lazy loading pages)
   - Tailwind CSS purging (removes unused CSS)
   - Image optimization (future: WebP format)
   - Minification in production build

3. **Caching**:
   - Redis for session storage
   - Static file caching via Nginx
   - Browser caching with cache headers

### Future Optimizations

- Query result caching for reports (Redis)
- Database query optimization with `only()` and `defer()`
- CDN for static assets
- Service worker for offline functionality
- GraphQL for flexible data fetching

---

## Deployment Architecture

### Development Environment

```
Developer Machine
├── Docker Compose (6 containers)
├── Hot-reload enabled
└── Debug mode on
```

### Production Environment (Planned)

```
Cloud Provider (AWS/DigitalOcean)
├── Load Balancer (SSL termination)
├── Application Servers (2+ instances)
│   ├── Nginx (reverse proxy)
│   ├── Gunicorn (WSGI server)
│   └── Django app
├── Celery Workers (2+ instances)
├── PostgreSQL (managed service with replication)
├── Redis (managed service with persistence)
└── S3/MinIO (file storage for receipts)
```

### CI/CD Pipeline (Future)

```
GitHub Push → GitHub Actions → Run Tests → Build Docker Images → Push to Registry → Deploy to Production
```

---

## Project Directory Structure

```
FinCore/
├── backend/
│   ├── api/                     # Finance API
│   ├── backend/                 # Django project config
│   ├── usermanagement/          # Auth system
│   ├── email_templates/         # Email HTML templates
│   ├── manage.py
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── Dockerfile
│   └── db.sqlite3               # Local dev database (not used in Docker)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf               # Nginx configuration
│
├── certs/                       # SSL certificates (gitignored)
│
├── .website/                    # Portfolio documentation (gitignored)
│
├── docker-compose.yml
├── .gitignore
├── README.md
├── LICENSE
└── IMPLEMENTATION_SUMMARY.md
```

---

## Technology Trade-offs

### Django vs. FastAPI
**Chose Django** for:
- Mature ORM with excellent migration system
- Built-in admin panel
- Extensive package ecosystem
- Authentication system out of the box

**Trade-off**: FastAPI is faster, but Django's developer productivity wins for MVP.

### PostgreSQL vs. MongoDB
**Chose PostgreSQL** for:
- Financial data is inherently relational
- ACID compliance critical for transaction integrity
- Strong typing and schema validation
- Better Django ORM support

**Trade-off**: MongoDB would allow flexible schema, but financial data needs structure.

### React vs. Vue/Svelte
**Chose React** for:
- Largest ecosystem and job market relevance
- Extensive component libraries
- Better TypeScript support (future migration)
- Familiarity and documentation

**Trade-off**: Vue is simpler, Svelte is faster, but React's ecosystem is unmatched.

### Docker vs. Manual Deployment
**Chose Docker** for:
- Consistent environments across dev/prod
- Easy dependency management
- Simple multi-service orchestration
- Industry standard

**Trade-off**: Adds complexity, but eliminates "works on my machine" issues.

---

**For installation instructions, see [setup.md](setup.md).**  
**For feature details, see [features.md](features.md).**  
**For performance metrics, see [performance.md](performance.md).**
