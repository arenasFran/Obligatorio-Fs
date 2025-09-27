import express from "express";
import { createLibraryItemController } from "../controllers/libraryItem.controller.js";
import { validate } from "../middlewares/validate.js";
import { libraryItemSchema } from "../validators/libraryItem.validator.js";
const router = express.Router({ mergeParams: true });

router.post("/add", validate(libraryItemSchema), createLibraryItemController);
export default router;
