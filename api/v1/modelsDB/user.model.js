
import mongoose from "mongoose";
const  {Schema} = mongoose;

const userSchema = new Schema({
    username : {type:String, required:true},
    password : {type:String, required:true},
    email: {type:String, required:true},
    plan: {type: Schema.Types.ObjectId, ref: "Plan"}
})

const User = mongoose.model("User", userSchema);
export default User;