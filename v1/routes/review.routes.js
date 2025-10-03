import { Router } from 'express';
import {
  createReview,
  getBookReviews,
  getUserReviews,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.js';
import { createReviewSchema, updateReviewSchema } from '../validators/review.validator.js';

const router = Router();


router.post('/', authenticate, validate(createReviewSchema), createReview);

router.get('/book/:bookId', getBookReviews);


router.get('/my-reviews', authenticate, getUserReviews);


router.put('/:id', authenticate, validate(updateReviewSchema), updateReview);


router.delete('/:id', authenticate, deleteReview);

export default router;
