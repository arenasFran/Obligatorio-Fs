import express from "express";
import Joi from "joi";
import {
  getMyLevel,
  getMyProfile,
  updateObjectivePerDay,
  updateUser,
} from "../controllers/user.controller.js";
// import {
//   getMyMissionsController,
//   recheckMyMissionsController,
// } from "../controllers/userMissions.controller.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router({ mergeParams: true });

router.patch("/", updateUser);
router.patch(
  "/objective-per-day",
  validate({
    body: Joi.object({
      objectivePerDay: Joi.number().integer().min(0).required(),
    }),
  }),
  updateObjectivePerDay
);
router.get("/getMyLevel", getMyLevel);
router.get("/me", getMyProfile);

// router.get("/missions", getMyMissionsController);
// router.post("/missions/recheck", recheckMyMissionsController);

export default router;
