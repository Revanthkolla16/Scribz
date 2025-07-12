# Scribz - Modern Notes App

Scribz is a beautiful, modern, Notion-inspired notes app with a dark theme, rich text editing, secure authentication, and a clean, responsive UI.

## ✨ Features
- **Secure JWT Authentication** (email/password)
- **Rich Text Editor** (TipTap)
- **Notes CRUD** (create, edit, delete, soft delete/trash)
- **Favorites** and quick filtering
- **Search & Filter** notes
- **Keyboard Shortcuts** for productivity
- **Grid/List Views** with fixed-size, uniform note cards
- **Dark Theme** with glass morphism and modern UI
- **Responsive Design** (desktop & mobile)
- **Notion-inspired**: persistent sidebar features now in the top navbar
- **No card expansion**: all notes are the same size, preview is multi-line, ellipsis-truncated

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite), Material-UI, Tailwind CSS v4, TipTap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Revanthkolla16/Scribz
cd Scribz
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/`:
```
MONGODB_URI=mongodb://localhost:27017/scribz
JWT_SECRET=your-secret-key
PORT=5000
```

#### Start the backend:
```bash
npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```

#### Start the frontend:
```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).
- The backend runs on [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `PORT` - Backend server port (default: 5000)

---

## 🖥️ Usage
- **Sign up / Log in** with your email and password
- **Create, edit, and delete notes** with rich text formatting
- **Mark notes as favorite** or move to trash
- **Filter** by All, Favorites, or Trash using the navbar
- **Search** notes instantly
- **All notes are displayed as fixed-size cards**
- **Dark mode** is always on for a modern look

---

## 🧩 Customization
- All UI is built with Material-UI and Tailwind CSS v4
- You can easily change colors, card sizes, or add new features
- The codebase is modular and ready for your edits!

---

## 📦 Project Structure
```
Scribz/
  backend/      # Express API, MongoDB models, JWT auth
  frontend/     # React app, contexts, components, styles
  README.md     # This file
``` 