// @ts-nocheck
// server/controllers/checkoutController.js

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
	try {
		const { form, cartItems } = req.body;

		if (!cartItems?.length) {
			return res.status(400).json({ message: 'No cart items provided' });
		}

		const sanitizedCart = cartItems.map((item) => ({
			productId: item._id,
			name: item.name,
			quantity: item.quantity,
			price: item.selectedOption?.price,
			selectedSize: item.selectedOption?.size,
		}));

		const lineItems = sanitizedCart.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: `${item.name} (${item.selectedSize})`,
				},
				unit_amount: Math.round(item.price * 100),
			},
			quantity: item.quantity,
		}));

		const metadata = {
			cart: JSON.stringify(sanitizedCart),
			name: form.name || '',
			email: form.email || '',
			pickupName: form.pickupName || form.name || '',
			pickupLocation: form.pickupLocation || '',
			pickupTime: form.pickupTime || '',
		};

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: lineItems,
			success_url: `${process.env.CLIENT_URL}/confirmation?session_id=${session.id}`,
			cancel_url: `${process.env.CLIENT_URL}/checkout`,
			customer_email: form.email || '',
			metadata,
		});

		res.status(200).json({ id: session.id });
	} catch (error) {
		console.error('❌ Stripe session creation error:', error);
		res.status(500).json({ message: 'Checkout session creation failed' });
	}
};
