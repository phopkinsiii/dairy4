const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  line_items,
  success_url: 'https://www.blueberrydairy.com/confirmation?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://www.blueberrydairy.com/checkout',
  metadata: {
    // ...
  },
});
