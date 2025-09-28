import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
import { createCollection } from "../services/collection.services.js";
/**
 * Controlador para crear una nueva colección para el usuario logueado.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
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

/**
 * Controlador para obtener todas las colecciones del usuario autenticado
 */

export async function getUserCollectionsController(req, res, next) {
  try {
    const userId = req.user._id;

    const collections = await Collection.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.json(collections);
  } catch (error) {
    next(error);
  }
}
