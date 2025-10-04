import express from "express";
import {
  getMyLevel,
  updateObjectivePerDay,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router({ mergeParams: true });

router.patch("/", updateUser);
router.patch("/objective-per-day", updateObjectivePerDay);
router.get("/getMyLevel", getMyLevel);

export default router;
