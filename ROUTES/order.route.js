import { Router } from "express";
import * as controller from "../CONTROLLERS/order.controller.js";
import { requireAppToken, requireUserToken } from '../MIDDLEWARE/authMiddleware.js';

const router = Router();

router.post('/create', requireAppToken, requireUserToken, controller.create);
router.get("/getAll", requireAppToken, controller.getAll);
router.get("/id/:orderId", requireAppToken, controller.getOne);
router.patch('/updateStatus/:orderId',requireAppToken,requireUserToken, controller.updateStatus);
router.delete("/delete/:orderId", requireAppToken, controller.remove);

export default router;
