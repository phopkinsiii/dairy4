// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext';
import axiosInstance from '../../api/axios';
import PayNowButton from '../../components/PayNowButton';
import { toast } from 'react-toastify';
import SeoHead from '../../components/SeoHead';
import Spinner from '../../components/Spinner';

const Checkout = () => {
	const { cartItems, dispatch } = useCartContext();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: '',
		name: '',
		pickupLocation: 'Farm',
		pickupTime: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCheckout = async () => {
		try {
			setLoading(true);
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
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Spinner />;

	return (
		<>
			<SeoHead
				title='Checkout | Blueberry Dairy'
				description='Finalize your order and choose your pickup details at Blueberry Dairy. Locally produced, organic farm goods always fresh.'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
				url='https://www.blueberrydairy.com/checkout'
			/>

			<div
				className='bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-20'
				style={{
					backgroundImage: `url('/images/rolling_hills.jpg')`,
					fontFamily: `'Lora', serif`,
				}}
			>
				<div className='bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-2xl max-w-3xl w-full'>
					<h2 className='text-4xl font-bold text-stone-800 mb-6 text-center'>
						Complete Your Order
					</h2>

					<form onSubmit={(e) => e.preventDefault()} className='grid gap-6'>
						<input
							name='email'
							type='email'
							value={form.email}
							onChange={handleChange}
							placeholder='Email Address'
							required
							className='w-full border border-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<input
							name='name'
							value={form.name}
							onChange={handleChange}
							placeholder='Pickup Name'
							required
							className='w-full border border-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<select
							name='pickupLocation'
							value={form.pickupLocation}
							onChange={handleChange}
							className='w-full border border-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						>
							<option value='Farm'>Farm</option>
							<option value='Market Stand'>Market Stand</option>
							<option value='Local Delivery'>Local Delivery</option>
						</select>

						<input
							type='datetime-local'
							name='pickupTime'
							value={form.pickupTime}
							onChange={handleChange}
							className='w-full border border-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<div className='flex justify-end mt-4'>
							<PayNowButton
								form={form}
								cartItems={cartItems}
								onSuccess={handleCheckout}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Checkout;
