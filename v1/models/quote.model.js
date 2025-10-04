import mongoose from "mongoose";
const quoteSchema = new mongoose.Schema({
  libraryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LibraryItem",
    required: true,
  },
  pag: { type: Number, required: true },
  content: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", quoteSchema);
