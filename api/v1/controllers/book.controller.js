import books, { fetchBooksFromGoogle } from "../models/book.model.js";

export const createBook = (req, res) => {
  const { ownerId, title, content, categoryId } = req.body;

  const newBook = {
    _id: books.length + 1,
    ownerId,
    title,
    content,
    categoryId,
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

export const listBooks = async (req, res) => {
  try {
    const query = req.query.q || "book";
    const books = await fetchBooksFromGoogle(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libros de Google Books" });
  }
};
