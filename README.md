# ReadHub - Library Management System

A premium full-stack Library Management System built with React and Spring Boot.

## Features
- **Dashboard**: Real-time statistics on books and users.
- **Book Management**: Add, view, search, and delete books.
- **User Management**: Register library members and manage profiles.
- **Issue/Return System**: Track book issuances and automate returns.
- **Modern UI**: Built with Tailwind CSS and Framer Motion for smooth transitions.

## Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Data JPA, MySQL.
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios.
- **Database**: MySQL (Auto-creates `library_db`).

## Setup Instructions

### 1. Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL Server

### 2. Backend Setup
1. Open `backend/src/main/resources/application.properties`.
2. Update the `spring.datasource.password` with your MySQL root password.
3. Run the application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *The database `library_db` will be created automatically on the first run.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation
- `GET /api/books`: List all books
- `POST /api/books`: Add new book
- `POST /api/issues/issue`: Issue a book to a user
- `POST /api/issues/return/{id}`: Return an issued book
- `GET /api/users`: List all members