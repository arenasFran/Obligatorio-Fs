import express from "express";
import {
  createQuoteController,
  deleteQuoteController,
  getQuotesByLibraryItemController,
  updateQuoteController,
} from "../controllers/quote.controller.js";
import { validate } from "../middlewares/validate.js";
import { objectIdParam } from "../validators/common.js";
import { quoteEditSchema, quoteSchema } from "../validators/quote.validator.js";

const router = express.Router({ mergeParams: true });

// Listar citas de un libro
router.get(
  "/library-item/:libraryItemId",
  validate({ params: objectIdParam("libraryItemId") }),
  getQuotesByLibraryItemController
);

// Agregar cita
router.post("/", validate({ body: quoteSchema }), createQuoteController);

router.put(
  "/:quoteId",
  validate({ params: objectIdParam("quoteId"), body: quoteEditSchema }),
  updateQuoteController
);

router.delete(
  "/:quoteId",
  validate({ params: objectIdParam("quoteId") }),
  deleteQuoteController
);

export default router;
