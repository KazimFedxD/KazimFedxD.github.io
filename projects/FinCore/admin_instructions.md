# Admin Instructions - Manual Tasks# Admin Instructions - Manual Tasks



This file contains tasks that **YOU** must complete manually to finalize the portfolio documentation. These cannot be automated and require running the application, taking screenshots, and creating media assets.This file contains detailed step-by-step instructions for tasks that need to be completed manually to finalize the project documentation for your portfolio website.



**Total Estimated Time**: 4-5 hours  ---

**Priority**: Complete screenshots first, then video, then diagrams

## 📸 Task 1: Capture Screenshots

---

### What to Create

## 📸 Task 1: Capture Screenshots (Priority: HIGH)High-quality screenshots of the FinCore application showing all key features and interfaces.



**Estimated Time**: 30-45 minutes  ### Where to Add

**When**: After adding sample data to the applicationAll screenshots go in `.website/screenshots/` folder.



### Step 1.1: Add Sample Data (15 minutes)### Required Screenshots



Before taking screenshots, you need realistic data in the application.#### 1.1 Homepage Screenshot

- **Filename**: `homepage.png`

**Actions**:- **Location**: `.website/screenshots/homepage.png`

1. Start the application:- **Content**: Landing page when not logged in

   ```bash- **Resolution**: 1920x1080 minimum

   docker-compose up -d- **Format**: PNG or JPEG

   ```

**Instructions**:

2. Open browser: `http://localhost:3000`1. Navigate to `http://localhost:3000` in your browser

2. Log out if currently logged in

3. Register a new account:3. Maximize browser window (1920x1080 or higher resolution)

   - Email: test@example.com4. Take full-page screenshot using:

   - Password: Test123456!   - **Chrome**: Press `Ctrl+Shift+I` (DevTools) → `Ctrl+Shift+P` → Type "screenshot" → Select "Capture full size screenshot"

   - **Firefox**: Press `Ctrl+Shift+S` → Click "Save full page"

4. Verify email (check backend logs for verification code):   - **Tool**: Use Flameshot (Linux), Snipping Tool (Windows), or Screenshot app (Mac)

   ```bash5. Save as `homepage.png` in `.website/screenshots/`

   docker logs fincore_backend6. (Optional) Compress image if > 1 MB: Use TinyPNG.com or `convert homepage.png -quality 85 homepage.png`

   # Look for verification code in logs

   ```---



5. Login with your account#### 1.2 Login Page Screenshot

- **Filename**: `login.png`

6. **Add Categories** (Categories Page):- **Location**: `.website/screenshots/login.png`

   ```- **Content**: Login form with glassmorphic design

   Income (root - already exists)

   ├── Salary**Instructions**:

   ├── Freelance1. Navigate to `http://localhost:3000` and click "Login" or go directly to login page

   └── Investments2. Take screenshot of the login form (email and password fields visible)

   3. Save as `login.png`

   Expense (root - already exists)

   ├── Housing---

   │   ├── Rent

   │   └── Utilities#### 1.3 Registration Page Screenshot

   ├── Food & Groceries- **Filename**: `register.png`

   ├── Transportation- **Location**: `.website/screenshots/register.png`

   └── Charitable Giving- **Content**: Registration form

       ├── Zakat

       └── Sadaqah**Instructions**:

   ```1. Click "Register" or "Don't have an account?" link

2. Screenshot the registration form

7. **Add Income Transactions** (15-20 transactions):3. Save as `register.png`

   - Salary: $3,500 (monthly)

   - Freelance: $500, $750, $1,200 (various dates)---

   - Investments: $150, $200 (dividends)

#### 1.4 Email Verification Screenshot

8. **Add Expense Transactions** (20-30 transactions):- **Filename**: `verify-email.png`

   - Rent: $1,200 (monthly)- **Location**: `.website/screenshots/verify-email.png`

   - Utilities: $150, $180 (various months)- **Content**: Verification code input page

   - Food: $80, $120, $95, $110 (multiple entries)

   - Transportation: $50, $45, $60 (gas/transit)**Instructions**:

   - Zakat: $1001. After registering, screenshot the email verification page

   - Sadaqah: $25, $502. Show the 6-digit code input field

3. Save as `verify-email.png`

### Step 1.2: Take Screenshots (30 minutes)

---

**Tools**: Use one of these screenshot tools:

- **Windows**: Snipping Tool, Greenshot, ShareX#### 1.5 Dashboard Screenshot ⭐ **MOST IMPORTANT**

- **macOS**: Cmd+Shift+4 (built-in), CleanShot X- **Filename**: `dashboard.png`

- **Linux**: Flameshot, Spectacle, GNOME Screenshot- **Location**: `.website/screenshots/dashboard.png`

- **Content**: Dashboard with real data populated

**Screenshot Settings**:- **Requirements**: 

- Resolution: 1920x1080 minimum (full HD)  - Show realistic financial data (not all $0.00)

- Format: PNG or JPEG  - Multiple categories with varying amounts

- Quality: High (no compression artifacts)  - Both income and expense categories populated

- Browser: Chrome or Firefox (maximized window)  - Balance should be realistic

- Remove browser UI: Press F11 for fullscreen mode

**Instructions**:

**Required Screenshots**:1. **FIRST**: Add sample data using the application:

   - Create categories:

#### Screenshot 1: Homepage     - Under "Income": Salary, Freelance, Investments

- **Filename**: `homepage.png`     - Under "Expense": Groceries, Rent, Utilities, Entertainment

- **Location**: `.website/screenshots/homepage.png`   - Add sample incomes:

- **URL**: `http://localhost:3000/`     - Salary: $5,000

