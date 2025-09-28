import Collection from "../models/collection.model.js";
import { ServiceError } from "../utils/ServiceError.js";

/**
 * Crea una nueva colección para el usuario logueado.
 * @param {Object} collectionData - Datos de la colección.
 * @param {string} userId - ID del usuario propietario.
 * @returns {Promise<Object>} La colección creada.
 */
export async function createCollection(collectionData, userId) {
  try {
    const collection = new Collection({
      ...collectionData,
      user: userId,
    });
    await collection.save();
    return collection;
  } catch (error) {
    throw new ServiceError("No se pudo crear la colección", 400);
  }
}
