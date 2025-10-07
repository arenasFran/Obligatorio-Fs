import express from "express";
import { getBooksFromGoogle , getBooksByCategory} from "../controllers/book.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/", getBooksFromGoogle);
router.get('/category', getBooksByCategory)

export default router;
