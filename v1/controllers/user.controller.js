import {
  changeObjectivePerDayService,
  changeUserPlanService,
  getUserLevelService,
  getUserByIdService
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

export const getMyLevel = async (req, res) => {
  try {
    const level = await getUserLevelService(req.user._id);
    res.status(200).json(level);
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

export const getMyProfile = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user._id);
    res.status(200).json(user); // el service ya excluye password
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

