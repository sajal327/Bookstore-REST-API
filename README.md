
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

### 6. Visit Swagger API Docs

```bash
http://localhost:5000/api-docs
```

> If not configured yet, see the Swagger Setup section below.

---

## 🧪 Test API with Postman

### 1. Register a User

- **Method**: `POST`
- **URL**: `http://localhost:5000/register`
- **Body** → `raw` → `JSON`:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 2. Login

- **Method**: `POST`
- **URL**: `http://localhost:5000/login`
- **Body**:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Copy the returned `token`.

---

### 3. Auth Header for Protected Routes

In all /books requests, add to **Authorization tab**:
- Type: `Bearer Token`
- Token: `your.jwt.token.here`

---

### 4. Add a Book

- **POST** `http://localhost:5000/books`
- **Body**:
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

- **GET** `http://localhost:5000/books`

---

### 6. Search Books by Genre

- **GET** `http://localhost:5000/books/search?genre=Self-help`

---

### 7. Update a Book

- **PUT** `http://localhost:5000/books/:id`
- **Body**:
```json
{
  "title": "Updated Title"
}
```

---

### 8. Delete a Book

- **DELETE** `http://localhost:5000/books/:id`

---

## 📘 Swagger UI Setup (Optional but Recommended)

### 1. Install Swagger Dependencies

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

### 2. Create `swagger.js` in root

```js
// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "REST API for managing a bookstore with JWT auth",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
```

---

### 3. Update `app.js` to use Swagger

Add:

```js
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
```

---

### 4. Add Swagger Annotations in Routes

Example for `authRoutes.js`:

```js
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     ...
 */
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
| GET    | `/books/search`     | Search books by genre          | ✅ or ❌       |

---

## 🗂 Project Structure

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

Open-source project for learning and internship use.
