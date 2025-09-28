import express from "express";
import {
  createCollectionController,
  getUserCollectionsController,
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

export default router;
