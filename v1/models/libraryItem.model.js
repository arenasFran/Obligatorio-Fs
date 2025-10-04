import mongoose from "mongoose";
const { Schema } = mongoose;
const Estado = {
  NONE: "NONE",
  LEYENDO: "LEYENDO",
  TERMINADO: "TERMINADO",
};

const libraryItemSchema = new Schema({
  titulo: { type: String, required: true },
  subtitle: { type: String },
  publishedDate: { type: String },
  pageCount: { type: Number },
  coverUrl: { type: String },
  categories: [{ type: String }],
  authors: [{ type: String }],
  desc: { type: String },
  estado: {
    type: String,
    enum: Object.values(Estado),
    default: Estado.NONE,
  },
  progreso: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  originalBookId: { type: String, required: true },
  quotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quote" }],
});

export default mongoose.model("LibraryItem", libraryItemSchema);
