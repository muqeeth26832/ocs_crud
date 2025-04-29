# 🧑‍💻 Full Stack User Management System

This project is a full-stack CRUD application built with:

- **Frontend**: ReactJS with Material UI
- **Backend**: NodeJS with Express
- **Database**: MySQL

---

## 🚨 Note on Hosting

Due to limited time and the free MySQL hosting site ([freemysqlhosting.net](https://freemysqlhosting.net)) being **down** at the time of submission, I was unable to host the MySQL database online.

However, the entire project is working **perfectly in the local environment**, and database hosting can be plugged in easily by replacing the credentials with any cloud-hosted MySQL URI (Planetscale, Railway, etc.).

AWS & Hosting: Hands-on experience with cloud infrastructure, including configuring and managing hosting on AWS.

ReactJS: Proficient with ReactJS; extensive experience in building dynamic, scalable web applications, using hooks, state management, and API integrations.

NodeJS: Strong experience in building backend services and APIs, working with Express.js, middleware, and handling asynchronous tasks efficiently.

MySQL: Basic to intermediate experience with MySQL; comfortable with database design, writing complex queries, and performing optimizations.

Problem Solving: Passionate about problem solving and enjoy tackling challenges through logical and efficient solutions.

---

## 🛠 Features

- 📋 Display all users
- ➕ Add a new user
- 📝 Edit existing users
- ❌ Delete users
- ✅ Full database persistence

---

## 📦 Tech Stack

| Layer      | Stack                          |
|------------|--------------------------------|
| Frontend   | ReactJS, Material UI, Axios    |
| Backend    | NodeJS, Express                |
| Database   | MySQL                          |
| Styling    | Material UI                    |

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── server.js             # Express server
│   └── routes/
│       └── userRoutes.js    # All API routes
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── UserForm.js  # Form to add/update user
│       │   └── UserList.js  # User list display
│       ├── pages/
│       │   └── Home.js      # Main dashboard
│       └── api/
│           └── userApi.js   # Axios API handler
```

---

## 🧪 API Routes (Backend)

| Method | Route             | Description            |
|--------|-------------------|------------------------|
| GET    | `/api/users`      | Retrieve all users     |
| POST   | `/api/users`      | Add new user           |
| PUT    | `/api/users/:id`  | Update user by ID      |
| DELETE | `/api/users/:id`  | Delete user by ID      |

---

## 🖥️ Running Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/muqeeth26832/ocs_crud.git
```

---

### 2️⃣ Set Up MySQL Database

- Open MySQL and create a new database:

```sql
CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  avatar TEXT
);
```

---

### 3️⃣ Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with your DB credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=users_db
PORT=5000
```

```bash
npm start
```

Backend will run on: `http://localhost:5000`

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

---

---

## ✅ Optional Enhancements (for future work)

- Add search/filter capabilities
- Deploy backend (e.g., on Railway, Render)
- Deploy frontend (e.g., on Vercel or Netlify)
- Use cloud database (Planetscale, Supabase, etc.)
- Add authentication (JWT, OAuth)
- Pagination and better error handling

---

## 🙏 Final Note

This project was built last-minute due to time constraints. Unfortunately, database hosting wasn’t possible due to service issues. However, all essential features were implemented correctly and are working smoothly locally.

Thanks for reviewing the submission. Feedback is appreciated!

---
