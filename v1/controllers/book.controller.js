import { fetchBooksFromGoogle } from "../services/book.services.js";

export async function getBooksFromGoogle(req, res, next) {
  const query = req.query.q || "book";
  try {
    const books = await fetchBooksFromGoogle(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
}


export const getBooksByCategory = async(req,res, next)=>{
  const category = req.query.category; 

  if (!category) {
    return res.status(400).json({ error: "Debe especificar una categoría" });
  }
  const query = `subject:${category}`;

  try {
    const books = await fetchBooksFromGoogle(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
}
