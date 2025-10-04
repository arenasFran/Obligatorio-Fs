import {
  changeObjectivePerDayService,
  changeUserPlanService,
} from "../services/users.services.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await changeUserPlanService(
      req.user._id,
      req.body.plan
    );
    res.status(200).json({
      message: "Plan actualizado correctamente",
      user: updatedUser.plan,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

export const updateObjectivePerDay = async (req, res) => {
  try {
    const { objectivePerDay } = req.body;
    const updated = await changeObjectivePerDayService(
      req.user._id,
      objectivePerDay
    );
    res
      .status(200)
      .json({ message: "Objetivo actualizado correctamente", user: updated });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};
