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

router.get("/search", searchBooksByGenre);
router.use(authenticate);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
