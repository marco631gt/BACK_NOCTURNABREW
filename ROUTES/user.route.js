import * as controller from '../CONTROLLERS/user.controller.js';
import { Router } from 'express';
import { requireAppToken } from '../MIDDLEWARE/authMiddleware.js';
import { createUser } from '../SERVICES/user.service.js';

const router = Router();

router.post('/create', requireAppToken, controller.create);
router.get('/getAll', requireAppToken, controller.getAll);
router.get('/email/:email', requireAppToken, controller.getByEmail);
router.patch('/update/:email', requireAppToken, controller.updateByEmail);
router.get('/delete/:email', requireAppToken, controller.deleteByEmail);

export default router;
