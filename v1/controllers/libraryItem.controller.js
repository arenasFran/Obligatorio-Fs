import { createLibraryItem } from "../services/libraryItem.services.js";

/**
 * Controlador para crear un nuevo libraryItem para el usuario logueado.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function createLibraryItemController(req, res, next) {
  try {
    const userId = req.user._id; // Asume que el middleware de autenticación agrega el usuario a req
    const itemData = req.body;
    const newItem = await createLibraryItem(itemData, userId);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
}
