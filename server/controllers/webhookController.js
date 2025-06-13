// @ts-nocheck
// server/controllers/webhookController.js

import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// ✅ Stripe requires raw body; already handled in server.js route
export const handleStripeWebhook = asyncHandler(async (req, res) => {
	const stripe = req.stripe;
	const sig = req.headers['stripe-signature'];

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		console.error('❌ Webhook signature verification failed:', err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	// ✅ Process only relevant event
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;

		// ✅ Access metadata directly
		const metadata = session.metadata || {};
		console.log('⚡ Webhook received: checkout.session.completed');
		console.log('📨 Metadata:', metadata);

		try {
			const cartItems = JSON.parse(metadata.cart || '[]');

			const newOrder = new Order({
				guest: true,
				name: metadata.name,
				email: metadata.email,
				cartItems,
				pickupName: metadata.pickupName,
				pickupLocation: metadata.pickupLocation,
				pickupTime: metadata.pickupTime,
				stripeSessionId: session.id,
			});

			await newOrder.save();
			console.log('✅ Order saved to MongoDB for session:', session.id);
		} catch (error) {
			console.error('❌ Failed to create order from session:', error);
			return res.status(500).json({ message: 'Failed to save order' });
		}
	} else {
		console.warn(`⚠️ Unhandled Stripe event type: ${event.type}`);
		console.log('🔍 Full event payload:', event);
	}

	res.status(200).send();
});
