
import { changeUserPlanService } from "../services/users.services.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await changeUserPlanService(req.user.id, req.body.plan);

    res.status(200).json({
      message: 'Plan actualizado correctamente',
      user: updatedUser.plan
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};