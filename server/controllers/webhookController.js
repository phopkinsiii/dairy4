// @ts-nocheck
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

export const handleStripeWebhook = async (req, res) => {
	console.log('⚡ Webhook route hit');
	console.log('⚡ Headers:', {
		'stripe-signature': req.headers['stripe-signature'],
		'content-type': req.headers['content-type'],
		'content-length': req.headers['content-length']
	});

	const stripe = req.stripe;
	const sig = req.headers['stripe-signature'];

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
		console.log('⚡ Webhook details:', {
			eventType: event.type,
			eventId: event.id,
			createdAt: new Date(event.created * 1000).toISOString(),
			livemode: event.livemode,
			webhookId: event.request?.id,
			webhookTimestamp: event.request?.id
		});
	} catch (err) {
		console.error('❌ Webhook signature verification error:', {
			message: err.message,
			stack: err.stack,
			type: err.type,
			details: err.details
		});
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		console.log('✅ Processing checkout.session.completed event');
		const session = event.data.object;

		// Debug payload
		console.log('📨 Session details:', {
			sessionId: session.id,
			amountTotal: session.amount_total,
			currency: session.currency,
			customer: session.customer,
			customerEmail: session.customer_email,
			livemode: session.livemode,
			metadata: session.metadata
		});

		try {
			// Validate cart data
			const cart = session.metadata.cart ? JSON.parse(session.metadata.cart) : [];
			if (!Array.isArray(cart) || cart.length === 0) {
				throw new Error('Cart is empty or invalid format');
			}

			// Validate cart items
			const invalidItems = cart.filter(item => 
				!item.name || !item.quantity || !item.price || !item.selectedSize
			);
			if (invalidItems.length > 0) {
				throw new Error('Invalid cart items detected');
			}

			// Validate metadata
			const requiredFields = ['name', 'email', 'pickupName', 'pickupLocation', 'pickupTime'];
			const missingFields = requiredFields.filter(field => 
				!session.metadata[field]
			);
			if (missingFields.length > 0) {
				throw new Error(`Missing required metadata fields: ${missingFields.join(', ')}`);
			}

			// Validate pickup time
			const pickupTime = new Date(session.metadata.pickupTime);
			if (isNaN(pickupTime.getTime())) {
				throw new Error('Invalid pickup time format');
			}

			// Create and validate order
			const order = new Order({
				guest: !session.customer,
				user: session.customer ? session.customer : undefined,
				name: session.metadata.name,
				email: session.metadata.email,
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
				pickupTime,
				stripeSessionId: session.id,
			});

			// Validate order data
			await order.validate();
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

			res.status(200).json({ message: 'Order processed successfully' });
		} catch (err) {
			console.error('❌ Failed to create order from session:', err);
			return res.status(500).send('Webhook processing failed');
		}
	}

	res.status(200).end(); // Acknowledge receipt
};
