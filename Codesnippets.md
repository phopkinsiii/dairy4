const newOrder = new Order({
  guest: true,
  user: null,
  name: session.metadata.name || '',
  email: session.customer_email || '',
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
