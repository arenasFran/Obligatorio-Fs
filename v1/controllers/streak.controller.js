import {
  checkDailyProgress,
  getStreakStatus,
} from "../services/streak.services.js";

export const getStatus = async (req, res) => {
  try {
    const status = await getStreakStatus(req.user._id);
    res.status(200).json(status);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

export const checkProgress = async (req, res) => {
  try {
    const result = await checkDailyProgress(req.user._id);
    res
      .status(200)
      .json({
        message: result.incremented ? "Racha incrementada" : "Sin cambios",
        streak: result.streak,
      });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};
