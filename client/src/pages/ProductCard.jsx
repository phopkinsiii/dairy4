// @ts-nocheck
import { useState } from 'react';
import { useCartContext } from '../contexts/CartContext.jsx';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
	const { dispatch } = useCartContext();
	const [selectedIndex, setSelectedIndex] = useState(0); // Default to first option

	const selectedOption = product.priceOptions?.[selectedIndex];
	const handleAddToCart = () => {
		if (!selectedOption) return;

		dispatch({
			type: 'ADD_ITEM',
			payload: {
				...product,
				quantity: 1,
				price: selectedOption.price, // ✅ used for subtotal
				selectedSize: selectedOption.size, // ✅ used for display/grouping
			},
		});

		toast.success(`${product.name} added to cart!`, {
			position: 'bottom-right',
			autoClose: 1200,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			theme: 'light',
			className: 'text-sm px-3 py-2 rounded shadow-md border border-green-200',
		});
	};

	return (
		<div
			className='bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col'
			style={{ fontFamily: 'Poppins, sans-serif' }}
		>
			<img
				src={`${import.meta.env.VITE_MEDIA_BASE_URL}${product.imageSrc}`}
				alt={product.imageAlt || 'Product image'}
				crossOrigin='anonymous'
				className='w-full h-64 object-cover rounded-t-lg'
			/>

			<div className='flex flex-col flex-grow p-4'>
				<h3 className='text-xl font-semibold text-gray-900 mb-1'>
					{product.name}
				</h3>
				<p className='text-gray-700 text-sm flex-grow'>{product.description}</p>

				{/* Option selector */}
				{product.priceOptions?.length > 0 && (
					<div className='mt-3'>
						<label className='block text-sm text-gray-600 mb-1'>
							Select size:
						</label>
						<select
							value={selectedIndex}
							onChange={(e) => setSelectedIndex(Number(e.target.value))}
							className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
						>
							{product.priceOptions.map((option, index) => (
								<option key={index} value={index}>
									${option.price.toFixed(2)} per {option.size}
								</option>
							))}
						</select>
					</div>
				)}

				<button
					onClick={handleAddToCart}
					className='mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
