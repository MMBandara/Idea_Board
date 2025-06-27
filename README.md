
# 💡 Simple Idea Board - Full Stack Application

This project is a full-stack web application built with **React (frontend)** and **Spring Boot (backend)** that allows users to create, view, edit, and delete ideas on a collaborative public board.

---

## 📚 Table of Contents

- [Project Features](#-project-features)
- [Tech Stack](#-tech-stack)
- [Backend Setup (Spring Boot)](#-backend-setup-spring-boot)
- [Frontend Setup (React)](#-frontend-setup-react)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)
- [License](#-license)

---

## ✨ Project Features

- Create and update ideas with a title and description
- View all submitted ideas (sorted by latest)
- Delete unwanted ideas
- Responsive UI using React Bootstrap
- Toast notifications and modal-based idea form
- Backend validation and in-memory persistence using H2

---

## 🛠 Tech Stack

### 🔹 Frontend:
- React
- Axios
- React Bootstrap

### 🔹 Backend:
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 In-Memory Database

---

## 🔧 Backend Setup (Spring Boot)

### Prerequisites
- JDK 21+
- Maven installed

### Steps

1. Navigate to the backend directory:
   ```bash
   cd simple-idea-board-backend
   ```

2. Run the Spring Boot app:
   ```bash
   mvn spring-boot:run
   ```

3. The backend server will be running at:
   ```
   http://localhost:8080
   ```

### ✅ H2 Console (Optional)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password:

---

## 🌐 Frontend Setup (React)

### Prerequisites
- Node.js and npm installed

### Steps

1. Navigate to the frontend directory:
   ```bash
   cd simple-idea-board-frontend
   ```

2. Install dependencies:
   ```bash
   npm install 
   npm install react-router-dom axios bootstrap react-bootstrap
   ```

3. Start the React app:
   ```bash
   npm run dev
   ```

4. The frontend will be available at:
   ```
   http://localhost:5173
   ```

### 🌍 React API Configuration
Make sure your API calls point to `http://localhost:8080/api/ideas`.

---

## 📡 API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/ideas`         | Get all ideas            |
| POST   | `/api/ideas`         | Create a new idea        |
| PUT    | `/api/ideas/{id}`    | Update an idea by ID     |
| DELETE | `/api/ideas/{id}`    | Delete an idea by ID     |

---

## 📁 Folder Structure

### Backend (`simple-idea-board-backend`)
```
src/main/java/com/example/idea/
├── controller/     # REST Controller
├── service/        # Business Logic
├── model/          # JPA Entity
├── repository/     # Spring Data JPA Repository
└── IdeaBoardApplication.java
```

### Frontend (`simple-idea-board-frontend`)
```
src/
├── api/               # Axios helper for API calls
│   └── ideaApi.js
├── components/        # Reusable UI components
│   ├── IdeaForm.js
│   └── IdeaList.js
├── pages/             # Application pages
│   └── HomePage.js
├── App.js
└── index.js
```

---

## 📄 License

This project is for educational and internship evaluation purposes. Feel free to use it as a template or learning resource.

---
