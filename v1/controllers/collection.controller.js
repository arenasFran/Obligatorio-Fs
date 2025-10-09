import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
import {
  createCollection,
  deleteCollection,
  updateCollectionName,
} from "../services/collection.services.js";

export async function deleteCollectionController(req, res, next) {
  try {
    const userId = req.user._id;
    const collectionId = req.params.id;
    const deleted = await deleteCollection(collectionId, userId);
    res.json({ message: "Colección eliminada", deleted });
  } catch (error) {
    next(error);
  }
}

export async function createCollectionController(req, res, next) {
  try {
    const userId = req.user._id;
    const collectionData = req.body;
    const newCollection = await createCollection(collectionData, userId);
    console.log("Colección creada:", newCollection);
    res.status(201).json(newCollection);
  } catch (error) {
    console.error("Error al crear colección:", error);
    next(error);
  }
}

export async function getUserCollectionsController(req, res, next) {
  try {
    const userId = req.user._id;

    const collections = await Collection.find({
      user: new mongoose.Types.ObjectId(userId),
    });

    res.json(collections);
  } catch (error) {
    next(error);
  }
}


export async function updateCollectionNameController(req, res, next) {
  try {
    const userId = req.user._id;
    const collectionId = req.params.id;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }
    const updatedCollection = await updateCollectionName(
      collectionId,
      userId,
      name
    );
    res.json(updatedCollection);
  } catch (error) {
    next(error);
  }
}
