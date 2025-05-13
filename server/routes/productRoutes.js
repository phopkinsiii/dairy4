import express from 'express';
import {
	getAllProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/productController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

//Public Routes - read only
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

//Admin Routes
router.post('/', protect, adminProtect, createProduct);
router.put('/:id', protect, adminProtect, updateProduct);
router.delete('/:id', protect, adminProtect, deleteProduct);

export default router;
