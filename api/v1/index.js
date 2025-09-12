
import express from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectDb from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1/auth', authRoutes);

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    });

