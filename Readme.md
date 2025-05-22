if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  console.log('✅ Stripe Webhook: checkout.session.completed received');
  console.log('📦 Session metadata:', session.metadata);

  let cartItems = [];

  try {
    cartItems = JSON.parse(session.metadata.cart || '[]');
    console.log('🧾 Parsed cartItems:', cartItems); // <== This should show all items
  } catch (err) {
    console.error('❌ Error parsing cart items:', err.message);
  }

  const newOrder = new Order({
    guest: true,
    name: session.metadata.name || '',
    email: session.customer_email || session.metadata.email || '',
    cartItems: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.selectedSize,
    })),
    pickupName: session.metadata.pickupName || '',
    pickupLocation: session.metadata.pickupLocation || 'Farm',
    pickupTime: new Date(session.metadata.pickupTime),
    stripeSessionId: session.id,
  });

  try {
    await newOrder.save();
    console.log('📝 Order saved:', newOrder._id);
  } catch (err) {
    console.error('❌ Failed to save order:', err.message);
  }
}

cartItems: [
  {
    productId: String,
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: String,
    image: String,
  },
],
