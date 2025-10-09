import express from "express";
import {
  listPetsController,
  recalcHungerController,
  selectPetController,
  selectedPetStatusController,
} from "../controllers/pet.controller.js";
import { validate } from "../middlewares/validate.js";
import { objectIdParam } from "../validators/common.js";

const router = express.Router({ mergeParams: true });

router.get("/", listPetsController);
router.get("/selected", selectedPetStatusController);
router.post("/selected/recalc", recalcHungerController);
router.post(
  "/select/:petId",
  validate({ params: objectIdParam("petId") }),
  selectPetController
);

export default router;
