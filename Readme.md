// @ts-nocheck
import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PayNowButton = ({ pickupDetails }) => {
  const { cartItems } = useCartContext();
  const { state: userState } = useUserContext();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post('/checkout/create-session', {
        items: cartItems,
        customer: {
          name: pickupDetails.name,
          email: userState.user?.email || 'guest@example.com',
        },
        pickup: {
          location: pickupDetails.location,
          dateTime: pickupDetails.dateTime,
        },
      });

      window.location.href = response.data.url;
    } catch (err) {
      console.error('❌ Stripe checkout error:', err);
      toast.error('Failed to start checkout. Please try again.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className='w-full bg-green-600 text-white font-medium py-3 px-4 rounded-md hover:bg-green-700 transition'
    >
      Pay Now
    </button>
  );
};

export default PayNowButton;
