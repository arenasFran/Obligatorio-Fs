import express from "express";
import {
  addPointsController,
  listMyPointsController,
  myPointsSummaryController,
} from "../controllers/points.controller.js";
const router = express.Router();

// Listar puntos por fecha del usuario autenticado con filtros opcionales
router.get("/my", listMyPointsController);
// Resumen de puntos acumulados (desde la colección de puntos)
router.get("/my/summary", myPointsSummaryController);
// Registrar puntos manualmente
router.post("/add", addPointsController);

export default router;
