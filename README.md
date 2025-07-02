
# 📚 Bookstore REST API (Node.js + Express)

A simple RESTful API for a Bookstore built using **Node.js**, **Express**, and **JWT-based Authentication**, with **file-based JSON storage**.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookstore-api.git
cd bookstore-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set environment variables

```bash
# Create a .env file in the root directory and add:
echo "JWT_SECRET=yourSecretKeyHere" > .env
```

> Or manually create a `.env` file and add:
> ```
> JWT_SECRET=yourSecretKeyHere
> ```

---

### 4. Create data files for persistence

```bash
mkdir data
echo "[]" > data/users.json
echo "[]" > data/books.json
```

---

### 5. Start the server

```bash
node app.js
```

You should see:

```bash
Server running on http://localhost:5000
```

---

### 6. Visit Swagger API Docs (if integrated)

```bash
http://localhost:5000/api-docs
```

---

## 📬 How to Test (Postman or curl)

### 1. Register a User

**POST** `/register`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 2. Login

**POST** `/login`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "your.jwt.token.here"
}
```

---

### 3. Use JWT for Authenticated Endpoints

In Postman or curl, include the following header:

```http
Authorization: Bearer your.jwt.token.here
```

---

### 4. Add a New Book

**POST** `/books`

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "publishedYear": 2018
}
```

---

### 5. Get All Books

**GET** `/books`

---

### 6. Search Books by Genre

**GET** `/books/search?genre=Self-help`

---

## 🧪 curl Examples

```bash
# Register
curl -X POST http://localhost:5000/register   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/login   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"123456"}'

# Get books (use the token from login)
curl http://localhost:5000/books   -H "Authorization: Bearer your.jwt.token.here"
```

---

## 🧾 API Endpoints Summary

| Method | Route                | Description                    | Auth Required |
|--------|---------------------|--------------------------------|---------------|
| POST   | `/register`         | Register a new user            | ❌            |
| POST   | `/login`            | Login and get JWT              | ❌            |
| GET    | `/books`            | Get all books                  | ✅            |
| GET    | `/books/:id`        | Get a book by ID               | ✅            |
| POST   | `/books`            | Add a new book                 | ✅            |
| PUT    | `/books/:id`        | Update a book (creator only)   | ✅            |
| DELETE | `/books/:id`        | Delete a book (creator only)   | ✅            |
| GET    | `/books/search`     | Search books by genre          | ✅ (or ❌ if public) |

---

## 🗂 File Structure

```
bookstore-api/
├── app.js
├── .env
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── logger.js
├── utils/
│   └── fileUtils.js
├── data/
│   ├── users.json
│   └── books.json
├── swagger.js (optional)
```

---

## 📝 License

This project is open-source and free to use for educational purposes.
