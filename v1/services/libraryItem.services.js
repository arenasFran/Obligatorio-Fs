import LibraryItem from "../models/libraryItem.model.js";
import { ServiceError } from "../utils/ServiceError.js";

/**
 * Crea un nuevo libraryItem para el usuario logueado.
 * @param {Object} itemData - Datos del libraryItem.
 * @param {string} userId - ID del usuario propietario.
 * @returns {Promise<Object>} El libraryItem creado.
 */
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
    // Si es un error de validación de Mongoose, proporcionar detalles específicos
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      throw new ServiceError(
        `Error de validación: ${validationErrors.join(", ")}`,
        400
      );
    }

    // Si es un error de duplicado (por ejemplo, índice único)
    if (error.code === 11000) {
      throw new ServiceError("Ya existe un libraryItem con estos datos", 400);
    }

    // Para otros errores, mostrar el mensaje original para depuración
    console.error("Error creating libraryItem:", error);
    throw new ServiceError(
      `No se pudo crear el libraryItem: ${error.message}`,
      400
    );
  }
}
