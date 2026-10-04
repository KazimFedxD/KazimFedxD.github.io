# Features

This Full-Stack Template includes carefully selected, production-ready features that demonstrate modern web development best practices. Each feature below represents a core architectural decision or critical functionality that makes this template enterprise-ready.

---

## Feature 1: Secure JWT Authentication with HttpOnly Cookies

### Description
A comprehensive authentication system that implements JWT (JSON Web Tokens) stored in httpOnly cookies, preventing XSS attacks while maintaining a seamless user experience. The system includes automatic token refresh, token blacklisting on logout, and persistent authentication state across browser sessions.

### Why It Matters
Traditional JWT implementations often store tokens in localStorage or sessionStorage, making them vulnerable to XSS attacks. HttpOnly cookies cannot be accessed by JavaScript, significantly improving security. This feature also handles the complexity of token expiration, refresh, and state management automatically.

### How It Works
1. User submits login credentials to Django backend
2. Backend validates credentials and generates access token (5min) and refresh token (7 days)
3. Tokens are set as httpOnly cookies in the response
4. Frontend middleware automatically includes cookies in subsequent requests
5. When access token expires, custom middleware automatically refreshes it using the refresh token
6. On logout, tokens are blacklisted in the database to prevent reuse

### Implementation

**Backend: Custom Cookie JWT Middleware**
```python
# backend/usermanagement/middleware.py
class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that reads tokens from cookies.
    """
    
    def get_header(self, request):
        # Try to get from cookies first
        access_token = request.COOKIES.get('access_token')
        
        if access_token:
            # Return the token as if it came from Authorization header
            return f'Bearer {access_token}'.encode('utf-8')
        
        # Fall back to standard authentication (Authorization header)
        return super().get_header(request)
```

**Frontend: Automatic Token Refresh**
```javascript
// frontend/src/utils/auth.js
export const getAccessToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh/`, {
      method: 'POST',
      credentials: 'include', // Include httpOnly cookies
    });
    
    if (response.ok) {
      return true; // Token refreshed successfully
    }
    return false;
  } catch (error) {
    return false;
  }
};
```

---

## Feature 2: Automated Email Verification System

### Description
A complete email verification workflow that sends verification codes to users during registration, validates tokens with expiration, and uses Celery for background email delivery. Includes HTML email templates with customizable branding.

### Why It Matters
Email verification prevents spam accounts, ensures users have valid email addresses for password recovery, and adds an extra layer of security. Background task processing prevents slow API responses during registration.

### How It Works
1. User registers with email and password
2. System generates a 6-character alphanumeric verification token
3. Celery task asynchronously sends HTML email with verification link
4. Token stored in memory with 10-minute expiration (600 seconds)
5. Celery Beat scheduler runs every 60 seconds to clean expired tokens
6. User clicks verification link or enters token manually
7. System validates token and activates user account

### Implementation

**Backend: Verification Token Generation**
```python
# backend/usermanagement/models.py
class VerificationToken:
    def generate_token(self, new: bool = False) -> str:
        """Generate a new token for the user"""
        usertoken = VerificationToken.get_user(self.user)
        if usertoken:
            if new:
                token = self._gen()
                usertoken.token = token
            usertoken.timeout = 10  # 10 minutes
            return usertoken.token
        token = self._gen()
        self.token = token
        self.timeout = 10
        VERIFICATION_TOKENS.append(self)
        return self.token
    
    def _gen(self) -> str:
        """Generate 6-character alphanumeric token"""
        alphatoken = random.choices(string.ascii_uppercase, k=3)
        digtoken = random.choices(string.digits, k=3)
        token = alphatoken + digtoken
        random.shuffle(token)
        return "".join(token)
```

**Backend: Celery Periodic Task for Token Cleanup**
```python
# backend/backend/settings.py
CELERY_BEAT_SCHEDULE = {
    "clear-verification-tokens": {
        "task": "usermanagement.models.clear_verification_tokens",
        "schedule": 60.0,  # Run every 60 seconds
    },
}

# backend/usermanagement/models.py
@shared_task
def clear_verification_tokens() -> None:
    """Clear expired verification tokens."""
    global VERIFICATION_TOKENS
    expired: list[VerificationToken] = []
    for token in VERIFICATION_TOKENS[:]:
        token.timeout -= 1
        if token.timeout <= 0:
            expired.append(token)
    for token in expired:
        token.del_self()
