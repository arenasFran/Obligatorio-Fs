import fetch from "node-fetch";

const books = [];

// Función para obtener libros desde Google Books API
export async function fetchBooksFromGoogle(query = "book") {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.items || [];
}

export default books;
