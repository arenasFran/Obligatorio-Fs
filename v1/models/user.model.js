import mongoose from "mongoose";
const { Schema } = mongoose;

// Subdocumento para puntos por fecha asociado a un LibraryItem
// Esto es una denormalización para facilitar consultas :)
const pointsPerDateSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    libraryItem: {
      type: Schema.Types.ObjectId,
      ref: "LibraryItem",
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  plan: { type: Schema.Types.ObjectId, ref: "Plan" },
  totalPoints: { type: Number, default: 0 },
  objectivePerDay: { type: Number, default: 0 },
  libraryItems: [{ type: Schema.Types.ObjectId, ref: "LibraryItem" }],
  pointsPerDate: { type: [pointsPerDateSchema], default: [] },
  level: { type: Schema.Types.ObjectId, ref: "Level" },
  profilePictureUrl: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);
export default User;
