import Order from '../models/orderModel.js';

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  console.log('✅ Payment succeeded:', session.id);

  // Optional: Parse metadata if you passed extra data via session
  const metadata = session.metadata ? JSON.parse(session.metadata.orderData || '{}') : {};

  // Create and save the order
  const newOrder = new Order({
    guest: true,
    name: metadata.name || '',
    email: session.customer_email || '',
    cartItems: metadata.cartItems || [],
    pickupName: metadata.pickupName || '',
    pickupLocation: metadata.pickupLocation || 'Farm',
    pickupTime: metadata.pickupTime || new Date(),
  });

  try {
    await newOrder.save();
    console.log('📝 Order saved to MongoDB:', newOrder._id);
  } catch (err) {
    console.error('❌ Failed to save order:', err.message);
  }
}
