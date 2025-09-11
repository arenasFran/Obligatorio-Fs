import express from "express";
import { createBook, listBooks } from "../controllers/book.controller.js";
import { validate } from "../middlewares/validate.js";
import { bookSchema } from "../validators/book.validator.js";

const router = express.Router({ mergeParams: true });

router.post("/", validate(bookSchema), createBook);
router.get("/", listBooks);

export default router;
