import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './CONFIG/config.js';
import { buildApp } from './app.js';
import { jwtService } from "./SERVICES/jwt.service.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// 🧠 Configuración CORS personalizada
app.use(cors({
  origin: '*', // o si quieres, solo "http://localhost:5173"
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'], // 👈 agrega esto
}));

// Middleware para manejar JSON
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

const mainApp = buildApp();
app.use(mainApp);

// Ruta para generar token
app.get("/generate-token", (req, res) => {
  const token = jwtService.generatePermanentAppToken();
  res.json({ token });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
