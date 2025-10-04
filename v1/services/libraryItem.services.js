/**
 * Actualiza el estado de un libraryItem específico
 * @param {string} itemId - ID del libraryItem
 * @param {string} estado - Nuevo estado
 * @returns {Promise<Object|null>} El libraryItem actualizado o null si no existe
 */
export async function updateLibraryItemEstado(itemId, estado) {
  return await LibraryItem.findByIdAndUpdate(itemId, { estado }, { new: true });
}
/**
 * Actualiza el progreso (páginas leídas) de un libraryItem específico
 * @param {string} itemId - ID del libraryItem
 * @param {number} progreso - Nuevo valor de progreso
 * @returns {Promise<Object|null>} El libraryItem actualizado o null si no existe
 */
export async function updateLibraryItemProgreso(itemId, pages) {
  const item = await LibraryItem.findById(itemId);
  if (!item) return null;
  const increment = Number(pages);
  if (!Number.isFinite(increment) || increment <= 0) {
    throw new ServiceError(
      "Las páginas a agregar deben ser un número mayor a 0",
      400
    );
  }
  const updated = await LibraryItem.findByIdAndUpdate(
    itemId,
    { $inc: { progreso: increment } },
    { new: true }
  );
  // Registrar puntos exactamente igual a las páginas agregadas
  const { addPoints } = await import("./points.services.js");
  try {
    await addPoints({
      userId: item.userId,
      libraryItemId: item._id,
      quantity: increment,
    });
  } catch (e) {
    // No romper la actualización del progreso si falla el registro de puntos
    console.error("Error registrando puntos:", e);
  }
  return updated;
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
    // Mantener relación bidireccional con el usuario
    try {
      const { default: User } = await import("../models/user.model.js");
      await User.findByIdAndUpdate(userId, {
        $addToSet: { libraryItems: libraryItem._id },
      });
    } catch (err) {
      console.error("Error enlazando libraryItem al usuario:", err);
    }
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
  const deleted = await LibraryItem.findOneAndDelete({ _id: itemId, userId });
  if (deleted) {
    try {
      const { default: User } = await import("../models/user.model.js");
      await User.findByIdAndUpdate(userId, {
        $pull: { libraryItems: deleted._id },
      });
    } catch (err) {
      console.error("Error desenlazando libraryItem del usuario:", err);
    }
  }
  return deleted;
}

/**
 * Obtiene todos los libraryItems de un usuario
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Array>}
 */
export async function getLibraryItemsByUser(userId) {
  return await LibraryItem.find({ userId });
}
