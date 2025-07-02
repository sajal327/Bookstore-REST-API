const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooksByGenre,
} = require("../controllers/bookController");

// router.get("/search", searchBooksByGenre);
// router.use(authenticate);
// router.get("/", getAllBooks);
// router.get("/:id", getBookById);
// router.post("/", addBook);
// router.put("/:id", updateBook);
// router.delete("/:id", deleteBook);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search books by genre
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre to filter books by
 *     responses:
 *       200:
 *         description: Filtered books list
 *       400:
 *         description: Genre query is missing
 */
router.get("/search", searchBooksByGenre);
router.use(authenticate);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all books
 */
router.get("/", getAllBooks);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get("/:id", getBookById);
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - publishedYear
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book added
 */
router.post("/", addBook);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       403:
 *         description: Not authorized to update this book
 *       404:
 *         description: Book not found
 */
router.put("/:id", updateBook);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book deleted
 *       403:
 *         description: Not authorized to delete this book
 *       404:
 *         description: Book not found
 */
router.delete("/:id", deleteBook);

module.exports = router;
