import express from "express";
import { getAllLevelsController } from "../controllers/level.controller.js";

const router = express.Router({ mergeParams: true });

// GET /v1/levels -> list of level details
router.get("/", getAllLevelsController);

export default router;
