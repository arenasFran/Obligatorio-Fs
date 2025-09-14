import User from "../ModelsDB/user.model.js"
import Plan from "../ModelsDB/plan.model.js";

export const saveUserService= async (newUser)=>{

    const user = new User(newUser) 
    await user.save();
    return user;
}


export const changeUserPlanService = async (userId, plan) => {
  if (!["plus", "premium"].includes(plan)) {
    throw new Error("Solo se puede elegir plus o premium");
  }

  const planExists = await Plan.findOne({ name: plan });
  if (!planExists) {
    throw new Error("El plan no existe");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { plan },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new Error("Usuario no encontrado");
  }

  return updatedUser;
};