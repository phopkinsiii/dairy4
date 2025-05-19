// server/routes/checkoutRoutes.js
import express from 'express';
import { createCheckoutSession } from '../controllers/checkoutController.js';
import { validateCheckout } from '../middleware/validators/checkoutValidator.js';

const router = express.Router();

router.post(
	'/create-checkout-session',
	validateCheckout,
	createCheckoutSession
);

export default router;
