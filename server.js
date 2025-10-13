import express from 'express';
import dotenv from 'dotenv';
import './CONFIG/config.js'; // Ejecuta la conexión a MongoDB

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

//inicia el servidor en el puerto
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

