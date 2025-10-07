import mongoose from "mongoose";
const petSchema = new mongoose.Schema({
  hungryCostPerHour: { type: Number, default: 1 },
  description: { type: String, required: true },
  name: { type: String, required: true },
  ImageSet: [{ type: String, required: true }],
  totalPointsRequired: { type: Number, required: true },
  isUnlocked: { type: Boolean, default: false },
});

export default mongoose.model("Pet", petSchema);
