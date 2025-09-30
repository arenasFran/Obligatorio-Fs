import LibraryItem from "../models/libraryItem.model.js";
import { ServiceError } from "../utils/ServiceError.js";


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

export const deleteLibraryItemService = async (itemId, userId) => {
  try {
    const item = await LibraryItem.findOneAndDelete({ _id: itemId, userId });
    if (!item) {
      throw new ServiceError("LibraryItem no encontrado o no pertenece al usuario", 404);
    }
    return item;
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(`Error al eliminar el libro: ${error.message}`, 500);
  }
};