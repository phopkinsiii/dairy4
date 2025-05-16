import { useCartContext } from '../contexts/CartContext.jsx';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
	const { dispatch } = useCartContext();

	const handleAddToCart = () => {
		dispatch({
			type: 'ADD_ITEM',
			payload: {
				...product,
				quantity: 1,
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
				src={product.imageSrc}
				alt={product.imageAlt || 'Product'}
				className='w-full h-64 object-cover rounded-t-lg'
			/>

			<div className='flex flex-col flex-grow p-4'>
				<h3 className='text-xl font-semibold text-gray-900 mb-1'>
					{product.name}
				</h3>
				<p className='text-gray-700 text-sm flex-grow'>{product.description}</p>
				<p className='mt-2 text-lg font-bold text-green-700'>
					${product.price?.toFixed(2)}
				</p>

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
