import express from 'express';
import dotenv from 'dotenv';
import './CONFIG/config.js'; // Ejecuta la conexión a MongoDB
import cors from 'cors';
import { buildApp } from './app.js';

//Obtiene los valores del .env
dotenv.config();

//crea el servidor
const app = express();

//Define el puerto mediante el .env
const PORT = process.env.PORT;

//endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});
app.use(cors());
const mainApp = buildApp();
app.use(mainApp);

import { jwtService } from "./SERVICES/jwt.service.js"; // asegúrate de que la ruta sea correcta

app.get("/generate-token", (req, res) => {
  const token = jwtService.generatePermanentAppToken();
  res.json({ token });
});

//inicia el servidor en el puerto
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

