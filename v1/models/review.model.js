import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: String, 
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  bookTitle: {
    type: String,
    required: true
  },
  bookAuthors: [String],
  bookImage: String
}, {
  timestamps: true
});

reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);