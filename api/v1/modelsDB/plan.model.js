
import mongoose from "mongoose";  
const { Schema } = mongoose;      

const planSchema = new Schema({
  name: { type: String, enum: ["plus", "premium"], required: true },
  price: { type: Number, default: 0 },
  maxReviews: { type: Number, default: 0 }
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