- **What to show**: Landing page with hero section and features     - Freelance: $1,200

- **Before capturing**: Logout if logged in     - Investments: $300

- **Instructions**:   - Add sample expenses:

  1. Navigate to homepage     - Groceries: $450

  2. Ensure page is fully loaded     - Rent: $1,500

  3. Take fullpage screenshot (scroll to capture entire page)     - Utilities: $200

  4. Save as `homepage.png`     - Entertainment: $150



#### Screenshot 2: Login Page2. Navigate to Dashboard page

- **Filename**: `login.png`3. Wait for data to load completely

- **Location**: `.website/screenshots/login.png`4. Ensure all elements are visible (no loading spinners)

- **URL**: `http://localhost:3000/auth`5. Take full-page screenshot

- **What to show**: Clean login form6. Save as `dashboard.png`

- **Instructions**:

  1. Navigate to /auth page**This is the most important screenshot** - it showcases the main feature of your app!

  2. Ensure "Login" tab is active

  3. Capture form and background---

  4. Save as `login.png`

#### 1.6 Categories Page Screenshot

#### Screenshot 3: Register Page- **Filename**: `categories.png`

- **Filename**: `register.png`- **Location**: `.website/screenshots/categories.png`

- **Location**: `.website/screenshots/register.png`- **Content**: Category management interface

- **URL**: `http://localhost:3000/auth`

- **What to show**: Registration form**Instructions**:

- **Instructions**:1. Navigate to Categories page

  1. Navigate to /auth page2. Ensure categories are grouped by parent (Income/Expense)

  2. Click "Register" tab3. Show at least 4-6 categories

  3. Capture form4. Screenshot with "Add Category" form collapsed (cleaner view)

  4. Save as `register.png`5. Save as `categories.png`



#### Screenshot 4: Email Verification Page---

- **Filename**: `verify-email.png`

- **Location**: `.website/screenshots/verify-email.png`#### 1.7 Incomes Page Screenshot

- **URL**: `http://localhost:3000/verify`- **Filename**: `incomes.png`

- **What to show**: Verification code entry form- **Location**: `.website/screenshots/incomes.png`

- **Instructions**:- **Content**: Income table with transactions

  1. Navigate to /verify page (after registration)

  2. Don't enter code yet (show empty form)**Instructions**:

  3. Capture page1. Navigate to Incomes page

  4. Save as `verify-email.png`2. Ensure table has 5-10 income entries (add more if needed)

3. Show variety of dates, categories, and amounts

#### Screenshot 5: Dashboard (⭐ MOST IMPORTANT)4. Screenshot the full page (table + add form)

- **Filename**: `dashboard.png`5. Save as `incomes.png`

- **Location**: `.website/screenshots/dashboard.png`

- **URL**: `http://localhost:3000/dashboard`---

- **What to show**: 

  - Summary cards with realistic totals#### 1.8 Expenses Page Screenshot

  - Category breakdowns with progress bars- **Filename**: `expenses.png`

  - All data populated (from sample data added earlier)- **Location**: `.website/screenshots/expenses.png`

- **Instructions**:- **Content**: Expense table with transactions

  1. Login to application

  2. Navigate to dashboard**Instructions**:

  3. Ensure all data is visible1. Navigate to Expenses page

  4. Scroll to capture full page2. Ensure table has 5-10 expense entries

  5. Save as `dashboard.png`3. Screenshot full page

- **Quality Note**: This is the HERO screenshot for your portfolio—make it perfect!4. Save as `expenses.png`



#### Screenshot 6: Categories Page---

- **Filename**: `categories.png`

- **Location**: `.website/screenshots/categories.png`#### 1.9 Reports Page Screenshot

- **URL**: `http://localhost:3000/categories`- **Filename**: `reports.png`

- **What to show**: - **Location**: `.website/screenshots/reports.png`

  - Category list with hierarchy visible- **Content**: Detailed financial reports

  - Both Income and Expense categories

  - Add category form**Instructions**:

- **Instructions**:1. Navigate to Reports page

  1. Navigate to categories page2. Wait for all data to load

  2. Ensure all categories from Step 1.1 are visible3. Ensure category breakdowns are visible

  3. Capture page4. Take full-page screenshot (scroll to capture entire page if needed)

  4. Save as `categories.png`5. Save as `reports.png`



#### Screenshot 7: Incomes Page---

- **Filename**: `incomes.png`

- **Location**: `.website/screenshots/incomes.png`### Mobile Screenshots (Optional but Recommended)

- **URL**: `http://localhost:3000/incomes`

- **What to show**: #### 1.10 Mobile Dashboard

  - Income table with multiple entries- **Filename**: `mobile-dashboard.png`

  - Add income form- **Location**: `.website/screenshots/mobile-dashboard.png`

  - Recent transactions visible- **Content**: Dashboard on mobile view

- **Instructions**:

  1. Navigate to incomes page**Instructions**:

  2. Ensure at least 10+ income transactions visible1. Open Chrome DevTools (`F12` or `Ctrl+Shift+I`)

  3. Capture page2. Click "Toggle device toolbar" icon (phone/tablet icon) or press `Ctrl+Shift+M`

  4. Save as `incomes.png`3. Select device: "iPhone 12 Pro" or "Pixel 5"

