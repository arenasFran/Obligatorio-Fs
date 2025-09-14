import express from "express";
import dotenv from "dotenv";
import connectDb from "./api/v1/config/db.js";
import v1Routes from "./api/v1/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb()
  .then(() => {
    app.use("/v1", v1Routes);

    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ No se pudo conectar a la base de datos:", error);
    process.exit(1);
  });

export default app;
