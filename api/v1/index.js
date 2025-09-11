import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
dotenv.config();
const app = express();
const port = process.env.Port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/auth", authRoutes);
app.use("/v1/books", bookRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
