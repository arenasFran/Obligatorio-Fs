import express from "express";
import {
  listPetsController,
  recalcHungerController,
  selectPetController,
  selectedPetStatusController,
} from "../controllers/pet.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", listPetsController);
router.get("/selected", selectedPetStatusController);
router.post("/selected/recalc", recalcHungerController);
router.post("/select/:petId", selectPetController);

export default router;
