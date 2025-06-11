// src/components/products/AddToCartButton.jsx
const AddToCartButton = ({ product, handleAddToCart }) => {
	const outOfStock = product.stock === 0;

	const getStatusBadge = () => {
		if (outOfStock) {
			return (
				<span className='inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700'>
					Out of Stock
				</span>
			);
		}
		if (product.stock <= 3) {
			return (
				<span className='inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700'>
					Low Stock
				</span>
			);
		}
		return (
			<span className='inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700'>
				In Stock
			</span>
		);
	};

	return (
		<div className='mt-auto space-y-1'>
			{getStatusBadge()}

			<button
				onClick={() => handleAddToCart(product)}
				disabled={outOfStock}
				className={`mt-1 px-4 py-2 rounded text-white transition w-full ${
					outOfStock
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-green-600 hover:bg-green-700'
				}`}
			>
				{outOfStock ? 'Out of Stock' : 'Add to Cart'}
			</button>
		</div>
	);
};

export default AddToCartButton;
