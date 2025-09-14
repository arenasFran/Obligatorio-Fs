import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import userRoutes from "./routes/user.routes.js"
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API v1 funcionando 🚀" });
});

router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/user", userRoutes)



export default router;
