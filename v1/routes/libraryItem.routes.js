import express from "express";
import Joi from "joi";
import {
  createLibraryItemController,
  deleteLibraryItemController,
  getLibraryItemByIdController,
  getLibraryItemsByCollectionController,
  getLibraryItemsByUserAndCategoryController,
  getLibraryItemsByUserController,
  updateLibraryItemEstadoController,
  updateLibraryItemProgresoController,
} from "../controllers/libraryItem.controller.js";
import { validate } from "../middlewares/validate.js";
import { objectIdParam } from "../validators/common.js";
import { libraryItemSchema } from "../validators/libraryItem.validator.js";
const router = express.Router({ mergeParams: true });

router.post(
  "/add",
  validate({ body: libraryItemSchema }),
  createLibraryItemController
);
router.get(
  "/getFromcollections/:collectionId/items",
  validate({ params: objectIdParam("collectionId") }),
  getLibraryItemsByCollectionController
);
router.get("/user", getLibraryItemsByUserController);
router.get(
  "/user/by-category",
  validate({
    query: Joi.object({ category: Joi.string().trim().min(1).required() }),
  }),
  getLibraryItemsByUserAndCategoryController
);
router.delete(
  "/:itemId",
  validate({ params: objectIdParam("itemId") }),
  deleteLibraryItemController
);

router.get(
  "/:itemId",
  validate({ params: objectIdParam("itemId") }),
  getLibraryItemByIdController
);

router.patch(
  "/:itemId/add-pages",
  validate({
    params: Joi.object({ itemId: Joi.string().hex().length(24).required() }),
  }),
  updateLibraryItemProgresoController
);

router.patch(
  "/:itemId/estado",
  validate({
    params: objectIdParam("itemId"),
    body: Joi.object({
      estado: Joi.string().valid("NONE", "LEYENDO", "TERMINADO").required(),
    }),
  }),
  updateLibraryItemEstadoController
);
export default router;
