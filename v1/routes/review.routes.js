import { Router } from "express";
import Joi from "joi";
import {
  createReview,
  deleteReview,
  getBookReviews,
  getUserReviews,
  updateReview,
} from "../controllers/review.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { objectIdParam } from "../validators/common.js";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validators/review.validator.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate({ body: createReviewSchema }),
  createReview
);

router.get(
  "/book/:originalBookId",
  validate({ params: Joi.object({ originalBookId: Joi.string().required() }) }),
  getBookReviews
);

router.get("/my-reviews", authenticate, getUserReviews);

router.patch(
  "/:id",
  authenticate,
  validate({ params: objectIdParam("id"), body: updateReviewSchema }),
  updateReview
);

router.delete(
  "/:id",
  authenticate,
  validate({ params: objectIdParam("id") }),
  deleteReview
);

export default router;
