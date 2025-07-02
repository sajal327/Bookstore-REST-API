
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
Server running on http://localhost:5001
```

---

### 6. Visit Swagger API Docs

```bash
http://localhost:5001/api-docs
```

> If not configured yet, see the Swagger Setup section below.

---

## 🧪 Test API with Postman

### 1. Register a User

- **Method**: `POST`
- **URL**: `http://localhost:5001/register`
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
- **URL**: `http://localhost:5001/login`
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

- **POST** `http://localhost:5001/books`
- **Body**:
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "published Year": 2018
}
```

---

### 5. Get All Books

- **GET** `http://localhost:5001books`

---

### 6. Search Books by Genre

- **GET** `http://localhost:5001/books/search?genre=Self-help`

---

### 7. Update a Book

- **PUT** `http://localhost:5001/books/:id`
- **Body**:
```json
{
  "title": "Updated Title"
}
```

---

### 8. Delete a Book

- **DELETE** `http://localhost:5001/books/:id`

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
      title: "📚 Bookstore REST API",
      version: "1.0.0",
      description: "API for managing books and users with JWT authentication",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Path to route files for annotations
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};

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
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Email already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token returned
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
```
---
### 5: Start the server

```node app.js```

Then open:

```http://localhost:5001/api-docs```

You'll see a beautiful interactive Swagger UI 🎉

![Swagger](https://github.com/user-attachments/assets/da6eab23-2611-49c2-9cc2-bc9640ba8157)

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
| GET    | `/books/search`     | Search books by genre          | ✅ or ❌ if public|

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
├── swagger.js
```

---

