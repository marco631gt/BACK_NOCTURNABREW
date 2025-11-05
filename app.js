import express from 'express';
import productsRoutes from './ROUTES/products.route.js';
import userRoutes from './ROUTES/user.route.js'
import loginRoutes from './ROUTES/login.route.js';
import cors from 'cors';


export function buildApp() {
    const app = express();

    app.use(cors({
      origin: ["http://localhost:5173"],
      credentials: true, 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'], // 👈 agrega esto
    }));

    app.use(express.json());
    app.use('/api/products', productsRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/login', loginRoutes);
    

    return app;
}