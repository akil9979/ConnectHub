# 🚀 ConnectHub — Your Social Network, Reimagined

> A modern full-stack social networking app where people can connect, post updates, like, comment, and stay in sync with real-time notifications.

![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Socket.IO-0ea5e9)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-3c873a)
![Database](https://img.shields.io/badge/Database-MongoDB-47a248)

---

## ✨ Features

- 🔐 **Authentication system** (JWT + cookies)
- 👤 **Profile management** (bio/headline/profile updates)
- 📝 **Post creation** with optional image upload
- ❤️ **Like / unlike posts**
- 💬 **Comment on posts**
- 🔔 **Notification pipeline** for engagement events
- 🤝 **Connection management** for network growth
- ⚡ **Real-time updates** via Socket.IO

---

## 🧱 Project Structure

```bash
ConnectHub/
├── backend/     # Express + MongoDB API
└── frontend/    # React + Vite client app
```

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS 4
- Axios
- React Router
- Socket.IO Client

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (media uploads)
- Socket.IO
- Multer

---

## ⚙️ Local Setup

### 1) Clone and install

```bash
git clone <your-repo-url>
cd ConnectHub

# Backend deps
cd backend && npm install

# Frontend deps
cd ../frontend && npm install
```

### 2) Configure environment variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

access_token_secret=your_access_secret
access_token_secret_expiry=1d
refresh_token_secret=your_refresh_secret
refresh_token_secret_expiry=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

### 3) Run the app

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on Vite default (`http://localhost:5173`) and communicates with backend API.

---

## 🔌 API Base Paths

- `/api/v1/auth`
- `/api/v1/user`
- `/api/v1/post`
- `/api/v1/connection`
- `/api/v1/notification`

---

## 📌 Development Notes

- Backend serves static files from `backend/public`.
- CORS is enabled with credentials.
- Socket events are emitted for post likes/comments and consumed on the client.

---

## 🧪 Useful Scripts

### Backend
```bash
npm run dev
```

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is currently unlicensed. Add a `LICENSE` file to define usage terms.

---

## 💡 Vision

ConnectHub is designed as a foundation for building a scalable, engaging social platform. Future upgrades can include stories, messaging, recommendation feeds, and advanced moderation tools.
