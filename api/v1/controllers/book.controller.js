import books from "../models/book.model.js";

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

export const listBooks = (req, res) => {
  res.json(books);
};
