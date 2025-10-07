import mongoose from "mongoose";
import seedCollectionsForUsers from "../initCollections.js";
import seedLevels from "../initLevels.js";
import { initPets } from "../initPets.js";
import seedPlans from "../initPlans.js";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_DEV);
    await seedPlans();
    await seedLevels();
    await initPets();
    await seedCollectionsForUsers();
    console.log("Base de datos on");
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export default connectDb;
