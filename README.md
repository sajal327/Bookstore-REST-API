# Bookstore-REST-API

# 📚 Bookstore REST API (Node.js + Express)

A simple RESTful API for a Bookstore built using **Node.js**, **Express**, and **JWT-based Authentication**, with **file-based JSON storage**.

## 🚀 Features

- User Registration & Login (JWT-based authentication)
- Full CRUD operations for books
- Only authenticated users can manage books
- Only the user who added a book can edit/delete it
- Filter books by genre via `/books/search?genre=`
- Simple logging middleware and error handling
- Data is persisted using `users.json` and `books.json`
- Clean file utility logic using `utils/fileUtils.js`

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookstore-api.git
cd bookstore-api ```

2. Install dependencies

npm install

3. Set environment variables

Create a .env file at the root and add:
JWT_SECRET=yourSecretKeyHere

4. Start the server

node app.js