4. Navigate to Dashboard

#### Screenshot 8: Expenses Page5. Take screenshot using DevTools screenshot feature

- **Filename**: `expenses.png`6. Save as `mobile-dashboard.png`

- **Location**: `.website/screenshots/expenses.png`

- **URL**: `http://localhost:3000/expenses`---

- **What to show**: 

  - Expense table with multiple entries## 🎬 Task 2: Create Demo Video

  - Add expense form

  - Variety of categories### What to Create

- **Instructions**:A 3-5 minute walkthrough video demonstrating FinCore's key features.

  1. Navigate to expenses page

  2. Ensure at least 15+ expense transactions visible### Where to Add

  3. Capture pageUpload to YouTube, then update `media.md` with the link.

  4. Save as `expenses.png`

### Instructions

#### Screenshot 9: Reports Page

- **Filename**: `reports.png`#### Step 1: Record the Demo

- **Location**: `.website/screenshots/reports.png`

- **URL**: `http://localhost:3000/reports`**Recommended Tool**: OBS Studio (free, cross-platform)

- **What to show**: 

  - Financial summary cards1. **Download OBS Studio**: https://obsproject.com/download

  - Category breakdowns2. **Set up OBS**:

  - Recent transactions   - Resolution: 1920x1080

- **Instructions**:   - FPS: 30

  1. Navigate to reports page   - Bitrate: 2500 kbps

  2. Scroll to show all sections3. **Add Sources**:

  3. Capture fullpage screenshot   - Add "Display Capture" or "Window Capture" (browser window)

  4. Save as `reports.png`   - Add "Audio Input Capture" (microphone for narration)

4. **Prepare Script**:

### Optional Screenshots (Bonus)   ```

   [0:00-0:30] Introduction

#### Mobile Screenshots   - "Hi, I'm [Your Name], and today I'm showing FinCore"

- **Filename**: `mobile-dashboard.png`, `mobile-expenses.png`   - "A personal finance management system with Islamic finance integration"

- **Location**: `.website/screenshots/`   

- **How to capture**:   [0:30-1:00] Authentication

  1. Open Chrome DevTools (F12)   - Show registration process

  2. Click device toolbar icon (Ctrl+Shift+M)   - Email verification

  3. Select "iPhone 12 Pro" or "Samsung Galaxy S20"   - Login

  4. Navigate to page   

  5. Take screenshot (right-click > "Capture screenshot")   [1:00-2:00] Dashboard

  6. Save with `mobile-` prefix   - Overview of financial summary

   - Explain income, expenses, balance

---   - Show category breakdowns

   

## 🎬 Task 2: Create Demo Video (Priority: MEDIUM)   [2:00-3:00] Features

   - Add a new income

**Estimated Time**: 1-2 hours     - Add a new expense

**When**: After screenshots are complete   - Create a category

   

### Tools   [3:00-4:00] Reports

   - Navigate to Reports page

**Screen Recording**:   - Explain analytics

- **Windows**: OBS Studio (free), Camtasia (paid), Xbox Game Bar (built-in)   - Show export capabilities (future)

- **macOS**: QuickTime (built-in), ScreenFlow (paid)   

- **Linux**: OBS Studio (free), SimpleScreenRecorder   [4:00-4:30] Tech Stack

- **Online**: Loom (free tier)   - Mention Django, React, PostgreSQL

   - Show Docker Compose setup

**Recommended**: OBS Studio (free, cross-platform, professional quality)   

   [4:30-5:00] Outro

### Video Specifications   - GitHub link

- **Resolution**: 1920x1080 (Full HD)   - "Star the repo if you find it useful"

- **Frame Rate**: 30fps minimum   - "Contributions welcome"

- **Duration**: 3-5 minutes (keep it concise!)   ```

- **Format**: MP4 (H.264 codec)

- **Audio**: Optional narration (recommended)5. **Record**: 

   - Press "Start Recording" in OBS

### Video Script (5-Minute Version)   - Follow script

   - Speak clearly and at moderate pace

```   - Don't worry about mistakes - you can edit later

[0:00-0:15] Introduction

- "Hi, I'm [Your Name], and this is FinCore—a personal finance management system with Islamic finance integration."6. **Save**: OBS saves to `Videos/` folder by default

- Show homepage briefly

---

[0:15-0:30] Authentication

- "Let's start by logging in"#### Step 2: Edit the Video (Optional)

- Demonstrate login process

- Show email verification (if applicable)**Tools**:

- **Simple**: OpenShot (free, cross-platform)

[0:30-1:30] Dashboard Overview- **Advanced**: DaVinci Resolve (free, professional)

- "The dashboard gives you an instant overview of your financial health"

- Highlight total income, expenses, and balance cards**Edits**:

- Show category breakdowns- Trim mistakes

- Point out real-time refresh button- Add title slide at beginning: "FinCore - Personal Finance Management"

- Add transitions between sections

[1:30-2:00] Category Management- Add text overlays for important points

- "Categories are hierarchical, so you can organize finances however you like"- Add outro with GitHub link

- Show adding a new category with parent selection

- Demonstrate category deletion---



[2:00-3:00] Adding Transactions#### Step 3: Upload to YouTube

- "Adding transactions is simple"

- Add a new income (show form filling)1. Go to https://youtube.com

- Add a new expense2. Click "Create" → "Upload video"

- Show how transactions appear immediately3. Select your video file

