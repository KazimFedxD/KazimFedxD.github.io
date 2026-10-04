# 💼 FinCore

> **Personal Finance & Islamic Wealth Management System**  
> Built with the [FullStack-Template](https://github.com/KazimFedxD/FullStack-Template)

---

## 🧭 Overview

**FinCore** is a full-stack finance management application that helps users track **income**, **expenses**, and **assets**, while also integrating upcoming **Islamic financial principles** such as **Khums** and **Zakat**.

The platform focuses on simplicity, modular design, and data accuracy — providing users with a clear understanding of their financial status through categorized tracking, summaries, and reports.

---

## ⚙️ Tech Stack & Architecture

**Base Template:** [FullStack-Template](https://github.com/KazimFedxD/FullStack-Template)

### Backend
- **Framework:** Django 5.2 + Django REST Framework
- **Authentication:** JWT (Access: 30 min, Refresh: 7 days)
- **Task Queue:** Celery (for authentication and async processes)
- **Cache/Message Broker:** Redis
- **Database:** PostgreSQL (Docker-hosted)
- **Environment Config:** python-dotenv
- **Containerization:** Docker Compose

### Frontend
- **Framework:** React 19
- **Styling:** Tailwind CSS + Framer Motion
- **State Management:** Context API
- **API Communication:** Axios-based API utilities
- **Routing:** React Router DOM

### Deployment
- **Local Development:** via Docker Compose
- **Domain:** `budget.fedxd.net` *(temporary)*

---

## ✅ Features Implemented

### Backend
- Custom authentication system via `AuthAcc` (JWT-based)
- Models for:
  - **Category** (with parent/child support and root categories)
  - **Income**
  - **Expense**
- CRUD APIs for:
  - `/api/categories/`
  - `/api/incomes/`
  - `/api/expenses/`
- `/api/report/` endpoint for basic financial summaries (total income, total expenses, balance)
- Celery integration (from base template) for token management and background handling

### Frontend
All pages are fully functional and connected to backend APIs.

#### 1. **Dashboard**
- Displays total income, expenses, and balance
- Visual category breakdowns with progress bars
- Real-time refresh button connected to `/api/report/`

#### 2. **Categories**
- Create and manage categories (Income/Expense)
- Supports subcategories and parent structure
- Root categories protected from deletion

#### 3. **Incomes**
- Table with date, category, amount, and description
- Add income via form (auto date + validation)
- Delete with confirmation

#### 4. **Expenses**
- Table with date, category, amount, and description
- Add expense via form (auto date + validation)
- Delete with confirmation

#### 5. **Reports**
- Simple report cards with:
  - Total Income
  - Total Expenses
  - Net Balance
- Category-wise breakdowns with counts and averages
- Fetches data from `/api/report/`

---

## 🧩 TODO / Roadmap

| Category | Feature | Status |
|-----------|----------|--------|
| 💰 Financial | Khums & Zakat Calculations | ⏳ Planned |
| 📊 Analytics | Graphs & Visual Charts | ⏳ Planned |
| ☁️ Storage | MinIO Integration (Receipts, Files) | ⏳ Planned |
| 🔁 Backend | Advanced Report Filtering | ⏳ Planned |
| ⚡ Performance | Redis Caching for Reports | ⏳ Planned |
| 🧾 Reports | Export to PDF/Excel | ⏳ Planned |
| 🧠 Automation | Celery for Financial Processing | ⏳ Planned |
| 🧑‍💻 DevOps | Aiven PostgreSQL, Backups | ⏳ Planned |
| 🌐 Domain | Permanent Domain Setup | ⏳ Planned |

---

## 🧱 Project Structure

```
FinCore/
├── backend/
│   ├── api/                 # Core finance app (categories, incomes, expenses)
│   ├── usermanagement/      # JWT authentication (AuthAcc)
│   ├── backend/             # Django settings and configuration
│   ├── Dockerfile
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/           # Dashboard, Categories, Incomes, Expenses, Reports
│   │   ├── utils/           # API wrappers and config
│   │   ├── components/      # Reusable UI components
│   │   └── config/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🚀 Setup & Run (Development)

### 1. Clone the Repository
```bash
git clone https://github.com/KazimFedxD/FinCore.git
cd FinCore
```

### 2. Environment Configuration

**Backend (.env in /backend/)**
```env
DATABASE_URL=postgres://fincore_user:fincore_password@db:5432/fincore_db
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
CELERY_BROKER_URL=redis://redis:6379/0
```

**Frontend (.env in /frontend/)**
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_APP_NAME=FinCore
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Initialize Database
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

### 5. Access the App
- Frontend → [http://localhost:3000](http://localhost:3000)  
- Backend API → [http://localhost:8000](http://localhost:8000)  
- Admin Panel → [http://localhost:8000/admin](http://localhost:8000/admin)

---

## 🔮 Future Considerations

- Financial Insights with Graphs and Visual Analytics  
- Khums and Zakat auto-calculations  
- File storage integration via MinIO or cloud storage  
- Caching for reports and analytics  
- Background tasks using Celery for periodic summaries  
- Backup and export systems for user data  
- Multi-user support for family/group accounts  
- Permanent domain and HTTPS setup

---

## 🧑‍💻 Author

**Kazim Abbas**  
Backend Developer • Python & Django Specialist  
GitHub: [KazimFedxD](https://github.com/KazimFedxD)

---

## 🪪 License

This project is licensed under the **MIT License**.  
Built using [FullStack-Template](https://github.com/KazimFedxD/FullStack-Template).

---

> *FinCore is under active development. Current release focuses on foundational financial tracking — advanced analytics and automation are in the roadmap.*
