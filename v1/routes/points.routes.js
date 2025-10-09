import express from "express";
import Joi from "joi";
import {
  addPointsController,
  listMyPointsController,
  myPointsSummaryController,
} from "../controllers/points.controller.js";
import { validate } from "../middlewares/validate.js";
import { objectId } from "../validators/common.js";
const router = express.Router();

router.get(
  "/my",
  validate({
    query: Joi.object({
      from: Joi.date().iso().optional(),
      to: Joi.date().iso().optional(),
    }),
  }),
  listMyPointsController
);

router.get("/my/summary", myPointsSummaryController);

router.post(
  "/add",
  validate({
    body: Joi.object({
      libraryItemId: objectId.required(),
      quantity: Joi.number().integer().min(1).required(),
      date: Joi.date().iso().optional(),
    }),
  }),
  addPointsController
);

export default router;
