# Leads Management — Full Stack Web Application

A sleek, production-grade full stack CRM dashboard built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- 🔐 **Authentication** — Register & Login with JWT tokens (7-day expiry)
- 🛡️ **Protected Routes** — Dashboard accessible only to logged-in users
- 📊 **Dashboard** — Stats overview (Leads · Tasks · Users · Revenue)
- 👥 **Leads Table** — Status badges, company info, deal values
- ✅ **Tasks Table** — Priority tags, progress statuses, assignees
- 🧑‍💼 **Users Table** — Roles, departments, task progress bars
- 🔍 **Live Search** — Filter any table in real time
- 🚪 **Logout** — Clears JWT and redirects to login
- 📱 **Responsive** — Mobile sidebar, adaptive grid layout
- 🎨 **Dark UI** — Custom design system with CSS variables

---

## 🗂 Project Structure

```
fullstack-app/
├── backend/
│   ├── index.js              ← Express server entry
│   ├── .env                  ← MongoDB URI + JWT secret
│   ├── package.json
│   ├── models/
│   │   └── User.js           ← Mongoose schema + bcrypt hashing
│   ├── middleware/
│   │   └── auth.js           ← JWT protect middleware
│   └── routes/
│       ├── auth.js           ← /api/auth/register, login, me
│       └── dashboard.js      ← /api/dashboard/stats, leads, tasks, users
│
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.jsx
        ├── index.css           ← Global design tokens
        ├── App.jsx              ← Router + protected routes
        ├── context/
        │   └── AuthContext.jsx  ← Auth state, login/register/logout
        └── pages/
            ├── Login.jsx + Login.css
            └── Dashboard.jsx + Dashboard.css
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v16+
- npm or yarn

---

### 1. Clone / Download the project

```bash
cd fullstack-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

The `.env` file is already configured with your MongoDB URI. You can verify/edit it:

```
PORT=5000
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_SECRET_KEY
NODE_ENV=development
```

Start the backend:

```bash
npm run dev     # with nodemon (auto-restart)
# OR
npm start       # production mode
```

Backend runs at → `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at → `http://localhost:3000`

The `"proxy": "http://localhost:5000"` in `package.json` forwards all `/api` calls to the backend.

---

### 4. Usage

1. Open `http://localhost:3000`
2. Click **Sign up** to create an account (stored in MongoDB)
3. Log in with your credentials
4. Explore Leads, Tasks, and Users tables
5. Use the search bar to filter records
6. Click **Sign Out** to log out

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/dashboard/stats` | ✅ | Dashboard statistics |
| GET | `/api/dashboard/leads` | ✅ | Leads data |
| GET | `/api/dashboard/tasks` | ✅ | Tasks data |
| GET | `/api/dashboard/users` | ✅ | Users data |

---

## 🚢 Deployment

### Vercel (Frontend)
```bash
cd frontend
npm run build
# Upload /build folder to Vercel or connect GitHub repo
```

### Render / Railway (Backend)
- Set environment variables from `.env`
- Set start command: `node index.js`
- Update frontend `.env` or proxy with deployed backend URL

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Styling | Custom CSS (design tokens, animations) |
| Fonts | Syne (headings) + DM Sans (body) |