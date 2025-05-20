// @ts-nocheck
// src/pages/Checkout.jsx
import { useCartContext } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios.js';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Checkout() {
	const navigate = useNavigate();
	const { cartItems, subtotal, dispatch } = useCartContext();

	const [form, setForm] = useState({
		email: '',
		name: '',
		pickupTime: '',
	});

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post('/orders', {
				guest: true,
				email: form.email,
				name: form.name,
				cartItems,
				pickupName: form.name,
				pickupLocation: 'Farm',
				pickupTime: form.pickupTime,
			});

			localStorage.setItem('latestOrder', JSON.stringify(response.data));
			dispatch({ type: 'CLEAR_CART' });
			navigate('/confirmation');
		} catch (error) {
			console.error('❌ Checkout failed:', error);
		}
	};

	const formatPrice = (price) => `$${price.toFixed(2)}`;

	// ✅ Truncate description to first 2 sentences
	const shortDescription = (desc) => {
		if (!desc) return '';
		const sentences = desc.split('.').filter(Boolean);
		return (
			sentences.slice(0, 1).join('. ') + (sentences.length > 1 ? '...' : '.')
		);
	};

	const inputClass =
		'readable-input mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

	return (
		<main className='flex flex-col lg:flex-row-reverse min-h-screen overflow-hidden bg-white'>
			<h1 className='sr-only'>Checkout</h1>

			{/* Order Summary (desktop only) */}
			<section
				aria-labelledby='summary-heading'
				className='hidden lg:flex w-full max-w-md flex-col bg-gray-50'
			>
				<h2 id='summary-heading' className='sr-only'>
					Order summary
				</h2>

				<ul className='flex-auto divide-y divide-gray-200 overflow-y-auto px-6'>
					{cartItems.map((product) => (
						<li key={product._id} className='flex space-x-6 py-6'>
							<img
								src={`${import.meta.env.VITE_MEDIA_BASE_URL}${product.imageSrc}`} 
								 alt={product.imageAlt || 'Product Image'}
								className='w-32 h-32 rounded-md object-cover bg-gray-200'
							/>
							<div className='flex flex-col justify-between space-y-2 text-sm sm:text-base'>
								<span className='font-medium text-gray-900'>
									{product.name}
								</span>
								<p className='text-gray-500'>
									{shortDescription(product.description)}
								</p>
								<p className='text-gray-900 font-medium'>
									{formatPrice(product.quantity * product.price)}
								</p>
							</div>
						</li>
					))}
				</ul>

				<div className='sticky bottom-0 border-t border-gray-200 bg-gray-50 p-6'>
					<dl className='space-y-4 text-sm sm:text-base text-gray-700'>
						<div className='flex justify-between'>
							<dt>Subtotal</dt>
							<dd className='font-semibold text-gray-900'>
								{formatPrice(subtotal)}
							</dd>
						</div>
						<div className='flex justify-between border-t border-gray-200 pt-4'>
							<dt className='font-semibold text-gray-900'>Total</dt>
							<dd className='font-semibold text-gray-900'>
								{formatPrice(subtotal)}
							</dd>
						</div>
					</dl>
				</div>
			</section>

			{/* Checkout Form */}
			<section className='flex-auto px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24'>
				<div className='max-w-xl mx-auto'>
					<h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
						Pickup & Contact Info
					</h2>

					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='email'
								className='block text-base sm:text-lg font-medium text-gray-700'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								required
								value={form.email}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>

						<div>
							<label
								htmlFor='name'
								className='block text-base sm:text-lg font-medium text-gray-700'
							>
								Pickup Person's Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								value={form.name}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>

						<div>
							<label
								htmlFor='pickupTime'
								className='block text-base sm:text-lg font-medium text-gray-700'
							>
								Pickup Date & Time
							</label>
							<input
								id='pickupTime'
								name='pickupTime'
								type='datetime-local'
								required
								value={form.pickupTime}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>

						<button
							type='submit'
							className='w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-semibold text-base sm:text-lg'
						>
							Confirm Pickup – {formatPrice(subtotal)}
						</button>

						<p className='mt-4 text-center text-sm text-gray-500 flex items-center justify-center'>
							<LockClosedIcon
								className='w-5 h-5 mr-2 text-gray-400'
								aria-hidden='true'
							/>
							No payment required – pickup only
						</p>
					</form>
				</div>
			</section>
		</main>
	);
}
