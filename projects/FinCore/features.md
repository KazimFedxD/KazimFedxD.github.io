# Features# Features



This document provides detailed descriptions of all implemented and planned features in FinCore.## Feature 1: JWT-Based Authentication with Email Verification



---### Description

FinCore implements a secure, production-ready authentication system using JSON Web Tokens (JWT) with automatic token refresh, cookie-based authentication, and email verification. The system ensures that only verified users can access their financial data while providing a seamless login experience.

## Feature 1: JWT-Based Authentication with Email Verification

### Why It Matters

### Description- **Security**: JWT tokens prevent unauthorized access to sensitive financial data

Secure user authentication system using JSON Web Tokens (JWT) with email verification for account activation. Users register with email and password, receive a verification code, and gain access to personalized financial data.- **User Experience**: Automatic token refresh eliminates annoying re-login prompts

- **Trust**: Email verification ensures account authenticity and enables password recovery

### Why It Matters- **Stateless Architecture**: JWTs enable horizontal scaling without session storage

- **Security**: JWT tokens provide stateless, secure authentication without server-side session storage

- **Privacy**: Each user's financial data is completely isolated and protected### How It Works

- **User Experience**: Email verification prevents spam accounts and ensures legitimate users1. User registers with email and password

- **Scalability**: Token-based auth scales horizontally without session management overhead2. System sends verification email with 6-digit code via Celery task

3. User verifies email to activate account

### How It Works4. Upon login, server issues:

   - Access token (5 minutes lifetime) - stored in cookie

1. **Registration**:   - Refresh token (7 days lifetime) - stored in secure cookie

   - User submits email and password5. Frontend automatically refreshes access token when expired

   - Backend creates `AuthAcc` record with hashed password6. Middleware validates tokens on every API request

   - Verification code generated and sent via email (Celery async task)

   - Account marked as unverified### Implementation



2. **Email Verification**:**Backend - JWT Configuration (settings.py)**:

   - User receives verification code in email```python

   - Submits code through verification endpointfrom datetime import timedelta

   - Backend validates code and marks account as verified

   - User can now log inSIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),

3. **Login**:    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

   - User submits credentials}

   - Backend validates password against hashed version

   - Issues two JWT tokens:REST_FRAMEWORK = {

     - **Access Token**: 5-minute lifespan for API requests    "DEFAULT_AUTHENTICATION_CLASSES": [

     - **Refresh Token**: 7-day lifespan for obtaining new access tokens        "usermanagement.middleware.CookieJWTAuthentication",

   - Tokens stored in HTTP-only cookies        "rest_framework_simplejwt.authentication.JWTAuthentication",

    ],

4. **Token Refresh**:}

   - When access token expires, frontend automatically uses refresh token```

   - New access token issued without re-login

   - Seamless user experience**Backend - Email Verification Token System**:

```python

5. **Logout**:class VerificationToken:

   - Tokens blacklisted in database    """Generate and validate 6-digit verification codes"""

   - Cookies cleared    

   - User session terminated    def generate_token(self, new: bool = False) -> str:

        # Generate random 6-character alphanumeric token

### Implementation        alpha_token = random.choices(string.ascii_uppercase, k=3)

        digit_token = random.choices(string.digits, k=3)

**Backend - JWT Configuration** (`backend/settings.py`):        token = alpha_token + digit_token

```python        random.shuffle(token)

from datetime import timedelta        

        self.token = "".join(token)

SIMPLE_JWT = {        self.timeout = 10  # 10 minutes validity

    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),        return self.token

    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),    

}    @staticmethod

    def check(user: AuthAcc, token: str, reason: str) -> bool:

REST_FRAMEWORK = {        # Validate token and reason (e.g., "verify_email")

    "DEFAULT_AUTHENTICATION_CLASSES": [        usertoken = VerificationToken.get_user(user)

        "usermanagement.middleware.CookieJWTAuthentication",        if usertoken and usertoken.token == token:

        "rest_framework_simplejwt.authentication.JWTAuthentication",            if usertoken.reason == reason:

    ],                usertoken.del_self()

}                return True

```        return False

```

**Backend - User Model** (`usermanagement/models.py`):

```python**Frontend - Authentication Context**:

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager```javascript

