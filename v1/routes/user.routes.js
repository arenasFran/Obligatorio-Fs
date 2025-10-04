import express from "express";
import {
  updateObjectivePerDay,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router({ mergeParams: true });

router.patch("/", updateUser);
router.patch("/objective-per-day", updateObjectivePerDay);

export default router;
