# 💼 FUTURE_FS_02 — Client Lead Management System (Mini CRM)

> A full-stack, real-time CRM solution engineered to capture public leads effortlessly and provide administrators with a powerful, secure dashboard for tracking, managing, and converting prospects.

---

## ✨ Features

- 📋 **Public Lead Capture Form**: Frictionless form for potential clients to submit inquiries with automatic database ingestion.
- 🔐 **Secure Admin Portal**: Password encryption via bcryptjs and stateless session management powered by JSON Web Tokens (JWT).
- 📊 **Real-Time Analytics Dashboard**: Visual metric cards displaying metrics for total, new, contacted, and converted leads.
- 🔍 **Smart Search & Filtering**: Dynamic lead filtering by name or email with integrated debouncing for minimal latency.
- 📝 **Interactive Notes Drawer**: Time-stamped internal follow-up notes system for seamless client tracking.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (Scaffolded via Vite)
- 🎨 Tailwind CSS
- 🧩 Axios & React Hot Toast

### Backend
- 🟢 Node.js
- ⚡ Express.js
- 🔑 JSON Web Tokens (JWT) & BcryptJS

### Database & Tools
- 🍃 MongoDB Atlas
- 📦 Mongoose ODM

---

## 🚀 Live Demo & Deployment

- 🔺 **Frontend Live App (Vercel)**: [https://future-fs-02-three-liard.vercel.app](https://future-fs-02-three-liard.vercel.app)
- 🟣 **Backend Live Service (Render)**: [https://future-fs-02-api-7l8f.onrender.com](https://future-fs-02-api-7l8f.onrender.com)

---

## 📁 Project Structure

```text
FUTURE_FS_02/
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── components/
│   │   │   ├── AddLeadModal.jsx
│   │   │   ├── LeadsTable.jsx
│   │   │   ├── NotesDrawer.jsx
│   │   │   ├── SearchFilterBar.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 💻 Local Installation & Setup

### 📋 Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas connection string

### 1. Clone the repository
```bash
git clone https://github.com/gloriasemyol/FUTURE_FS_02.git
cd FUTURE_FS_02
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Execute the admin creation script (run once to seed your admin login):
```bash
node scripts/createAdmin.js
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser! 🚀

---

## 🌐 Production Deployment Steps

### 🟣 Backend Deployment (Render)
1. Create a new Web Service on Render and connect your repository.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Set Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` = `[https://future-fs-02-three-liard.vercel.app](https://future-fs-02-three-liard.vercel.app)`

### 🔺 Frontend Deployment (Vercel)
1. Create a new Project on Vercel and import your repository.
2. Framework Preset: `Vite`
3. Root Directory: `client`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variable:
   - `VITE_API_BASE_URL` = `[https://future-fs-02-api-7l8f.onrender.com/api](https://future-fs-02-api-7l8f.onrender.com/api)`

---

## ⚙️ Environment Variables

| Variable | Location | Description |
| :--- | :--- | :--- |
| `PORT` | server/.env | Port number for the Express server |
| `MONGO_URI` | server/.env / Render | Database connection string |
| `JWT_SECRET` | server/.env / Render | Secret key used for signing JWT tokens |
| `CLIENT_URL` | server/.env / Render | Frontend production URL allowed for CORS |
| `VITE_API_BASE_URL` | client/.env / Vercel | Production backend API endpoint URL |

---

## 📝 License

Distributed under the MIT License.
```