4. **Title**: "FinCore - Personal Finance & Islamic Wealth Management System Demo"

[3:00-4:00] Reports5. **Description**:

- "The reports page gives detailed insights"   ```

- Show category breakdowns   FinCore is an open-source personal finance management application built with Django, React, PostgreSQL, and Docker.

- Highlight recent transactions   

- Point out statistics (count, average)   Features:

   - Income and expense tracking

[4:00-4:30] Future Features   - Hierarchical category system

- "FinCore is in active development with exciting features coming"   - Real-time financial dashboard

- Mention Khums/Zakat calculations   - Comprehensive reports

- Mention mobile apps   - Islamic finance support (Khums & Zakat - coming soon)

- Mention data export   

   Tech Stack:

[4:30-5:00] Closing   - Backend: Django 5.2 + Django REST Framework

- "This is just the beginning. Check out the GitHub repository to learn more or contribute!"   - Frontend: React 19 + Tailwind CSS

- Show GitHub link   - Database: PostgreSQL 16

- Thank viewers   - Cache: Redis 7

```   - Containerization: Docker Compose

   

### Recording Steps   GitHub: https://github.com/KazimFedxD/FinCore

   

1. **Prepare Environment**:   Built on: https://github.com/KazimFedxD/FullStack-Template

   - Close unnecessary browser tabs   

   - Hide bookmarks bar (Ctrl+Shift+B)   Timestamps:

   - Disable notifications (Do Not Disturb mode)   0:00 Introduction

   - Prepare sample data (from Task 1)   0:30 Authentication Flow

   1:00 Dashboard Overview

2. **Setup OBS Studio** (if using):   2:00 Feature Demonstrations

   - Add "Display Capture" source   3:00 Reports & Analytics

   - Set resolution to 1920x1080   4:00 Technical Stack

   - Configure audio (microphone if narrating)   4:30 Conclusion

   - Test recording quality   

   #Django #React #PostgreSQL #FinancialApp #OpenSource #IslamicFinance

3. **Record**:   ```

   - Start recording6. **Tags**: Django, React, PostgreSQL, Docker, Finance, Islamic Finance, Open Source

   - Follow script7. **Visibility**: "Public" or "Unlisted" (your choice)

   - Speak clearly and at moderate pace8. **Thumbnail**: Create custom thumbnail with FinCore logo + "Demo" text (use Canva.com)

   - Take your time—don't rush!9. Click "Publish"

   - If you make a mistake, pause and restart that section

---

4. **Edit** (Optional):

   - Trim beginning/end#### Step 4: Update Documentation

   - Cut out mistakes or long pauses

   - Add intro/outro slides (optional)1. Copy the YouTube URL (e.g., `https://youtube.com/watch?v=xxxxx`)

   - Add background music (royalty-free)2. Open `.website/media.md` in a text editor

3. Find the line:

5. **Export**:   ```markdown

   - Format: MP4   - **YouTube**: [Project Demo](placeholder - to be added)

   - Quality: High (at least 5 Mbps bitrate)   ```

   - Check file size (aim for < 50MB)4. Replace with:

   ```markdown

6. **Upload to YouTube**:   - **YouTube**: [Project Demo](https://youtube.com/watch?v=YOUR_VIDEO_ID)

   - Go to YouTube Studio   ```

   - Upload video5. Save the file

   - Title: "FinCore - Personal Finance & Islamic Wealth Management Demo"

   - Description: Copy from `.website/overview.md`---

   - Tags: "personal finance", "Islamic finance", "Zakat", "Khums", "budget tracker", "Django", "React"

   - Visibility: Public or Unlisted (your choice)## 🎨 Task 3: Create Feature GIFs

   - Get shareable link

### What to Create

7. **Update Documentation**:Short GIF animations (5-10 seconds) showing key features in action.

   - Open `.website/media.md`

   - Find line: `- **YouTube**: [Project Demo](placeholder)`### Where to Add

   - Replace `placeholder` with your YouTube URL`.website/screenshots/` folder, referenced in `media.md`.

   - Example: `- **YouTube**: [Project Demo](https://youtube.com/watch?v=xxxxx)`

### Tool Recommendation

---- **Linux**: ScreenToGif (via Wine) or Peek

