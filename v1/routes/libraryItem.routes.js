import express from "express";
import {
  createLibraryItemController,
  deleteLibraryItemController,
  getLibraryItemsByCollectionController,
  getLibraryItemsByUserController,
} from "../controllers/libraryItem.controller.js";
import { validate } from "../middlewares/validate.js";
import { libraryItemSchema } from "../validators/libraryItem.validator.js";
const router = express.Router({ mergeParams: true });

router.post("/add", validate(libraryItemSchema), createLibraryItemController);
router.get(
  "/getFromcollections/:collectionId/items",
  getLibraryItemsByCollectionController
);
router.get("/user", getLibraryItemsByUserController);
router.delete("/:itemId", deleteLibraryItemController);
export default router;
