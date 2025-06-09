import express from 'express';
import {
	getAllGoats,
	getGoatById,
	createGoat,
	updateGoat,
	deleteGoat,
} from '../controllers/goatController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Import limiter

const router = express.Router();

// Public routes
router.get('/', getAllGoats);
router.get('/:id', getGoatById);

// Admin-only routes with rate limiter
router.post('/', protect, adminProtect, authLimiter, createGoat);
router.put('/:id', protect, adminProtect, authLimiter, updateGoat);
router.delete('/:id', protect, adminProtect, authLimiter, deleteGoat);

export default router;
