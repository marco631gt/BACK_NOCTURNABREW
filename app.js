import express from 'express';
import productsRoutes from './ROUTES/products.route.js';

export function buildApp() {
    const app = express();
    app.use(express.json());
    app.use('/api/products', productsRoutes);

    return app;
}