export const AuthProvider = ({ children }) => {

class AuthAccManager(BaseUserManager):  const [user, setUser] = useState(null);

    def create_user(self, email, password=None):  const [loading, setLoading] = useState(true);

        if not email:

            raise ValueError('Users must have an email address')  // Auto-refresh token before expiration

          useEffect(() => {

        user = self.model(email=self.normalize_email(email))    const refreshInterval = setInterval(async () => {

        user.set_password(password)      await refreshAccessToken();

        user.save(using=self._db)    }, 4 * 60 * 1000); // Refresh every 4 minutes

        return user

    return () => clearInterval(refreshInterval);

class AuthAcc(AbstractBaseUser):  }, []);

    email = models.EmailField(unique=True)

    verified = models.BooleanField(default=False)  const login = async (email, password) => {

    is_active = models.BooleanField(default=True)    const response = await apiPost('/auth/login/', { email, password });

        if (response.ok) {

    objects = AuthAccManager()      setUser(response.data.user);

    USERNAME_FIELD = 'email'      return { success: true };

```    }

    return { success: false, error: response.error };

**Frontend - Auth Context** (`contexts/AuthContext.js`):  };

```javascript

const AuthContext = createContext();  return (

    <AuthContext.Provider value={{ user, login, logout, loading }}>

export function AuthProvider({ children }) {      {children}

  const [user, setUser] = useState(null);    </AuthContext.Provider>

  const [loading, setLoading] = useState(true);  );

};

  useEffect(() => {```

    // Check if user is logged in on mount

    checkAuth();---

  }, []);

## Feature 2: Hierarchical Category System

  const login = async (email, password) => {

    const response = await apiClient.post('/auth/login/', { email, password });### Description

    if (response.ok) {FinCore's category system uses a flexible parent-child relationship model that allows users to organize their finances with both broad categories (Income/Expense) and specific subcategories (Salary, Freelance, Groceries, Utilities, etc.). Root categories are protected to maintain data integrity.

      setUser(response.data.user);

      return { success: true };### Why It Matters

    }- **Organization**: Nested categories provide granular tracking without complexity

    return { success: false, error: response.error };- **Flexibility**: Users can create custom categories matching their lifestyle

  };- **Data Integrity**: Root categories can't be deleted, preventing orphaned transactions

- **Reporting**: Enables category-wise breakdowns and aggregations

  const logout = async () => {

    await apiClient.post('/auth/logout/');### How It Works

    setUser(null);1. System creates two root categories on first run: "Income" and "Expense"

  };2. Users create subcategories under these roots (e.g., "Salary" under "Income")

3. Transactions link to subcategories, inheriting the parent type

  return (4. Reports aggregate by both parent and child categories

    <AuthContext.Provider value={{ user, login, logout, loading }}>5. Deletion protection prevents removing categories with transactions

      {children}

    </AuthContext.Provider>### Implementation

  );

}**Backend - Category Model**:

``````python

class Category(Model):

### Security Considerations    name = CharField(max_length=100, unique=True)

- Passwords hashed with Django's default PBKDF2 algorithm    description = TextField(blank=True, null=True)

- JWT tokens stored in HTTP-only cookies (not accessible via JavaScript)    

- CORS configured to allow only trusted frontend origin    # Self-referencing foreign key for hierarchy

- Short-lived access tokens minimize exposure if compromised    parent = ForeignKey(

- Token blacklisting prevents reuse of logged-out tokens        "self", 

        on_delete=CASCADE, 

---        blank=True, 

        null=True, 

## Feature 2: Hierarchical Category System        related_name="children"

    )

### Description    

Flexible category management system allowing users to create parent-child category relationships. Supports unlimited nesting depth and protects root categories from accidental deletion or misuse.    user = ForeignKey(AuthAcc, on_delete=CASCADE, related_name="categories")

    

### Why It Matters    # Root categories (Income/Expense) cannot be used directly

- **Organization**: Mirrors real-world financial structures (e.g., "Housing" → "Rent", "Utilities")    root = BooleanField(default=False)

- **Flexibility**: Users define their own financial taxonomy    

- **Clarity**: Hierarchical reports show spending at multiple levels of detail    def __str__(self) -> str:

- **Reusability**: Subcategories inherit parent context, reducing redundancy        return self.name

```

### How It Works

**Backend - Category API View**:

1. **Root Categories**:```python

   - Two protected root categories: "Income" and "Expense"class CategoryView(APIView):

   - Cannot be deleted or used directly in transactions    permission_classes = [IsAuthenticated]

   - Serve as top-level organizers

    def get(self, request: Request) -> Response:

2. **Creating Categories**:        categories = Category.objects.filter(

   - User specifies category name            user=request.user

   - Optionally selects a parent category        ).values(

   - Category inherits parent's type (income/expense)            'id', 'name', 'description', 

   - Stored with foreign key reference to parent            'parent', 'parent__name', 'root'

        )

3. **Category Hierarchy**:        return Response(list(categories))

   ```

   Income (root)    def post(self, request: Request) -> Response:

   ├── Salary        name = request.data.get('name')

   │   ├── Base Salary        parent_name = request.data.get('parent')

   │   └── Bonuses        

   ├── Freelance        parent = Category.objects.get(name=parent_name) if parent_name else None

   └── Investments        

           category = Category.objects.create(

   Expense (root)            name=name,

   ├── Living Costs            parent=parent,

   │   ├── Housing            user=request.user

   │   │   ├── Rent        )

   │   │   └── Utilities        return Response({'id': category.id, 'name': category.name})

   │   └── Food```

   └── Charitable Giving

   ```**Frontend - Category Management UI**:

```javascript

4. **Deleting Categories**:export default function CategoriesPage() {

   - Root categories protected (root=True)  const [categories, setCategories] = useState([]);

   - Child categories can be deleted  

   - Transactions with deleted categories set to NULL (via `on_delete=SET_NULL`)  // Group categories by parent for display

  const groupedCategories = categories.reduce((acc, cat) => {

### Implementation    const parentName = cat.parent__name || 'Root';

    if (!acc[parentName]) {

**Backend - Category Model** (`api/models.py`):      acc[parentName] = [];

```python    }

from django.db.models import *    acc[parentName].push(cat);

from usermanagement.models import AuthAcc    return acc;

  }, {});

class Category(Model):

    name = CharField(max_length=100, unique=True)  const handleDelete = async (categoryId, isRoot) => {

    description = TextField(blank=True, null=True)    if (isRoot) {

          alert('Cannot delete root categories');

    # Self-referencing foreign key for hierarchy      return;

    parent = ForeignKey(    }

        "self",     // Delete logic...

        on_delete=CASCADE,   };

        blank=True, 

        null=True,   return (

        related_name="children"    <div>

    )      {Object.entries(groupedCategories).map(([parent, cats]) => (

            <div key={parent}>

    # User ownership for data isolation          <h3>{parent}</h3>

    user = ForeignKey(          {cats.map(cat => (

        AuthAcc,             <CategoryCard 

        on_delete=CASCADE,               key={cat.id} 

        related_name="categories",               category={cat}

        null=True,               onDelete={() => handleDelete(cat.id, cat.root)}

        blank=True            />

    )          ))}

            </div>

    # Protected root categories      ))}

    root = BooleanField(default=False)    </div>

      );

    def __str__(self):}

        return self.name```

    

    class Meta:---

        verbose_name_plural = "Categories"

```## Feature 3: Real-Time Financial Dashboard



**Backend - Category API** (`api/views.py`):### Description

```pythonThe dashboard provides an at-a-glance view of the user's financial health with three key metrics (total income, total expenses, current balance) and visual category breakdowns showing where money comes from and where it goes.

class CategoryView(APIView):

    permission_classes = [IsAuthenticated]### Why It Matters

- **Instant Insights**: See financial status in seconds

    def get(self, request):- **Visual Learning**: Progress bars make patterns obvious

        categories = Category.objects.filter(- **Actionable Data**: Quickly identify top expense categories

            user=request.user- **Motivation**: Positive balance displayed in encouraging colors

        ).values(

            'id', 'name', 'description', 'parent', 'parent__name', 'root'### How It Works

        )1. Dashboard fetches data from `/api/report/` endpoint

        return Response(list(categories))2. Backend aggregates all user's income and expense transactions

3. Frontend calculates category breakdowns and percentages

    def post(self, request):4. Visual components render with color-coded cards and progress bars

        data = request.data5. Refresh button allows manual data reload

        name = data.get('name')

        parent_name = data.get('parent')### Implementation

        description = data.get('description', '')

        **Backend - Report API**:

        if not name:```python

            return Response({'error': 'Category name is required'}, status=400)@api_view(['GET'])

        @permission_classes([IsAuthenticated])

        parent = Nonedef get_report(request: Request) -> Response:

        if parent_name:    # Fetch all income with category names

            try:    income = Income.objects.filter(

                parent = Category.objects.get(name=parent_name, user=request.user)        user=request.user

            except Category.DoesNotExist:    ).values('amount', 'date', 'category__name')

                return Response({'error': 'Parent category not found'}, status=400)    income = sorted(income, key=lambda x: x['date'], reverse=True)

            

        category = Category.objects.create(    # Fetch all expenses with category names

            name=name,    expense = Expense.objects.filter(

            parent=parent,        user=request.user

            description=description,    ).values('amount', 'date', 'category__name')

            user=request.user    expense = sorted(expense, key=lambda x: x['date'], reverse=True)

        )    

        return Response({'id': category.id, 'name': category.name}, status=201)    # Calculate totals

        total_income = sum(item['amount'] for item in income)

    def delete(self, request):    total_expense = sum(item['amount'] for item in expense)

        category_id = request.data.get('id')    total_balance = total_income - total_expense

            

        try:    return Response({

            category = Category.objects.get(id=category_id, user=request.user)        'total_income': total_income,

                    'total_expense': total_expense,

            # Prevent deletion of root categories        'total_balance': total_balance,

            if category.root:        'income_details': list(income),

                return Response({'error': 'Cannot delete root category'}, status=400)        'expense_details': list(expense),

                })

            category.delete()```

            return Response({'status': 'Category deleted'}, status=200)

        except Category.DoesNotExist:**Frontend - Dashboard Component**:

            return Response({'error': 'Category not found'}, status=404)```javascript

```export default function DashboardPage() {

  const [reportData, setReportData] = useState(null);

**Frontend - Category Management** (`pages/CategoriesPage.js`):

```javascript  const getCategoryBreakdown = (details) => {

const [categories, setCategories] = useState([]);    const categoryMap = {};

const [parentCategories, setParentCategories] = useState([]);    details.forEach(item => {

      const category = item.category__name || 'Uncategorized';

const fetchCategories = async () => {      categoryMap[category] = (categoryMap[category] || 0) + item.amount;

  const response = await getCategories();    });

  if (response.ok) {    return Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

    setCategories(response.data);  };

    // Filter categories that can be parents (including root)

    setParentCategories(response.data);  const incomeBreakdown = getCategoryBreakdown(reportData.income_details);

  }  const expenseBreakdown = getCategoryBreakdown(reportData.expense_details);

};

  return (

const handleAddCategory = async (e) => {    <div className="dashboard">

  e.preventDefault();      {/* Summary Cards */}

  const response = await createCategory({      <div className="grid grid-cols-3 gap-6">

    name: newCategory.name,        <SummaryCard

    parent: newCategory.parent,          title="Total Income"

    description: newCategory.description          value={reportData.total_income}

  });          color="green"

            icon="↑"

  if (response.ok) {        />

    fetchCategories(); // Refresh list        <SummaryCard

    setNewCategory({ name: '', parent: '', description: '' });          title="Total Expenses"

  }          value={reportData.total_expense}

};          color="red"

```          icon="↓"

        />

### Database Schema        <SummaryCard

```sql          title="Balance"

CREATE TABLE category (          value={reportData.total_balance}

    id SERIAL PRIMARY KEY,          color={reportData.total_balance >= 0 ? 'blue' : 'orange'}

    name VARCHAR(100) UNIQUE NOT NULL,        />

    description TEXT,      </div>

    parent_id INTEGER REFERENCES category(id) ON DELETE CASCADE,

    user_id INTEGER REFERENCES authacc(id) ON DELETE CASCADE,      {/* Category Breakdowns */}

    root BOOLEAN DEFAULT FALSE      <CategoryBreakdown 

);        title="Income by Category"

        data={incomeBreakdown}

CREATE INDEX idx_category_parent ON category(parent_id);        total={reportData.total_income}

CREATE INDEX idx_category_user ON category(user_id);      />

```      <CategoryBreakdown 

        title="Expenses by Category"

---        data={expenseBreakdown}

        total={reportData.total_expense}

## Feature 3: Real-Time Financial Dashboard      />

    </div>

### Description  );

Interactive dashboard providing instant overview of financial health with total income, expenses, balance, and category-wise breakdowns with visual progress bars.}

```

### Why It Matters

- **Instant Insights**: See financial status at a glance---

- **Visual Clarity**: Color-coded cards and progress bars make data digestible

- **Motivation**: Visual representation encourages better financial habits## Feature 4: Income & Expense Tracking

- **Real-Time**: Data updates immediately when transactions are added/deleted

### Description

### How It WorksFull CRUD (Create, Read, Update, Delete) operations for managing income and expense transactions. Each transaction includes amount, date, category, and optional description. Data tables display all transactions with sorting by date, and forms auto-populate today's date for quick entry.



1. **Data Fetching**:### Why It Matters

   - Dashboard calls `/api/report/` endpoint on load- **Complete History**: Every financial transaction is recorded

   - Backend aggregates all user's income and expense transactions- **Context**: Descriptions help remember transaction details months later

   - Calculates totals, balances, and category breakdowns- **Categorization**: Links to category system for organized tracking

   - Returns structured JSON response- **User Experience**: Auto-date and validation reduce data entry errors



2. **Summary Cards**:### How It Works

   - **Total Income**: Green card with upward arrow1. User navigates to Incomes or Expenses page

   - **Total Expenses**: Red card with downward arrow2. Table displays all transactions sorted by date (newest first)

   - **Balance**: Blue (positive) or orange (negative) with amount3. "Add" form allows quick entry with date picker, category dropdown, and amount input

4. Validation ensures required fields and positive amounts

3. **Category Breakdowns**:5. Delete button with confirmation prevents accidental removal

   - Groups transactions by category6. Category dropdown filters to show only appropriate types (Income categories for income, Expense categories for expenses)

   - Calculates percentage of total for each category

   - Displays progress bars proportional to spending### Implementation

   - Shows both income and expense breakdowns

**Backend - Income Model**:

4. **Refresh Functionality**:```python

   - Button to manually refresh dataclass Income(Model):

   - Updates dashboard without page reload    amount = FloatField()

   - Shows loading state during fetch    description = TextField(blank=True, null=True)

    date = DateField()

### Implementation    category = ForeignKey(

        Category, 

**Backend - Report Endpoint** (`api/views.py`):        on_delete=SET_NULL, 

```python        null=True, 

@api_view(['GET'])        related_name="incomes"

@permission_classes([IsAuthenticated])    )

def get_report(request):    user = ForeignKey(AuthAcc, on_delete=CASCADE, related_name="incomes")

    # Fetch user's income and expenses

    income = Income.objects.filter(user=request.user).values(    def __str__(self) -> str:

        'amount', 'date', 'category__name'        return f"+{self.amount} on {self.date}"

    )```

    expense = Expense.objects.filter(user=request.user).values(

        'amount', 'date', 'category__name'**Backend - Income API View**:

    )```python

    class IncomeView(APIView):

    # Sort by date (most recent first)    permission_classes = [IsAuthenticated]

    income = sorted(income, key=lambda x: x['date'], reverse=True)

    expense = sorted(expense, key=lambda x: x['date'], reverse=True)    def get(self, request: Request) -> Response:

            incomes = Income.objects.filter(

    # Calculate totals            user=request.user

    total_income = sum(item['amount'] for item in income)        ).values('id', 'amount', 'date', 'category__name', 'description')

    total_expense = sum(item['amount'] for item in expense)        

    total_balance = total_income - total_expense        # Sort by date, newest first

            sorted_incomes = sorted(incomes, key=lambda x: x['date'], reverse=True)

    report = {        return Response(list(sorted_incomes))

        'total_income': total_income,

        'total_expense': total_expense,    def post(self, request: Request) -> Response:

        'total_balance': total_balance,        amount = request.data.get('amount')

        'income_details': list(income),        date = request.data.get('date')

        'expense_details': list(expense),        category_name = request.data.get('category')

    }        description = request.data.get('description', '')

    return Response(report)

```        # Validation

        if not all([amount, date, category_name]):

**Frontend - Dashboard Component** (`pages/DashboardPage.js`):            return Response({'error': 'Required fields missing'}, status=400)

```javascript

export default function DashboardPage() {        category = Category.objects.get(name=category_name)

  const [reportData, setReportData] = useState(null);        

  const [loading, setLoading] = useState(true);        income = Income.objects.create(

            amount=amount,

  const fetchReport = async () => {            date=date,

    setLoading(true);            category=category,

    const response = await getReport();            description=description,

                user=request.user

    if (response.ok) {        )

      setReportData(response.data);        return Response({'id': income.id}, status=201)

    }

    setLoading(false);    def delete(self, request: Request) -> Response:

  };        income_id = request.data.get('id')

        Income.objects.get(id=income_id, user=request.user).delete()

  useEffect(() => {        return Response({'status': 'deleted'})

    fetchReport();```

  }, []);

**Frontend - Income Page with Form**:

  const getCategoryBreakdown = (details) => {```javascript

    const categoryMap = {};export default function IncomesPage() {

    details.forEach(item => {  const [incomes, setIncomes] = useState([]);

      const category = item.category__name || 'Uncategorized';  const [formData, setFormData] = useState({

      if (!categoryMap[category]) {    amount: '',

        categoryMap[category] = 0;    date: new Date().toISOString().split('T')[0], // Auto today's date

      }    category: '',

      categoryMap[category] += item.amount;    description: ''

    });  });

    return Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  };  const handleSubmit = async (e) => {

    e.preventDefault();

  const incomeBreakdown = reportData     

    ? getCategoryBreakdown(reportData.income_details)     // Validation

    : [];    if (!formData.amount || !formData.category) {

  const expenseBreakdown = reportData       alert('Please fill required fields');

    ? getCategoryBreakdown(reportData.expense_details)       return;

    : [];    }



  return (    const response = await createIncome(formData);

    <div className="min-h-screen p-6">    if (response.ok) {

      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>      setFormData({ /* reset form */ });

            fetchIncomes(); // Refresh list

      {/* Summary Cards */}    }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">  };

        <SummaryCard 

          title="Total Income"   const handleDelete = async (incomeId) => {

          amount={reportData?.total_income}     if (!confirm('Delete this income?')) return;

          color="green"     

          icon="↑"    await deleteIncome(incomeId);

        />    fetchIncomes();

        <SummaryCard   };

          title="Total Expenses" 

          amount={reportData?.total_expense}   return (

          color="red"     <div>

          icon="↓"      {/* Add Form */}

        />      <form onSubmit={handleSubmit}>

        <SummaryCard         <Input

          title="Balance"           type="number"

          amount={reportData?.total_balance}           placeholder="Amount"

          color={reportData?.total_balance >= 0 ? 'blue' : 'orange'}           value={formData.amount}

          icon="="          onChange={(e) => setFormData({...formData, amount: e.target.value})}

        />          required

      </div>        />

              <Input

      {/* Category Breakdowns */}          type="date"

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">          value={formData.date}

        <CategoryBreakdown           onChange={(e) => setFormData({...formData, date: e.target.value})}

          title="Income by Category"           required

          data={incomeBreakdown}         />

          total={reportData?.total_income}        <select onChange={(e) => setFormData({...formData, category: e.target.value})}>

          color="green"          {incomeCategories.map(cat => (

        />            <option key={cat.name} value={cat.name}>{cat.name}</option>

        <CategoryBreakdown           ))}

          title="Expenses by Category"         </select>

          data={expenseBreakdown}         <Button type="submit">Add Income</Button>

          total={reportData?.total_expense}      </form>

          color="red"

        />      {/* Incomes Table */}

      </div>      <table>

    </div>        <thead>

  );          <tr>

}            <th>Date</th>

```            <th>Category</th>

            <th>Amount</th>

### UI Components            <th>Description</th>

            <th>Actions</th>

**Progress Bar Component**:          </tr>

```javascript        </thead>

function ProgressBar({ percentage, color }) {        <tbody>

  return (          {incomes.map(income => (

    <div className="w-full bg-gray-700 rounded-full h-2.5">            <tr key={income.id}>

      <div               <td>{income.date}</td>

        className={`h-2.5 rounded-full bg-${color}-500`}              <td>{income.category__name}</td>

        style={{ width: `${percentage}%` }}              <td className="text-green-500">${income.amount}</td>

      />              <td>{income.description}</td>

    </div>              <td>

  );                <button onClick={() => handleDelete(income.id)}>Delete</button>

}              </td>

```            </tr>

          ))}

---        </tbody>

      </table>

## Feature 4: Income & Expense Tracking with CRUD Operations    </div>

  );

### Description}

Complete transaction management system allowing users to create, read, update, and delete income and expense records with date, amount, category, and description fields.```



### Why It Matters---

- **Accuracy**: Track every financial transaction for complete visibility

- **Flexibility**: Add context with descriptions and custom dates## Feature 5: Comprehensive Financial Reporting

- **Organization**: Categorize transactions for meaningful reports

- **Control**: Easy to correct mistakes with edit/delete functionality### Description

The Reports page aggregates financial data to provide insights beyond raw transaction lists. It shows total income/expense/balance, category-wise breakdowns with transaction counts and averages, and recent transaction history.

### How It Works

### Why It Matters

1. **Adding Transactions**:- **Data Insights**: See which categories consume the most money

   - User fills out form (amount, date, category, description)- **Trends**: Identify spending patterns over time

   - Date defaults to today but can be changed- **Averages**: Understand typical transaction sizes per category

   - Category dropdown filtered by transaction type (income/expense)- **Decision Making**: Use data to adjust budgets and spending habits

   - Submit creates record in database

### How It Works

2. **Viewing Transactions**:1. Frontend requests data from `/api/report/`

   - Table displays all transactions sorted by date (newest first)2. Backend aggregates all user transactions by category

   - Shows: Date, Category, Amount, Description, Actions3. Frontend calculates:

   - Responsive design with horizontal scroll on mobile   - Total amounts per category

   - Number of transactions per category

3. **Deleting Transactions**:   - Average transaction amount per category

   - Delete button on each row   - Percentage of total for each category

   - Confirmation dialog prevents accidental deletion4. Visual progress bars show relative spending/income

   - Removes from database and refreshes table5. Recent transactions provide quick access to latest activity



4. **Data Validation**:### Implementation

   - Amount must be positive number

   - Date cannot be in future (optional validation)**Frontend - Reports Calculation**:

   - Category is required```javascript

   - User can only access their own transactionsexport default function ReportsPage() {

  const [reportData, setReportData] = useState(null);

### Implementation

  // Calculate category statistics

**Backend - Income Model** (`api/models.py`):  const getCategoryStats = (details, total) => {

```python    const categoryMap = {};

class Income(Model):    

    amount = FloatField()    details.forEach(item => {

    description = TextField(blank=True, null=True)      const category = item.category__name || 'Uncategorized';

    date = DateField()      if (!categoryMap[category]) {

    category = ForeignKey(        categoryMap[category] = { total: 0, count: 0, transactions: [] };

        Category,       }

        on_delete=SET_NULL,       categoryMap[category].total += item.amount;

        null=True,       categoryMap[category].count += 1;

        related_name="incomes"      categoryMap[category].transactions.push(item);

    )    });

    user = ForeignKey(

        AuthAcc,     // Calculate averages and percentages

        on_delete=CASCADE,     return Object.entries(categoryMap).map(([name, data]) => ({

        related_name="incomes"      category: name,

    )      total: data.total,

          count: data.count,

    def __str__(self):      average: data.total / data.count,

        return f"+{self.amount} on {self.date}"      percentage: (data.total / total) * 100

```    })).sort((a, b) => b.total - a.total);

  };

**Backend - Income API** (`api/views.py`):

```python  const incomeStats = getCategoryStats(

class IncomeView(APIView):    reportData.income_details, 

    permission_classes = [IsAuthenticated]    reportData.total_income

  );

    def get(self, request):  const expenseStats = getCategoryStats(

        incomes = Income.objects.filter(user=request.user).values(    reportData.expense_details, 

            'id', 'amount', 'date', 'category__name', 'description'    reportData.total_expense

        )  );

        sorted_incomes = sorted(incomes, key=lambda x: x['date'], reverse=True)

        return Response(list(sorted_incomes))  return (

    <div>

    def post(self, request):      {/* Summary Cards */}

        data = request.data      <SummaryCards data={reportData} />

        amount = data.get('amount')

        date = data.get('date')      {/* Income Breakdown */}

        category_name = data.get('category')      <section>

        description = data.get('description', '')        <h2>Income by Category</h2>

        {incomeStats.map(stat => (

        if not all([amount, date, category_name]):          <div key={stat.category}>

            return Response(            <h3>{stat.category}</h3>

                {'error': 'Amount, date, and category are required'},             <p>Total: ${stat.total.toFixed(2)}</p>

                status=400            <p>Count: {stat.count} transactions</p>

            )            <p>Average: ${stat.average.toFixed(2)}</p>

            <ProgressBar percentage={stat.percentage} color="green" />

        try:          </div>

            category = Category.objects.get(name=category_name, user=request.user)        ))}

        except Category.DoesNotExist:      </section>

            return Response({'error': 'Category does not exist'}, status=400)

      {/* Expense Breakdown */}

        income = Income.objects.create(      <section>

            amount=amount,        <h2>Expenses by Category</h2>

            date=date,        {expenseStats.map(stat => (

            category=category,          <div key={stat.category}>

            description=description,            <h3>{stat.category}</h3>

            user=request.user            <p>Total: ${stat.total.toFixed(2)}</p>

        )            <p>Count: {stat.count} transactions</p>

        return Response({'id': income.id, 'amount': income.amount}, status=201)            <p>Average: ${stat.average.toFixed(2)}</p>

            <ProgressBar percentage={stat.percentage} color="red" />

    def delete(self, request):          </div>

        income_id = request.data.get('id')        ))}

              </section>

        try:

            income = Income.objects.get(id=income_id, user=request.user)      {/* Recent Transactions */}

            income.delete()      <section>

            return Response({'status': 'Income deleted'}, status=200)        <h2>Recent Income (Last 5)</h2>

        except Income.DoesNotExist:        {reportData.income_details.slice(0, 5).map(item => (

            return Response({'error': 'Income not found'}, status=404)          <TransactionCard key={item.id} transaction={item} type="income" />

```        ))}

      </section>

**Frontend - Income Table** (`pages/IncomesPage.js`):    </div>

```javascript  );

function IncomesPage() {}

  const [incomes, setIncomes] = useState([]);```

  const [categories, setCategories] = useState([]);

---

  useEffect(() => {

    fetchIncomes();## Feature 6: Responsive Glassmorphic UI Design

    fetchCategories();

  }, []);### Description

FinCore features a modern, visually appealing interface using glassmorphism design principles with Tailwind CSS and Framer Motion animations. The design adapts seamlessly across devices while maintaining visual hierarchy and usability.

  const handleAddIncome = async (e) => {

    e.preventDefault();### Why It Matters

    const response = await createIncome({- **Professional Appearance**: Builds trust in financial application

      amount: formData.amount,- **User Experience**: Smooth animations guide user attention

      date: formData.date || new Date().toISOString().split('T')[0],- **Accessibility**: High contrast text on semi-transparent backgrounds

      category: formData.category,- **Modern Standards**: Follows current design trends

      description: formData.description

    });### How It Works

1. Background component creates animated gradient backdrop

    if (response.ok) {2. Cards use `backdrop-blur-lg` for glassmorphic effect

      fetchIncomes(); // Refresh list3. Framer Motion provides entrance/exit animations

      resetForm();4. Tailwind responsive classes adjust layouts for mobile/tablet/desktop

    }5. Color-coding provides instant visual feedback (green=income, red=expense)

  };

### Implementation

  const handleDelete = async (id) => {

    if (window.confirm('Delete this income?')) {**Background Component with Animation**:

      const response = await deleteIncome(id);```javascript

      if (response.ok) {import { motion } from 'framer-motion';

        fetchIncomes();

      }export default function Background() {

    }  return (

  };    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Gradient base */}

  return (      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900" />

    <div>      

      <h1>Income Tracking</h1>      {/* Animated orbs */}

            <motion.div

      {/* Add Income Form */}        className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"

      <form onSubmit={handleAddIncome}>        animate={{

        <input type="number" step="0.01" required />          x: [0, 100, 0],

        <input type="date" />          y: [0, -100, 0],

        <select required>        }}

          {categories        transition={{ duration: 20, repeat: Infinity }}

            .filter(c => c.parent__name === 'Income')      />

            .map(c => <option key={c.id}>{c.name}</option>)}      

        </select>      <motion.div

        <textarea placeholder="Description (optional)" />        className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"

        <button type="submit">Add Income</button>        animate={{

      </form>          x: [0, -100, 0],

                y: [0, 100, 0],

      {/* Income Table */}        }}

      <table>        transition={{ duration: 15, repeat: Infinity }}

        <thead>      />

          <tr>    </div>

            <th>Date</th>  );

            <th>Category</th>}

            <th>Amount</th>```

            <th>Description</th>

            <th>Actions</th>**Glassmorphic Card Component**:

          </tr>```javascript

        </thead>export function GlassCard({ children, className = '' }) {

        <tbody>  return (

          {incomes.map(income => (    <motion.div

            <tr key={income.id}>      initial={{ opacity: 0, y: 20 }}

              <td>{income.date}</td>      animate={{ opacity: 1, y: 0 }}

              <td>{income.category__name}</td>      className={`

              <td className="text-green-500">${income.amount}</td>        bg-white/10 backdrop-blur-lg 

              <td>{income.description}</td>        rounded-2xl p-6 

              <td>        border border-white/20 

                <button onClick={() => handleDelete(income.id)}>        shadow-xl

                  Delete        ${className}

                </button>      `}

              </td>    >

            </tr>      {children}

          ))}    </motion.div>

        </tbody>  );

      </table>}

    </div>```

  );

}**Responsive Dashboard Layout**:

``````javascript

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

**Expense implementation follows identical pattern with `Expense` model and `ExpenseView`.**  {/* Auto-adjusts to 1 column on mobile, 2 on tablet, 3 on desktop */}

  <GlassCard>

---    <h3 className="text-lg md:text-xl font-bold">Total Income</h3>

    <p className="text-2xl md:text-3xl text-green-400">

## Feature 5: Comprehensive Financial Reporting      ${totalIncome.toFixed(2)}

    </p>

### Description  </GlassCard>

Detailed financial reports showing total income, expenses, balance, category breakdowns with transaction counts and averages, plus recent transaction history.</div>

```

### Why It Matters
- **Insights**: Understand spending patterns and income sources
- **Planning**: Make informed financial decisions based on data
- **Accountability**: See exactly where money is going
- **Trends**: Identify categories that need budget adjustments

### How It Works

1. **Report Generation**:
   - Backend aggregates all user transactions
   - Groups by category and calculates statistics
   - Returns comprehensive JSON report

2. **Report Components**:
   - **Summary Cards**: Total income, expenses, balance
   - **Category Breakdown**: Amount, count, average per transaction
   - **Recent Transactions**: Last 5 incomes and expenses
   - **Visual Progress Bars**: Category distribution

3. **Statistics Calculated**:
   - Total amount per category
   - Number of transactions per category
   - Average transaction amount
   - Percentage of total spending/income

### Implementation

**Frontend - Reports Page** (`pages/ReportsPage.js`):
```javascript
function ReportsPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const getCategoryStats = (details, total) => {
    const stats = {};
    details.forEach(item => {
      const category = item.category__name || 'Uncategorized';
      if (!stats[category]) {
        stats[category] = { amount: 0, count: 0 };
      }
      stats[category].amount += item.amount;
      stats[category].count += 1;
    });

    return Object.entries(stats).map(([name, data]) => ({
      name,
      amount: data.amount,
      count: data.count,
      average: data.amount / data.count,
      percentage: (data.amount / total) * 100
    })).sort((a, b) => b.amount - a.amount);
  };

  const incomeStats = report 
    ? getCategoryStats(report.income_details, report.total_income) 
    : [];
  const expenseStats = report 
    ? getCategoryStats(report.expense_details, report.total_expense) 
    : [];

  return (
    <div>
      <h1>Financial Reports</h1>
      
      {/* Summary */}
      <div className="summary-cards">
        <Card title="Total Income" value={report?.total_income} />
        <Card title="Total Expenses" value={report?.total_expense} />
        <Card title="Net Balance" value={report?.total_balance} />
      </div>
      
      {/* Income Breakdown */}
      <section>
        <h2>Income by Category</h2>
        {incomeStats.map(stat => (
          <div key={stat.name} className="stat-row">
            <span>{stat.name}</span>
            <span>${stat.amount.toFixed(2)}</span>
            <span>{stat.count} transactions</span>
            <span>Avg: ${stat.average.toFixed(2)}</span>
            <ProgressBar percentage={stat.percentage} />
          </div>
        ))}
      </section>
      
      {/* Expense Breakdown */}
      <section>
        <h2>Expenses by Category</h2>
        {expenseStats.map(stat => (
          <div key={stat.name} className="stat-row">
            <span>{stat.name}</span>
            <span>${stat.amount.toFixed(2)}</span>
            <span>{stat.count} transactions</span>
            <span>Avg: ${stat.average.toFixed(2)}</span>
            <ProgressBar percentage={stat.percentage} />
          </div>
        ))}
      </section>
      
      {/* Recent Transactions */}
      <section>
        <h2>Recent Income</h2>
        {report?.income_details.slice(0, 5).map(income => (
          <div key={income.id}>
            {income.date} - {income.category__name} - ${income.amount}
          </div>
        ))}
      </section>
    </div>
  );
}
```

---

## Feature 6: Responsive Glassmorphic UI Design

### Description
Modern, visually stunning user interface using glassmorphism design principles with Tailwind CSS and Framer Motion animations. Fully responsive across desktop, tablet, and mobile devices.

### Why It Matters
- **User Engagement**: Beautiful design encourages regular use
- **Modern Aesthetic**: Glassmorphism is trending in 2024-2025
- **Accessibility**: High contrast, readable text on all backgrounds
- **Professional**: Polish that demonstrates attention to detail

### How It Works

1. **Glassmorphism Effect**:
   - Semi-transparent backgrounds with backdrop blur
   - Subtle borders using white opacity
   - Shadow effects for depth
   - Gradient backgrounds for visual interest

2. **Color Scheme**:
   - **Income/Positive**: Green (#10B981, #34D399)
   - **Expense/Negative**: Red (#EF4444, #F87171)
   - **Balance/Neutral**: Blue (#3B82F6) or Orange (#F59E0B)
   - **Categories**: Purple/Pink gradients

3. **Animations**:
   - Page transitions using Framer Motion
   - Button hover effects
   - Loading spinners
   - Smooth scroll behavior

4. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
   - Touch-friendly button sizes on mobile
   - Collapsible navigation menu

### Implementation

**Tailwind Configuration** (`tailwind.config.js`):
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          500: '#ec4899',
          900: '#831843',
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
```

**Glassmorphic Card Component**:
```javascript
function GlassCard({ children, className = '' }) {
  return (
    <div className={`
      bg-white/10 
      backdrop-blur-lg 
      rounded-2xl 
      p-6 
      border 
      border-white/20 
      shadow-xl
      ${className}
    `}>
      {children}
    </div>
  );
}
```

**Background Component** (`components/ui/Background.js`):
```javascript
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}
```

**Framer Motion Page Transition**:
```javascript
import { motion } from 'framer-motion';

function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page content */}
    </motion.div>
  );
}
```

**Responsive Table**:
```css
/* Mobile: Stack table data vertically */
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  tr {
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }
  
  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }
  
  td:before {
    position: absolute;
    left: 1rem;
    content: attr(data-label);
    font-weight: bold;
  }
}
```

---

## Planned Features (Future Roadmap)

See [future.md](future.md) for complete timeline and details.

### 🔜 Coming in v0.2.0 (Q1 2026)
- **Khums Calculation**: Automatic 20% calculation on eligible assets
- **Zakat Calculation**: 2.5% calculation with Hijri calendar support
- **Charts & Graphs**: Visual spending trends with Chart.js
- **Date Range Filtering**: Custom date range for reports

### 📅 Coming in v0.3.0 (Q2 2026)
- **Data Export**: Export to PDF, Excel, CSV
- **Receipt Upload**: MinIO integration for file storage
- **Budget Goals**: Set and track monthly budget targets
- **Email Notifications**: Transaction reminders and alerts

### 🚀 Coming in v1.0.0 (Q4 2026 - Q1 2027)
- **Mobile Apps**: React Native apps for iOS and Android
- **Multi-Currency**: Support for multiple currencies with conversion
- **Recurring Transactions**: Auto-create monthly bills
- **Bank Integration**: Import transactions from banks (region-specific)

---

**Total Features Implemented**: 6 major features  
**Total Features Planned**: 15+ additional features  
**Current Completion**: ~35% toward full vision

---

For technical architecture details, see [architecture.md](architecture.md).  
For installation instructions, see [setup.md](setup.md).  
For performance metrics, see [performance.md](performance.md).
