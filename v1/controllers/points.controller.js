import {
  addPoints,
  getUserPoints,
  getUserPointsSummary,
} from "../services/points.services.js";

export async function listMyPointsController(req, res, next) {
  try {
    const { from, to } = req.query;
    const points = await getUserPoints({ userId: req.user._id, from, to });
    res.json(points);
  } catch (e) {
    next(e);
  }
}

export async function myPointsSummaryController(req, res, next) {
  try {
    const total = await getUserPointsSummary(req.user._id);
    res.json({ total });
  } catch (e) {
    next(e);
  }
}


export async function addPointsController(req, res, next) {
  try {
    const { libraryItemId, quantity, date } = req.body;
    const result = await addPoints({
      userId: req.user._id,
      libraryItemId,
      quantity,
      date,
    });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}
