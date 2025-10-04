import express from "express";
import {
  createQuoteController,
  deleteQuoteController,
  getQuotesByLibraryItemController,
  updateQuoteController,
} from "../controllers/quote.controller.js";
import { validate } from "../middlewares/validate.js";
import { quoteSchema } from "../validators/quote.validator.js";

const router = express.Router({ mergeParams: true });

// Listar citas de un libro
router.get("/library-item/:libraryItemId", getQuotesByLibraryItemController);

// Agregar cita
router.post("/", validate(quoteSchema), createQuoteController);

// Editar cita
router.put("/:quoteId", validate(quoteSchema), updateQuoteController);

// Eliminar cita
router.delete("/:quoteId", deleteQuoteController);

export default router;
