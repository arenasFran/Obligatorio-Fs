// Elimina una colección específica por su ID y usuario.

export async function deleteCollection(collectionId, userId) {
  try {
    const collection = await Collection.findOneAndDelete({
      _id: collectionId,
      user: userId,
    });
    if (!collection) {
      throw new ServiceError("Colección no encontrada", 404);
    }
    return collection;
  } catch (error) {
    throw new ServiceError("No se pudo eliminar la colección", 400);
  }
}
import Collection from "../models/collection.model.js";
import { ServiceError } from "../utils/ServiceError.js";

// Crea una nueva colección para el usuario logueado.

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

// Actualiza el nombre de una colección específica por su ID y usuario.

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
    throw new ServiceError(
      "No se pudo actualizar el nombre de la colección",
      400
    );
  }
}
