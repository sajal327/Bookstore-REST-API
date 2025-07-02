const { v4: uuidv4 } = require("uuid");
const { readJSON, writeJSON } = require("../utils/fileUtils");

const booksFile = "./data/books.json";

exports.getAllBooks = async (req, res) => {
  const books = await readJSON(booksFile);
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const books = await readJSON(booksFile);
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};

exports.addBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id,
  };

  const books = await readJSON(booksFile);
  books.push(newBook);
  await writeJSON(booksFile, books);

  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await readJSON(booksFile);
  const index = books.findIndex((b) => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[index].userId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this book" });
  }

  books[index] = { ...books[index], ...req.body };
  await writeJSON(booksFile, books);

  res.json(books[index]);
};

exports.deleteBook = async (req, res) => {
  let books = await readJSON(booksFile);
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.userId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this book" });
  }

  books = books.filter((b) => b.id !== req.params.id);
  await writeJSON(booksFile, books);

  res.json({ message: "Book deleted" });
};

exports.searchBooksByGenre = async (req, res) => {
  const books = await readJSON(booksFile);
  const { genre } = req.query;

  if (!genre) {
    return res
      .status(400)
      .json({ message: "Genre query parameter is required" });
  }

  const filtered = books.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase()
  );

  res.json(filtered);
};
