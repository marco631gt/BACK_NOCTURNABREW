import * as controller from '../CONTROLLERS/products.controller.js';
import { Router } from 'express';
import { requireAppToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

router.post('/create', requireAppToken, controller.create);
router.get('/id/:id', requireAppToken, controller.getById);
router.get('/getAll', requireAppToken, controller.getAll);
router.get('/category/:category', requireAppToken, controller.listByCategory);
router.patch('/update/:id', requireAppToken, controller.updateById);
router.get('/delete/:id', requireAppToken, controller.deleteById);

export default router;