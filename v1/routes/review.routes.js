import { Router } from 'express';
import {
  createReview,
  getBooksReviews,
  getUserReviews,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createReview);

router.get('/book/:bookId', getBooksReviews);

router.get('/my-reviews', authMiddleware, getUserReviews);


router.put('/:id', authMiddleware, updateReview);


router.delete('/:id', authMiddleware, deleteReview);

export default router;