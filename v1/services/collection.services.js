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

/**
 * Actualiza el nombre de una colección específica por su ID y usuario.
 * @param {string} collectionId - ID de la colección.
 * @param {string} userId - ID del usuario propietario.
 * @param {string} newName - Nuevo nombre de la colección.
 * @returns {Promise<Object>} La colección actualizada.
 */
export async function updateCollectionName(collectionId, userId, newName) {
  try {
    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId, user: userId },
      { name: newName },
      { new: true }
    );
    if (!collection) {
      throw new ServiceError("Colección no encontrada", 404);
    }
    return collection;
  } catch (error) {
    throw new ServiceError("No se pudo actualizar el nombre de la colección", 400);
  }
}
