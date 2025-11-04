import express from 'express';
import productsRoutes from './ROUTES/products.route.js';
import userRoutes from './ROUTES/user.route.js'
import loginRoutes from './ROUTES/login.route.js';


export function buildApp() {
    const app = express();
    app.use(express.json());
    app.use('/api/products', productsRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/login', loginRoutes);
    

    return app;
}