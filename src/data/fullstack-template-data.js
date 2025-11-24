// Full-Stack Template Project Data
// Manually extracted from projects/FullStack-Template/ markdown files

export const fullStackTemplateData = {
  // From metadata.json
  title: "Full-Stack Web Application Template",
  shortDescription: "A production-ready, containerized full-stack template featuring React 19, Django REST Framework, PostgreSQL, Redis, and comprehensive JWT authentication with email verification.",
  
  github: "https://github.com/KazimFedxD/FullStack-Template",
  
  badges: [
    { icon: "Rocket", text: "Production-Ready" },
    { icon: "Package", text: "Fully Containerized" },
    { icon: "Wrench", text: "Developer-Friendly" }
  ],

  techStack: [
    { name: "React", version: "19", category: "Frontend" },
    { name: "Django", version: "5.2", category: "Backend" },
    { name: "Django REST Framework", version: "latest", category: "Backend" },
    { name: "PostgreSQL", version: "16", category: "Database" },
    { name: "Redis", version: "7", category: "Cache" },
    { name: "Celery", version: "latest", category: "Task Queue" },
    { name: "Docker", version: "latest", category: "DevOps" },
    { name: "Nginx", version: "latest", category: "Proxy" },
    { name: "JWT Authentication", version: "latest", category: "Security" },
    { name: "Tailwind CSS", version: "latest", category: "Styling" },
    { name: "Framer Motion", version: "latest", category: "Animation" }
  ],

  // From overview.md
  overview: {
    description: "This is a comprehensive, production-ready full-stack web application template designed to accelerate development by providing a robust, scalable foundation with modern best practices. The template combines React 19's latest features with Django 5.2's powerful backend capabilities, all orchestrated through Docker for seamless deployment across any platform.",
    
    problemIntro: "Starting a new full-stack web application involves significant overhead:",
    
    problemStatement: [
      "Configuration Complexity: Setting up Django, React, PostgreSQL, Redis, and Nginx requires deep knowledge of each technology and their integration points",
      "Authentication Boilerplate: Implementing secure JWT authentication with refresh tokens, httpOnly cookies, and email verification is time-consuming and error-prone",
      "Deployment Challenges: Coordinating multiple services (database, backend, frontend, cache, proxy) across development and production environments",
      "Development Environment: Creating a consistent development environment across team members with different operating systems",
      "Security Concerns: Properly securing API endpoints, managing CORS, implementing CSRF protection, and handling sensitive credentials",
      "Task Management: Setting up background job processing for emails, scheduled tasks, and long-running operations"
    ],

    howWeSolve: [
      {
        problem: "Configuration Complexity",
        solution: "Pre-configured Docker Compose orchestrates all services with a single command. Each service has optimized settings and environment variables clearly documented.",
        benefit: "Developers can start building features in minutes instead of spending days on configuration."
      },
      {
        problem: "Authentication Boilerplate",
        solution: "Complete JWT authentication system with access/refresh tokens, httpOnly cookies, email verification with 6-digit codes, and automatic token refresh—all implemented and tested.",
        benefit: "Copy-paste secure authentication that follows industry best practices without writing a single auth function."
      },
      {
        problem: "Deployment Challenges",
        solution: "Docker containerization ensures identical behavior across development, staging, and production. Nginx reverse proxy handles routing, static files, and SSL termination.",
        benefit: "Deploy anywhere Docker runs—local machine, VPS, cloud provider—with zero configuration changes."
      },
      {
        problem: "Development Environment",
        solution: "Docker eliminates 'works on my machine' syndrome. Hot-reload enabled for both React and Django means instant feedback on code changes.",
        benefit: "Team members on Windows, Mac, or Linux get identical development experience with a single 'docker-compose up' command."
      },
      {
        problem: "Security Concerns",
        solution: "Security-first architecture with httpOnly cookies, CORS whitelist, CSRF protection, JWT blacklisting on logout, and email verification before login access.",
        benefit: "Production-grade security from day one without security expertise required."
      },
      {
        problem: "Task Management",
        solution: "Celery workers and Celery Beat scheduler handle async tasks and periodic jobs. Redis serves as a fast, reliable message broker.",
        benefit: "Send emails, process uploads, and run cleanup tasks in the background without blocking API responses."
      }
    ],

    targetAudience: [
      "Full-Stack Developers building modern web applications from scratch",
      "Startups needing a rapid, reliable foundation for their MVP",
      "Development Teams requiring a standardized tech stack across projects",
      "Students & Learners studying full-stack development patterns and architecture",
      "Freelancers looking to accelerate project delivery with proven templates",
      "Companies establishing internal development standards and best practices"
    ],

    uniqueFeatures: [
      {
        icon: "Lock",
        title: "Security-First Design",
        points: [
          "HttpOnly cookies prevent XSS token theft",
          "Automatic token refresh ensures seamless user experience",
          "JWT blacklisting prevents token reuse after logout",
          "Email verification ensures valid user accounts",
          "CORS and CSRF protection configured correctly"
        ]
      },
      {
        icon: "Container",
        title: "True Containerization",
        points: [
          "Every component runs in Docker—no 'it works on my machine' issues",
          "Hot-reload in development for both frontend and backend",
          "Production-optimized builds with multi-stage Dockerfiles",
          "Volume management for persistent data",
          "Health checks ensure services start in correct order"
        ]
      },
      {
        icon: "Zap",
        title: "Async Task Processing",
        points: [
          "Celery workers handle background tasks (emails, reports, etc.)",
          "Celery Beat scheduler for periodic tasks (cleanup, notifications)",
          "Redis as message broker for high throughput",
          "Separate containers for workers and beat scheduler"
        ]
      },
      {
        icon: "Palette",
        title: "Modern Frontend Architecture",
        points: [
          "React 19 with latest hooks and concurrent features",
          "Context API for global state management",
          "Custom hooks for error handling and authentication",
          "Persistent state across page refreshes",
          "Beautiful glassmorphism UI with Tailwind CSS and Framer Motion"
        ]
      }
    ],

    useCases: [
      "SaaS applications requiring user authentication",
      "E-commerce platforms with user accounts",
      "Project management tools",
      "Social networking applications",
      "Content management systems",
      "API-driven mobile app backends",
      "Internal business applications",
      "Educational platforms",
      "Booking and reservation systems"
    ]
  },

  // From features.md - 11 major features
  features: [
    {
      id: 1,
      title: "Secure JWT Authentication with HttpOnly Cookies",
      icon: "KeyRound",
      description: "A comprehensive authentication system that implements JWT (JSON Web Tokens) stored in httpOnly cookies, preventing XSS attacks while maintaining a seamless user experience. The system includes automatic token refresh, token blacklisting on logout, and persistent authentication state across browser sessions.",
      whyItMatters: "Traditional JWT implementations often store tokens in localStorage or sessionStorage, making them vulnerable to XSS attacks. HttpOnly cookies cannot be accessed by JavaScript, significantly improving security.",
      howItWorks: [
        "User submits login credentials to Django backend",
        "Backend validates credentials and generates access token (5min) and refresh token (7 days)",
        "Tokens are set as httpOnly cookies in the response",
        "Frontend middleware automatically includes cookies in subsequent requests",
        "When access token expires, custom middleware automatically refreshes it using the refresh token",
        "On logout, tokens are blacklisted in the database to prevent reuse"
      ],
      codeSnippets: [
        {
          title: "Backend: Custom Cookie JWT Middleware",
          language: "python",
          code: `# backend/usermanagement/middleware.py
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
        return super().get_header(request)`
        },
        {
          title: "Frontend: Automatic Token Refresh",
          language: "javascript",
          code: `// frontend/src/utils/auth.js
export const getAccessToken = async () => {
  try {
    const response = await fetch(\`\${API_BASE_URL}/api/auth/refresh/\`, {
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
};`
        }
      ],
      screenshot: "/screenshots/FullStack-Template/login.png"
    },
    {
      id: 2,
      title: "Automated Email Verification System",
      icon: "Mail",
      description: "A complete email verification workflow that sends verification codes to users during registration, validates tokens with expiration, and uses Celery for background email delivery. Includes HTML email templates with customizable branding.",
      whyItMatters: "Email verification prevents spam accounts, ensures users have valid email addresses for password recovery, and adds an extra layer of security. Background task processing prevents slow API responses during registration.",
      howItWorks: [
        "User registers with email and password",
        "System generates a 6-character alphanumeric verification token",
        "Celery task asynchronously sends HTML email with verification link",
        "Token stored in memory with 10-minute expiration (600 seconds)",
        "Celery Beat scheduler runs every 60 seconds to clean expired tokens",
        "User clicks verification link or enters token manually",
        "System validates token and activates user account"
      ],
      codeSnippets: [
        {
          title: "Backend: Verification Token Generation",
          language: "python",
          code: `# backend/usermanagement/models.py
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
        return "".join(token)`
        },
        {
          title: "Backend: Celery Periodic Task for Token Cleanup",
          language: "python",
          code: `# backend/backend/settings.py
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
        token.del_self()`
        }
      ],
      screenshot: "/screenshots/FullStack-Template/verification.png"
    },
    {
      id: 3,
      title: "Modern UI with Glassmorphism Design",
      icon: "Palette",
      description: "A beautiful, responsive user interface built with Tailwind CSS and Framer Motion, featuring glassmorphism effects, smooth animations, and an intuitive user experience.",
      whyItMatters: "First impressions matter. A modern, polished UI increases user trust and engagement. Glassmorphism provides a contemporary aesthetic while maintaining usability.",
      screenshots: [
        "/screenshots/FullStack-Template/homepage.png",
        "/screenshots/FullStack-Template/dashboard.png",
        "/screenshots/FullStack-Template/register.png"
      ]
    },
    {
      id: 4,
      title: "Complete Docker Containerization",
      icon: "Container",
      description: "The entire application stack is fully containerized with Docker Compose, including PostgreSQL, Redis, Django backend, React frontend, Celery workers, Celery Beat scheduler, and Nginx reverse proxy.",
      whyItMatters: "Containerization eliminates environment inconsistencies ('works on my machine'), simplifies deployment, enables easy scaling, and provides isolated environments for each service.",
      services: [
        { name: "PostgreSQL", port: "5432", purpose: "Persistent data storage" },
        { name: "Redis", port: "6379", purpose: "Message broker and cache" },
        { name: "Django Backend", port: "8000", purpose: "REST API server" },
        { name: "React Frontend", port: "3000", purpose: "User interface" },
        { name: "Celery Worker", port: "-", purpose: "Background task processor" },
        { name: "Celery Beat", port: "-", purpose: "Periodic task scheduler" },
        { name: "Nginx", port: "80", purpose: "Reverse proxy" }
      ]
    },
    {
      id: 5,
      title: "Celery Background Task Processing",
      icon: "Zap",
      description: "Asynchronous task processing using Celery workers and Celery Beat scheduler, powered by Redis as the message broker.",
      whyItMatters: "Sending emails, processing large datasets, and running scheduled tasks should never block user requests. Celery enables scalable, asynchronous processing."
    },
    {
      id: 6,
      title: "Persistent Authentication State",
      icon: "Database",
      description: "Authentication state persists across page refreshes, browser tabs, and navigation events using React Context API combined with localStorage and automatic token validation.",
      whyItMatters: "Users expect to stay logged in across sessions. Losing authentication state on page refresh creates a frustrating user experience."
    },
    {
      id: 7,
      title: "Email System with HTML Templates",
      icon: "MailOpen",
      description: "A production-ready email system with SMTP integration, HTML templates with variable substitution, and Celery integration for background delivery.",
      whyItMatters: "Email is critical for user verification, notifications, and engagement. HTML emails look professional and support branding."
    },
    {
      id: 8,
      title: "Data Encryption System",
      icon: "KeyRound",
      description: "Fernet-based symmetric encryption for sensitive data storage with automatic key generation.",
      whyItMatters: "Storing sensitive data in plaintext is a security risk. Encryption protects data at rest and ensures compliance with data protection regulations."
    },
    {
      id: 9,
      title: "Centralized Configuration System",
      icon: "Settings",
      description: "A single configuration file that controls all frontend settings including API endpoints, branding, navigation menus, and feature toggles.",
      whyItMatters: "Scattered configuration makes customization difficult. Centralized configuration enables quick rebranding and easy environment changes."
    },
    {
      id: 10,
      title: "Nginx Reverse Proxy",
      icon: "RefreshCw",
      description: "Nginx configured as reverse proxy to route API requests to Django backend and frontend requests to React build.",
      whyItMatters: "Nginx efficiently handles static files, provides SSL termination, and is production-ready for high traffic."
    },
    {
      id: 11,
      title: "Custom User Model with Email Authentication",
      icon: "User",
      description: "Django custom user model using email as the primary authentication field (no username).",
      whyItMatters: "Email-based authentication is more user-friendly than usernames and aligns with modern authentication practices."
    }
  ],

  screenshots: [
    { filename: "homepage.png", caption: "Modern landing page with glassmorphism design" },
    { filename: "login.png", caption: "Secure login interface with real-time validation" },
    { filename: "register.png", caption: "User registration with password strength indicators" },
    { filename: "verification.png", caption: "Email verification page with token confirmation" },
    { filename: "dashboard.png", caption: "Main application dashboard" },
    { filename: "admin-panel.png", caption: "Admin panel interface" },
    { filename: "mobile-homepage.jpeg", caption: "Mobile responsive homepage" },
    { filename: "mobile-login.jpeg", caption: "Mobile login view" },
    { filename: "mobile-register.jpeg", caption: "Mobile registration" },
    { filename: "mobile-dashboard.jpeg", caption: "Mobile dashboard" },
    { filename: "mobile-navbar.jpeg", caption: "Mobile navigation" }
  ],

  // Performance metrics
  performance: {
    containerStartup: [
      { service: "PostgreSQL", time: "3-5 seconds", notes: "Includes health check wait time" },
      { service: "Redis", time: "1-2 seconds", notes: "Fast in-memory startup" },
      { service: "Django Backend", time: "5-8 seconds", notes: "Depends on PostgreSQL readiness" },
      { service: "React Frontend", time: "15-30 seconds", notes: "Initial npm dependency setup" },
      { service: "Celery Worker", time: "2-3 seconds", notes: "Quick startup after backend ready" },
      { service: "Celery Beat", time: "2-3 seconds", notes: "Scheduler initialization" },
      { service: "Nginx", time: "1-2 seconds", notes: "Lightweight proxy startup" }
    ],
    apiResponseTimes: [
      { endpoint: "/api/auth/register/", avg: "120-180ms", p95: "250ms", p99: "400ms" },
      { endpoint: "/api/auth/login/", avg: "100-150ms", p95: "200ms", p99: "350ms" },
      { endpoint: "/api/auth/verify/", avg: "80-120ms", p95: "180ms", p99: "300ms" },
      { endpoint: "/api/auth/refresh/", avg: "50-80ms", p95: "120ms", p99: "200ms" },
      { endpoint: "/api/auth/logout/", avg: "60-90ms", p95: "150ms", p99: "250ms" },
      { endpoint: "/api/user/profile/", avg: "40-60ms", p95: "100ms", p99: "180ms" }
    ],
    frontendMetrics: {
      development: {
        fcp: "1.5-2.5s",
        lcp: "2.0-3.5s",
        tti: "2.5-4.0s",
        tbt: "200-400ms",
        cls: "< 0.1"
      },
      production: {
        fcp: "0.8-1.5s",
        lcp: "1.2-2.0s",
        tti: "1.5-2.5s",
        tbt: "100-200ms",
        cls: "< 0.05"
      }
    },
    bundleSize: {
      mainJS: "450-550 KB",
      mainJSGzipped: "140-180 KB",
      css: "25-35 KB",
      cssGzipped: "6-8 KB",
      totalGzipped: "~220 KB"
    }
  },

  // Requirements
  requirements: {
    os: [
      { name: "Ubuntu", version: "20.04 LTS+", support: "Full" },
      { name: "Debian", version: "11+", support: "Full" },
      { name: "macOS", version: "12+", support: "Full" },
      { name: "Windows", version: "10/11 Pro", support: "Full (WSL2 required)" }
    ],
    hardware: {
      minimum: {
        cpu: "Dual-core 2.0 GHz",
        ram: "4 GB",
        disk: "5 GB free",
        note: "Functional but may be slow"
      },
      recommended: {
        cpu: "Quad-core 2.5 GHz+",
        ram: "8 GB+",
        disk: "10 GB+ SSD",
        note: "Smooth development experience"
      }
    },
    software: [
      { name: "Docker", version: "20.10+", required: true },
      { name: "Docker Compose", version: "2.0+", required: true },
      { name: "Git", version: "2.30+", required: true },
      { name: "Python", version: "3.11+", required: false, note: "For local dev without Docker" },
      { name: "Node.js", version: "18+", required: false, note: "For local dev without Docker" }
    ],
    browsers: [
      { name: "Chrome", version: "90+", status: "Recommended" },
      { name: "Firefox", version: "88+", status: "Supported" },
      { name: "Edge", version: "90+", status: "Supported" },
      { name: "Safari", version: "14+", status: "Supported" }
    ]
  },

  // Architecture
  architecture: {
    description: "This full-stack application follows a modern microservices-inspired architecture, containerized with Docker for consistency and scalability.",
    servicesTitle: "Service Architecture",
    servicesIntro: "The application consists of 7 containerized services:",
    diagram: {
      // Architecture diagram data (if you add visual diagrams later)
    },
    services: [
      { name: "PostgreSQL", port: "5432", purpose: "Persistent data storage" },
      { name: "Redis", port: "6379", purpose: "Message broker and cache" },
      { name: "Django Backend", port: "8000", purpose: "REST API server" },
      { name: "React Frontend", port: "3000", purpose: "User interface" },
      { name: "Celery Worker", port: "-", purpose: "Background task processor" },
      { name: "Celery Beat", port: "-", purpose: "Periodic task scheduler" },
      { name: "Nginx", port: "80", purpose: "Reverse proxy" }
    ]
  },

  // Known issues
  knownIssues: [
    {
      title: "Email Verification Token Storage",
      severity: "Medium",
      description: "Verification tokens are stored in-memory rather than in the database.",
      impact: "Tokens are lost if the backend container restarts",
      workaround: "Keep backend container running or request new verification email",
      status: "Planned for v2.0",
      detailedExplanation: "Currently, email verification tokens are stored in a Python list (`VERIFICATION_TOKENS`) in memory. This approach works for development but has limitations in production environments where containers may be restarted or scaled horizontally.",
      technicalDetails: "The `VerificationToken` class stores tokens with a 10-minute timeout. Every 60 seconds, a Celery task cleans up expired tokens. However, since this data is in memory, it doesn't persist across container restarts.",
      whyItHappens: "This design choice was made to simplify the template and avoid additional database tables for temporary data. For a template meant for learning and rapid prototyping, it reduces complexity.",
      proposedFix: "Migrate to database storage using a `VerificationToken` model with fields: `user`, `token`, `created_at`, `expires_at`. Use Django's built-in database cleanup or Celery periodic task to delete expired tokens.",
      codeExample: `# Proposed solution
class VerificationToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    
    def is_valid(self):
        return timezone.now() < self.expires_at`,
      estimatedEffort: "2-3 hours",
      priority: "Medium (High for production use)"
    },
    {
      title: "No Rate Limiting",
      severity: "High",
      description: "No API rate limiting implemented.",
      impact: "Vulnerable to brute force attacks on login",
      workaround: "Add rate limiting manually using Django packages",
      status: "Recommended for production",
      detailedExplanation: "The template does not include rate limiting on authentication endpoints (/api/auth/login/, /api/auth/register/). This makes it vulnerable to automated attacks that attempt to guess passwords or flood the registration system.",
      technicalDetails: "Without rate limiting, an attacker can make unlimited login attempts per second, potentially: (1) Brute-forcing weak passwords, (2) Causing database overload, (3) Sending spam verification emails, (4) Exploiting any logic flaws through repeated requests.",
      whyItHappens: "Rate limiting adds complexity and requires additional dependencies. For a template focused on core functionality, it was omitted to keep the setup simple and let developers choose their preferred rate limiting strategy.",
      proposedFix: "Use Django REST Framework's throttling classes or django-ratelimit package. Implement per-IP and per-user rate limits on sensitive endpoints.",
      codeExample: `# Using DRF throttling
from rest_framework.throttling import AnonRateThrottle

class LoginRateThrottle(AnonRateThrottle):
    rate = '5/min'  # 5 login attempts per minute

class LoginView(APIView):
    throttle_classes = [LoginRateThrottle]
    # ... rest of view code

# Or using django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST')
def login_view(request):
    # ... login logic`,
      estimatedEffort: "1-2 hours to implement basic rate limiting",
      priority: "Critical for production"
    },
    {
      title: "No Real-Time Features",
      severity: "Low",
      description: "No WebSocket support for real-time communication.",
      impact: "No live chat or real-time notifications",
      workaround: "Use polling or implement Django Channels",
      status: "Feature request",
      detailedExplanation: "The template uses traditional HTTP requests only. It does not support WebSockets, which means features like live chat, real-time notifications, collaborative editing, or live dashboards require polling (repeatedly requesting data) instead of push-based updates.",
      technicalDetails: "Polling is inefficient: the frontend must make repeated requests (e.g., every 5 seconds) to check for new data. This increases server load, network traffic, and delays between updates. WebSockets maintain a persistent connection for instant bidirectional communication.",
      whyItHappens: "WebSocket support requires Django Channels, which adds significant complexity (ASGI servers, Redis channel layer, different deployment configuration). For a template focused on standard CRUD operations, WebSockets were deemed out of scope.",
      proposedFix: "Integrate Django Channels for WebSocket support. Add ASGI configuration, Redis channel layer, and create consumers for real-time features.",
      codeExample: `# Install Django Channels
pip install channels channels-redis

# asgi.py
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # WebSocket URL patterns
        ])
    ),
})

# Consumer example
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("notifications", self.channel_name)
        await self.accept()
    
    async def receive(self, text_data):
        # Handle incoming messages
        pass
    
    async def send_notification(self, event):
        await self.send(text_data=json.dumps(event))`,
      estimatedEffort: "1-2 days for basic WebSocket support, 3-5 days for complete real-time features",
      priority: "Low (depends on project requirements)"
    }
  ],

  // Future enhancements
  futureEnhancements: [
    {
      version: "2.0",
      timeline: "Q1-Q2 2026",
      theme: "Production-Ready Enhancements & Security",
      features: [
        { 
          name: "Two-Factor Authentication (2FA)", 
          priority: "High", 
          difficulty: "Medium",
          effort: "2-3 days",
          description: "Add TOTP-based two-factor authentication using apps like Google Authenticator or Authy.",
          whyWeNeed: "2FA significantly reduces account takeover risks. Even if a password is compromised, attackers cannot access accounts without the second factor. Essential for applications handling sensitive data or financial transactions.",
          howToImplement: "1. Install `pyotp` library for generating TOTP secrets. 2. Add `TwoFactorAuth` model to store user's secret key. 3. Create endpoints for enabling/disabling 2FA and verifying codes. 4. Generate QR code for easy setup. 5. Update login flow to require 2FA code after password verification. 6. Provide backup codes for account recovery.",
          benefits: "Enhanced security, compliance with security standards (SOC 2, ISO 27001), reduced fraud, increased user trust.",
          codeSnippet: `# Backend implementation
import pyotp
import qrcode

class TwoFactorAuth(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    secret = models.CharField(max_length=32)
    enabled = models.BooleanField(default=False)
    backup_codes = models.JSONField(default=list)

@api_view(['POST'])
def enable_2fa(request):
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(request.user.email, issuer_name="YourApp")
    # Generate QR code from uri
    return Response({'secret': secret, 'qr_code': uri})`
        },
        { 
          name: "Social Authentication (Google, GitHub)", 
          priority: "High", 
          difficulty: "Medium",
          effort: "3-5 days",
          description: "Enable users to sign up and log in using their Google or GitHub accounts via OAuth2.",
          whyWeNeed: "Reduces friction in signup process (no email verification needed), improves conversion rates, and leverages trusted identity providers. Users prefer social login for faster onboarding.",
          howToImplement: "1. Install `django-allauth` or `social-auth-app-django`. 2. Register apps on Google Cloud Console and GitHub OAuth Apps. 3. Add OAuth client IDs and secrets to environment variables. 4. Configure callback URLs. 5. Create endpoints for initiating OAuth flow and handling callbacks. 6. Link social accounts to existing users or create new accounts. 7. Add social login buttons to frontend.",
          benefits: "Faster user onboarding, reduced password management burden, access to user profile data (with permission), higher signup conversion rates.",
          codeSnippet: `# Using django-allauth
# settings.py
INSTALLED_APPS += ['allauth', 'allauth.account', 'allauth.socialaccount', 'allauth.socialaccount.providers.google', 'allauth.socialaccount.providers.github']

SOCIALACCOUNT_PROVIDERS = {
    'google': {'SCOPE': ['profile', 'email'], 'AUTH_PARAMS': {'access_type': 'online'}},
    'github': {'SCOPE': ['user:email']}
}

# Frontend button
<button onClick={() => window.location.href = '/auth/google/'}>
  Sign in with Google
</button>`
        },
        { 
          name: "Role-Based Access Control (RBAC)", 
          priority: "Medium", 
          difficulty: "Medium",
          effort: "2-4 days",
          description: "Implement a flexible permission system with roles (Admin, Editor, Viewer) and custom permissions.",
          whyWeNeed: "Not all users should have the same access level. RBAC allows granular control over who can create, read, update, or delete resources. Essential for team collaboration and enterprise applications.",
          howToImplement: "1. Create `Role` and `Permission` models. 2. Extend User model with `role` field. 3. Create permission decorators and middleware. 4. Define role hierarchy (Admin > Editor > Viewer). 5. Implement permission checks in API views. 6. Add role management endpoints for admins. 7. Update frontend to show/hide UI elements based on permissions.",
          benefits: "Enhanced security, team collaboration support, audit trails, compliance with access control policies, prevents privilege escalation.",
          codeSnippet: `# Models
class Role(models.Model):
    name = models.CharField(max_length=50)
    permissions = models.JSONField(default=list)

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

# Permission decorator
from functools import wraps

def require_permission(permission):
    def decorator(view_func):
        @wraps(view_func)
        def wrapped(request, *args, **kwargs):
            if not request.user.has_permission(permission):
                return Response({'error': 'Forbidden'}, status=403)
            return view_func(request, *args, **kwargs)
        return wrapped
    return decorator

@require_permission('delete_user')
@api_view(['DELETE'])
def delete_user(request, user_id):
    # Delete logic`
        },
        { 
          name: "Rate Limiting", 
          priority: "High", 
          difficulty: "Easy",
          effort: "1-2 days",
          description: "Implement per-IP and per-user rate limiting on authentication and sensitive endpoints.",
          whyWeNeed: "Protects against brute force attacks, DDoS attempts, and API abuse. Essential for production environments to ensure service availability and security.",
          howToImplement: "1. Install `django-ratelimit` or use DRF throttling. 2. Define rate limits for different endpoint types (e.g., 5 login attempts/min, 100 API calls/hour). 3. Apply decorators to views. 4. Use Redis to store rate limit counters for distributed systems. 5. Add custom error responses for rate-limited requests. 6. Consider different limits for authenticated vs anonymous users.",
          benefits: "Protection against brute force attacks, reduced server load from spam, improved API reliability, compliance with security best practices.",
          codeSnippet: `# Using django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST', block=True)
@api_view(['POST'])
def login_view(request):
    # Login logic
    pass

# Using DRF throttling
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

class LoginThrottle(AnonRateThrottle):
    rate = '5/minute'

class APIThrottle(UserRateThrottle):
    rate = '100/hour'

class LoginView(APIView):
    throttle_classes = [LoginThrottle]
    # View logic`
        },
        { 
          name: "API Versioning", 
          priority: "Medium", 
          difficulty: "Easy",
          effort: "2-3 days",
          description: "Implement API versioning to maintain backward compatibility when making breaking changes.",
          whyWeNeed: "Allows evolving the API without breaking existing client applications. Mobile apps and third-party integrations can continue using older API versions while new features are developed.",
          howToImplement: "1. Choose versioning strategy (URL path /api/v1/, header, or query parameter). 2. Restructure endpoints to include version prefix. 3. Create version-specific serializers and views. 4. Document version changes and deprecation timeline. 5. Add version negotiation middleware. 6. Set up automated tests for each API version.",
          benefits: "Smooth feature rollouts, maintains compatibility with legacy clients, professional API management, easier deprecation process.",
          codeSnippet: `# URL versioning (recommended)
# urls.py
urlpatterns = [
    path('api/v1/', include('api.v1.urls')),
    path('api/v2/', include('api.v2.urls')),
]

# Header versioning
from rest_framework.versioning import AcceptHeaderVersioning

REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'DEFAULT_VERSION': 'v1'
}

# View
class UserViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerV2
        return UserSerializerV1`
        },
        { 
          name: "Swagger/OpenAPI Documentation", 
          priority: "High", 
          difficulty: "Easy",
          effort: "1-2 days",
          description: "Auto-generate interactive API documentation using Swagger/OpenAPI specification.",
          whyWeNeed: "Automatically documented APIs improve developer experience, reduce support burden, and serve as living documentation that stays up-to-date with code changes. Essential for API-first applications.",
          howToImplement: "1. Install `drf-spectacular` or `drf-yasg`. 2. Configure schema generation settings. 3. Add docstrings to API views for descriptions. 4. Annotate serializers with field descriptions. 5. Add example responses. 6. Configure Swagger UI endpoint. 7. Add authentication to Swagger for testing protected endpoints.",
          benefits: "Self-documenting API, interactive testing interface, client SDK generation, reduces documentation maintenance, improves team collaboration.",
          codeSnippet: `# Using drf-spectacular
pip install drf-spectacular

# settings.py
INSTALLED_APPS += ['drf_spectacular']
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# urls.py
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# Annotated view
from drf_spectacular.utils import extend_schema

@extend_schema(
    description="Register a new user account",
    responses={201: UserSerializer}
)
@api_view(['POST'])
def register(request):
    # Registration logic`
        },
        { 
          name: "File Upload Support", 
          priority: "High", 
          difficulty: "Medium",
          effort: "3-5 days",
          description: "Add secure file upload functionality with validation, virus scanning, and storage management.",
          whyWeNeed: "Most applications need file uploads (profile pictures, documents, attachments). Implementing it securely with proper validation, size limits, and malware scanning is critical.",
          howToImplement: "1. Configure Django media files settings. 2. Create FileUpload model to track uploads. 3. Implement file validation (size, type, extension). 4. Add virus scanning using ClamAV or external service. 5. Generate unique filenames to prevent overwriting. 6. Implement chunked upload for large files. 7. Add file deletion and cleanup. 8. Create upload progress tracking.",
          benefits: "Complete user profiles, document management, rich content creation, better user engagement.",
          codeSnippet: `# Model
class FileUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    original_filename = models.CharField(max_length=255)
    size = models.IntegerField()
    mime_type = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)

# View with validation
from django.core.files.uploadedfile import UploadedFile

@api_view(['POST'])
def upload_file(request):
    file: UploadedFile = request.FILES.get('file')
    
    # Validate
    if file.size > 10 * 1024 * 1024:  # 10MB limit
        return Response({'error': 'File too large'}, status=400)
    
    allowed_types = ['image/jpeg', 'image/png', 'application/pdf']
    if file.content_type not in allowed_types:
        return Response({'error': 'Invalid file type'}, status=400)
    
    # Save
    upload = FileUpload.objects.create(
        user=request.user,
        file=file,
        original_filename=file.name,
        size=file.size,
        mime_type=file.content_type
    )
    return Response(FileUploadSerializer(upload).data, status=201)`
        },
        { 
          name: "Cloud Storage Integration", 
          priority: "Medium", 
          difficulty: "Medium",
          effort: "2-3 days",
          description: "Integrate cloud storage (AWS S3, Google Cloud Storage, or Azure Blob) for scalable file storage.",
          whyWeNeed: "Local file storage doesn't scale with containerized deployments. Cloud storage provides unlimited capacity, CDN integration, automatic backups, and geographic redundancy.",
          howToImplement: "1. Install `django-storages` and cloud provider SDK (boto3 for AWS). 2. Configure storage backend in settings. 3. Set up cloud storage bucket with proper access policies. 4. Add environment variables for credentials. 5. Configure static/media files to use cloud storage. 6. Implement presigned URLs for secure downloads. 7. Add CDN configuration for faster delivery.",
          benefits: "Unlimited storage capacity, automatic scaling, CDN integration for faster delivery, geographic redundancy, reduced server load, works with horizontal scaling.",
          codeSnippet: `# AWS S3 setup
pip install django-storages boto3

# settings.py
INSTALLED_APPS += ['storages']

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = 'us-east-1'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

# Generate presigned URL for private files
from botocore.client import Config
import boto3

s3 = boto3.client('s3', config=Config(signature_version='s3v4'))
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': bucket, 'Key': key},
    ExpiresIn=3600  # 1 hour
)`
        }
      ]
    },
    {
      version: "3.0",
      timeline: "Q4 2026",
      theme: "Real-Time & Mobile",
      features: [
        { 
          name: "WebSocket Support (Django Channels)", 
          priority: "High", 
          difficulty: "Hard",
          effort: "1 week",
          description: "Add full WebSocket support using Django Channels for real-time bidirectional communication.",
          whyWeNeed: "Enable real-time features like live chat, notifications, collaborative editing, live dashboards, and gaming without inefficient polling.",
          howToImplement: "1. Install Django Channels and channels-redis. 2. Create ASGI application configuration. 3. Set up Redis as channel layer. 4. Create WebSocket consumers for different features. 5. Implement authentication for WebSocket connections. 6. Add routing for WebSocket URLs. 7. Update Nginx to proxy WebSocket connections. 8. Create frontend WebSocket client with reconnection logic.",
          benefits: "Real-time user experience, reduced server load compared to polling, enables collaborative features, instant notifications, modern app capabilities.",
          codeSnippet: `# Installation
pip install channels channels-redis

# asgi.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(chat.routing.websocket_urlpatterns)
    ),
})

# Consumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()
    
    async def receive_json(self, content):
        await self.channel_layer.group_send(
            self.room_name,
            {'type': 'chat.message', 'message': content['message']}
        )
    
    async def chat_message(self, event):
        await self.send_json({'message': event['message']})`
        },
        { 
          name: "Mobile Apps (iOS & Android)", 
          priority: "High", 
          difficulty: "Hard",
          effort: "3-4 weeks",
          description: "Build native mobile applications for iOS and Android using React Native or Flutter.",
          whyWeNeed: "Mobile users expect native app experiences. Mobile apps provide better performance, offline capability, push notifications, and access to device features (camera, location, biometrics).",
          howToImplement: "1. Choose framework (React Native recommended for code reuse). 2. Set up React Native project with Expo or bare workflow. 3. Implement authentication flow with biometric support. 4. Create API client wrapper. 5. Implement offline-first data sync. 6. Add push notification support. 7. Implement camera and file access. 8. Build for iOS App Store and Google Play Store. 9. Set up CI/CD for mobile builds.",
          benefits: "Reach mobile users, better performance than web apps, offline functionality, push notifications, device feature access, app store presence.",
          codeSnippet: `// React Native setup
npx react-native init YourApp

// Auth with biometrics
import * as LocalAuthentication from 'expo-local-authentication';

const authenticateWithBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to access your account',
  });
  
  if (result.success) {
    // Load saved credentials and login
  }
};

// API client
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({ baseURL: 'https://api.yourapp.com' });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`
        },
        { 
          name: "Push Notifications", 
          priority: "High", 
          difficulty: "Medium",
          effort: "3-5 days",
          description: "Implement web and mobile push notifications for real-time user engagement.",
          whyWeNeed: "Re-engage users with timely updates, increase retention, deliver important alerts even when app is closed.",
          howToImplement: "1. Set up Firebase Cloud Messaging (FCM) or OneSignal. 2. Create Notification model to store push subscriptions. 3. Implement service worker for web push. 4. Add notification preferences for users. 5. Create notification sending service. 6. Implement notification scheduling. 7. Add rich notifications with images and actions. 8. Track notification delivery and engagement.",
          benefits: "Increased user engagement, better retention rates, timely alerts, marketing channel, improved user experience.",
          codeSnippet: `# Backend with FCM
from firebase_admin import messaging

def send_push_notification(user, title, body):
    message = messaging.Message(
        notification=messaging.Notification(title=title, body=body),
        token=user.push_token,
    )
    response = messaging.send(message)
    return response

# Frontend (web) service worker
self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png',
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  });
});`
        },
        { 
          name: "GraphQL API", 
          priority: "Medium", 
          difficulty: "Hard",
          effort: "1 week",
          description: "Add GraphQL API alongside REST for flexible, efficient data fetching.",
          whyWeNeed: "GraphQL solves over-fetching and under-fetching problems of REST. Clients request exactly what they need, reducing bandwidth and improving performance. Great for mobile apps and complex UIs.",
          howToImplement: "1. Install Graphene-Django. 2. Define GraphQL types from Django models. 3. Create query and mutation schemas. 4. Implement resolvers with permission checks. 5. Add DataLoader for N+1 query optimization. 6. Set up GraphQL endpoint. 7. Add GraphQL Playground for testing. 8. Implement subscriptions for real-time data (requires Channels).",
          benefits: "Flexible data fetching, reduced over-fetching, single request for multiple resources, strongly typed schema, better mobile performance, real-time subscriptions.",
          codeSnippet: `# Installation
pip install graphene-django

# Schema
import graphene
from graphene_django import DjangoObjectType

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.Int())
    
    def resolve_users(self, info):
        return User.objects.all()
    
    def resolve_user(self, info, id):
        return User.objects.get(pk=id)

class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
    
    user = graphene.Field(UserType)
    
    def mutate(self, info, email, password):
        user = User.objects.create_user(email=email, password=password)
        return CreateUser(user=user)

# Frontend query
const query = gql\`
  query GetUser($id: Int!) {
    user(id: $id) {
      email
      firstName
      lastName
    }
  }
\`;`
        }
      ]
    }
  ],

  // Setup & Installation Guide (from setup.md)
  setupGuide: [
    {
      title: "Clone the Repository",
      description: "Get the project code on your local machine",
      commands: [
        {
          description: "Clone from GitHub",
          code: `# Clone the repository
git clone https://github.com/KazimFedxD/FullStack-Template.git

# Navigate to project directory
cd FullStack-Template`,
          language: "bash"
        }
      ],
      notes: [
        "If you forked the repository, replace the URL with your fork's URL"
      ]
    },
    {
      title: "Backend Environment Setup",
      description: "Configure Django backend environment variables",
      commands: [
        {
          description: "Create .env file in backend directory",
          code: `cd backend
touch .env`,
          language: "bash"
        },
        {
          description: "Add configuration to .env file",
          code: `# Database Configuration
DATABASE_URL=postgres://template_user:template_password@db:5432/template_db

# Django Security
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Email Configuration
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# Celery Configuration
CELERY_BROKER_URL=redis://redis:6379/0

# Application Settings
WEBSITE_NAME=Your App Name
BASE_URL=http://localhost:8000`,
          language: "env"
        }
      ],
      warnings: [
        "SECRET_KEY: Generate a secure random key for production",
        "EMAIL_PASS: For Gmail, use an App Password, not your regular password",
        "DEBUG: Must be False in production",
        "ALLOWED_HOSTS: Add your production domain"
      ]
    },
    {
      title: "Frontend Environment Setup",
      description: "Configure React frontend environment variables",
      commands: [
        {
          description: "Create .env file in frontend directory",
          code: `cd frontend
touch .env`,
          language: "bash"
        },
        {
          description: "Add configuration",
          code: `# API Configuration
REACT_APP_API_URL=http://localhost:8000

# Application Branding
REACT_APP_APP_NAME=Your App Name`,
          language: "env"
        }
      ],
      notes: [
        "All React environment variables must start with REACT_APP_",
        "Change REACT_APP_API_URL to your production API URL when deploying"
      ]
    },
    {
      title: "Email Configuration (Gmail)",
      description: "Set up email verification with Gmail SMTP",
      commands: [
        {
          description: "Steps to generate Gmail App Password",
          code: `1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/security
3. Under "2-Step Verification", find "App passwords"
4. Select "Mail" and your device
5. Copy the 16-character password
6. Add to backend/.env file`,
          language: "text"
        }
      ],
      notes: [
        "For Outlook: EMAIL_HOST=smtp-mail.outlook.com, EMAIL_PORT=587",
        "For Yahoo: EMAIL_HOST=smtp.mail.yahoo.com, EMAIL_PORT=465"
      ]
    },
    {
      title: "Start with Docker Compose",
      description: "Launch all services using Docker",
      commands: [
        {
          description: "Build and start all containers",
          code: `# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down`,
          language: "bash"
        }
      ],
      notes: [
        "First run will take 5-10 minutes to download images and build",
        "Access frontend at http://localhost:3000",
        "Access backend API at http://localhost:8000",
        "Access admin panel at http://localhost:8000/admin"
      ]
    },
    {
      title: "Run Migrations & Create Superuser",
      description: "Initialize database and create admin account",
      commands: [
        {
          description: "Run database migrations",
          code: `# Apply migrations
docker-compose exec backend python manage.py migrate

# Create superuser for admin panel
docker-compose exec backend python manage.py createsuperuser`,
          language: "bash"
        }
      ],
      notes: [
        "Migrations create all necessary database tables",
        "Superuser credentials are used for the admin panel",
        "Remember your superuser password - it cannot be recovered"
      ]
    }
  ],

  // Environment Variables (from environment-variables.md)
  environmentVariables: [
    {
      name: "DATABASE_URL",
      type: "String (PostgreSQL connection URL)",
      format: "postgresql://user:password@host:port/database",
      category: "database",
      required: true,
      security: "critical",
      description: "PostgreSQL database connection string",
      purpose: "Connects Django to the PostgreSQL database",
      example: "postgresql://template_user:template_password@db:5432/template_db",
      default: "sqlite:///db.sqlite3 (if not provided)",
      production: "Change credentials to strong, unique values",
      securityNotes: "Contains database password - keep secret!",
      usage: `DATABASES = {
    "default": dj_database_url.config(
        default=os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
    )
}`
    },
    {
      name: "SECRET_KEY",
      type: "String (cryptographic key)",
      category: "security",
      required: true,
      security: "critical",
      description: "Django secret key for cryptographic signing",
      purpose: "Used for sessions, CSRF, password hashing",
      example: "django-insecure-4k3a4kybqv4ig34&y6#rvv-m(_-(esk30%2m^xwbyqfh(zeul#",
      production: "Generate a long, random, unique key (50+ characters)",
      securityNotes: "CRITICAL! Never commit to version control or share publicly",
      usage: `SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-default")`
    },
    {
      name: "EMAIL",
      type: "String (email address)",
      category: "email",
      required: true,
      security: "high",
      description: "Sender email address for outgoing emails",
      purpose: "Used for verification emails and notifications",
      example: "youremail@gmail.com",
      production: "Use a dedicated email account or service",
      securityNotes: "Paired with EMAIL_PASS, keep secure",
      usage: `SENDER = os.getenv("EMAIL")
if not SENDER:
    print("WARNING: Email not set in .env file")`
    },
    {
      name: "EMAIL_PASS",
      type: "String (password or app-specific password)",
      category: "email",
      required: true,
      security: "critical",
      description: "Password for SMTP authentication",
      purpose: "Authenticate with email provider's SMTP server",
      example: "abcd efgh ijkl mnop (Gmail App Password)",
      production: "Use app-specific passwords, not account password",
      securityNotes: "CRITICAL! Never commit or share. For Gmail, generate at myaccount.google.com/apppasswords"
    },
    {
      name: "CELERY_BROKER_URL",
      type: "String (Redis connection URL)",
      format: "redis://host:port/db_number",
      category: "optional",
      required: false,
      security: "medium",
      description: "Redis connection for Celery task queue",
      purpose: "Message broker for asynchronous task processing",
      example: "redis://redis:6379/0",
      default: "redis://localhost:6379/0",
      production: "Use dedicated Redis instance or managed service"
    },
    {
      name: "DEBUG",
      type: "Boolean (True/False)",
      category: "security",
      required: false,
      security: "high",
      description: "Enable Django debug mode",
      purpose: "Show detailed error pages and query logging",
      example: "True",
      default: "True",
      production: "MUST be False for security",
      securityNotes: "Debug mode exposes sensitive information in production"
    },
    {
      name: "ALLOWED_HOSTS",
      type: "String (comma-separated list)",
      category: "security",
      required: false,
      security: "high",
      description: "Allowed hostnames that can serve the application",
      purpose: "Prevents host header attacks",
      example: "localhost,127.0.0.1,yourdomain.com",
      default: "* (all hosts - insecure)",
      production: "MUST specify exact domains",
      securityNotes: "Prevents host header attacks"
    },
    {
      name: "EMAIL_HOST",
      type: "String (SMTP server hostname)",
      category: "email",
      required: false,
      security: "low",
      description: "SMTP server for sending emails",
      example: "smtp.gmail.com",
      default: "smtp.gmail.com",
      production: "Use your email provider's SMTP server"
    },
    {
      name: "EMAIL_PORT",
      type: "Integer (port number)",
      category: "email",
      required: false,
      security: "low",
      description: "SMTP server port",
      example: "465",
      default: "465",
      production: "Use 587 for TLS or 465 for SSL"
    },
    {
      name: "REACT_APP_API_URL",
      type: "String (URL)",
      category: "optional",
      required: true,
      security: "low",
      description: "Backend API URL for React frontend",
      example: "http://localhost:8000",
      production: "Change to production API URL (e.g., https://api.yourdomain.com)"
    }
  ],

  // API Endpoints (comprehensive REST API reference)
  apiEndpoints: [
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/register/",
      auth: false,
      description: "Register new user account",
      fullDescription: "Creates a new user account and sends a verification email with a 6-character token valid for 10 minutes.",
      requestBody: [
        { name: "email", type: "string", required: true, description: "User's email address", example: "user@example.com" },
        { name: "password", type: "string", required: true, description: "Password (min 8 characters)", example: "SecurePass123!" },
        { name: "password2", type: "string", required: true, description: "Password confirmation", example: "SecurePass123!" }
      ],
      exampleRequest: `fetch('http://localhost:8000/api/auth/register/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!',
    password2: 'SecurePass123!'
  })
});`,
      responses: [
        {
          status: 201,
          description: "User created successfully",
          example: {
            message: "User created successfully! Please check your email for the verification code.",
            user_id: 42
          }
        },
        {
          status: 400,
          description: "Validation error",
          example: {
            email: ["User with this email already exists."],
            password: ["Password must be at least 8 characters."]
          }
        }
      ],
      notes: [
        "Email verification is required before login",
        "Verification token expires after 10 minutes",
        "Password must meet minimum security requirements"
      ]
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/verify/",
      auth: false,
      description: "Verify email with 6-character token",
      requestBody: [
        { name: "email", type: "string", required: true, description: "User's email address" },
        { name: "token", type: "string", required: true, description: "6-character verification code from email" }
      ],
      responses: [
        {
          status: 200,
          description: "Email verified successfully",
          example: { message: "Email verified successfully! You can now login." }
        },
        {
          status: 400,
          description: "Invalid or expired token",
          example: { error: "Invalid or expired verification code." }
        }
      ]
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/login/",
      auth: false,
      description: "Login and receive JWT tokens",
      requestBody: [
        { name: "email", type: "string", required: true, description: "User's email address" },
        { name: "password", type: "string", required: true, description: "User's password" }
      ],
      responses: [
        {
          status: 200,
          description: "Login successful",
          example: {
            access: "eyJ0eXAiOiJKV1QiLCJhbGc...",
            refresh: "eyJ0eXAiOiJKV1QiLCJhbGc...",
            user: {
              id: 1,
              email: "user@example.com",
              verified: true
            }
          }
        },
        {
          status: 401,
          description: "Invalid credentials or unverified email",
          example: { error: "Invalid credentials or email not verified." }
        }
      ],
      notes: [
        "Access token valid for 5 minutes",
        "Refresh token valid for 7 days",
        "Tokens set as httpOnly cookies"
      ]
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/refresh/",
      auth: true,
      authDetails: "Requires valid refresh token in httpOnly cookie",
      description: "Refresh access token",
      responses: [
        {
          status: 200,
          description: "New access token issued",
          example: { access: "eyJ0eXAiOiJKV1QiLCJhbGc..." }
        }
      ]
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/logout/",
      auth: true,
      authDetails: "Requires valid access token",
      description: "Logout and blacklist tokens",
      responses: [
        {
          status: 200,
          description: "Logout successful",
          example: { message: "Logout successful" }
        }
      ]
    },
    {
      category: "User",
      method: "GET",
      path: "/api/users/me/",
      auth: true,
      authDetails: "Requires valid access token in Authorization header",
      description: "Get current user's profile",
      responses: [
        {
          status: 200,
          description: "User profile data",
          example: {
            id: 1,
            email: "user@example.com",
            verified: true,
            date_joined: "2024-01-15T10:30:00Z"
          }
        }
      ]
    },
    {
      category: "User",
      method: "PATCH",
      path: "/api/users/me/",
      auth: true,
      authDetails: "Requires valid access token",
      description: "Update current user's profile",
      requestBody: [
        { name: "email", type: "string", required: false, description: "New email address" }
      ],
      responses: [
        {
          status: 200,
          description: "Profile updated",
          example: { message: "Profile updated successfully" }
        }
      ]
    },
    {
      category: "User",
      method: "DELETE",
      path: "/api/users/me/",
      auth: true,
      authDetails: "Requires valid access token",
      description: "Delete current user's account",
      responses: [
        {
          status: 204,
          description: "Account deleted successfully"
        }
      ],
      notes: [
        "This action is irreversible",
        "All user data will be permanently deleted"
      ]
    }
  ],

  // Additional code snippets and examples
  codeExamples: [
    {
      title: "JWT Token Refresh Middleware",
      description: "Automatically refreshes access token when it expires",
      language: "javascript",
      code: `// src/utils/authMiddleware.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        await axios.post(
          \`\${process.env.REACT_APP_API_URL}/api/auth/refresh/\`,
          {},
          { withCredentials: true }
        );
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;`
    },
    {
      title: "Email Verification Component",
      description: "React component for email verification with 6-digit code input",
      language: "jsx",
      code: `import React, { useState } from 'react';
import api from '../utils/authMiddleware';

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = code.join('');
      const email = localStorage.getItem('pendingEmail');
      
      await api.post('/api/auth/verify/', { email, token });
      
      // Redirect to login
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="code-input-grid">
        {code.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const newCode = [...code];
              newCode[idx] = e.target.value.toUpperCase();
              setCode(newCode);
            }}
            className="code-input"
          />
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        Verify Email
      </button>
    </form>
  );
};`
    },
    {
      title: "Docker Compose Configuration",
      description: "Complete docker-compose.yml with all services",
      language: "yaml",
      code: `version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: template_db
      POSTGRES_USER: template_user
      POSTGRES_PASSWORD: template_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U template_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache & Message Broker
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Django Backend
  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  # React Frontend
  frontend:
    build: ./frontend
    command: npm start
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    env_file:
      - ./frontend/.env
    depends_on:
      - backend

  # Celery Worker
  celery:
    build: ./backend
    command: celery -A backend worker -l info
    volumes:
      - ./backend:/app
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - db

  # Celery Beat Scheduler
  celery-beat:
    build: ./backend
    command: celery -A backend beat -l info
    volumes:
      - ./backend:/app
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - db

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:`
    }
  ],

  // Setup Guide Steps (from setup.md)
  setupSteps: [
    {
      title: "Clone the Repository",
      description: "Get the project code on your local machine",
      code: `git clone https://github.com/KazimFedxD/FullStack-Template.git
cd FullStack-Template`,
      language: "bash",
      notes: "If you forked the repository, replace the URL with your fork's URL."
    },
    {
      title: "Configure Backend Environment",
      description: "Create a .env file in the backend/ directory with required variables",
      code: `# Database Configuration
DATABASE_URL=postgres://template_user:template_password@db:5432/template_db

# Django Security
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Email Configuration (Gmail example)
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# Celery Configuration
CELERY_BROKER_URL=redis://redis:6379/0

# Application Settings
WEBSITE_NAME=Your App Name
BASE_URL=http://localhost:8000`,
      language: "env",
      codeTitle: "backend/.env",
      notes: "For Gmail, create an App Password (not your regular password) at https://myaccount.google.com/apppasswords"
    },
    {
      title: "Configure Frontend Environment",
      description: "Create a .env file in the frontend/ directory",
      code: `# API Configuration
REACT_APP_API_URL=http://localhost:8000

# Application Branding
REACT_APP_APP_NAME=Your App Name`,
      language: "env",
      codeTitle: "frontend/.env",
      notes: "All environment variables must start with REACT_APP_ to be accessible in React."
    },
    {
      title: "Start with Docker Compose",
      description: "Build and start all services using Docker",
      code: `# Start all services in detached mode
docker-compose up -d

# View logs (optional)
docker-compose logs -f

# Stop all services
docker-compose down`,
      language: "bash",
      notes: "First run will take 5-10 minutes to pull images and build containers."
    },
    {
      title: "Access the Application",
      description: "Once all containers are running, access the application",
      code: `Frontend: http://localhost:3000
Backend API: http://localhost:8000
Admin Panel: http://localhost:8000/admin
Nginx Proxy: http://localhost`,
      language: "text",
      notes: "Default admin credentials will be created on first run (check backend logs for details)."
    }
  ],

  // Related projects with similar tech stack
  relatedProjects: [
    "FinCore",
    "Portfolio Website"
  ]
};
