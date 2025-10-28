import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Build MongoDB connection string
const mongoURI = `mongodb+srv://${process.env.USER}:${process.env.PSW}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    console.log('📦 Base de datos:', mongoose.connection.name);
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

export default mongoose;
