import * as controller from '../CONTROLLERS/user.controller.js';
import { Router } from 'express';
import { requireAppToken } from '../MIDDLEWARE/authMiddleware.js';
import { createUser } from '../SERVICES/user.service.js';

const router = Router();

router.post('/', requireAppToken, controller.create);

export default router;
