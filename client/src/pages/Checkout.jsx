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
				pickupLocation: 'Farm', // can make dynamic later
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

	const inputClass =
		'mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg lg:text-xl';

	return (
		<main className='lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden bg-white'>
			<h1 className='sr-only'>Checkout</h1>

			{/* Order Summary */}
			<section
				aria-labelledby='summary-heading'
				className='hidden w-full max-w-md flex-col bg-gray-50 lg:flex'
			>
				<h2 id='summary-heading' className='sr-only'>
					Order summary
				</h2>

				<ul
					role='list'
					className='flex-auto divide-y divide-gray-200 overflow-y-auto px-6'
				>
					{cartItems.map((product) => (
						<li key={product._id} className='flex space-x-6 py-6'>
							<img
								alt={product.name}
								src={product.imageSrc}
								className='size-40 flex-none rounded-md bg-gray-200 object-cover'
							/>
							<div className='flex flex-col justify-between space-y-2'>
								<div className='text-lg font-medium text-gray-900'>
									{product.name}
								</div>
								<p className='text-gray-500'>
									{product.quantity} × {formatPrice(product.price)}
								</p>
								<p className='text-gray-900'>
									{formatPrice(product.quantity * product.price)}
								</p>
							</div>
						</li>
					))}
				</ul>

				<div className='sticky bottom-0 border-t border-gray-200 bg-gray-50 p-6'>
					<dl className='space-y-4 text-lg text-gray-700'>
						<div className='flex justify-between'>
							<dt>Subtotal</dt>
							<dd className='font-semibold text-gray-900'>
								{formatPrice(subtotal)}
							</dd>
						</div>
						<div className='flex justify-between border-t border-gray-200 pt-4'>
							<dt className='text-xl font-semibold text-gray-900'>Total</dt>
							<dd className='text-xl font-semibold text-gray-900'>
								{formatPrice(subtotal)}
							</dd>
						</div>
					</dl>
				</div>
			</section>

			{/* Checkout Form */}
			<section
				aria-labelledby='payment-heading'
				className='flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-0 lg:pb-24 text-lg'
			>
				<div className='mx-auto max-w-lg'>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900'>
						Pickup & Contact Info
					</h2>

					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='email'
								className='block font-medium text-gray-700'
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
								className='block font-medium text-gray-700'
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
								className='block font-medium text-gray-700'
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
							className='w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-semibold text-lg'
						>
							Pay {formatPrice(subtotal)}
						</button>

						<p className='mt-4 text-center text-sm text-gray-500 flex items-center justify-center'>
							<LockClosedIcon
								className='w-5 h-5 mr-2 text-gray-400'
								aria-hidden='true'
							/>
							Secure pickup confirmation – no payment required
						</p>
					</form>
				</div>
			</section>
		</main>
	);
}
