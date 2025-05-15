// @ts-nocheck
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return !this.guest;
      },
    },
    guest: {
      type: Boolean,
      default: false,
    },
    name: String,
    email: String,
    cartItems: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    pickupName: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
      enum: ['Farm', 'Knoxville Market', 'Dandridge'], // Extendable list
    },
    pickupTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
