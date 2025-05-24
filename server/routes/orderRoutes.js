import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { getOrderBySessionId } from '../controllers/orderController.js';

const router = express.Router();

// Allow both guests and authenticated users to place an order
router.post('/', createOrder);
router.get('/session/:sessionId', getOrderBySessionId);

export default router;
