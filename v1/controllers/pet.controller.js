import {
  getSelectedPetStatus,
  listPetsWithStatus,
  recalcSelectedPetHunger,
  selectPet,
} from "../services/pet.services.js";

export async function listPetsController(req, res, next) {
  try {
    const data = await listPetsWithStatus(req.user._id);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function selectPetController(req, res, next) {
  try {
    const { petId } = req.params;
    const pet = await selectPet(req.user._id, petId);
    res.json(pet);
  } catch (e) {
    next(e);
  }
}

export async function selectedPetStatusController(req, res, next) {
  try {
    const status = await getSelectedPetStatus(req.user._id);
    if (!status) return res.status(204).send();
    res.json(status);
  } catch (e) {
    next(e);
  }
}

export async function recalcHungerController(req, res, next) {
  try {
    const data = await recalcSelectedPetHunger(req.user._id);
    if (!data) return res.status(204).send();
    res.json(data);
  } catch (e) {
    next(e);
  }
}
