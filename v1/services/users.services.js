import Plan from "../models/plan.model.js";
import User from "../models/user.model.js";
import { ServiceError } from "../utils/ServiceError.js";

export const saveUserService = async (newUser) => {
  const user = new User(newUser);
  await user.save();
  return user;
};

export const changeUserPlanService = async (userId, plan) => {
  if (!["plus", "premium"].includes(plan)) {
    throw new ServiceError("Solo se puede elegir plus o premium", 400);
  }

  const planExists = await Plan.findOne({ name: plan });
  if (!planExists) {
    throw new ServiceError("El plan no existe", 404);
  }

  const user = await User.findById(userId).populate("plan", "name");
  if (!user) {
    throw new ServiceError("Usuario no encontrado", 404);
  }
  if (user.plan && user.plan.name === plan) {
    throw new ServiceError(
      "No se puede cambiar el plan por un mismo plan",
      409
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { plan: planExists._id },
    { new: true }
  )
    .select("-password")
    .populate("plan", "name price maxReviews");

  return updatedUser;
};
