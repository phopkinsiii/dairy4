// @ts-nocheck
// server/controllers/checkoutController.js

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe Checkout session
 * Accepts: req.body.form, req.body.cartItems
 */
export const createCheckoutSession = async (req, res) => {
	try {
		const { form, cartItems } = req.body;

		if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
			return res.status(400).json({ message: 'No cart items provided' });
		}

		if (!form || !form.name || !form.pickupLocation || !form.pickupTime) {
			return res.status(400).json({ message: 'Incomplete form data' });
		}

		if (!process.env.CLIENT_URL) {
			throw new Error('CLIENT_URL not defined in environment');
		}

		// Convert items to Stripe line_items
		const lineItems = cartItems.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.name,
				},
				unit_amount: Math.round(item.selectedSize?.price * 100), // price in cents
			},
			quantity: item.quantity,
		}));

		// Metadata for webhook to reconstruct the order
		const metadata = {
			cart: JSON.stringify(
				cartItems.map((item) => ({
					productId: item._id,
					name: item.name,
					quantity: item.quantity,
					price: item.selectedSize?.price,
					selectedSize: item.selectedSize?.size,
				}))
			),
			name: form.name || '',
			email: form.email || '',
			pickupName: form.pickupName || form.name || '',
			pickupLocation: form.pickupLocation || '',
			pickupTime: form.pickupTime || '',
		};

		// Create the Stripe session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: lineItems,
			success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
			metadata,
		});

		res.status(200).json({ id: session.id });
	} catch (error) {
		console.error('❌ Stripe session error:', error);
		res.status(500).json({ message: 'Checkout session creation failed' });
	}
};
