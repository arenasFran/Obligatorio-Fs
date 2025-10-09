import express from "express";
import { getAllLevelsController } from "../controllers/level.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router({ mergeParams: true });

router.get("/", authenticate, getAllLevelsController);

export default router;
