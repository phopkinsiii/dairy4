// routes/webhookRoutes.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use raw body parser ONLY for this route
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log('✅ Payment succeeded:', session.id);

      const metadata = session.metadata
        ? JSON.parse(session.metadata.orderData || '{}')
        : {};

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
    } else {
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  }
);

export default router;
