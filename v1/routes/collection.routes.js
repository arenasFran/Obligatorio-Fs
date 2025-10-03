import express from "express";
import {
  createCollectionController,
  deleteCollectionController,
  getUserCollectionsController,
  updateCollectionNameController,
} from "../controllers/collection.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });
// Endpoint para crear una nueva colección para el usuario autenticado
router.post(
  "/",
  authenticate,

  createCollectionController
);

// Endpoint para obtener todas las colecciones del usuario autenticado
router.get("/", authenticate, getUserCollectionsController);

// Endpoint para actualizar el nombre de una colección específica
router.put("/:id", authenticate, updateCollectionNameController);

// Endpoint para eliminar una colección específica
router.delete("/:id", authenticate, deleteCollectionController);

export default router;
