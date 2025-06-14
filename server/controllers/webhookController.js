// @ts-nocheck
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

export const handleStripeWebhook = async (req, res) => {
	console.log('⚡ Webhook route hit');

	const stripe = req.stripe;
	const sig = req.headers['stripe-signature'];

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
		console.log(`⚡ Webhook received: ${event.type}`);
	} catch (err) {
		console.error(`❌ Webhook signature verification failed: ${err.message}`);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		console.log('✅ Processing checkout.session.completed event');
		const session = event.data.object;

		// Debug payload
		console.log('📨 Metadata:', session.metadata);

		try {
			const cart = JSON.parse(session.metadata.cart || '[]');

			const order = new Order({
				guest: !session.customer,
				name: session.metadata.name || '',
				email: session.metadata.email || '',
				cartItems: cart.map((item) => ({
					productId: item.productId,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					size: item.selectedSize,
					image: item.image || '',
				})),
				pickupName: session.metadata.pickupName,
				pickupLocation: session.metadata.pickupLocation,
				pickupTime: session.metadata.pickupTime,
				stripeSessionId: session.id,
			});

			await order.save();
			console.log(`✅ Order saved to MongoDB with ID: ${order._id}`);

			// ✅ Send email to customer
			await sendOrderConfirmationEmail({
				to: order.email,
				subject: 'Your Blueberry Dairy Order Confirmation',
				name: order.name,
				cartItems: order.cartItems,
				pickupName: order.pickupName,
				pickupLocation: order.pickupLocation,
				pickupTime: order.pickupTime,
				isAdminCopy: false,
			});

			// ✅ Send admin notification
			await sendOrderConfirmationEmail({
				to: process.env.ADMIN_EMAIL,
				subject: 'New Order Received - Blueberry Dairy',
				name: order.name,
				cartItems: order.cartItems,
				pickupName: order.pickupName,
				pickupLocation: order.pickupLocation,
				pickupTime: order.pickupTime,
				isAdminCopy: true,
			});

			console.log('📧 Confirmation emails sent to customer and admin');
		} catch (err) {
			console.error('❌ Failed to create order from session:', err);
			return res.status(500).send('Webhook processing failed');
		}
	}

	res.status(200).end(); // Acknowledge receipt
};
