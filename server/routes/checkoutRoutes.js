// @ts-nocheck
import express from 'express';
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();


import { createCheckoutSession } from '../controllers/checkoutController.js';

const router = express.Router();

// POST /api/checkout/create-session
router.post('/create-session', createCheckoutSession);

export default router;
