import express from "express";
import { authenticate } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import libraryItemRoutes from "./routes/libraryItem.routes.js";
import userRoutes from "./routes/user.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API v1 funcionando 🚀" });
});

router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/user", userRoutes);
router.use("/books", bookRoutes);
router.use("/library-items", libraryItemRoutes);
router.use("/collections", collectionRoutes);
export default router;
