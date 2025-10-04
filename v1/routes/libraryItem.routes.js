import express from "express";
import {
  createLibraryItemController,
  deleteLibraryItemController,
  getLibraryItemByIdController,
  getLibraryItemsByCollectionController,
  getLibraryItemsByUserController,
  updateLibraryItemEstadoController,
  updateLibraryItemProgresoController,
} from "../controllers/libraryItem.controller.js";
import { validate } from "../middlewares/validate.js";
import { libraryItemSchema } from "../validators/libraryItem.validator.js";
const router = express.Router({ mergeParams: true });

router.post("/add", validate(libraryItemSchema), createLibraryItemController);
router.get(
  "/getFromcollections/:collectionId/items",
  getLibraryItemsByCollectionController
);
router.get("/user", getLibraryItemsByUserController);
router.delete("/:itemId", deleteLibraryItemController);

// Endpoint para ver los detalles de un libraryItem específico
router.get("/:itemId", getLibraryItemByIdController);

// Endpoint para agregar páginas leídas a un libraryItem (nuevo nombre)
router.patch("/:itemId/add-pages", updateLibraryItemProgresoController);
// Alias temporal (deprecated) para mantener compatibilidad
router.patch("/:itemId/progreso", updateLibraryItemProgresoController);
// Endpoint para actualizar el estado de un libraryItem específico
router.patch("/:itemId/estado", updateLibraryItemEstadoController);
export default router;
