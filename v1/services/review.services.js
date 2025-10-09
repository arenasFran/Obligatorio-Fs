import Review from "../models/review.model.js";

export const createReviewService = async (userId, reviewData) => {
  const { originalBookId, score, comment, bookTitle } = reviewData;

  const existingReview = await Review.findOne({ userId, originalBookId });
  if (existingReview) {
    throw { status: 400, message: "Ya has reseñado este libro" };
  }

  const review = new Review({
    userId,
    originalBookId,
    score,
    comment,
    bookTitle,
  });

  return await review.save();
};

export const getBookReviewsService = async (originalBookId) => {
  return await Review.find({ originalBookId })
    .populate("userId", "username")
    .sort({ createdAt: -1 });
};

export const getUserReviewsService = async (userId) => {
  return await Review.find({ userId }).sort({ createdAt: -1 });
};

export const updateReviewService = async (reviewId, userId, updateData) => {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) {
    throw { status: 404, message: "Review no encontrada" };
  }

  const { score, comment } = updateData;

  if (score === undefined && comment === undefined) {
    throw { status: 400, message: "Debes proporcionar al menos un campo para actualizar (score o comment)" };
  }

  const noScoreChange = score === review.score || score === undefined;
  const noCommentChange = comment === review.comment || comment === undefined;

  if (noScoreChange && noCommentChange) {
    throw { status: 400, message: "No hay cambios respecto a la información actual" };
  }

  if (score !== undefined) review.score = score;
  if (comment !== undefined) review.comment = comment;

  await review.save();
  return review;
};


export const deleteReviewService = async (reviewId, userId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, userId });
  if (!review) {
    throw { status: 404, message: "Review no encontrada" };
  }
  return review;
};
