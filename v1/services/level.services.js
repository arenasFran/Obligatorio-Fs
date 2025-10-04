import Level from "../models/level.model.js";

function mapLevelToDetails(levelDoc, { overrideUnlocked } = {}) {
  return {
    code: levelDoc.codeLevel,
    name: levelDoc.name,
    desc: levelDoc.description,
    image: levelDoc.ImageUrl,
    total: levelDoc.totalPointsRequired,
    isUnlocked:
      typeof overrideUnlocked === "boolean"
        ? overrideUnlocked
        : Boolean(levelDoc.isUnlocked),
  };
}

export async function getAllLevelsService() {
  const levels = await Level.find().sort({ codeLevel: 1 });
  return levels.map((lvl) => mapLevelToDetails(lvl));
}
