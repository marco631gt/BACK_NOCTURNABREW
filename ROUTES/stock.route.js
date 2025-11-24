import * as controller from '../CONTROLLERS/stock.controller.js';
import { Router } from 'express';
import { requireAppToken, requireUserToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

router.post('/create', requireAppToken, requireUserToken, controller.create);
router.get('/id/:id', requireAppToken, requireUserToken, controller.getById);
router.get('/getAll', requireAppToken, requireUserToken, controller.getAll);
router.patch('/update/:id', requireAppToken, requireUserToken, controller.updateStockById);
router.get('/delete/:id', requireAppToken, requireUserToken, controller.deleteById);

export default router;
