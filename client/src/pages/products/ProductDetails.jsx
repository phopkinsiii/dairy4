// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useCartContext } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { dispatch } = useCartContext();
	const [product, setProduct] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await axiosInstance.get(`/products/${id}`);
				setProduct(res.data);
				setLoading(false);
			} catch (err) {
				setError('Product not found.');
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	const handleAddToCart = () => {
		if (!product?.priceOptions?.[selectedIndex]) return;

		const selectedOption = product.priceOptions[selectedIndex];

		dispatch({
			type: 'ADD_ITEM',
			payload: {
				...product,
				quantity: 1,
				price: selectedOption.price,
				selectedSize: selectedOption.size,
				selectedOption,
			},
		});

		toast.success(`${product.name} added to cart!`, {
			position: 'bottom-right',
			autoClose: 1200,
		});
	};

	if (loading) return <Spinner />;
	if (error)
		return <div className='text-center text-red-500 mt-20'>{error}</div>;

	return (
		<div className='max-w-7xl mx-auto px-4 py-12'>
			<button
				onClick={() => navigate('/products')}
				className='my-6 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition'
			>
				← Back to Products
			</button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
				<img
					src={`${import.meta.env.VITE_MEDIA_BASE_URL}${product.imageSrc}`}
					alt={product.imageAlt}
					loading='lazy'
					className='w-full h-auto rounded-lg shadow-md object-cover'
				/>

				<div className='space-y-4'>
					<h1 className='text-3xl font-bold text-gray-800'>{product.name}</h1>
					<p className='text-gray-700'>{product.description}</p>

					{product.priceOptions?.length > 0 && (
						<div className='mt-4'>
							<label className='block text-sm text-gray-600 mb-1'>
								Select size:
							</label>
							<select
								value={selectedIndex}
								onChange={(e) => setSelectedIndex(Number(e.target.value))}
								className='w-full border border-gray-300 rounded px-3 py-2'
							>
								{product.priceOptions.map((opt, index) => (
									<option key={index} value={index}>
										${opt.price.toFixed(2)} per {opt.size}
									</option>
								))}
							</select>
						</div>
					)}

					<button
						onClick={handleAddToCart}
						className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4'
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
