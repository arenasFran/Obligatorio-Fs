import { getAllLevelsService } from "../services/level.services.js";

export async function getAllLevelsController(req, res, next) {
  try {
    const levels = await getAllLevelsService();
    res.json(levels);
  } catch (err) {
    next(err);
  }
}
