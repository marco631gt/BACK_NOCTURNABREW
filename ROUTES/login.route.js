// ROUTES/login.routes.js
import { Router } from 'express';
import * as controller from '../CONTROLLERS/login.controller.js';
import { requireAppToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

// Protegemos con el AppToken igual que /users
router.post('/', requireAppToken, controller.login);

export default router;
