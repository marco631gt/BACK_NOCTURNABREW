import * as controller from '../CONTROLLERS/products.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/', controller.create);
router.get('/id/:id',controller.getById);
router.get('/name/:name', controller.listByName);
router.patch('/update/:id', controller.updateById);
router.get('/delete/:id', controller.deleteById);

export default router;