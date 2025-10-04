import express from "express";
import { authenticate } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import levelRoutes from "./routes/level.routes.js";
import libraryItemRoutes from "./routes/libraryItem.routes.js";
import pointsRoutes from "./routes/points.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API v1 funcionando 🚀" });
});

router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/user", userRoutes);
router.use("/levels", levelRoutes);
router.use("/books", bookRoutes);
router.use("/library-items", libraryItemRoutes);
router.use("/collections", collectionRoutes);
router.use("/reviews", reviewRoutes);
router.use("/quotes", quoteRoutes);
router.use("/points", pointsRoutes);
export default router;
