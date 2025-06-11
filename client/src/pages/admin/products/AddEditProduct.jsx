// @ts-nocheck
// src/pages/admin/products/AddEditProduct.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import ProductForm from '../../../components/products/ProductForm';
import { useUserContext } from '../../../contexts/UserContext';
import { useProductContext } from '../../../contexts/ProductContext';

const AddEditProduct = () => {
	const { id: productId } = useParams(); // If `id` is defined, we're editing
	const isEditMode = Boolean(productId);
	const navigate = useNavigate();

	const { state: userState } = useUserContext();
	const { state: productState, fetchProducts } = useProductContext();

	const [form, setForm] = useState({
		name: '',
		description: '',
		category: 'blueberries',
		imageAlt: '',
		stock: 0,
		priceOptions: [{ size: '', price: '' }],
		imageSrc: '',
	});

	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState(null);

	// Preload product if editing
	useEffect(() => {
		if (isEditMode && productState.products.length === 0) {
			fetchProducts();
		}
	}, [isEditMode, productState.products.length, fetchProducts]);

	useEffect(() => {
		if (!isEditMode) return;

		const product = productState.products.find((p) => p._id === productId);
		if (product) {
			setForm({
				...product,
				priceOptions: product.priceOptions?.length
					? product.priceOptions
					: [{ size: '', price: '' }],
			});
		}
	}, [isEditMode, productId, productState.products]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handlePriceOptionChange = (index, field, value) => {
		const updatedOptions = [...form.priceOptions];
		updatedOptions[index][field] = value;
		setForm({ ...form, priceOptions: updatedOptions });
	};

	const addPriceOption = () => {
		setForm({
			...form,
			priceOptions: [...form.priceOptions, { size: '', price: '' }],
		});
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1800,
				useWebWorker: true,
			};
			const compressedFile = await imageCompression(file, options);
			setImageFile(compressedFile);
		} catch (err) {
			console.error('Image compression failed:', err);
			setError('Image compression failed. Try a smaller file.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const token = userState.user?.token;
			let imageSrc = form.imageSrc;

			if (imageFile) {
				const formData = new FormData();
				formData.append('file', imageFile);
				formData.append(
					'upload_preset',
					import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
				);

				const uploadRes = await axios.post(
					import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
					formData
				);
				console.log('🖼️ Uploaded to Cloudinary:', uploadRes.data);
				imageSrc = uploadRes.data.secure_url;
			}

			const productData = {
				...form,
				imageSrc,
				priceOptions: form.priceOptions.map((opt) => ({
					size: opt.size,
					price: Number(opt.price),
				})),
			};

			if (isEditMode) {
				await axiosInstance.put(`/products/${productId}`, productData, {
					headers: { Authorization: `Bearer ${token}` },
				});
				alert(`✅ Product updated: ${productData.name}`);
			} else {
				const res = await axiosInstance.post('/products', productData, {
					headers: { Authorization: `Bearer ${token}` },
				});
				alert(`✅ Product created: ${res.data.newProduct.name}`);
			}

			navigate('/manage-products');
		} catch (err) {
			console.error('❌ Error saving product:', err);
			setError(err.response?.data?.message || 'Something went wrong');
		}
	};

	return (
		<ProductForm
			form={form}
			onChange={handleChange}
			onImageChange={handleImageChange}
			onPriceOptionChange={handlePriceOptionChange}
			onAddPriceOption={addPriceOption}
			onSubmit={handleSubmit}
			imageFile={imageFile}
			isEditMode={isEditMode}
			error={error}
		/>
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

export default AddEditProduct;
