# Odin Blog Project

A full-stack blog platform built with React, Node.js, Express, and PostgreSQL. The project is split into two apps — an admin dashboard for managing posts and a public-facing client for readers.

---

## 🔗 Live Links

| App | URL |
|-----|-----|
| 🛠️ Admin Dashboard | [odin-blog-api-k5cr.vercel.app](https://odin-blog-api-k5cr.vercel.app) |
| 🌐 Blog Client | [client-odin-blog-api-liart.vercel.app](https://client-odin-blog-api-liart.vercel.app) |
| ⚙️ Backend API | [odin-blog-api-si1t.onrender.com](https://odin-blog-api-si1t.onrender.com) |

---

## 🛠️ Admin Dashboard

The admin panel allows authorized users to:

- Create, edit, and delete blog posts
- Toggle posts between **Published** and **Draft** status
- View post statistics at a glance

**Login required** — only users with the `ADMIN` role can access the dashboard.

---

## 🌐 Blog Client

The public-facing blog where readers can:

- Browse all published posts
- Read individual posts
- Leave comments

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, React Router, Axios |
| Backend | Node.js, Express |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT (JSON Web Tokens) |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Render |

---

## 🚀 Running Locally

### Backend
```bash
cd blog-api
npm install
cp .env.example .env   # fill in your DATABASE_URL and JWT_SECRET
npm run dev
```

### Admin Frontend
```bash
cd blog-admin
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:3000
npm run dev
```

### Blog Client
```bash
cd blog-client
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:3000
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`blog-api/.env`)
```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://odin-blog-api-k5cr.vercel.app
PORT=3000
```

### Frontend (`.env`)
```
VITE_API_URL=https://odin-blog-api-si1t.onrender.com
```

---

## 📝 Notes

- The backend is hosted on Render's free tier and may take **30–60 seconds to wake up** after inactivity.
- JWT tokens expire after 7 days — log in again if you get a 403 error.
