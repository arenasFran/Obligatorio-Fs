import { ServiceError } from "../utils/ServiceError.js";

// Cache simple para evitar llamadas repetidas
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Control de rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 segundo entre requests

/**
 * Función para esperar un tiempo determinado
 * @param {number} ms - Milisegundos a esperar
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Obtiene libros desde la API de Google Books con retry y cache.
 * @param {string} query - Término de búsqueda para los libros.
 * @returns {Promise<Array>} Colección de libros encontrados.
 */
export async function fetchBooksFromGoogle(query = "book") {
  const cacheKey = `books_${query}`;

  // Verificar cache primero
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("Devolviendo libros desde cache para:", query);
    return cached.data;
  }

  // Respetar intervalo mínimo entre requests
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=10&startIndex=0&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      lastRequestTime = Date.now();
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const books = data.items || [];

        // Guardar en cache
        cache.set(cacheKey, {
          data: books,
          timestamp: Date.now(),
        });

        console.log(`Libros obtenidos exitosamente para: ${query}`);
        return books;
      }

      // Manejar rate limiting (429)
      if (response.status === 429) {
        if (retryCount === maxRetries) {
          throw new ServiceError(
            `Rate limit excedido después de ${maxRetries} reintentos. Intenta más tarde.`,
            429
          );
        }

        // Calcular tiempo de espera exponencial: 2^retryCount * 1000ms
        const waitTime = Math.pow(2, retryCount) * 1000;
        console.log(
          `Rate limit detectado (429). Esperando ${waitTime}ms antes del reintento ${
            retryCount + 1
          }/${maxRetries}`
        );
        await sleep(waitTime);
        retryCount++;
        continue;
      }

      // Otros errores HTTP
      throw new ServiceError(
        `Error al obtener libros de Google Books: ${response.status} ${response.statusText}`,
        502
      );
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }

      // Error de red u otros errores
      if (retryCount === maxRetries) {
        console.error(
          "Google Books API Error después de todos los reintentos:",
          error
        );
        throw new ServiceError(
          `Error al conectar con Google Books después de ${maxRetries} reintentos: ${error.message}`,
          502
        );
      }

      const waitTime = Math.pow(2, retryCount) * 1000;
      console.log(
        `Error de conexión. Esperando ${waitTime}ms antes del reintento ${
          retryCount + 1
        }/${maxRetries}`
      );
      await sleep(waitTime);
      retryCount++;
    }
  }
}
