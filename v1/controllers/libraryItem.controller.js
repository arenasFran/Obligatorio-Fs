import { createLibraryItem, deleteLibraryItemService } from "../services/libraryItem.services.js";


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


export const deleteLibraryItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    await deleteLibraryItemService(id, userId);
     res.status(204).json({message: 'Libro eliminado correctamente.'});
  } catch (error) {
    next(error);
  }
};
