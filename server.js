import express from 'express';
import dotenv from 'dotenv';
import './CONFIG/config.js'; // Ejecuta la conexión a MongoDB
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

const mainApp = buildApp();
app.use(mainApp);

//inicia el servidor en el puerto
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

