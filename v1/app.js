import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import connectDb from "./config/db.js";
import v1Routes from "./index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

dotenv.config();
connectDb();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Demasiadas peticiones, intente más tarde.",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: "Too many requests",
      limit: options.max,
      windowMs: options.windowMs,
      retryAfter: Math.ceil(options.windowMs / 1000) + "s",
    });
  },
});

app.use(limiter);
app.get("/", (req, res) => {
  res.json({ respuesta: "vercel" });
});
app.use("/v1", v1Routes);


app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
