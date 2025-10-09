import mongoose from "mongoose";
import LibraryItem from "../models/libraryItem.model.js";
import PointsPerDate from "../models/pointsPerDate.model.js";
import User from "../models/user.model.js";
import { ServiceError } from "../utils/ServiceError.js";


export async function addPoints({
  userId,
  libraryItemId,
  quantity,
  date = new Date(),
}) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new ServiceError(
      "La cantidad de puntos debe ser un número mayor a 0",
      400
    );
  }
  const lib = await LibraryItem.findById(libraryItemId);
  if (!lib) throw new ServiceError("LibraryItem no encontrado", 404);
  if (lib.userId.toString() !== userId.toString()) {
    throw new ServiceError("El libraryItem no pertenece al usuario", 403);
  }

  const points = await PointsPerDate.create({
    quantity,
    date,
    libraryItem: libraryItemId,
    user: userId,
  });

  const updated = await User.findByIdAndUpdate(
    userId,
    {
      $inc: { totalPoints: quantity },
      $push: {
        pointsPerDate: {
          quantity,
          date,
          libraryItem: libraryItemId,
        },
      },
    },
    { new: true }
  );
 
  try {
    const { checkDailyProgress } = await import("./streak.services.js");
    await checkDailyProgress(userId);
  } catch (e) {
    console.error("Error actualizando racha tras agregar puntos:", e);
  }

  try {
    const { unlockEligiblePetsForUser, reduceHungerOnReading } = await import(
      "./pet.services.js"
    );
    await unlockEligiblePetsForUser(userId);
    await reduceHungerOnReading(userId, quantity);
  } catch (e) {
    console.error("Error actualizando mascotas tras agregar puntos:", e);
  }
  return { points, user: updated };
}



export async function getUserPoints({ userId, from, to }) {
  const query = { user: userId };
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }
  return await PointsPerDate.find(query).sort({ date: -1 });
}



export async function getUserPointsSummary(userId) {
  const agg = await PointsPerDate.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$user", total: { $sum: "$quantity" } } },
  ]);
  return agg[0]?.total || 0;
}