- **Windows**: ScreenToGif (https://www.screentogif.com/)

## 🎨 Task 3: Create Feature GIFs (Priority: LOW)- **Mac**: Gifski or LICEcap



**Estimated Time**: 30 minutes  ---

**When**: After screenshots complete (optional enhancement)

### Required GIFs

### Tools

- **Windows**: ScreenToGif (free, excellent)#### 3.1 Dashboard Refresh

- **macOS**: Gifski (free), Kap (free)- **Filename**: `dashboard-demo.gif`

- **Linux**: Peek (free)- **Location**: `.website/screenshots/dashboard-demo.gif`

- **Duration**: 5-8 seconds

### GIF Specifications- **Content**: Click refresh button → loading spinner → data updates

- **Resolution**: 1280x720 (smaller than screenshots for file size)

- **Frame Rate**: 15-20fps**Instructions**:

- **Duration**: 5-10 seconds each1. Open ScreenToGif

- **Max File Size**: 5MB per GIF2. Click "Recorder"

- **Format**: Optimized GIF3. Position recording window over Dashboard page

4. Click "Record"

### Required GIFs5. Perform action: Click "Refresh" button

6. Wait for data to reload

#### GIF 1: Dashboard Refresh7. Stop recording

- **Filename**: `dashboard-refresh.gif`8. In editor: Delete unnecessary frames, optimize

- **Location**: `.website/screenshots/dashboard-refresh.gif`9. File → Save as → `dashboard-demo.gif`

- **What to show**: 10. Keep file size < 5 MB (reduce FPS or resolution if needed)

  1. Dashboard with data visible

  2. Click "Refresh" button---

  3. Loading spinner appears

  4. Data reloads#### 3.2 Adding a Transaction

- **Duration**: 5 seconds- **Filename**: `add-transaction.gif`

- **Loop**: Yes- **Location**: `.website/screenshots/add-transaction.gif`

- **Content**: Fill form → submit → success message → table updates

**Recording Steps**:

1. Open ScreenToGif/Peek**Instructions**:

2. Set recording area to dashboard section1. Navigate to Incomes or Expenses page

3. Start recording2. Start recording

4. Wait 1 second3. Click "Add Income" button

5. Click refresh button4. Fill in form (amount, date, category)

6. Wait for data to reload5. Click "Submit"

7. Wait 1 second6. Show success message

8. Stop recording7. Show new entry appearing in table

9. Remove unnecessary frames8. Stop recording

10. Optimize and export9. Save as `add-transaction.gif`

11. Save as `dashboard-refresh.gif`

---

#### GIF 2: Add Transaction

- **Filename**: `add-transaction.gif`#### 3.3 Category Management (Optional)

- **Location**: `.website/screenshots/add-transaction.gif`- **Filename**: `category-management.gif`

- **What to show**: - **Content**: Create new category → appears in list

  1. Income/Expense page with form visible

  2. Fill out form fields (sped up)---

  3. Click "Add Income"/"Add Expense"

  4. Transaction appears in table## 📊 Task 4: Create Architecture Diagrams

- **Duration**: 8-10 seconds

- **Loop**: Yes### What to Create

Visual diagrams explaining system architecture.

**Recording Steps**:

1. Navigate to incomes page### Where to Add

2. Start recording`.website/screenshots/` folder.

3. Fill out form (amount, date, category, description)

4. Click submit---

5. Wait for transaction to appear in table

6. Highlight new row (optional: cursor movement)### 4.1 System Architecture Diagram

7. Stop recording

8. Export as `add-transaction.gif`**Recommended Tool**: draw.io (https://app.diagrams.net/)



#### GIF 3: Category Management (Optional)**Instructions**:

- **Filename**: `category-management.gif`1. Go to https://app.diagrams.net/

- **Location**: `.website/screenshots/category-management.gif`2. Create new blank diagram

- **What to show**: 3. Add shapes:

  1. Categories page   - **Rectangle**: User Browser

  2. Add new category with parent selection   - **Rectangle**: Nginx Reverse Proxy

  3. Category appears in list   - **Rectangle**: React Frontend:3000

- **Duration**: 8 seconds   - **Rectangle**: Django Backend:8000

   - **Rectangle**: PostgreSQL:5432

### Optimization Tips   - **Rectangle**: Redis:6379

- Use tools like ezgif.com to compress GIFs further   - **Rectangle**: Celery Workers

- Reduce color palette if needed (256 colors often sufficient)4. Connect with arrows showing data flow

- Remove duplicate frames5. Add labels on arrows (HTTPS, HTTP, SQL queries, etc.)

- Aim for < 5MB file size6. Style:

   - Use consistent colors (blue for services, green for databases)

---   - Add icons if available

7. Export:

## 📊 Task 4: Create Architecture Diagrams (Priority: MEDIUM)   - File → Export as → PNG

   - Resolution: 300 DPI

**Estimated Time**: 30-45 minutes     - Save as `.website/screenshots/architecture-diagram.png`

**When**: Anytime (can be done independently)

**Alternative**: Use the Mermaid code already provided in `architecture.md` (many markdown viewers render this automatically).

### Tools

- **draw.io** (free, recommended): https://app.diagrams.net/---

- **Lucidchart** (free tier available): https://www.lucidchart.com/

- **dbdiagram.io** (database schemas): https://dbdiagram.io/### 4.2 Database Schema Diagram (Optional)

- **Mermaid** (text-based, can embed in markdown)

**Tool**: dbdiagram.io

### Diagram 1: System Architecture

**Instructions**:

**What to Create**: High-level architecture showing all 6 Docker containers and their relationships.1. Go to https://dbdiagram.io/

2. Enter schema:

**Components to Include**:   ```

- Client Browser   Table AuthAcc {

- Nginx (reverse proxy)     id integer [primary key]

- React Frontend     email varchar [unique]

- Django Backend     password varchar

- PostgreSQL Database     verified boolean

- Redis Cache   }

- Celery Worker   

- Celery Beat   Table Category {

     id integer [primary key]

**Connections to Show**:     name varchar [unique]

- HTTP requests from browser to Nginx     description text

- Nginx routing to frontend/backend     parent_id integer

- Backend to database (ORM)     user_id integer

- Backend to Redis (cache/broker)     root boolean

- Celery worker reading from Redis   }

- Celery Beat scheduling tasks   

   Table Income {

**Instructions**:     id integer [primary key]

1. Go to https://app.diagrams.net/     amount float

2. Create new diagram     date date

3. Add shapes for each component     description text

4. Use arrows to show data flow     category_id integer

5. Add labels ("HTTP", "WebSocket", "Message Queue", etc.)     user_id integer

6. Export as PNG: File > Export as > PNG   }

7. Save as `.website/screenshots/architecture-diagram.png`   

   Table Expense {

**OR Use Mermaid** (text-based):     id integer [primary key]

```markdown     amount float

# In architecture.md, add this:     date date

     description text

```mermaid     category_id integer

graph TD     user_id integer

    A[Client Browser] -->|HTTP/HTTPS| B[Nginx]   }

    B -->|/api/*| C[Django Backend]   

    B -->|/*| D[React Frontend]   Ref: Category.parent_id > Category.id

    C -->|ORM| E[PostgreSQL]   Ref: Category.user_id > AuthAcc.id

    C -->|Tasks| F[Redis]   Ref: Income.category_id > Category.id

    F -->|Messages| G[Celery Worker]   Ref: Income.user_id > AuthAcc.id

    H[Celery Beat] -->|Schedule| F   Ref: Expense.category_id > Category.id

```   Ref: Expense.user_id > AuthAcc.id

```   ```

3. Export as PNG: `.website/screenshots/database-schema.png`

### Diagram 2: Database Schema

---

**What to Create**: Entity-relationship diagram showing tables and relationships.

## 🔐 Task 5: Verify Sensitive Information Removal

**Tables to Include**:

- `authacc` (users)### What to Check

- `category`Ensure no API keys, passwords, or personal data in any generated files.

- `income`

- `expense`### Where to Check

- All files in `.website/config-samples/`

**Relationships to Show**:- Code snippets in `features.md` and `architecture.md`

- category.parent_id → category.id (self-referencing)- Environment variable examples in `environment-variables.md`

- category.user_id → authacc.id

- income.user_id → authacc.id---

- income.category_id → category.id

- expense.user_id → authacc.id### Instructions

- expense.category_id → category.id

#### 5.1 Review Config Samples

**Instructions**:

1. Go to https://dbdiagram.io/Files to check:

2. Use this schema code:- `.website/config-samples/docker-compose.yml`

   ```- `.website/config-samples/package.json`

   Table authacc {- `.website/config-samples/requirements.txt`

     id integer [primary key]- Any other config files

     email varchar

     password varchar**Search for**:

     verified boolean1. Open each file

   }2. Search (`Ctrl+F`) for:

   - `password`

   Table category {   - `secret`

     id integer [primary key]   - `key`

     name varchar   - `token`

     description text   - `@` (email addresses)

     parent_id integer   - Long alphanumeric strings (potential API keys)

     user_id integer   - Your real name or personal info

     root boolean

   }**Replace with placeholders**:

- Passwords: `your-password-here` or `CHANGE_ME`

   Table income {- API keys: `YOUR_API_KEY_HERE` or `sk_xxxxx`

     id integer [primary key]- Email: `user@example.com`

     amount float- Database URLs: `postgresql://user:password@localhost:5432/dbname`

     date date

     description text**Example**:

     category_id integer```yaml

     user_id integer# BEFORE (SENSITIVE)

   }environment:

  DATABASE_URL: postgres://admin:MyR3alP@ssw0rd@db:5432/fincore_db

   Table expense {  SECRET_KEY: 4k3a4kybqv4ig34&y6#rvv-m

     id integer [primary key]

     amount float# AFTER (SAFE)

     date dateenvironment:

     description text  DATABASE_URL: postgres://fincore_user:YOUR_PASSWORD_HERE@db:5432/fincore_db

     category_id integer  SECRET_KEY: YOUR_SECRET_KEY_HERE

     user_id integer```

   }

---

   Ref: category.parent_id > category.id

   Ref: category.user_id > authacc.id#### 5.2 Review Code Snippets

   Ref: income.category_id > category.id

   Ref: income.user_id > authacc.idFiles to check:

   Ref: expense.category_id > category.id- `.website/features.md`

   Ref: expense.user_id > authacc.id- `.website/architecture.md`

   ```- `.website/setup.md`

3. Export as PNG

4. Save as `.website/screenshots/database-schema.png`**Ensure**:

- No real email addresses in examples

---- No production URLs (use example.com or localhost)

- No actual SECRET_KEY values

## 🔐 Task 5: Verify Sensitive Information Removal (Priority: HIGH)- Sample data is generic (not your personal finances!)



**Estimated Time**: 20 minutes  ---

**When**: Before publishing documentation

#### 5.3 Review Environment Variables

### What to Check

File: `.website/environment-variables.md`

Go through **every file** in `.website/` folder and verify:

**Check**:

#### 1. Check Config Samples- All example values are placeholders

- No real passwords

Open each file in `.website/config-samples/`:- Gmail example uses generic email



**Files to Review**:---

- `docker-compose.yml`

- `.env.example`## 📝 Task 6: Update README and LICENSE

- `package.json` (usually safe)

- `requirements.txt` (usually safe)### 6.1 Copy README.md



**Search For** (use Ctrl+F):**Instructions**:

- `password` → Should be "YOUR_PASSWORD_HERE" or similar placeholder1. The main `README.md` file is already comprehensive

- API keys (patterns like `sk_`, `pk_`, long alphanumeric strings)2. No action needed - it's already referenced in documentation

- Email addresses (should be example.com or placeholders)

- Real domains (replace with example.com if needed)---

- Database connection strings with real credentials

### 6.2 Copy LICENSE (Already Done)

**Example - docker-compose.yml**:

```yaml**Status**: ✅ MIT License file exists

# ❌ BAD (real password)

POSTGRES_PASSWORD: myRealPassword123---



# ✅ GOOD (placeholder)## 📦 Task 7: Create Config Samples

POSTGRES_PASSWORD: YOUR_PASSWORD_HERE

```### What to Do

Copy configuration files to `.website/config-samples/` with sensitive data removed.

#### 2. Check Code Snippets

### Files to Copy

Open `.website/features.md` and `.website/architecture.md`:

#### 7.1 docker-compose.yml

**Search for**:**Instructions**:

- Hardcoded API keys in code examples1. Copy `/mnt/Win/Projects/Python/FinCore/docker-compose.yml`

- Real email addresses2. Open in text editor

- Production URLs3. Replace passwords:

- Actual database credentials   ```yaml

   # Change this:

**Example**:   POSTGRES_PASSWORD: fincore_password

```python   

# ❌ BAD   # To this:

API_KEY = "sk_live_12345abcdef67890"   POSTGRES_PASSWORD: YOUR_PASSWORD_HERE

   ```

# ✅ GOOD4. Save as `.website/config-samples/docker-compose.yml`

API_KEY = os.getenv('GROQ_API_KEY')  # From environment variable

```---



#### 3. Check Environment Variables#### 7.2 package.json

**Instructions**:

Open `.website/environment-variables.md`:1. Copy `frontend/package.json`

2. No sensitive data - can copy as-is

**Verify**:3. Save as `.website/config-samples/package.json`

- All example values are placeholders

- No real API keys---

- Generic email addresses (noreply@example.com)

- Placeholder database URLs#### 7.3 requirements.txt

**Instructions**:

---1. Copy `backend/requirements.txt`

2. No sensitive data - can copy as-is

## ✅ Task 6: Final Review Checklist (Priority: HIGH)3. Save as `.website/config-samples/requirements.txt`



**Estimated Time**: 30 minutes  ---

**When**: Before publishing to portfolio

#### 7.4 Create .env.example

### Documentation Checklist**Instructions**:

1. Create new file: `.website/config-samples/.env.example`

- [ ] All markdown files readable and well-formatted2. Add content:

- [ ] No broken internal links (test all `[links](file.md)`)   ```bash

- [ ] Code snippets have correct syntax highlighting   # Database

- [ ] No typos or grammar issues (use Grammarly or spell checker)   DATABASE_URL=postgresql://user:password@localhost:5432/fincore_db

- [ ] Metadata.json has accurate information   

   # Django

### Media Checklist   SECRET_KEY=your-secret-key-here-change-in-production

   DEBUG=True

- [ ] **9 screenshots captured** and saved in `.website/screenshots/`   ALLOWED_HOSTS=*

  - [ ] homepage.png   

  - [ ] login.png   # Celery

  - [ ] register.png   CELERY_BROKER_URL=redis://localhost:6379/0

  - [ ] verify-email.png   

  - [ ] dashboard.png ⭐ **MOST IMPORTANT**   # Email (optional)

  - [ ] categories.png   EMAIL_HOST=smtp.gmail.com

  - [ ] incomes.png   EMAIL_PORT=587

  - [ ] expenses.png   EMAIL_USE_TLS=True

  - [ ] reports.png   EMAIL_HOST_USER=your-email@gmail.com

- [ ] Screenshots are high quality (1920x1080+, clear text)   EMAIL_HOST_PASSWORD=your-app-password

- [ ] **Demo video uploaded** to YouTube   

- [ ] Video link updated in `media.md`   # Frontend

- [ ] **GIF animations created** (optional but recommended)   REACT_APP_API_URL=http://localhost:8000

- [ ] **Architecture diagram created**   ```

- [ ] **Database schema diagram created** (optional)3. Save file



### Security Checklist---



- [ ] No real passwords in any file#### 7.5 Add README to config-samples

- [ ] No API keys exposed

- [ ] No real email addresses**Instructions**:

- [ ] No production URLs (except public demo site)1. Create file: `.website/config-samples/README.md`

- [ ] `.website/` folder in `.gitignore`2. Add content:

   ```markdown

### Portfolio Integration Checklist   # Configuration Samples

   

- [ ] `.website/` folder ready to copy to portfolio repo   These are sanitized configuration files from the FinCore project.

- [ ] All file paths use relative links   Sensitive information has been replaced with placeholders.

- [ ] Screenshots referenced correctly in markdown files   

- [ ] GitHub repository link is correct in `metadata.json`   ## Files Included

   

---   - `docker-compose.yml` - Docker services configuration

   - `package.json` - Node.js dependencies (frontend)

## 📅 Time Estimates Summary   - `requirements.txt` - Python dependencies (backend)

   - `.env.example` - Environment variables template

| Task | Priority | Time | When to Do |   

|------|----------|------|------------|   ## Usage

| Add Sample Data | HIGH | 15 min | Before screenshots |   

| Take Screenshots | HIGH | 30 min | After sample data |   Copy these files to your project root and customize:

| Create Demo Video | MEDIUM | 1-2 hrs | After screenshots |   

| Create GIFs | LOW | 30 min | Optional |   1. Copy `.env.example` to `.env`

| Architecture Diagrams | MEDIUM | 30 min | Anytime |   2. Replace all `YOUR_*_HERE` placeholders with actual values

| Security Review | HIGH | 20 min | Before publishing |   3. Change passwords to strong, unique values

| Final Checklist | HIGH | 30 min | Before publishing |   4. Update URLs for your environment

   

**Total Time**: 4-5 hours   ## Security Notes

   

---   - Never commit `.env` file to Git

   - Use strong passwords (20+ characters)

## 🚀 Next Steps After Completion   - Generate unique SECRET_KEY for production

   - Keep database credentials secret

Once all tasks are complete:   ```

3. Save file

1. **Verify Everything**:

   - Go through final checklist above---

   - Test all links in documentation

   - Ensure all images display correctly## ✅ Task 8: Final Review Checklist



2. **Copy to Portfolio Website**:Before publishing to your portfolio, verify:

   ```bash

   cp -r .website/ /path/to/your/portfolio/projects/fincore/### Documentation

   ```- [ ] All `.md` files in `.website/` folder are present and complete

- [ ] `metadata.json` has accurate information

3. **Create Project Detail Page**:- [ ] No "TODO" or placeholder text in documentation

   - Use `overview.md` as homepage- [ ] All links work (no broken references)

   - Create subpages for features, architecture, setup

   - Integrate screenshots into HTML### Screenshots

   - Embed YouTube video- [ ] `homepage.png` - Landing page

- [ ] `login.png` - Login form

4. **Deploy**:- [ ] `register.png` - Registration form

   - Push changes to portfolio repository- [ ] `verify-email.png` - Email verification

   - Deploy website- [ ] `dashboard.png` - **Dashboard with real data** ⭐

   - Test all links and images- [ ] `categories.png` - Category management

- [ ] `incomes.png` - Income tracking

5. **Share**:- [ ] `expenses.png` - Expense tracking

   - Add to LinkedIn projects- [ ] `reports.png` - Reports page

   - Share on Twitter/X- [ ] (Optional) Mobile screenshots

   - Post in relevant communities (r/webdev, r/django, r/reactjs)

### Media

---- [ ] At least 2-3 GIF animations created

- [ ] Architecture diagram created

## ❓ Questions or Issues?- [ ] Demo video uploaded to YouTube

- [ ] `media.md` updated with YouTube link

If you encounter problems:

### Config Files

1. **Check main documentation**: README.md in project root- [ ] `docker-compose.yml` copied and sanitized

2. **Review other .md files** in `.website/` folder- [ ] `package.json` copied

3. **Open a GitHub issue** if documentation is unclear- [ ] `requirements.txt` copied

4. **Ask in Discussions** for general questions- [ ] `.env.example` created

- [ ] `config-samples/README.md` created

---

### Security

**Good luck creating amazing portfolio documentation! 🎉**- [ ] No passwords in config samples

- [ ] No API keys exposed
- [ ] No personal email addresses
- [ ] No production URLs (except in docs as examples)
- [ ] SECRET_KEY replaced with placeholder

### Accuracy
- [ ] All code snippets are accurate and functional
- [ ] Screenshots match current UI design
- [ ] Feature descriptions match implementation
- [ ] Tech stack list is complete and correct

---

## 🚀 Task 9: Deploy to Portfolio Website

### Instructions

Once all above tasks are complete:

1. **Copy `.website/` folder** to your portfolio website repository
2. **Create project detail page** on your website using the documentation
3. **Structure** (example):
   ```
   /projects/fincore/
     - index.html (overview from overview.md)
     - features.html (from features.md)
     - architecture.html (from architecture.md)
     - screenshots/ (copy all images)
   ```
4. **Integrate screenshots** into HTML pages
5. **Embed YouTube video** on overview page
6. **Link to GitHub** repository
7. **Test all links** before publishing

---

## 📞 Getting Help

If you encounter issues:

1. **Check documentation** files in `.website/` folder
2. **Verify software installed**:
   - OBS Studio for video recording
   - ScreenToGif for GIF creation
   - draw.io for diagrams
3. **File size issues**:
   - Compress images: https://tinypng.com/
   - Reduce GIF FPS: Use ScreenToGif editor
4. **Quality issues**:
   - Ensure screenshots are at least 1920x1080
   - Use browser zoom 100% (not zoomed in/out)
   - Clean browser cache before screenshots

---

## 📋 Time Estimates

| Task | Estimated Time |
|------|----------------|
| Add sample data to app | 15 minutes |
| Capture all screenshots | 30 minutes |
| Create GIF animations | 30 minutes |
| Record demo video | 1-2 hours (including editing) |
| Upload to YouTube | 15 minutes |
| Create architecture diagrams | 30 minutes |
| Sanitize config files | 20 minutes |
| Final review | 30 minutes |
| **TOTAL** | **4-5 hours** |

---

## ✨ Tips for Best Results

### Screenshots
- Use incognito/private mode (clean browser, no extensions)
- Take screenshots with realistic data (not Lorem Ipsum)
- Ensure good color contrast (dark mode if used)
- Crop out browser UI for cleaner look

### Video
- Write and practice script before recording
- Speak clearly and at moderate pace
- Use "umm" and "ahh" sparingly
- Edit out long pauses
- Add background music (royalty-free)

### GIFs
- Keep duration under 10 seconds
- Show one clear action per GIF
- Optimize file size (reduce colors, FPS)
- Loop smoothly

### Diagrams
- Keep it simple and readable
- Use consistent colors/shapes
- Label all components clearly
- Export at high resolution (300 DPI)

---

**Good luck! Once completed, you'll have a professional portfolio piece showcasing your full-stack development skills. 🎉**