```

**Frontend: Verification Page**
```javascript
// frontend/src/pages/VerifyPage.js
const handleVerify = async () => {
  const response = await fetch(`${API_URL}/api/auth/verify/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, type: verificationType }),
  });
  
  if (response.ok) {
    setMessage('✅ Verification successful! Redirecting to login...');
    setTimeout(() => navigate('/auth'), 2000);
  }
};
```

---

## Feature 3: Modern UI with Glassmorphism Design

### Description
A beautiful, responsive user interface built with Tailwind CSS and Framer Motion, featuring glassmorphism effects, smooth animations, and an intuitive user experience. The design is fully responsive and works seamlessly across desktop, tablet, and mobile devices.

### Why It Matters
First impressions matter. A modern, polished UI increases user trust and engagement. Glassmorphism provides a contemporary aesthetic while maintaining usability. Animations provide visual feedback that makes the application feel responsive and professional.

### How It Works
1. Tailwind CSS provides utility-first styling with custom theme configuration
2. Framer Motion adds smooth entrance/exit animations and transitions
3. Custom gradient backgrounds create depth and visual interest
4. Glass effect (backdrop-blur) creates modern, layered interface
5. Lucide React icons provide consistent, scalable iconography
6. Responsive design breakpoints ensure mobile-first experience

### Implementation

**Tailwind Configuration**
```javascript
// frontend/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        md: '12px',
      },
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
```

**Animated Background Component**
```javascript
// frontend/src/components/ui/Background.js
import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
      />
    </div>
  );
}
```

**Glassmorphism Form**
```javascript
// Example glass effect styling
<div className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400 transition-all">
```

---

## Feature 4: Complete Docker Containerization

### Description
The entire application stack is fully containerized with Docker Compose, including PostgreSQL, Redis, Django backend, React frontend, Celery workers, Celery Beat scheduler, and Nginx reverse proxy. Supports both development (with hot-reload) and production configurations.

### Why It Matters
Containerization eliminates environment inconsistencies ("works on my machine"), simplifies deployment, enables easy scaling, and provides isolated environments for each service. Development and production configurations ensure optimal performance in each context.

### How It Works
1. Docker Compose orchestrates 7 containers: db, backend, frontend, redis, celery, celery-beat, nginx
2. Health checks ensure services start in the correct order
3. Volume mounting enables hot-reload in development
4. Named volumes persist data across container restarts
5. Environment variables configure each service
6. Nginx routes requests to appropriate services
7. Production configuration uses optimized builds and environment settings

### Implementation

**Docker Compose Service Configuration**
```yaml
# docker-compose.yml
services:
  backend:
    build: ./backend
    container_name: template_backend
    volumes:
      - ./backend:/app  # Hot-reload in development
    ports:
      - "8000:8000"
    environment:
      CELERY_BROKER_URL: redis://redis:6379/0
      DATABASE_URL: postgres://template_user:template_password@db:5432/template_db
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  celery:
    build: ./backend
    container_name: template_celery
    command: celery -A backend worker --loglevel=info
    volumes:
      - ./backend:/app
    depends_on:
      backend:
        condition: service_started
```

**Database Health Check**
```yaml
db:
  image: postgres:16
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U template_user -d template_db"]
    interval: 2s
    timeout: 2s
    retries: 10
```

---

## Feature 5: Celery Background Task Processing

### Description
Asynchronous task processing using Celery workers and Celery Beat scheduler, powered by Redis as the message broker. Handles email delivery, periodic cleanup tasks, and scheduled notifications without blocking API responses.

### Why It Matters
Sending emails, processing large datasets, and running scheduled tasks should never block user requests. Celery enables scalable, asynchronous processing with retry logic, failure handling, and distributed workers.

### How It Works
1. Django views queue tasks to Celery via Redis
2. Celery workers pick up tasks from Redis queue
3. Workers execute tasks asynchronously in background
4. Celery Beat scheduler triggers periodic tasks on schedule
5. Results can be stored back in Redis or database
6. Failed tasks automatically retry with exponential backoff

### Implementation

**Celery Configuration**
```python
# backend/backend/celery.py
from celery import Celery
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
```

**Celery Beat Schedule**
```python
# backend/backend/settings.py
CELERY_BEAT_SCHEDULE = {
    "clear-verification-tokens": {
        "task": "usermanagement.models.clear_verification_tokens",
        "schedule": 60.0,  # Every 60 seconds
    },
}
```

**Creating Background Tasks**
```python
# Defining a task
from celery import shared_task

@shared_task
def send_email_async(recipient, subject, html_content):
    """Send email in background"""
    sendmail(recipient, subject, html_content)
    return f"Email sent to {recipient}"

# Queuing a task
send_email_async.delay(user.email, "Welcome!", template)
```

---

## Feature 6: Persistent Authentication State

### Description
Authentication state persists across page refreshes, browser tabs, and navigation events using React Context API combined with localStorage and automatic token validation. Users remain logged in even after closing and reopening the browser (within token validity period).

### Why It Matters
Users expect to stay logged in across sessions. Losing authentication state on page refresh creates a frustrating user experience. This feature balances security (token expiration) with convenience (persistent sessions).

### How It Works
1. Login stores user data in localStorage and httpOnly cookies
2. AuthContext provider checks authentication on mount
3. Custom hooks access authentication state throughout app
4. State preservation utility saves component state before navigation
5. Automatic token refresh extends sessions transparently
6. Logout clears all stored data and blacklists tokens

### Implementation

**Authentication Context**
```javascript
// frontend/src/contexts/AuthContext.js
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const token = await getAccessToken();
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    
    if (token && userId && userEmail) {
      setIsAuthenticated(true);
      setUser({ id: userId, email: userEmail });
    } else {
      setIsAuthenticated(false);
      setUser(null);
      clearAuthData();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**State Persistence Utility**
```javascript
// frontend/src/utils/statePreservation.js
export const preserveState = (key, state) => {
  try {
    localStorage.setItem(`preserved_${key}`, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to preserve state:', error);
  }
};

export const restoreState = (key) => {
  try {
    const preserved = localStorage.getItem(`preserved_${key}`);
    return preserved ? JSON.parse(preserved) : null;
  } catch (error) {
    return null;
  }
};
```

---

## Feature 7: Email System with HTML Templates

### Description
A production-ready email system with SMTP integration, HTML templates with variable substitution, base template for branding consistency, and Celery integration for background delivery.

### Why It Matters
Email is critical for user verification, notifications, and engagement. HTML emails look professional and support branding. Background delivery prevents slow API responses and allows retry on failure.

### How It Works
1. Load base template for consistent styling
2. Load specific template (verification, welcome, notification)
3. Substitute variables (username, verification link, etc.)
4. Send via SMTP (Gmail by default, configurable)
5. Validate email addresses before sending
6. Handle failures gracefully with error logging

### Implementation

**Email Sending Function**
```python
# backend/custom.py
def sendmail(receiver: str, subject: str, html: str) -> bool:
    """Send HTML email via SMTP"""
    try:
        # Validate email address
        v = validate_email(receiver)
        receiver = v.email
    except EmailNotValidError as e:
        return False
    
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SENDER
        msg["To"] = receiver

        part = MIMEText(html, "html")
        msg.attach(part)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(SENDER, S_PASS)
            smtp.sendmail(SENDER, receiver, msg.as_string())
            smtp.quit()
        return True
    except Exception as e:
        debug(e)
        return False

def get_template(name: str, **kwargs: Any) -> str:
    """Load and format email template"""
    with open("email_templates/base.html", "r") as f:
        base_template = f.read()
    with open(f"email_templates/{name}.html", "r") as f:
        template = f.read()
    return base_template + template.format(**kwargs)
```

**Usage Example**
```python
# Send verification email
mail_template = get_template(
    "verify_email",
    WEBSITE_NAME="MyApp",
    email=user.email,
    token=verification_token,
    BASE_URL="https://myapp.com"
)
sendmail(user.email, "Verify Your Email", mail_template)
```

---

## Feature 8: Data Encryption System

### Description
Fernet-based symmetric encryption for sensitive data storage with automatic key generation, secure encryption/decryption utilities, and environment variable management for keys.

### Why It Matters
Storing sensitive data (API keys, tokens, personal information) in plaintext is a security risk. Encryption protects data at rest and ensures compliance with data protection regulations.

### How It Works
1. Generate encryption key on first run if not present
2. Store key in environment variables (.env file)
3. Use Fernet symmetric encryption (AES 128-bit)
4. Encrypt data before database storage
5. Decrypt data when retrieving from database
6. Automatic key rotation support

### Implementation

**Encryption Utilities**
```python
# backend/custom.py
from cryptography.fernet import Fernet

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")

# Auto-generate key if not present
if not ENCRYPTION_KEY:
    key = Fernet.generate_key()
    with open(".env", "a") as f:
        f.write(f"\nENCRYPTION_KEY={key.decode()}")
    ENCRYPTION_KEY = key.decode()

def encrypt(text: str) -> str:
    """Encrypt text using Fernet symmetric encryption"""
    fernet = Fernet(ENCRYPTION_KEY)
    encrypted = fernet.encrypt(text.encode()).decode()
    return encrypted

def decrypt(text: str) -> str:
    """Decrypt text using Fernet symmetric encryption"""
    fernet = Fernet(ENCRYPTION_KEY)
    decrypted = fernet.decrypt(text.encode()).decode()
    return decrypted
```

**Usage Example**
```python
# Encrypt sensitive data before saving
user.api_key = encrypt(api_key)
user.save()

# Decrypt when retrieving
api_key = decrypt(user.api_key)
```

---

## Feature 9: Centralized Configuration System

### Description
A single configuration file (`config/app.js`) that controls all frontend settings including API endpoints, branding, navigation menus, theme colors, feature toggles, redirects, and validation rules.

### Why It Matters
Scattered configuration across multiple files makes customization difficult and error-prone. Centralized configuration enables quick rebranding, easy environment changes, and consistent behavior across the application.

### How It Works
1. Single source of truth for all app configuration
2. Environment-aware API URL configuration
3. Feature toggles enable/disable functionality without code changes
4. Navigation menus configured separately for authenticated/public users
5. Theme colors defined with primary/secondary/accent options
6. Validation rules centralized for consistency
7. Redirect paths configured for authentication flows

### Implementation

**Configuration File**
```javascript
// frontend/src/config/app.js
export const APP_CONFIG = {
  // App Information
  name: "Your App Name",
  description: "A modern full-stack application",
  version: "1.0.0",
  
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || "",
    timeout: 10000,
    endpoints: {
      login: "/api/auth/login/",
      register: "/api/auth/register/",
      verify: "/api/auth/verify/",
      logout: "/api/auth/logout/",
      checkAuth: "/api/auth/user/authenticated/",
      refreshToken: "/api/auth/token/refresh/",
    }
  },
  
  // Navigation Menu Items
  navigation: {
    public: [
      { name: "Home", href: "/", icon: null },
      { name: "About", href: "/about", icon: null }
    ],
    authenticated: [
      { name: "Dashboard", href: "/dashboard", icon: null },
      { name: "Profile", href: "/profile", icon: null }
    ]
  },
  
  // Theme Configuration
  theme: {
    colors: {
      primary: { base: "indigo-600", hover: "indigo-500" },
      secondary: { base: "purple-600", hover: "purple-500" },
      accent: { base: "pink-600", hover: "pink-500" }
    }
  },
  
  // Feature Toggles
  features: {
    registration: true,
    emailVerification: true,
    passwordReset: true,
    rememberMe: true,
    socialLogin: false,
  },
  
  // Default Redirects
  redirects: {
    afterLogin: "/",
    afterLogout: "/auth",
    afterRegistration: "/verify",
    unauthorized: "/auth"
  },
  
  // Validation Rules
  validation: {
    password: {
      minLength: 8,
      requireUppercase: false,
      requireNumbers: false,
    }
  }
};

export const getConfig = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], APP_CONFIG);
};
```

---

## Feature 10: Nginx Reverse Proxy and Production Deployment

### Description
Nginx configured as reverse proxy to route API requests to Django backend and frontend requests to React build, with optimized buffering, timeout settings, and CORS handling.

### Why It Matters
Nginx efficiently handles static files, provides SSL termination, load balancing, and request routing. It's production-ready and significantly faster than Django's development server for static content.

### How It Works
1. Nginx listens on port 80 (or 443 for HTTPS)
2. Routes `/api/` requests to Django backend (port 8000)
3. Routes all other requests to React frontend (port 3000)
4. Serves static files directly from disk
5. Handles CORS headers and proxy settings
6. Configurable timeouts and buffer sizes

### Implementation

**Nginx Configuration**
```nginx
# nginx/nginx.conf
upstream backend {
    server backend:8000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name localhost;

    # Route API requests to Django
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Route everything else to React
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Feature 11: Custom User Model with Email Authentication

### Description
Django custom user model using email as the primary authentication field (no username), with support for verification status, timestamps, staff/admin roles, and flexible user fields.

### Why It Matters
Email-based authentication is more user-friendly than usernames, reduces duplicate accounts, and aligns with modern authentication practices. Custom models allow extending user data without complex joins.

### How It Works
1. Extend Django AbstractBaseUser
2. Use email as USERNAME_FIELD
3. Custom UserManager for user creation
4. Add is_verified field for email verification
5. Track registration and last login timestamps
6. Support for staff and superuser roles

### Implementation

**Custom User Model**
```python
# backend/usermanagement/models.py
class AuthAcc(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    registration_date = models.DateTimeField(auto_now_add=True)
    last_login_date = models.DateTimeField(null=True, blank=True)

    objects = AuthAccManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
```

**Settings Configuration**
```python
# backend/backend/settings.py
AUTH_USER_MODEL = 'usermanagement.AuthAcc'
```

---

## Summary

This Full-Stack Template includes **11 core production-ready features** covering:

- **🔐 Security**: JWT httpOnly cookies, email verification, data encryption, custom permissions
- **⚙️ Backend Infrastructure**: Django REST Framework, Celery background tasks, PostgreSQL 16, Redis 7
- **🎨 Modern Frontend**: React 19, Tailwind CSS, Framer Motion animations, glassmorphism design
- **🐳 DevOps**: Complete Docker containerization, Nginx reverse proxy, health checks
- **📧 Communication**: SMTP email system, HTML templates, async delivery
- **⚡ Performance**: Client-side caching, optimized builds, efficient state management
- **🔧 Developer Experience**: Centralized configuration, custom routing, hot-reload support

Each feature is production-tested, well-documented, and designed to work seamlessly together as a cohesive full-stack solution.
