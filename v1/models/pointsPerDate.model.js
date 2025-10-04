import mongoose from "mongoose";
const { Schema } = mongoose;

const pointsPerDateSchema = new Schema(
  {
    quantity: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    libraryItem: {
      type: Schema.Types.ObjectId,
      ref: "LibraryItem",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

pointsPerDateSchema.index({ user: 1, date: -1 });

export default mongoose.model("PointsPerDate", pointsPerDateSchema);
