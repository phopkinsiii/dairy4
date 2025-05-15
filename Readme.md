const sendOrderConfirmationEmail = async ({
  to,
  subject,
  name,
  cartItems = [],
  pickupName,
  pickupLocation,
  pickupTime,
  isAdminCopy = false,
}) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div>
      <h2>Order Confirmation</h2>
      <p>Hi ${name}, thank you for your order.</p>

      <h3>Pickup Info:</h3>
      <ul>
        <li><strong>Name:</strong> ${pickupName}</li>
        <li><strong>Location:</strong> ${pickupLocation}</li>
        <li><strong>Time:</strong> ${pickupTime}</li>
      </ul>

      <h3>Items:</h3>
      <ul>
        ${
          cartItems && Array.isArray(cartItems)
            ? cartItems.map(
                (item) => `<li>${item.quantity} × ${item.name} — $${item.price.toFixed(2)}</li>`
              ).join('')
            : '<li>No items found</li>'
        }
      </ul>

      <p>We'll see you soon!</p>
    </div>
  `;

  return await resend.emails.send({
    from: 'Blueberry Dairy <orders@yourdomain.com>',
    to,
    subject,
    html,
  });
};
