import mongoose from "mongoose";
const levelSchema = new mongoose.Schema({
  codeLevel: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  ImageUrl: { type: String, required: true },
  totalPointsRequired: { type: Number, required: true },
});

export default mongoose.model("Level", levelSchema);
