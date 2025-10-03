/**
 * Actualiza el estado de un libraryItem específico
 * @param {string} itemId - ID del libraryItem
 * @param {string} estado - Nuevo estado
 * @returns {Promise<Object|null>} El libraryItem actualizado o null si no existe
 */
export async function updateLibraryItemEstado(itemId, estado) {
  return await LibraryItem.findByIdAndUpdate(
    itemId,
    { estado },
    { new: true }
  );
}
/**
 * Actualiza el progreso (páginas leídas) de un libraryItem específico
 * @param {string} itemId - ID del libraryItem
 * @param {number} progreso - Nuevo valor de progreso
 * @returns {Promise<Object|null>} El libraryItem actualizado o null si no existe
 */
export async function updateLibraryItemProgreso(itemId, progreso) {
  return await LibraryItem.findByIdAndUpdate(
    itemId,
    { progreso },
    { new: true }
  );
}
import LibraryItem from "../models/libraryItem.model.js";
import { ServiceError } from "../utils/ServiceError.js";
/**
 * Obtiene los detalles de un libraryItem por su ID
 * @param {string} itemId - ID del libraryItem
 * @returns {Promise<Object|null>} El libraryItem encontrado o null
 */
export async function getLibraryItemById(itemId) {
  return await LibraryItem.findById(itemId);
}


export async function createLibraryItem(itemData, userId) {
  try {
    const libraryItem = new LibraryItem({
      ...itemData,
      userId: userId,
      collectionId: itemData.collectionId,
    });
    await libraryItem.save();
    return libraryItem;
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      throw new ServiceError(
        `Error de validación: ${validationErrors.join(", ")}`,
        400
      );
    }
    if (error.code === 11000) {
      throw new ServiceError("Ya existe un libraryItem con estos datos", 400);
    }
    console.error("Error creating libraryItem:", error);
    throw new ServiceError(
      `No se pudo crear el libraryItem: ${error.message}`,
      400
    );
  }
}

/**
 * Obtiene todos los library items de una colección
 * @param {string} collectionId - ID de la colección
 * @returns {Promise<Array>} Lista de library items
 */
export async function getLibraryItemsByCollection(collectionId) {
  return await LibraryItem.find({ collectionId });
}

/**
 * Elimina un libraryItem por su ID
 * @param {string} itemId - ID del libraryItem
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Object|null>} El item eliminado o null si no existe
 */
export async function deleteLibraryItem(itemId, userId) {
  return await LibraryItem.findOneAndDelete({ _id: itemId, userId });
}

/**
 * Obtiene todos los libraryItems de un usuario
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Array>}
 */
export async function getLibraryItemsByUser(userId) {
  return await LibraryItem.find({ userId });
}
