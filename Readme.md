const handleClick = async () => {
	if (!form || !cartItems?.length) return;

	try {
		setLoading(true);
		const stripe = await stripePromise;

		// 🧾 Debug log to inspect cart item structure
		console.log('🧾 Cart items being sent to Stripe:', cartItems);

		// Create checkout session
		const response = await axiosInstance.post('/checkout/create-session', {
			form,
			cartItems,
		});

		const sessionId = response.data?.id;
		if (!stripe || !sessionId) throw new Error('Stripe setup failed');

		const { error } = await stripe.redirectToCheckout({ sessionId });
		if (error) console.error('Stripe redirect error:', error.message);
	} catch (err) {
		console.error('Error starting checkout:', err);
	} finally {
		setLoading(false);
	}
};
