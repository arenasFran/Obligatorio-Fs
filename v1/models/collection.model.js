import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  libraryItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "LibraryItem" }],
});

export default mongoose.model("Collection", collectionSchema);
