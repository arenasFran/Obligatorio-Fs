import mongoose from "mongoose";

const trophySchema = new mongoose.Schema({
  img: { type: String, required: true },
  mission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission", required: true },
  isUnlocked: { type: Boolean, default: false }
});

export default mongoose.model("Trophy", trophySchema);
