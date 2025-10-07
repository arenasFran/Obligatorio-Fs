import mongoose from "mongoose";
import Pet from "../models/pet.model.js";
import User from "../models/user.model.js";
import { ServiceError } from "../utils/ServiceError.js";

const HUNGER_REDUCTION_PER_PAGE = 0.5; // 2 páginas = -1 hambre
const HUNGER_MIN = 0;
const HUNGER_MAX = 100;

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

export async function unlockEligiblePetsForUser(userId) {
  const user = await User.findById(userId).select("totalPoints unlockedPets");
  if (!user) throw new ServiceError("Usuario no encontrado", 404);

  const eligiblePets = await Pet.find({
    totalPointsRequired: { $lte: user.totalPoints },
  }).select("_id");

  const already = new Set(user.unlockedPets.map((id) => id.toString()));
  const toAdd = eligiblePets
    .map((p) => p._id.toString())
    .filter((id) => !already.has(id));

  if (toAdd.length > 0) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        unlockedPets: {
          $each: toAdd.map((id) => new mongoose.Types.ObjectId(id)),
        },
      },
    });
  }
  return toAdd;
}

// Recalcula el hambre en base al tiempo transcurrido y el costo por hora de la mascota seleccionada
export async function recalcSelectedPetHunger(userId) {
  const user = await User.findById(userId)
    .select("selectedPet selectedPetHunger selectedPetLastUpdate")
    .populate("selectedPet");
  if (!user || !user.selectedPet) return null;

  const pet = user.selectedPet; // poblada
  const last = user.selectedPetLastUpdate
    ? new Date(user.selectedPetLastUpdate)
    : null;
  const now = new Date();

  let hunger = user.selectedPetHunger ?? 0;
  if (last) {
    const elapsedMs = now.getTime() - last.getTime();
    if (elapsedMs > 0) {
      const hours = elapsedMs / (1000 * 60 * 60);
      const inc = (pet.hungryCostPerHour ?? 1) * hours;
      hunger = clamp(hunger + inc, HUNGER_MIN, HUNGER_MAX);
    }
  }

  await User.findByIdAndUpdate(userId, {
    selectedPetHunger: hunger,
    selectedPetLastUpdate: now,
  });
  return { hunger, happiness: 100 - hunger, petId: pet._id };
}

// Reduce hambre al agregar páginas leídas
export async function reduceHungerOnReading(userId, pages) {
  if (!Number.isFinite(pages) || pages <= 0) return null;
  // Primero recalculamos para acumular el paso del tiempo
  const recalced = await recalcSelectedPetHunger(userId);
  if (!recalced) return null;
  let hunger = recalced.hunger;
  hunger = clamp(
    hunger - pages * HUNGER_REDUCTION_PER_PAGE,
    HUNGER_MIN,
    HUNGER_MAX
  );
  await User.findByIdAndUpdate(userId, {
    selectedPetHunger: hunger,
    selectedPetLastUpdate: new Date(),
  });
  return { hunger, happiness: 100 - hunger };
}

export async function listPetsWithStatus(userId) {
  // Asegurar desbloqueos actualizados antes de listar
  try {
    await unlockEligiblePetsForUser(userId);
  } catch {}
  const [user, pets] = await Promise.all([
    User.findById(userId).select(
      "unlockedPets selectedPet selectedPetHunger selectedPetLastUpdate"
    ),
    Pet.find({}).lean(),
  ]);
  if (!user) throw new ServiceError("Usuario no encontrado", 404);

  const unlocked = new Set(user.unlockedPets?.map((id) => id.toString()) || []);
  const list = pets.map((p) => ({
    ...p,
    isUnlocked: unlocked.has(p._id.toString()) || p.isUnlocked || false,
    isSelected: user.selectedPet?.toString() === p._id.toString(),
  }));

  return list;
}

export async function selectPet(userId, petId) {
  if (!mongoose.isValidObjectId(petId)) {
    throw new ServiceError("petId inválido", 400);
  }
  const [user, pet] = await Promise.all([
    User.findById(userId).select("unlockedPets selectedPet selectedPetHunger"),
    Pet.findById(petId),
  ]);
  if (!user) throw new ServiceError("Usuario no encontrado", 404);
  if (!pet) throw new ServiceError("Mascota no encontrada", 404);
  const hasUnlocked = user.unlockedPets?.some(
    (id) => id.toString() === petId.toString()
  );
  if (!hasUnlocked && !pet.isUnlocked) {
    throw new ServiceError("No has desbloqueado esta mascota", 403);
  }
  const now = new Date();
  await User.findByIdAndUpdate(userId, {
    selectedPet: pet._id,
    selectedPetLastUpdate: now,
    selectedPetHunger: 0,
  });
  return pet;
}

export async function getSelectedPetStatus(userId) {
  const user = await User.findById(userId)
    .select("selectedPet selectedPetHunger selectedPetLastUpdate")
    .populate("selectedPet");
  if (!user || !user.selectedPet) return null;
  const recalced = await recalcSelectedPetHunger(userId);
  const pet = await Pet.findById(user.selectedPet._id).lean();
  return {
    pet,
    hunger: recalced?.hunger ?? user.selectedPetHunger ?? 0,
    happiness: recalced
      ? recalced.happiness
      : 100 - (user.selectedPetHunger ?? 0),
    lastUpdate: new Date(),
  };
}
