import * as controller from '../CONTROLLERS/products.controller.js';
import { Router } from 'express';
import { requireAppToken, requireUserToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

router.post('/create', requireAppToken, requireUserToken, controller.create);
router.get('/id/:id', requireAppToken, requireUserToken, controller.getById);
router.get('/getAll', requireAppToken, requireUserToken, controller.getAll);
router.get('/category/:category', requireAppToken, requireUserToken, controller.listByCategory);
router.patch('/update/:id', requireAppToken, requireUserToken, controller.updateById);
router.get('/delete/:id', requireAppToken, requireUserToken, controller.deleteById);

export default router;
