import Collection from "../models/collection.model.js";
import { ServiceError } from "../utils/ServiceError.js";

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


export async function createCollection(collectionData, userId) {
  try {
    const existing = await Collection.findOne({
      user: userId,
      name: collectionData.name,
    });
    if (existing) {
      throw new ServiceError(
        "Ya existe una colección con ese nombre para este usuario",
        409
      );
    }

    const collection = new Collection({
      ...collectionData,
      user: userId,
    });
    await collection.save();
    return collection;
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("No se pudo crear la colección", 400);
  }
}


export async function updateCollectionName(collectionId, userId, newName) {
  try {
    
    const nameInUse = await Collection.findOne({
      user: userId,
      name: newName,
      _id: { $ne: collectionId },
    });
    if (nameInUse) {
      throw new ServiceError(
        "Ya existe una colección con ese nombre para este usuario",
        409
      );
    }

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
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      "No se pudo actualizar el nombre de la colección",
      400
    );
  }
}
