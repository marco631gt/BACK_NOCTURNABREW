import * as controller from '../CONTROLLERS/products.controller.js';
import { Router } from 'express';
import { requireAppToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

router.post('/', requireAppToken, controller.create);
router.get('/id/:id', requireAppToken, controller.getById);
router.get('/name/:name', requireAppToken, controller.listByName);
router.patch('/update/:id', requireAppToken, controller.updateById);
router.get('/delete/:id', requireAppToken, controller.deleteById);

export default router;