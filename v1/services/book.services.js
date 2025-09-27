const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
import { ServiceError } from "../utils/ServiceError.js";

/**
 * Obtiene libros desde la API de Google Books.
 * @param {string} query - Término de búsqueda para los libros.
 * @returns {Promise<Array>} Colección de libros encontrados.
 */
export async function fetchBooksFromGoogle(query = "book") {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=40&startIndex=0`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ServiceError("Error al obtener libros de Google Books", 502);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    throw new ServiceError("Error al conectar con Google Books", 502);
  }
}
