import express from "express";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
const port = process.env.Port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/v1/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

