import {
  createLibraryItem,
  deleteLibraryItem,
  getLibraryItemById,
  getLibraryItemsByCollection,
  getLibraryItemsByUser,
  updateLibraryItemProgreso,
  updateLibraryItemEstado,
} from "../services/libraryItem.services.js";
/**
 * Controlador para actualizar el estado de un libraryItem específico
 */
export async function updateLibraryItemEstadoController(req, res, next) {
  try {
    const { itemId } = req.params;
    const { estado } = req.body;
    const estadosValidos = ["NONE", "LEYENDO", "TERMINADO"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "El estado debe ser NONE, LEYENDO o TERMINADO" });
    }
    const updatedItem = await updateLibraryItemEstado(itemId, estado);
    if (!updatedItem) {
      return res.status(404).json({ error: "LibraryItem no encontrado" });
    }
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
}
/**
 * Controlador para actualizar el progreso (páginas leídas) de un libraryItem específico
 */
export async function updateLibraryItemProgresoController(req, res, next) {
  try {
    const { itemId } = req.params;
    const { progreso } = req.body;
    if (typeof progreso !== "number" || progreso < 0) {
      return res
        .status(400)
        .json({ error: "El progreso debe ser un número mayor o igual a 0" });
    }
    const updatedItem = await updateLibraryItemProgreso(itemId, progreso);
    if (!updatedItem) {
      return res.status(404).json({ error: "LibraryItem no encontrado" });
    }
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
}
/**
 * Controlador para obtener los detalles de un libraryItem específico
 */
export async function getLibraryItemByIdController(req, res, next) {
  try {
    const { itemId } = req.params;
    const item = await getLibraryItemById(itemId);
    if (!item) {
      return res.status(404).json({ error: "LibraryItem no encontrado" });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createLibraryItemController(req, res, next) {
  try {
    const userId = req.user._id;
    const itemData = req.body;
    const newItem = await createLibraryItem(itemData, userId);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
}

/**
 * Controlador para obtener todos los library items de una colección específica.
 */
export async function getLibraryItemsByCollectionController(req, res, next) {
  try {
    const { collectionId } = req.params;
    const items = await getLibraryItemsByCollection(collectionId);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

/**
 * Controlador para eliminar un libraryItem específico
 */
export async function deleteLibraryItemController(req, res, next) {
  try {
    const { itemId } = req.params;
    const userId = req.user._id; // viene del middleware de autenticación

    const deletedItem = await deleteLibraryItem(itemId, userId);

    if (!deletedItem) {
      return res.status(404).json({ error: "LibraryItem no encontrado" });
    }

    res.json({ message: "LibraryItem eliminado con éxito", deletedItem });
  } catch (error) {
    next(error);
  }
}

/**
 * Controlador para obtener todos los libraryItems del usuario autenticado
 */
export async function getLibraryItemsByUserController(req, res, next) {
  try {
    const userId = req.user._id; // inyectado por middleware de auth
    const items = await getLibraryItemsByUser(userId);
    res.json(items);
  } catch (error) {
    next(error);
  }
}
