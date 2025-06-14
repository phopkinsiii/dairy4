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
      validate: {
        validator: function (v) {
          return v && mongoose.Types.ObjectId.isValid(v);
        },
        message: 'Invalid user ID format'
      }
    },
    guest: {
      type: Boolean,
      default: false,
      validate: {
        validator: function (v) {
          return typeof v === 'boolean';
        },
        message: 'Guest must be a boolean value'
      }
    },
    name: {
      type: String,
      required: function () {
        return this.guest || !this.user;
      },
      trim: true,
      minlength: 2,
      maxlength: 100,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s'-]+$/.test(v);
        },
        message: 'Name must contain only letters, spaces, and apostrophes'
      }
    },
    email: {
      type: String,
      required: function () {
        return this.guest || !this.user;
      },
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: 'Invalid email format'
      }
    },

    cartItems: {
      type: [{
        productId: {
          type: String,
          validate: {
            validator: function (v) {
              return v ? mongoose.Types.ObjectId.isValid(v) : true;
            },
            message: 'Invalid product ID format'
          }
        },
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 100,
          validate: {
            validator: function (v) {
              return /^[a-zA-Z\s'-]+$/.test(v);
            },
            message: 'Product name must contain only letters, spaces, and apostrophes'
          }
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: function (v) {
              return Number.isInteger(v);
            },
            message: 'Quantity must be an integer'
          }
        },
        price: {
          type: Number,
          required: true,
          min: 0.01,
          validate: {
            validator: function (v) {
              return Number(v) === v && v >= 0.01;
            },
            message: 'Price must be a positive number'
          }
        },
        size: {
          type: String,
          enum: ['gallon', 'pint', 'quart', 'half-gallon'],
          validate: {
            validator: function (v) {
              return v ? /^[a-z\s-]+$/.test(v) : true;
            },
            message: 'Invalid size format'
          }
        },
        image: {
          type: String,
          validate: {
            validator: function (v) {
              if (!v) return true;
              const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
              const ext = v.toLowerCase().substring(v.lastIndexOf('.'));
              return validExtensions.includes(ext);
            },
            message: 'Invalid image file format'
          }
        }
      }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Cart must contain at least one item'
      }
    },

    pickupName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s'-]+$/.test(v);
        },
        message: 'Pickup name must contain only letters, spaces, and apostrophes'
      }
    },
    pickupLocation: {
      type: String,
      required: true,
      enum: ['Farm', 'Knoxville Market', 'Dandridge'],
      validate: {
        validator: function (v) {
          return typeof v === 'string';
        },
        message: 'Pickup location must be a string'
      }
    },
    pickupTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v);
        },
        message: 'Invalid pickup time'
      }
    },
    stripeSessionId: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? /^[a-zA-Z0-9_-]+$/.test(v) : true;
        },
        message: 'Invalid Stripe session ID format'
      }
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
