<div className='flex flex-col flex-grow p-4'>
	<h3 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-2'>
		{product.name}
	</h3>

	<p className='text-gray-700 text-sm line-clamp-3 mb-1'>
		{product.description}
	</p>

	<Link
		to={`/products/${product._id}`}
		className='text-blue-600 text-sm hover:underline mt-1'
		onClick={(e) => e.stopPropagation()}
	>
		Read more
	</Link>

	{/* Size selector */}
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
		className='mt-auto w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
	>
		Add to Cart
	</button>
</div>
