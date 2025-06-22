# QueueMe-App

A simple full-stack queue management system built with **React (TypeScript)** for the frontend and **Express (TypeScript)** for the backend. Users can check in with their name and wait for their turn to be called. Admins can call the next user or delete users from the queue.

---

## ✨ Features

- 👤 User check-in with name
- 📋 Display of current queue
- ✅ "Call Next" button to remove the first user in line
- ❌ Delete individual users from the queue
- 🎨 Styled with SASS and includes smooth animations
- 🧠 Simple in-memory queue (can be extended to use file or DB)

---

## 📁 Project Structure

queue-me-app/
├── frontend/ # React app
│ ├── src/
│ │ ├── App.tsx # Main UI
│ │ └── App.scss # Styles with animations
│ └── ...
├── backend/ # Express app
│ ├── src/
│ │ └── index.ts # Express routes and in-memory queue
│ └── ...
└── README.md

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18 or newer
- npm (comes with Node)
- Optional: VS Code

---

### 📦 Installation

1. Clone the repository:

git clone https://github.com/ramshha/queue-me-app.git
cd queue-me-app

Install dependencies for both frontend and backend:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

🖥️ Run the App

# Backend (Express)
cd backend
npm run dev
The backend will run on http://localhost:5000

# Frontend (React)

cd frontend
npm start
The frontend will run on http://localhost:4000

🔁 API Endpoints (Backend)

Method	Endpoint	Description
GET	/queue	Get the current queue
POST	/queue	Add a user to the queue
DELETE	/queue/next	Remove the first user in queue
DELETE	/queue/:id	Delete a user by ID

🔧 To Do / Improvements

 -Persist queue using local JSON or DB (MongoDB/SQLite)
 -Role-based access for "Call Next"
 -Notifications or toast messages
 -Responsive enhancements for mobile

🙌 Credits
Created by Ramsha Umer using modern React and Express best practices.
