import { fetchBooksFromGoogle } from "../services/book.services.js";

/**
 * Controlador para obtener libros desde Google Books.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function getBooksFromGoogle(req, res, next) {
  const query = req.query.q || "book";
  try {
    const books = await fetchBooksFromGoogle(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
}
