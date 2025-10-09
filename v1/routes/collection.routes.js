import express from "express";
import Joi from "joi";
import {
  createCollectionController,
  deleteCollectionController,
  getUserCollectionsController,
  updateCollectionNameController,
} from "../controllers/collection.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { objectIdParam } from "../validators/common.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validate({ body: Joi.object({ name: Joi.string().min(1).required() }) }),
  createCollectionController
);

router.get("/", authenticate, getUserCollectionsController);

router.put(
  "/:id",
  authenticate,
  validate({ params: objectIdParam("id") }),
  updateCollectionNameController
);

router.delete(
  "/:id",
  authenticate,
  validate({ params: objectIdParam("id") }),
  deleteCollectionController
);

export default router;
