import mongoose from 'mongoose'
import seedPlans from "../initPlans.js";
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI_DEV)
        await seedPlans();
        console.log("Base de datos on")
    }
    catch(error){
        console.log("error", error)
        throw error;
    }
}

export default connectDb;