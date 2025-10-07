import express from "express";
import { checkProgress, getStatus } from "../controllers/streak.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/status", getStatus);
router.post("/check", checkProgress);

export default router;
