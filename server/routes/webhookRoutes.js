// @ts-nocheck
import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// No express.raw() here — it's applied in server.js
router.post('/', handleStripeWebhook);

export default router;
