import express from "express";
import { getBooksFromGoogle } from "../controllers/book.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/", getBooksFromGoogle);

export default router;
