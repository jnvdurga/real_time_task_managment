# real_time_task_managment

<a alt="Project Logo" href="#" target="_blank" rel="noreferrer">
  <img src="https://img.icons8.com/ios-filled/100/task.png" width="45" />
</a>

# Task Management System

A full-stack **Task Management System** built with React, Node.js (Express), and PostgreSQL.  
This application helps users manage tasks/job applications with a clean and structured workflow.

---

## Overview

This project is designed to manage tasks in a simple and scalable way using a **REST API architecture**.

It follows:

- Feature-based frontend structure
- Layered backend architecture (routes → controllers → services)
- PostgreSQL for persistent data storage
- Monorepo structure (frontend + backend in single repository)

---

##  Features

✔ Create new tasks  
✔ View all tasks in table format  
✔ Update task status  
✔ Delete tasks with confirmation  
✔ Clean modal-based UI  
✔ REST API integration  
✔ Persistent data storage using PostgreSQL  

---

## Architecture

Frontend (React CRA) → Axios API Layer → Backend (Express.js) → PostgreSQL Database

---

##  Project Structure

frontend/
└── features/
    └── task/
        ├── api.js
        ├── store.js
        ├── components/
        │   ├── TaskTable.jsx
        │   ├── CreateTask.jsx
        │   ├── AddTaskModal.jsx
        │   └── ConfirmModal.jsx

backend/
├── routes/
├── controllers/
├── services/
├── db/
└── server.js

---

##  Tech Stack

Frontend:
- React.js (Create React App)
- JavaScript (ES6+)
- React Hooks (useState, useEffect)
- Axios
- CSS (custom styling)

Backend:
- Node.js
- Express.js
- REST API
- PostgreSQL
- node-postgres (pg)

---

##  API Endpoints

GET /tasks → Fetch all tasks  
POST /tasks → Create a new task  
PUT /tasks/:id → Update a task  
DELETE /tasks/:id → Delete a task  

---

## 🛠️ Setup Instructions

### Clone Repository
git clone <repo-url>  
cd real_time_task_managment  

---

### Backend Setup
cd backend  
npm install  
npm run dev  

---

### Frontend Setup
cd frontend  
npm install  
npm run dev  

---

### Environment Variables (Backend)

Create a .env file inside backend:

DATABASE_URL=postgresql://username:password@localhost:5432/dbname  
PORT=5000  

---

##  Project Purpose

- Learn full-stack development workflow  
- Build REST APIs using Express  
- Integrate PostgreSQL database  
- Practice React component architecture  
- Understand real-world CRUD system design  

---

##  Future Improvements

- JWT Authentication (Login/Register)  
- Task filtering (status, priority)  
- Kanban board (drag & drop)  
- Dashboard analytics  
- Deployment (Frontend + Backend + Database)  

---

##  Author

Built by a **Full Stack Developer (React + Node.js + PostgreSQL)** focused on building real-world production-ready applications.

---

 If you like this project, consider giving it a star!
