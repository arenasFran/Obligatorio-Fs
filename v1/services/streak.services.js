import Streak from "../models/streak.model.js";
import User from "../models/user.model.js";
import { ServiceError } from "../utils/ServiceError.js";

function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getOrCreateStreak(userId) {
  let streak = await Streak.findOne({ userId });
  if (!streak) {
    streak = await Streak.create({ userId });
  }
  return streak;
}

async function getTodayProgressAndObjective(userId) {
  const start = startOfDay(new Date());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  // Traer objetivo y lista embebida de puntos por fecha
  const user = await User.findById(userId).select(
    "objectivePerDay pointsPerDate"
  );
  if (!user) throw new ServiceError("Usuario no encontrado", 404);

  const pagesToday = (user.pointsPerDate || [])
    .filter((p) => p?.date && p.date >= start && p.date < end)
    .reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);

  const objective = Number(user.objectivePerDay || 0);
  return { pagesToday, objective };
}

export async function checkDailyProgress(userId) {
  const { pagesToday, objective } = await getTodayProgressAndObjective(userId);

  const streak = await getOrCreateStreak(userId);
  const incremented = streak.checkProgress(pagesToday, objective);
  await streak.save();

  streak._todayProgress = pagesToday;
  streak._objectivePerDay = objective;

  return { streak: streak.getStatus(), incremented };
}

export async function getStreakStatus(userId) {
  const { pagesToday, objective } = await getTodayProgressAndObjective(userId);
  const streak = await getOrCreateStreak(userId);
  streak._todayProgress = pagesToday;
  streak._objectivePerDay = objective;

  return {
    isActive: streak.isActive,
    currentStreak: streak.currentStreak,
    bestStreak: streak.bestStreak,
    daysSinceLastCheck: streak.daysSinceLastCheck,
    progressToNextDay: streak.progressToNextDay,
    lastCheckDate: streak.lastCheckDate,
    updatedAt: streak.updatedAt,
    createdAt: streak.createdAt,
    isBroken: streak.isBroken,
    details: {
      pagesToday,
      objectiveUsed: objective,
    },
  };
}
