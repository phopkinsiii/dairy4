import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow both guests and authenticated users to place an order
router.post('/', createOrder);

export default router;
