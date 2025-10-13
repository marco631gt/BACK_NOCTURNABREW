import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables del archivo .env
dotenv.config();

//Obtiene las variables del .env para completar el MongoURI
const mongoURI = `mongodb+srv://${process.env.USER}:${process.env.PSW}@${process.env.CLUSTER}/`;

//Intenta conectar
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB')) //Mensaje de Conexión exitosa
  .catch(err => console.error('Error al conectar a MongoDB:', err)); //Mensaje de error

export default mongoose;
