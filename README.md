# 📝 Personal Notes Manager

A full-stack web application to manage your personal notes. Built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JS.

---

## 📁 Project Structure

```
notes-manager/
├── backend/
│   ├── server.js              # Main Express server
│   ├── db.js                  # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Note.js            # Note schema
│   ├── routes/
│   │   ├── auth.js            # Signup + Login routes
│   │   └── notes.js           # CRUD routes for notes
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   └── .env.example           # Environment variable template
├── frontend/
│   ├── index.html             # Login page
│   ├── signup.html            # Signup page
│   ├── dashboard.html         # Main notes dashboard
│   ├── style.css              # All styles
│   └── script.js              # Shared JS utilities
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Node.js, Express                    |
| Database | MongoDB, Mongoose                   |
| Auth     | JWT (jsonwebtoken), bcryptjs        |
| Frontend | HTML, CSS, Vanilla JavaScript       |

---

## 🚀 Run Locally

### Step 1 – Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- A MongoDB database (free at [MongoDB Atlas](https://www.mongodb.com/atlas))

### Step 2 – Clone / Download the Project
```bash
git clone https://github.com/yourusername/notes-manager.git
cd notes-manager
```

### Step 3 – Install Backend Dependencies
```bash
npm install
```

### Step 4 – Create the .env File
```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in your values:
```
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/notesdb
JWT_SECRET=some_long_random_secret_string_here
PORT=5000
```

> 💡 **Get MONGO_URI**: Sign up at MongoDB Atlas → Create a free cluster → Click "Connect" → Copy the connection string.

### Step 5 – Start the Backend
```bash
npm run dev
```
You should see:
```
Server is running on port 5000
MongoDB connected successfully!
```

### Step 6 – Open the Frontend
Just open `frontend/index.html` in your browser. No server needed for the frontend!

Or use VS Code's **Live Server** extension for a better experience.

> 📌 Make sure `API_URL` in `frontend/script.js` is set to `http://localhost:5000/api`

---

## 🌐 Deploy on Vercel

### Deploy the Backend

1. Push your project to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click **"Add New Project"** → Import your GitHub repo

4. In **"Root Directory"**, leave it as `/`

5. In **"Build & Output Settings"**, set:
   - Framework Preset: `Other`
   - Output Directory: *(leave blank)*

6. Add **Environment Variables** in the Vercel dashboard:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000

7. Create a `vercel.json` file in the root (if not present):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/server.js"
    }
  ]
}
```

8. Click **Deploy** – Vercel will give you a URL like `https://notes-manager-abc.vercel.app`

### Deploy the Frontend

**Option A: Vercel (recommended)**
1. Create a separate Vercel project for the `frontend/` folder
2. No build settings needed – it's just static HTML
3. Update `API_URL` in `script.js` to your backend Vercel URL before deploying:
```js
const API_URL = "https://your-backend.vercel.app/api";
```

**Option B: GitHub Pages**
1. Push the `frontend/` folder to a repo
2. Go to repo Settings → Pages → Deploy from branch → `main`
3. Your frontend will be at `https://yourusername.github.io/notes-frontend`

---

## 🔐 API Reference

| Method | Endpoint         | Auth Required | Description       |
|--------|-----------------|---------------|-------------------|
| POST   | /api/signup     | No            | Create new user   |
| POST   | /api/login      | No            | Login user        |
| GET    | /api/notes      | Yes           | Get all notes     |
| POST   | /api/notes      | Yes           | Create a note     |
| PUT    | /api/notes/:id  | Yes           | Update a note     |
| DELETE | /api/notes/:id  | Yes           | Delete a note     |

> Auth is done via `Authorization: Bearer <token>` header.

---

## 📸 Pages

- **`index.html`** – Login form
- **`signup.html`** – Signup form  
- **`dashboard.html`** – View, create, edit, delete notes

---

## 🛠️ Common Issues

**"Cannot connect to server"**  
→ Make sure the backend is running: `npm run dev`

**"MongoDB connection failed"**  
→ Check your `MONGO_URI` in the `.env` file. Make sure your IP is whitelisted in MongoDB Atlas.

**Notes not loading after login**  
→ Check browser console for errors. Make sure `API_URL` in `script.js` matches your backend URL.

---

Made with ❤️ as a college project.
