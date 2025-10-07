
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const missionSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  isDone: { type: Boolean, default: false },
  completedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default model("Mission", missionSchema);
