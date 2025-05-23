await sendOrderConfirmationEmail({
  to: session.customer_email,
  subject: 'Your Blueberry Dairy Order Confirmation',
  name: newOrder.name,
  cartItems: newOrder.cartItems,
  pickupName: newOrder.pickupName,
  pickupLocation: newOrder.pickupLocation,
  pickupTime: newOrder.pickupTime.toLocaleString(),
});

await sendOrderConfirmationEmail({
  to: process.env.ADMIN_EMAIL,
  subject: 'New Blueberry Dairy Order',
  name: newOrder.name,
  cartItems: newOrder.cartItems,
  pickupName: newOrder.pickupName,
  pickupLocation: newOrder.pickupLocation,
  pickupTime: newOrder.pickupTime.toLocaleString(),
  isAdminCopy: true,
});

