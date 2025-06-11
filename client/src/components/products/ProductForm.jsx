// src/components/products/ProductForm.jsx
const ProductForm = ({
	form,
	onChange,
	onImageChange,
	onPriceOptionChange,
	onAddPriceOption,
	onSubmit,
	imageFile,
	isEditMode,
	error,
}) => {
	return (
		<div className='max-w-xl mx-auto p-6 bg-white shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>
				{isEditMode ? 'Edit Product' : 'Add New Product'}
			</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}

			<form onSubmit={onSubmit} className='space-y-4'>
				<InputField
					label='Product Name'
					name='name'
					value={form.name}
					onChange={onChange}
				/>
				<InputField
					label='Description'
					name='description'
					value={form.description}
					onChange={onChange}
				/>
				<InputField
					label='Alt Text'
					name='imageAlt'
					value={form.imageAlt}
					onChange={onChange}
				/>
				<InputField
					label='Stock Quantity'
					name='stock'
					type='number'
					value={form.stock}
					onChange={onChange}
				/>

				<div>
					<label className='block mb-1 font-medium'>Category</label>
					<select
						name='category'
						value={form.category}
						onChange={onChange}
						className='w-full border px-3 py-2 rounded'
					>
						<option value='blueberries'>Blueberries</option>
						<option value='apples'>Apples</option>
						<option value='dairy'>Dairy</option>
						<option value='goats'>Goats</option>
					</select>
				</div>

				<div>
					<label className='block mb-1 font-medium'>Product Image</label>
					<input type='file' accept='image/*' onChange={onImageChange} />
					{form.imageSrc && !imageFile && (
						<img
							src={form.imageSrc}
							alt={form.imageAlt}
							className='mt-2 w-full h-auto rounded'
						/>
					)}
				</div>

				<div>
					<label className='block mb-2 font-medium'>Price Options</label>
					{form.priceOptions.map((opt, index) => (
						<div key={index} className='flex gap-2 mb-2'>
							<select
								value={opt.size}
								onChange={(e) =>
									onPriceOptionChange(index, 'size', e.target.value)
								}
								className='border px-2 py-1 rounded w-1/2'
							>
								<option value=''>Select Size</option>
								<option value='pint'>Pint</option>
								<option value='quart'>Quart</option>
								<option value='half-gallon'>Half Gallon</option>
								<option value='gallon'>Gallon</option>
								<option value='package'>Package</option>
								<option value='each'>Each</option>
								<option value='lb'>Pound (lb)</option>
							</select>
							<input
								type='number'
								placeholder='Price'
								value={opt.price}
								onChange={(e) =>
									onPriceOptionChange(index, 'price', e.target.value)
								}
								className='border px-2 py-1 rounded w-1/2'
							/>
						</div>
					))}
					<button
						type='button'
						onClick={onAddPriceOption}
						className='text-sm text-blue-600 hover:underline'
					>
						+ Add another price option
					</button>
				</div>

				<button
					type='submit'
					className='w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
				>
					{isEditMode ? 'Save Changes' : 'Add Product'}
				</button>
			</form>
		</div>
	);
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
	<div>
		<label htmlFor={name} className='block font-medium mb-1'>
			{label}
		</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className='w-full border px-3 py-2 rounded'
			required
		/>
	</div>
);

export default ProductForm;
