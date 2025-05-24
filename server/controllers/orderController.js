// @ts-nocheck
// server/controllers/orderController.js

import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

export const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    guest,
    name,
    email,
    cartItems,
    pickupName,
    pickupLocation,
    pickupTime,
  } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  // Create and save order in MongoDB
  const order = new Order({
    user: guest ? null : userId,
    name,
    email,
    cartItems,
    pickupName,
    pickupLocation,
    pickupTime,
    guest,
  });

  const createdOrder = await order.save();

  // Send confirmation to the customer
  const customerEmailResult = await sendOrderConfirmationEmail({
    to: createdOrder.email,
    subject: 'Your Order Confirmation',
    name: createdOrder.name,
    cartItems: createdOrder.cartItems,
    pickupName: createdOrder.pickupName,
    pickupLocation: createdOrder.pickupLocation,
    pickupTime: createdOrder.pickupTime,
  });

  // Send copy to the farm owner/admin
  const adminEmailResult = await sendOrderConfirmationEmail({
    to: 'phopkins1757@gmail.com', // ✅ Update to your desired email
    subject: `New Order from ${createdOrder.name}`,
    name: createdOrder.name,
    cartItems: createdOrder.cartItems,
    pickupName: createdOrder.pickupName,
    pickupLocation: createdOrder.pickupLocation,
    pickupTime: createdOrder.pickupTime,
    isAdminCopy: true,
  });

  res.status(201).json({
    message: 'Order placed successfully',
    order: createdOrder,
    customerEmailResult,
    adminEmailResult,
  });
});

export const getOrderBySessionId = async (req, res) => {
  try {
    const {sessionId} = req.params;
    const order = await Order.findOne({stripeSessionId: sessionId})

    if(!order) {
      return res.status(404).json({message: 'Order not found'})
    }
    res.json(order);
  } catch (error) {
    console.error('❌ Error in getOrderBySessionId:', error.message)
  }
}
