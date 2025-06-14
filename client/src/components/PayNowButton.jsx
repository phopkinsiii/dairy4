// @ts-nocheck
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axiosInstance from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const formatPrice = (price) => `$${price.toFixed(2)}`;

const PayNowButton = ({ form, cartItems, onSuccess }) => {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		if (!form || !cartItems?.length) return;

		try {
			setLoading(true);
			const stripe = await stripePromise;

			// Debug log for Stripe cart submission
			console.log('🧾 Sending cartItems to backend:', cartItems);

			const response = await axiosInstance.post('checkout/create-session', {
				form,
				cartItems: cartItems.map(item => ({
					_id: item.productId,
					name: item.name,
					quantity: item.quantity,
					selectedOption: {
						price: item.price,
						size: item.selectedSize
					}
				})),
			});

			const sessionId = response.data?.id;
			if (!stripe || !sessionId) throw new Error('Stripe setup failed');

			const { error } = await stripe.redirectToCheckout({ sessionId });
			if (error) console.error('Stripe redirect error:', error.message);

			if (onSuccess) onSuccess(); // Clear cart + navigate to confirmation
		} catch (err) {
			console.error('❌ Error starting checkout:', err);
		} finally {
			setLoading(false);
		}
	};

	const total = cartItems.reduce(
		(sum, item) =>
			sum + (item.selectedOption?.price || 0) * (item.quantity || 1),
		0
	);

	return (
		<button
			onClick={handleClick}
			disabled={loading}
			className={`mt-4 w-full bg-indigo-600 text-white px-4 py-3 text-lg rounded hover:bg-indigo-700 transition ${
				loading ? 'opacity-50 cursor-not-allowed' : ''
			}`}
		>
			{loading ? 'Processing...' : `Pay Now (${formatPrice(total)})`}
		</button>
	);
};

export default PayNowButton;
