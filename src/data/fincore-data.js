// FinCore Project Data
// Manually extracted from projects/FinCore/ markdown files
// 14,526+ lines of documentation condensed into structured data

export const fincoreData = {
  // ============================================================
  // BASIC INFO
  // ============================================================
  
  title: "FinCore - Personal Finance & Islamic Wealth Management System",
  shortDescription: "A full-stack finance management application that helps users track income, expenses, and assets with upcoming Islamic financial principles integration (Khums & Zakat).",
  github: "https://github.com/KazimFedxD/FinCore",
  
  badges: [
    { icon: "Construction", text: "In Active Development" },
    { icon: "Building2", text: "Built on FullStack-Template" },
    { icon: "Building", text: "Islamic Finance Ready" }
  ],

  // Tech Stack with categories
  techStack: [
    { name: "React", version: "19", category: "Frontend" },
    { name: "Django", version: "5.2", category: "Backend" },
    { name: "Django REST Framework", version: "latest", category: "Backend" },
    { name: "PostgreSQL", version: "16", category: "Database" },
    { name: "Redis", version: "7", category: "Cache" },
    { name: "Celery", version: "latest", category: "Task Queue" },
    { name: "Celery Beat", version: "latest", category: "Scheduler" },
    { name: "Docker Compose", version: "latest", category: "DevOps" },
    { name: "Nginx", version: "latest", category: "Proxy" },
    { name: "JWT Authentication", version: "latest", category: "Security" },
    { name: "Tailwind CSS", version: "latest", category: "Styling" },
    { name: "Framer Motion", version: "latest", category: "Animation" }
  ],

  // ============================================================
  // OVERVIEW
  // ============================================================
  
  overview: {
    description: "FinCore is a sophisticated personal finance management system designed to provide users with complete control over their financial data. Built on a robust full-stack architecture, FinCore goes beyond simple expense tracking by offering a comprehensive solution that includes income management, categorized financial tracking, and detailed reporting capabilities. The platform is designed with modularity and extensibility at its core, with the vision of becoming a complete Islamic wealth management system featuring automated Khums and Zakat calculations.",
    
    problemIntro: "Traditional finance apps often face several critical issues:",
    
    problemStatement: [
      "Lack of Islamic Finance Support: Most finance apps don't account for Islamic financial principles like Khums and Zakat calculations",
      "Data Privacy Concerns: Cloud-based solutions store sensitive financial data on third-party servers",
      "Limited Customization: Rigid category structures that don't adapt to individual needs",
      "Poor Data Ownership: Users can't easily export or self-host their financial data",
      "Complexity: Over-engineered interfaces that complicate simple tasks",
      "Vendor Lock-In: Difficult to migrate data or self-host applications"
    ],

    howWeSolve: [
      {
        problem: "Lack of Islamic Finance Support",
        solution: "First open-source platform to combine traditional personal finance tracking with Islamic financial principles, featuring automated Khums and Zakat calculations (in development)",
        benefit: "Muslims can manage finances while maintaining religious compliance without manual calculations"
      },
      {
        problem: "Data Privacy Concerns",
        solution: "Self-hosting capability with Docker-based deployment gives users complete control over their data with no third-party cloud storage",
        benefit: "Financial data stays on user's infrastructure, eliminating privacy concerns and data breaches"
      },
      {
        problem: "Limited Customization",
        solution: "Flexible hierarchical category system allows unlimited nesting and custom categories matching individual lifestyles",
        benefit: "Users organize finances their way, from simple categories to complex multi-level hierarchies"
      },
      {
        problem: "Poor Data Ownership",
        solution: "Open-source codebase with complete data export capabilities and Docker deployment ensures no vendor lock-in",
        benefit: "Full transparency, ability to modify code, and freedom to migrate or self-host anytime"
      },
      {
        problem: "Complexity",
        solution: "Clean, intuitive interface built with React 19 and Tailwind CSS focuses on essential features without over-engineering",
        benefit: "Simple workflows make daily finance tracking fast and friction-free"
      },
      {
        problem: "Vendor Lock-In",
        solution: "API-first design with RESTful endpoints enables integration with other tools and future mobile/desktop clients",
        benefit: "Ecosystem compatibility and ability to build custom integrations as needed"
      }
    ],

    targetAudience: [
      "Muslim Individuals & Families seeking Islamic financial compliance",
      "Privacy-Conscious Users preferring self-hosted solutions",
      "Finance Enthusiasts wanting detailed insights and control",
      "Developers interested in fintech and Islamic finance",
      "Small Business Owners tracking business finances separately",
      "Students learning about personal finance and Islamic economics"
    ],

    uniqueFeatures: [
      {
        icon: "Building",
        title: "Islamic Finance Integration (Upcoming)",
        points: [
          "Automated Khums (one-fifth tax) calculations based on income and expenses",
          "Zakat (charitable giving) obligation tracking and reminders",
          "Hijri calendar support for Islamic dates",
          "Halal investment tracking and monitoring",
          "First open-source platform combining traditional and Islamic finance"
        ]
      },
      {
        icon: "Building2",
        title: "Built on Production-Ready Template",
        points: [
          "JWT authentication with automatic token refresh",
          "Celery task queues for background processing",
          "Email verification system with async delivery",
          "Redis caching for performance optimization",
          "Containerized deployment with Docker Compose"
        ]
      },
      {
        icon: "Lock",
        title: "Data Privacy & Ownership",
        points: [
          "Self-hosted deployment option with full control",
          "No third-party cloud storage required",
          "Complete data export capabilities",
          "Open-source transparency for code auditing",
          "User-specific data isolation at database level"
        ]
      },
      {
        icon: "Zap",
        title: "Modern Developer Experience",
        points: [
          "Clean separation of concerns (Django backend, React frontend)",
          "Well-documented RESTful API endpoints",
          "Docker Compose for one-command deployment",
          "Hot-reload enabled for rapid development",
          "Modular architecture for easy feature additions"
        ]
      }
    ],

    useCases: [
      "Personal Budget Management: Track daily income and expenses with category breakdowns",
      "Islamic Financial Compliance: Calculate Khums and Zakat obligations automatically (upcoming)",
      "Financial Planning: Analyze spending patterns and identify improvement areas",
      "Small Business Tracking: Manage business income/expenses separate from personal finances",
      "Educational Tool: Learn about personal finance and Islamic economic principles",
      "Family Finance Management: Multiple users tracking household finances",
      "Investment Tracking: Monitor halal investments and returns",
      "Charitable Giving: Track donations and Zakat payments",
      "Budget Goal Setting: Create and monitor progress toward financial goals",
      "Expense Analysis: Identify top spending categories and reduce costs"
    ]
  },

  // ============================================================
  // FEATURES (6 Major Features)
  // ============================================================
  
  features: [
    {
      id: 1,
      title: "JWT-Based Authentication with Email Verification",
      icon: "KeyRound",
      description: "Secure user authentication system using JSON Web Tokens (JWT) with automatic token refresh, cookie-based authentication, and email verification. Ensures only verified users can access their financial data while providing a seamless login experience.",
      whyItMatters: "JWT tokens prevent unauthorized access to sensitive financial data. Automatic token refresh eliminates annoying re-login prompts. Email verification ensures account authenticity and enables password recovery. Stateless architecture enables horizontal scaling without session storage.",
      howItWorks: [
        "User registers with email and password",
        "System sends verification email with 6-digit code via Celery task",
        "User verifies email to activate account",
        "Upon login, server issues access token (5 min) and refresh token (7 days) in HTTP-only cookies",
        "Frontend automatically refreshes access token when expired",
        "Middleware validates tokens on every API request"
      ],
      codeSnippets: [
        {
          title: "JWT Configuration (settings.py)",
          language: "python",
          code: `from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "usermanagement.middleware.CookieJWTAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}`,
        screenshots: [
          "/screenshots/FinCore/homepage.png",
          "/screenshots/FinCore/dashboard.png"
        ]
        },
        {
          title: "Email Verification Token System",
          language: "python",
          code: `class VerificationToken:
    """Generate and validate 6-digit verification codes"""
    
    def generate_token(self, new: bool = False) -> str:
        alpha_token = random.choices(string.ascii_uppercase, k=3)
        digit_token = random.choices(string.digits, k=3)
        token = alpha_token + digit_token
        random.shuffle(token)
        
        self.token = "".join(token)
        self.timeout = 10  # 10 minutes validity
        return self.token
    
    @staticmethod
    def check(user: AuthAcc, token: str, reason: str) -> bool:
        usertoken = VerificationToken.get_user(user)
        if usertoken and usertoken.token == token:
            if usertoken.reason == reason:
                usertoken.del_self()
                return True
        return False`
        },
        {
          title: "Frontend Authentication Context",
          language: "javascript",
          code: `export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-refresh token before expiration
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      await refreshAccessToken();
    }, 4 * 60 * 1000); // Refresh every 4 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const login = async (email, password) => {
    const response = await apiPost('/auth/login/', { email, password });
    if (response.ok) {
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};`
        }
      ]
    },
    {
      id: 2,
      title: "Hierarchical Category System",
      icon: "FolderTree",
      description: "Flexible category management system with parent-child relationships allowing unlimited nesting depth. Supports root categories (Income/Expense) that are protected from deletion, with user-defined subcategories for granular organization.",
      whyItMatters: "Nested categories provide granular tracking without complexity. Users can create custom categories matching their lifestyle. Root categories prevent orphaned transactions. Enables detailed reporting with category-wise breakdowns and aggregations.",
      howItWorks: [
        "System creates two root categories on first run: Income and Expense",
        "Users create subcategories under these roots (e.g., Salary under Income)",
        "Transactions link to subcategories, inheriting the parent type",
        "Reports aggregate by both parent and child categories",
        "Deletion protection prevents removing categories with active transactions"
      ],
      codeSnippets: [
        {
          title: "Category Model with Hierarchy",
          language: "python",
          code: `class Category(Model):
    name = CharField(max_length=100, unique=True)
    description = TextField(blank=True, null=True)
    
    # Self-referencing foreign key for hierarchy
    parent = ForeignKey(
        "self", 
        on_delete=CASCADE, 
        blank=True, 
        null=True, 
        related_name="children"
    )
    
    user = ForeignKey(AuthAcc, on_delete=CASCADE, related_name="categories")
    
    # Root categories (Income/Expense) cannot be used directly
    root = BooleanField(default=False)
    
    def __str__(self) -> str:
        return self.name`
        },
        {
          title: "Category API View",
          language: "python",
          code: `class CategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        categories = Category.objects.filter(
            user=request.user
        ).values(
            'id', 'name', 'description', 
            'parent', 'parent__name', 'root'
        )
        return Response(list(categories))

    def post(self, request: Request) -> Response:
        name = request.data.get('name')
        parent_name = request.data.get('parent')
        
        parent = Category.objects.get(name=parent_name) if parent_name else None
        
        category = Category.objects.create(
            name=name,
            parent=parent,
            user=request.user
        )
        return Response({'id': category.id, 'name': category.name})`
        },
        {
          title: "Frontend Category Management",
          language: "javascript",
          code: `export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  
  // Group categories by parent for display
  const groupedCategories = categories.reduce((acc, cat) => {
    const parentName = cat.parent__name || 'Root';
    if (!acc[parentName]) {
      acc[parentName] = [];
    }
    acc[parentName].push(cat);
    return acc;
  }, {});

  const handleDelete = async (categoryId, isRoot) => {
    if (isRoot) {
      alert('Cannot delete root categories');
      return;
    }
    // Delete logic...
  };

  return (
    <div>
      {Object.entries(groupedCategories).map(([parent, cats]) => (
        <div key={parent}>
          <h3>{parent}</h3>
          {cats.map(cat => (
            <CategoryCard 
              key={cat.id} 
              category={cat}
              onDelete={() => handleDelete(cat.id, cat.root)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}`
        }
      ]
    },
    {
      id: 3,
      title: "Real-Time Financial Dashboard",
      icon: "BarChart3",
      description: "Provides an at-a-glance view of financial health with three key metrics (total income, total expenses, current balance) and visual category breakdowns showing where money comes from and where it goes.",
      whyItMatters: "Instant insights allow seeing financial status in seconds. Visual progress bars make patterns obvious. Quickly identify top expense categories. Positive balance displayed in encouraging colors for motivation.",
      howItWorks: [
        "Dashboard fetches data from /api/report/ endpoint",
        "Backend aggregates all user's income and expense transactions",
        "Frontend calculates category breakdowns and percentages",
        "Visual components render with color-coded cards and progress bars",
        "Refresh button allows manual data reload"
      ],
      codeSnippets: [
        {
          title: "Backend Report API",
          language: "python",
          code: `@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_report(request: Request) -> Response:
    # Fetch all income with category names
    income = Income.objects.filter(
        user=request.user
    ).values('amount', 'date', 'category__name')
    income = sorted(income, key=lambda x: x['date'], reverse=True)
    
    # Fetch all expenses with category names
    expense = Expense.objects.filter(
        user=request.user
    ).values('amount', 'date', 'category__name')
    expense = sorted(expense, key=lambda x: x['date'], reverse=True)
    
    # Calculate totals
    total_income = sum(item['amount'] for item in income)
    total_expense = sum(item['amount'] for item in expense)
    total_balance = total_income - total_expense
    
    return Response({
        'total_income': total_income,
        'total_expense': total_expense,
        'total_balance': total_balance,
        'income_details': list(income),
        'expense_details': list(expense),
    })`
        },
        {
          title: "Frontend Dashboard Component",
          language: "javascript",
          code: `export default function DashboardPage() {
  const [reportData, setReportData] = useState(null);

  const getCategoryBreakdown = (details) => {
    const categoryMap = {};
    details.forEach(item => {
      const category = item.category__name || 'Uncategorized';
      categoryMap[category] = (categoryMap[category] || 0) + item.amount;
    });
    return Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
  };

  const incomeBreakdown = getCategoryBreakdown(reportData.income_details);
  const expenseBreakdown = getCategoryBreakdown(reportData.expense_details);

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Total Income"
          value={reportData.total_income}
          color="green"
          icon="↑"
        />
        <SummaryCard
          title="Total Expenses"
          value={reportData.total_expense}
          color="red"
          icon="↓"
        />
        <SummaryCard
          title="Balance"
          value={reportData.total_balance}
          color={reportData.total_balance >= 0 ? 'green' : 'red'}
          icon="="
        />
      </div>

      {/* Category Breakdowns */}
      <CategoryBreakdown data={incomeBreakdown} type="income" />
      <CategoryBreakdown data={expenseBreakdown} type="expense" />
    </div>
  );
}`
        }
      ]
    },
    {
      id: 4,
      title: "Comprehensive Income & Expense Tracking",
      icon: "DollarSign",
      description: "Full CRUD (Create, Read, Update, Delete) operations for both income and expenses with category assignment, date tracking, and detailed descriptions. User-specific data isolation ensures privacy.",
      whyItMatters: "Complete transaction history enables accurate financial analysis. Category-based organization makes finding transactions easy. Date sorting shows recent activity first. Descriptions provide context for each transaction.",
      howItWorks: [
        "Users create income/expense entries with amount, date, category, and description",
        "Backend validates data and links to authenticated user",
        "Transactions stored in PostgreSQL with foreign keys to categories",
        "Frontend displays sorted lists with edit and delete options",
        "Real-time updates reflect changes in dashboard and reports"
      ],
      codeSnippets: [
        {
          title: "Income Model",
          language: "python",
          code: `class Income(Model):
    amount = FloatField()
    description = TextField(blank=True, null=True)
    date = DateField()
    category = ForeignKey(Category, on_delete=SET_NULL, null=True, related_name="incomes")
    user = ForeignKey(AuthAcc, on_delete=CASCADE, related_name="incomes")
    
    class Meta:
        ordering = ['-date']
        indexes = [
            Index(fields=['user', 'date']),
            Index(fields=['category']),
        ]
    
    def __str__(self):
        return f"{self.amount} - {self.date}"`
        },
        {
          title: "Income API View",
          language: "python",
          code: `class IncomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        incomes = Income.objects.filter(
            user=request.user
        ).values('id', 'amount', 'date', 'category__name', 'description')
        
        sorted_incomes = sorted(incomes, key=lambda x: x['date'], reverse=True)
        return Response(list(sorted_incomes))

    def post(self, request: Request) -> Response:
        data = request.data
        amount = data.get('amount')
        date = data.get('date')
        category_name = data.get('category')
        description = data.get('description', '')
        
        category = Category.objects.get(name=category_name, user=request.user)
        
        income = Income.objects.create(
            amount=amount,
            date=date,
            category=category,
            description=description,
            user=request.user
        )
        return Response({'id': income.id, 'status': 'Created'}, status=201)`
        }
      ]
    },
    {
      id: 5,
      title: "Detailed Financial Reporting",
      icon: "TrendingUp",
      description: "Comprehensive financial reports showing all transactions with category breakdowns, total calculations, and chronological sorting. Aggregates data to provide meaningful insights into spending patterns.",
      whyItMatters: "Category-wise breakdowns reveal spending patterns. Chronological sorting shows financial history. Total calculations provide financial health snapshot. Helps identify areas to reduce expenses.",
      howItWorks: [
        "Report endpoint aggregates all user transactions",
        "Backend calculates totals for income and expenses",
        "Transactions returned with category information",
        "Frontend renders tables with filtering and sorting",
        "Visual charts show category distributions (planned)"
      ],
      codeSnippets: [
        {
          title: "Report Generation Logic",
          language: "python",
          code: `@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_report(request: Request) -> Response:
    # Fetch income with joins
    income = Income.objects.filter(
        user=request.user
    ).select_related('category').values(
        'id', 'amount', 'date', 'category__name', 'description'
    )
    
    # Fetch expenses with joins
    expense = Expense.objects.filter(
        user=request.user
    ).select_related('category').values(
        'id', 'amount', 'date', 'category__name', 'description'
    )
    
    # Aggregate by category
    income_by_category = {}
    for item in income:
        cat = item['category__name'] or 'Uncategorized'
        income_by_category[cat] = income_by_category.get(cat, 0) + item['amount']
    
    expense_by_category = {}
    for item in expense:
        cat = item['category__name'] or 'Uncategorized'
        expense_by_category[cat] = expense_by_category.get(cat, 0) + item['amount']
    
    return Response({
        'total_income': sum(item['amount'] for item in income),
        'total_expense': sum(item['amount'] for item in expense),
        'income_by_category': income_by_category,
        'expense_by_category': expense_by_category,
        'income_details': sorted(income, key=lambda x: x['date'], reverse=True),
        'expense_details': sorted(expense, key=lambda x: x['date'], reverse=True),
    })`
        }
      ]
    },
    {
      id: 6,
      title: "Responsive Modern UI",
      icon: "Palette",
      description: "Clean, intuitive interface built with React 19, Tailwind CSS, and Framer Motion. Features glassmorphic design, smooth animations, and mobile-responsive layouts that work seamlessly across devices.",
      whyItMatters: "Mobile-first design ensures accessibility on all devices. Smooth animations provide professional feel. Glass morphism creates modern, premium aesthetic. Tailwind enables rapid UI iteration.",
      howItWorks: [
        "React 19 components with hooks for state management",
        "Tailwind CSS utility classes for responsive styling",
        "Framer Motion for page transitions and element animations",
        "Context API for global state (auth, theme)",
        "Custom hooks for API communication and error handling"
      ],
      codeSnippets: [
        {
          title: "Glassmorphic Card Component",
          language: "javascript",
          code: `export function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={\`
        bg-white/10 backdrop-blur-md 
        rounded-xl border border-white/20 
        shadow-xl p-6
        \${className}
      \`}
    >
      {children}
    </motion.div>
  );
}`
        },
        {
          title: "Page Transition Animation",
          language: "javascript",
          code: `export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}`
        }
      ]
    }
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================
  
  architecture: {
    description: "FinCore follows a microservices-inspired architecture with clear separation between frontend, backend, database, cache, and task queue. All services are containerized using Docker Compose for consistent deployment.",
    
    servicesTitle: "Service Architecture",
    servicesIntro: "The application consists of 7 containerized services:",
    
    diagram: {
      title: "System Architecture Overview",
      description: "Request flow from client browser through Nginx proxy to backend API and database",
      layers: [
        {
          name: "Client Layer",
          components: [
            { name: "Web Browser", icon: "Monitor", description: "React 19 SPA served as static files" },
            { name: "Mobile Browser", icon: "Smartphone", description: "Responsive design adapts to mobile screens" }
          ]
        },
        {
          name: "Proxy Layer",
          components: [
            { name: "Nginx", icon: "GitBranch", description: "Reverse proxy, SSL termination, static file serving" }
          ]
        },
        {
          name: "Application Layer",
          components: [
            { name: "Django Backend", icon: "Code2", description: "RESTful API with JWT authentication" },
            { name: "React Frontend", icon: "Atom", description: "Single Page Application with routing" }
          ]
        },
        {
          name: "Background Services",
          components: [
            { name: "Celery Worker", icon: "Settings", description: "Async task processing (emails)" },
            { name: "Celery Beat", icon: "Clock", description: "Scheduled tasks (token cleanup)" }
          ]
        },
        {
          name: "Data Layer",
          components: [
            { name: "PostgreSQL", icon: "Database", description: "Primary data storage" },
            { name: "Redis", icon: "Zap", description: "Message broker and cache" }
          ]
        }
      ],
      dataFlow: [
        { from: "Browser", to: "Nginx", description: "HTTPS request" },
        { from: "Nginx", to: "React Frontend", description: "Static files (/*)" },
        { from: "Nginx", to: "Django Backend", description: "API calls (/api/*)" },
        { from: "Django Backend", to: "PostgreSQL", description: "Data queries" },
        { from: "Django Backend", to: "Redis", description: "Task queue" },
        { from: "Celery Worker", to: "Redis", description: "Consume tasks" }
      ]
    },
    
    services: [
      {
        name: "Nginx Reverse Proxy",
        description: "Routes traffic to appropriate services and serves static files",
        technologies: ["Nginx", "SSL/TLS"],
        purpose: "Frontend server and API gateway",
        port: "80/443"
      },
      {
        name: "React Frontend",
        description: "Single Page Application with React Router for navigation",
        technologies: ["React 19", "Tailwind CSS", "Framer Motion"],
        purpose: "User interface and client-side logic",
        port: "3000"
      },
      {
        name: "Django REST API",
        description: "Backend API with JWT authentication and business logic",
        technologies: ["Django 5.2", "DRF", "Python 3.11"],
        purpose: "API endpoints and data processing",
        port: "8000"
      },
      {
        name: "PostgreSQL Database",
        description: "Relational database for persistent data storage",
        technologies: ["PostgreSQL 16"],
        purpose: "User data, transactions, categories",
        port: "5432"
      },
      {
        name: "Redis Cache",
        description: "In-memory data store for caching and message broker",
        technologies: ["Redis 7"],
        purpose: "Celery task queue and session storage",
        port: "6379"
      },
      {
        name: "Celery Worker",
        description: "Background task processor for async operations",
        technologies: ["Celery", "Python"],
        purpose: "Email sending, data processing",
        port: "N/A"
      },
      {
        name: "Celery Beat",
        description: "Scheduled task runner for periodic jobs",
        technologies: ["Celery Beat", "Python"],
        purpose: "Token cleanup, automated tasks",
        port: "N/A"
      }
    ]
  },

  // ============================================================
  // SCREENSHOTS
  // ============================================================
  
  screenshots: [
    { filename: "dashboard.png", caption: "Dashboard Overview", category: "Main", description: "Real-time financial overview with income, expenses, and balance" },
    { filename: "categories.png", caption: "Category Management", category: "Features", description: "Hierarchical category system with parent-child relationships" },
    { filename: "incomes.png", caption: "Income Tracking", category: "Features", description: "Detailed income entries with categories and dates" },
    { filename: "expenses.png", caption: "Expense Tracking", category: "Features", description: "Comprehensive expense management" },
    { filename: "reports.png", caption: "Financial Reports", category: "Features", description: "Category breakdowns and transaction history" },
  ],

  // ============================================================
  // PERFORMANCE
  // ============================================================
  
  performance: {
    overview: {
      philosophy: "FinCore prioritizes data accuracy and user privacy while maintaining good performance. Built on the FullStack-Template foundation, it inherits optimizations like connection pooling, query optimization, and caching strategies."
    },

    keyMetrics: {
      "Page Load Time": "< 2s",
      "API Response Time": "< 200ms avg",
      "Database Query Time": "< 50ms",
      "Bundle Size (Est.)": "~150 KB",
      "Container Startup": "~30-45s first run"
    },

    codebaseMetrics: [
      { component: "Backend (Django)", value: "~2,000 lines", category: "Code" },
      { component: "Frontend (React)", value: "~1,500 lines", category: "Code" },
      { component: "Database Models", value: "4 models", category: "Data" },
      { component: "API Endpoints", value: "10+", category: "API" },
      { component: "React Components", value: "15+", category: "UI" }
    ],

    strengths: [
      "User-specific queries with indexed foreign keys for fast data retrieval",
      "Celery async tasks prevent email sending from blocking API responses",
      "HTTP-only cookies reduce client-side processing overhead",
      "React 19 concurrent rendering for smooth UI updates",
      "PostgreSQL connection pooling handles concurrent users efficiently"
    ],

    bottlenecks: [
      "First-time Docker container startup takes 30-45 seconds (cached images reduce to 10-15s)",
      "Report aggregation slows with 10,000+ transactions (pagination planned)",
      "No database query caching yet (Redis caching planned for reports)",
      "Frontend bundle not code-split yet (all components load on initial page)",
      "Email sending depends on external SMTP service availability"
    ]
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================
  
  requirements: {
    os: [
      { name: "Windows", version: "10/11", support: "✅ Fully Supported" },
      { name: "macOS", version: "12+", support: "✅ Fully Supported" },
      { name: "Linux (Ubuntu)", version: "20.04+", support: "✅ Fully Supported" },
      { name: "Linux (Debian)", version: "11+", support: "✅ Fully Supported" },
      { name: "Linux (Fedora)", version: "35+", support: "✅ Fully Supported" }
    ],

    hardware: {
      minimum: {
        ram: "4GB",
        cpu: "Dual-core 2.0GHz",
        disk: "5GB free space",
        note: "Sufficient for running all Docker containers"
      },
      recommended: {
        ram: "8GB or more",
        cpu: "Quad-core 2.5GHz or better",
        disk: "10GB free space",
        note: "Better performance with multiple containers and data growth"
      }
    },

    software: [
      { name: "Docker", version: "20.0.0+", required: true, note: "Container runtime" },
      { name: "Docker Compose", version: "2.0.0+", required: true, note: "Multi-container orchestration" },
      { name: "Python", version: "3.11+", required: false, note: "Only for local development without Docker" },
      { name: "Node.js", version: "18+", required: false, note: "Only for local frontend development" },
      { name: "Git", version: "2.0.0+", required: true, note: "Version control" }
    ],

    browsers: [
      { name: "Chrome", version: "90+", status: "✅ Recommended" },
      { name: "Firefox", version: "88+", status: "✅ Supported" },
      { name: "Safari", version: "14+", status: "✅ Supported" },
      { name: "Edge", version: "90+", status: "✅ Supported" }
    ]
  },

  // ============================================================
  // SETUP STEPS
  // ============================================================
  
  setupSteps: [
    {
      number: 1,
      title: "Clone Repository",
      description: "Download the FinCore repository from GitHub to your local machine",
      commands: [
        { code: "git clone https://github.com/KazimFedxD/FinCore.git", description: "Clone the repository" },
        { code: "cd FinCore", description: "Navigate into project directory" }
      ]
    },
    {
      number: 2,
      title: "Configure Environment Variables",
      description: "Create .env file with database credentials and Django secret key",
      commands: [
        { code: "cp .env.example .env", description: "Copy example environment file" },
        { code: "# Edit .env with your settings", description: "Update SECRET_KEY, DATABASE_URL, EMAIL_* settings" }
      ]
    },
    {
      number: 3,
      title: "Build Docker Containers",
      description: "Build all service containers using Docker Compose",
      commands: [
        { code: "docker-compose build", description: "Build all containers (takes 5-10 minutes first time)" }
      ]
    },
    {
      number: 4,
      title: "Start All Services",
      description: "Launch the entire application stack",
      commands: [
        { code: "docker-compose up -d", description: "Start containers in detached mode" },
        { code: "docker-compose logs -f", description: "View logs (optional)" }
      ]
    },
    {
      number: 5,
      title: "Run Database Migrations",
      description: "Create database tables and initialize schema",
      commands: [
        { code: "docker-compose exec backend python manage.py migrate", description: "Apply migrations" }
      ]
    },
    {
      number: 6,
      title: "Create Superuser (Optional)",
      description: "Create admin account for Django admin panel access",
      commands: [
        { code: "docker-compose exec backend python manage.py createsuperuser", description: "Follow prompts to create admin user" }
      ]
    },
    {
      number: 7,
      title: "Access Application",
      description: "Open browser and navigate to the application",
      commands: [
        { code: "# Frontend: http://localhost", description: "Access React UI" },
        { code: "# Backend API: http://localhost/api/", description: "Access API endpoints" },
        { code: "# Admin Panel: http://localhost/admin/", description: "Django admin interface" }
      ]
    },
    {
      number: 8,
      title: "Verify Services",
      description: "Check that all containers are running properly",
      commands: [
        { code: "docker-compose ps", description: "List running containers" },
        { code: "docker-compose logs backend", description: "Check backend logs for errors" }
      ]
    }
  ],

  // ============================================================
  // KNOWN ISSUES
  // ============================================================
  
  knownIssues: [
    {
      severity: "medium",
      title: "No Visual Charts for Reports",
      description: "Reports currently display data in tables without graphical visualizations",
      impact: "Users cannot see pie charts or bar graphs for category breakdowns",
      workaround: "Export data and visualize in Excel or other tools",
      status: "Planned for v0.2.0 (Q1 2026)",
      detailedExplanation: "The current implementation focuses on core functionality (CRUD operations, authentication) and displays financial data in table format. Visual charts (pie charts for category distribution, line graphs for time-based trends) are planned but not yet implemented.",
      technicalDetails: "Frontend uses basic HTML tables and Tailwind styling. Need to integrate charting library like Chart.js or Recharts for React.",
      whyItHappens: "Development priority was on backend infrastructure and data integrity. UI enhancements scheduled for later sprint.",
      proposedFix: "Integrate Recharts library with responsive chart components for dashboard and reports pages. Create pie charts for category breakdowns and line charts for monthly trends.",
      estimatedEffort: "1-2 weeks",
      priority: "high"
    },
    {
      severity: "low",
      title: "Mobile UI Not Fully Optimized",
      description: "Some tables overflow on mobile screens requiring horizontal scroll",
      impact: "Less optimal user experience on phones and small tablets",
      workaround: "Use desktop or tablet for best experience",
      status: "Will fix in v0.2.0",
      detailedExplanation: "While the application is responsive and works on mobile devices, certain pages (especially Reports with wide tables) require horizontal scrolling on small screens. The layout doesn't adapt to vertical stacking on narrow viewports.",
      technicalDetails: "Tailwind responsive classes used but some table structures have fixed widths. Grid layouts need mobile-specific breakpoints.",
      whyItHappens: "Desktop-first development approach. Mobile testing done but optimizations deferred to later sprint.",
      proposedFix: "Refactor table layouts to use vertical card-based design on mobile. Implement collapsible sections and mobile-specific navigation patterns.",
      estimatedEffort: "3-5 days",
      priority: "medium"
    },
    {
      severity: "medium",
      title: "Khums & Zakat Calculations Not Yet Implemented",
      description: "Islamic finance features advertised but not yet functional",
      impact: "Users expecting Islamic finance support must calculate manually",
      workaround: "Use external calculators for Khums and Zakat",
      status: "In Development - Planned for v0.3.0 (Q1 2026)",
      detailedExplanation: "This is a planned feature still under development. The database schema supports future implementation but calculation logic and UI not yet built.",
      technicalDetails: "Requires: (1) Nisab threshold configuration, (2) Hijri calendar integration, (3) Annual date tracking, (4) Asset value calculations, (5) Report generation for Islamic tax obligations.",
      whyItHappens: "Core finance tracking functionality prioritized first. Islamic features require research into calculation methodologies and community input.",
      proposedFix: "Implement Khums/Zakat models with calculation algorithms. Add UI for setting annual date and viewing obligations. Integrate hijri-date library for Islamic calendar.",
      estimatedEffort: "3-4 weeks",
      priority: "high"
    },
    {
      severity: "low",
      title: "No Multi-Currency Support",
      description: "All amounts stored without currency designation",
      impact: "Users with international transactions need manual currency conversion",
      workaround: "Convert to single currency before entry",
      status: "Planned for v0.4.0 (Q2 2026)",
      detailedExplanation: "Current schema uses FloatField for amounts without currency metadata. Adding multi-currency requires schema changes and exchange rate integration.",
      technicalDetails: "Need to add Currency model, foreign key in Income/Expense, exchange rate API integration, and currency conversion logic in reports.",
      whyItHappens: "Single-currency assumption simplified initial development. Multi-currency adds significant complexity.",
      proposedFix: "Add Currency model with exchange rates. Update Income/Expense models with currency FK. Integrate exchange rate API (like exchangerate-api.com). Add currency selection in transaction forms.",
      estimatedEffort: "2-3 weeks",
      priority: "medium"
    },
    {
      severity: "low",
      title: "Email Verification Tokens Stored in Memory",
      description: "Verification tokens don't persist across server restarts",
      impact: "Users must request new verification email if server restarts",
      workaround: "Complete verification quickly after receiving email",
      status: "Will fix in v0.2.0",
      detailedExplanation: "VerificationToken class stores tokens in a list (VERIFICATION_TOKENS global variable) that's cleared on server restart. Should be stored in database or Redis for persistence.",
      technicalDetails: "Current implementation uses Python list. Need to create VerificationToken database model with expiry timestamp or store in Redis with TTL.",
      whyItHappens: "Simplified implementation for MVP. Persistent storage adds database overhead.",
      proposedFix: "Create VerificationToken database model with token, user FK, reason, and expires_at fields. Cleanup expired tokens with Celery Beat task.",
      estimatedEffort: "4-6 hours",
      priority: "low"
    }
  ],

  // ============================================================
  // FUTURE ROADMAP
  // ============================================================
  
  futureEnhancements: [
    {
      version: "0.2.0",
      timeline: "Q1 2026",
      theme: "UI Enhancements & Data Visualization",
      features: [
        {
          name: "Visual Charts & Graphs",
          priority: "high",
          effort: "1-2 weeks",
          difficulty: "Medium",
          description: "Add pie charts, bar graphs, and line charts for financial data visualization",
          whyWeNeed: "Visual representations make financial patterns immediately obvious. Users can quickly identify top expense categories and track trends over time.",
          howToImplement: [
            "Integrate Recharts library for React-based charting",
            "Create reusable chart components (PieChart, BarChart, LineChart)",
            "Add chart options to dashboard and reports pages",
            "Implement data transformation utilities for chart formatting",
            "Add interactive tooltips and legends"
          ],
          benefits: [
            "Faster pattern recognition through visual data",
            "More engaging user experience",
            "Professional appearance matching modern finance apps",
            "Easier to share financial insights with family/advisors"
          ],
          impactOnProject: "Significantly improves user experience and makes FinCore competitive with commercial finance apps"
        },
        {
          name: "Advanced Filtering & Search",
          priority: "high",
          effort: "1 week",
          difficulty: "Easy",
          description: "Add date range filters, category filters, and amount range searches",
          whyWeNeed: "Users need to find specific transactions quickly without scrolling through long lists. Filtering enables targeted analysis of spending patterns.",
          howToImplement: [
            "Add filter form components with date pickers and dropdowns",
            "Update API endpoints to accept filter parameters",
            "Implement query filtering in Django ORM",
            "Add URL parameter persistence for sharable filtered views"
          ],
          benefits: [
            "Find transactions instantly without scrolling",
            "Analyze specific time periods (e.g., monthly spending)",
            "Filter by category for detailed category analysis",
            "Create custom views for different reporting needs"
          ],
          impactOnProject: "Essential feature for users with large transaction histories"
        },
        {
          name: "Mobile UI Optimization",
          priority: "medium",
          effort: "3-5 days",
          difficulty: "Easy",
          description: "Refactor layouts for better mobile experience with vertical stacking and touch-friendly controls",
          whyWeNeed: "Many users access finance apps on mobile devices. Current desktop-focused layout creates poor mobile experience.",
          howToImplement: [
            "Convert wide tables to vertical card layouts on mobile",
            "Implement collapsible sections for dense information",
            "Add mobile-specific navigation (bottom nav bar)",
            "Increase touch target sizes for buttons and links",
            "Test on multiple mobile devices and screen sizes"
          ],
          benefits: [
            "Native app-like experience on mobile browsers",
            "Easy transaction entry on-the-go",
            "No horizontal scrolling required",
            "Improved accessibility for touch screens"
          ],
          impactOnProject: "Expands user base to mobile-first users"
        }
      ]
    },
    {
      version: "0.3.0",
      timeline: "Q2 2026",
      theme: "Islamic Finance Integration",
      features: [
        {
          name: "Khums Calculations",
          priority: "high",
          effort: "2-3 weeks",
          difficulty: "Hard",
          description: "Automated calculation of Khums (one-fifth Islamic tax) based on income and assets",
          whyWeNeed: "Core differentiator for FinCore. Enables Muslims to fulfill religious financial obligations accurately without manual calculations.",
          howToImplement: [
            "Research Khums calculation methodologies (Shia jurisprudence)",
            "Create Khums model with annual date, nisab threshold, assets",
            "Implement calculation logic: (Income - Expenses - Debts) * 0.20",
            "Add Khums dashboard page with obligation breakdown",
            "Integrate Hijri calendar for Islamic date selection",
            "Add payment tracking for paid Khums"
          ],
          benefits: [
            "Automatic religious compliance without manual math",
            "Historical tracking of Khums payments",
            "Peace of mind for practicing Muslims",
            "Unique feature not available in other finance apps"
          ],
          impactOnProject: "Establishes FinCore as the go-to finance app for Muslim users worldwide"
        },
        {
          name: "Zakat Calculations",
          priority: "high",
          effort: "2 weeks",
          difficulty: "Hard",
          description: "Automated Zakat calculation based on assets, savings, and nisab threshold",
          whyWeNeed: "Another core Islamic finance feature. Helps users determine charitable giving obligations based on wealth.",
          howToImplement: [
            "Create Zakat model with annual date, nisab threshold (gold/silver)",
            "Implement calculation: (Savings + Assets - Debts) * 0.025 if above nisab",
            "Add asset tracking (gold, silver, cash, investments)",
            "Create Zakat dashboard with payment tracking",
            "Add notifications when Zakat becomes due"
          ],
          benefits: [
            "Accurate Zakat calculations following Islamic guidelines",
            "Reminders prevent missed Zakat obligations",
            "Track charity payments throughout the year",
            "Educational tool for understanding Zakat requirements"
          ],
          impactOnProject: "Completes Islamic finance feature set, making FinCore comprehensive for Muslim users"
        },
        {
          name: "Hijri Calendar Support",
          priority: "medium",
          effort: "1 week",
          difficulty: "Medium",
          description: "Add Islamic calendar display alongside Gregorian dates",
          whyWeNeed: "Islamic financial obligations follow Hijri calendar. Users need to see both calendar systems for religious accuracy.",
          howToImplement: [
            "Integrate hijri-date or moment-hijri library",
            "Add Hijri date display in transaction lists and forms",
            "Allow filtering by Hijri months/years",
            "Add Hijri year selector for Khums/Zakat annual dates",
            "Create date conversion utilities"
          ],
          benefits: [
            "Align financial tracking with Islamic calendar",
            "Easier to track annual Islamic obligations",
            "Culturally appropriate for Muslim users",
            "Unique feature enhancing Islamic finance capabilities"
          ],
          impactOnProject: "Strengthens Islamic finance positioning and user trust"
        }
      ]
    },
    {
      version: "0.4.0",
      timeline: "Q3 2026",
      theme: "Advanced Features & Scalability",
      features: [
        {
          name: "Multi-Currency Support",
          priority: "high",
          effort: "2-3 weeks",
          difficulty: "Hard",
          description: "Support multiple currencies with automatic conversion and exchange rate tracking",
          whyWeNeed: "Users with international income/expenses need multi-currency support. Essential for expatriates and business users.",
          howToImplement: [
            "Create Currency model with code, symbol, exchange rate",
            "Add currency FK to Income/Expense models",
            "Integrate exchange rate API (e.g., exchangerate-api.com)",
            "Add currency selection in transaction forms",
            "Implement conversion logic in reports (display in base currency)",
            "Add Celery task for daily exchange rate updates"
          ],
          benefits: [
            "Track international transactions accurately",
            "Automatic exchange rate conversion",
            "Support for expatriates and travelers",
            "Business users with multi-currency income"
          ],
          impactOnProject: "Expands market to international users and businesses"
        },
        {
          name: "Budget Planning Tools",
          priority: "medium",
          effort: "2 weeks",
          difficulty: "Medium",
          description: "Set monthly/yearly budgets per category with alerts when approaching limits",
          whyWeNeed: "Budgets help users control spending and achieve financial goals. Proactive alerts prevent overspending.",
          howToImplement: [
            "Create Budget model with category FK, amount, period (monthly/yearly)",
            "Add budget management page for creating/editing budgets",
            "Implement budget tracking in dashboard with progress bars",
            "Add Celery task to send budget alert emails (80%, 90%, 100%)",
            "Create budget vs. actual reports"
          ],
          benefits: [
            "Proactive spending control",
            "Visual progress toward financial goals",
            "Email alerts prevent overspending",
            "Historical budget performance tracking"
          ],
          impactOnProject: "Transforms FinCore from passive tracking to active financial planning"
        },
        {
          name: "Receipt Storage (MinIO)",
          priority: "low",
          effort: "1-2 weeks",
          difficulty: "Medium",
          description: "Upload and attach receipt images to transactions using MinIO object storage",
          whyWeNeed: "Receipt storage provides proof of transactions and simplifies expense tracking. Essential for business expense reports.",
          howToImplement: [
            "Add MinIO container to Docker Compose",
            "Install minio-py library for Python client",
            "Add receipt FileField to Income/Expense models",
            "Create upload endpoint with file validation",
            "Add receipt viewer in transaction detail pages",
            "Implement thumbnail generation for images"
          ],
          benefits: [
            "Proof of purchase for tax deductions",
            "Easy expense report generation",
            "Reduce paper clutter with digital receipts",
            "Quick reference for transaction details"
          ],
          impactOnProject: "Adds enterprise-level features appealing to business users"
        }
      ]
    }
  ],

  // Related projects with similar tech stack
  relatedProjects: [
    "Full-Stack Web Application Template"
  ]
};
