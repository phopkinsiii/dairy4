// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import axiosInstance from '../api/axios';
import PayNowButton from '../components/PayNowButton';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, dispatch } = useCartContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    name: '',
    pickupLocation: 'Farm',
    pickupTime: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post('/orders', {
        guest: true,
        email: form.email,
        name: form.name,
        cartItems,
        pickupName: form.name,
        pickupLocation: form.pickupLocation,
        pickupTime: form.pickupTime,
      });

      dispatch({ type: 'CLEAR_CART' });

      toast.success('Order placed! Redirecting...');
      navigate('/confirmation', { state: response.data });
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Pickup Name"
          required
          className="w-full border rounded px-3 py-2"
        />

        <select
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Farm">Farm</option>
          <option value="Market Stand">Market Stand</option>
          <option value="Local Delivery">Local Delivery</option>
        </select>

        <input
          type="datetime-local"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mt-6">
        <PayNowButton form={form} cartItems={cartItems} onSuccess={handleCheckout} />
      </div>
    </div>
  );
};

export default Checkout;
