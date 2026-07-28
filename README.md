# 🚀 FUTURE_FS_02 – Client Lead Management System (Mini CRM) 💼⚡

> 🌟 A full-stack, real-time CRM solution engineered to capture public leads effortlessly and provide administrators with a powerful, secure dashboard for tracking, managing, and converting prospects.

---

### 🏆 Intern Project Overview
Developed with ❤️ as part of the Future Interns – Full Stack Web Development Internship Program (Task 2).

---

## 🌐 Live Demo & Deployment

| Platform | Role | Link | Status |
| :--- | :--- | :--- | :--- |
| Vercel ⚡ | Frontend UI | [https://future-fs-02.vercel.app](https://future-fs-02.vercel.app) | ![Active](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) |
| Render ⚙️ | Backend API | [https://future-fs-02-api.onrender.com](https://future-fs-02-api.onrender.com) | ![Active](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) |

> ⚠️ Note on Free Tier Hosting: The backend API hosted on Render spins down during inactivity. The initial request may take 30–50 seconds to wake up the server.

---

## ✨ Outstanding Features

- 📋 Public Lead Capture Form – Frictionless form for potential clients (Name, Email, Phone, Source).
- 🔐 Secure Admin Authentication – Password encryption via bcryptjs and stateless session handling using JWT.
- 📊 Real-Time Analytics Dashboard – Visual metric cards displaying Total, New, Contacted, and Converted leads.
- ➕ Manual Lead Entry Modal – Admin modal to manually input leads from phone calls or external channels.
- 🔍 Smart Search & Debouncing – Dynamic filtering by lead name or email with integrated debouncing for low latency.
- 🎯 Status Categorization – Quick filtering by lead status (New, Contacted, Converted).
- 🔄 Inline Lead Updates – Seamless, one-click status transitions directly within the table view.
- 📝 Interactive Notes Drawer – Time-stamped internal follow-up notes for team tracking.
- 🎨 Responsive UI/UX – Designed with modern Tailwind CSS for desktop and mobile responsiveness.
- 🔔 Toast Feedback Systems – Instant visual notifications via react-hot-toast.
- ⏳ Skeleton Loading States – Polished loading skeletons for enhanced perceived performance.

---

## 🛠️ Tech Stack & Ecosystem

```
  ┌─────────────────────────────────────────────────────────┐
  │                   MERN STACK ARCHITECTURE               │
  ├─────────────────────────────────────────────────────────┤
  │  💻 Frontend  :: React 18, Tailwind CSS, Vite           │
  │  ⚙️ Backend   :: Node.js, Express.js                    │
  │  🗄️ Database  :: MongoDB Atlas, Mongoose ODM            │
  │  🔑 Auth      :: JSON Web Tokens (JWT), BcryptJS        │
  │  ☁️ Cloud     :: Vercel (Frontend), Render (Backend)     │
  └─────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
FUTURE_FS_02/
├── 📁 client/                # React Frontend (Vite)
│   ├── 📁 src/
│   │   ├── 📁 api/           # Axios instance & interceptors
│   │   ├── 📁 components/    # StatsCards, SearchFilterBar, LeadsTable, NotesDrawer, AddLeadModal
│   │   ├── 📁 context/       # AuthContext for global login state
│   │   └── 📁 pages/         # ContactForm (Public), Login, Dashboard
│   ├── 📄 .env               # Client environment configurations
│   └── 📄 package.json
│
└── 📁 server/                # Node.js / Express Backend API
    ├── 📁 middleware/        # JWT Authentication protection
    ├── 📁 models/            # Lead.js, User.js (Mongoose Schemas)
    ├── 📁 routes/            # authRoutes.js, leadRoutes.js
    ├── 📁 scripts/           # createAdmin.js (One-time seeding script)
    ├── 📄 .env               # Server environment configurations
    ├── 📄 server.js          # Express app initialization & DNS configuration
    └── 📄 package.json
```

---

## 💻 Local Setup Instructions

### 📌 Prerequisites
- 🟢 Node.js (v18.0.0 or higher)
- 🍃 MongoDB Atlas database connection string

---

### 1️⃣ Clone Repository
```bash
git clone [https://github.com/gloriasemyol/FUTURE_FS_02.git](https://github.com/gloriasemyol/FUTURE_FS_02.git)
cd FUTURE_FS_02
```

---

### 2️⃣ Backend Configuration & Startup
```bash
cd server
npm install
```

Create a .env file in the server/ root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Execute the admin creation script (Run once to seed your admin login):
```bash
node scripts/createAdmin.js
```

Start the backend server in development mode:
```bash
npm run dev
```

---

### 3️⃣ Frontend Configuration & Startup
Open a new terminal window:
```bash
cd client
npm install
```

Create a .env file in the client/ root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Launch the Vite development server:
```bash
npm run dev
```

---

### 4️⃣ Local Access Points
- 🌐 Public Contact Form: http://localhost:5173/
- 🔒 Admin Portal Login: http://localhost:5173/login
- 📊 CRM Admin Dashboard: http://localhost:5173/dashboard

---

## 🔑 REST API Reference

| HTTP Method | API Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` 🔐 | `/api/auth/login` | Public | Authenticates credentials & returns JWT bearer token |
| `POST` 📥 | `/api/leads` | Public / Admin | Captures new lead submissions into MongoDB |
| `GET` 📊 | `/api/leads` | Admin | Fetches leads list (Supports `?search=` and `?status=`) |
| `GET` 📈 | `/api/leads/stats` | Admin | Computes totals across lead status metrics |
| `PATCH` 🔄 | `/api/leads/:id/status` | Admin | Updates lead workflow state (New, Contacted, Converted) |
| `POST` 📝 | `/api/leads/:id/notes` | Admin | Appends a timestamped internal follow-up note |

---

## 👤 Author

Gloria ✨
- 🐙 GitHub: [@gloriasemyol](https://github.com/gloriasemyol)

---

<p center="align">
  <i>Made with 💜 for Future Interns Development Program</i>
</p>