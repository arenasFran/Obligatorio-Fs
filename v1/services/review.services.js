import Review from '../models/review.model.js';

export const createReviewService = async (userId, reviewData) => {
  const { bookId, score, comment, bookTitle, bookAuthors, bookImage } = reviewData;
  
  const existingReview = await Review.findOne({ userId, bookId });
  if (existingReview) {
    throw { status: 400, message: 'Ya has reseñado este libro' };
  }

  const review = new Review({
    userId,
    bookId,
    score,
    comment,
    bookTitle
  });

  return await review.save();
};

export const getBookReviewsService = async (bookId) => {
  return await Review.find({ bookId })
    .populate('userId', 'username')
    .sort({ createdAt: -1 });
};

export const getUserReviewsService = async (userId) => {
  return await Review.find({ userId }).sort({ createdAt: -1 });
};

export const updateReviewService = async (reviewId, userId, updateData) => {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) {
    throw { status: 404, message: 'Review no encontrada' };
  }

  Object.assign(review, updateData);
  return await review.save();
};

export const deleteReviewService = async (reviewId, userId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, userId });
  if (!review) {
    throw { status: 404, message: 'Review no encontrada' };
  }
  return review;
};