import User from "../ModelsDB/user.model.js";
import Plan from "../ModelsDB/plan.model.js";
import { changeUserPlanService } from "../services/users.services.js";

export const updateUser = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!['plus', 'premium'].includes(plan)) {
      return res.status(400).json({ error: 'Solo se puede elegir plus o premium' });
    }

    const planExists = await Plan.findOne({ name: plan });
    if (!planExists) {
      return res.status(400).json({ error: 'El plan no existe' });
    }

    const updatedUser = await changeUserPlanService(userId, plan);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Plan actualizado correctamente',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};
