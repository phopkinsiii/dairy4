import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout/create-session
router.post('/create-session', async (req, res) => {
  const { form, cartItems } = req.body;

  console.log('📦 Incoming checkout request');
  console.log('🧾 cartItems:', cartItems);
  console.log('🙋 form:', form);

  try {
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} (${item.selectedOption?.size || 'N/A'})`,
          description: item.description?.slice(0, 150) || '',
          images: item.imageSrc
            ? [`${process.env.MEDIA_BASE_URL || 'http://localhost:5050'}${item.imageSrc}`]
            : [],
        },
        unit_amount: Math.round(item.selectedOption?.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('❌ Stripe session creation error:', err.message);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

export default router;
