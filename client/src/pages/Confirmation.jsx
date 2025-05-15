// @ts-nocheck
// src/pages/Confirmation.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
	const navigate = useNavigate();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		try {
			const stored = localStorage.getItem('latestOrder');
			if (!stored) {
				navigate('/');
				return;
			}

			const parsed = JSON.parse(stored);
			setOrder(parsed);
		} catch (err) {
			console.error('❌ Failed to parse order from localStorage:', err);
			navigate('/');
		}
	}, [navigate]);

	if (!order) return null;

	const { pickupName, pickupLocation, pickupTime } = order.order || {};

	const formattedTime = pickupTime
		? new Date(pickupTime).toLocaleString(undefined, {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
		  })
		: 'Not specified';

	return (
		<div className='max-w-2xl mx-auto px-6 py-16 text-center text-gray-800'>
			<h1 className='text-3xl font-bold mb-6'>Thank You for Your Order!</h1>

			<p className='text-lg mb-4'>
				<strong>Pickup Name:</strong> {pickupName || 'N/A'}
			</p>

			<p className='text-lg mb-4'>
				<strong>Pickup Location:</strong> {pickupLocation || 'N/A'}
			</p>

			<p className='text-lg mb-6'>
				<strong>Pickup Time:</strong> {formattedTime}
			</p>

			<p className='text-md text-green-700 font-semibold'>
				✅ Your order was placed successfully. Check your email for
				confirmation.
			</p>
		</div>
	);
}
