// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useUserContext } from '../../../contexts/UserContext';
import { useGoatContext } from '../../../contexts/GoatContext';

const EditGoat = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state } = useUserContext();
	const { fetchGoats } = useGoatContext();
	const [goat, setGoat] = useState(null);
	const [newImages, setNewImages] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const { data } = await axiosInstance.get(`/goats/${id}`);

				// Format ISO date to YYYY-MM-DD for <input type="date" />
				const formattedDOB = data.dob ? data.dob.split('T')[0] : '';

				setGoat({ ...data, dob: formattedDOB });
			} catch (err) {
				console.error('Error fetching goat:', err);
			}
		};
		fetchGoat();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (!goat) return;

		if (name in goat.pedigree) {
			setGoat({ ...goat, pedigree: { ...goat.pedigree, [name]: value } });
		} else if (type === 'checkbox') {
			setGoat({ ...goat, [name]: checked });
		} else {
			setGoat({ ...goat, [name]: value });
		}
	};

	const handleAwardsChange = (index, value) => {
		const updated = [...goat.awards];
		updated[index] = value;
		setGoat({ ...goat, awards: updated });
	};

	const addAward = () => {
		setGoat({ ...goat, awards: [...goat.awards, ''] });
	};

	const removeImage = (index) => {
		const updated = goat.images.filter((_, i) => i !== index);
		setGoat({ ...goat, images: updated });
	};

	const handleImageUpload = async (e) => {
		const files = Array.from(e.target.files);
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1200,
			useWebWorker: true,
		};

		try {
			const compressed = await Promise.all(
				files.map((file) => imageCompression(file, options))
			);
			setNewImages(compressed);
		} catch (err) {
			console.error(err);
			setError('Image compression failed.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = state.user?.token;

		try {
			let uploadedUrls = [];
			for (const file of newImages) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append(
					'upload_preset',
					import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
				);

				const res = await axios.post(
					import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
					formData
				);
				uploadedUrls.push(res.data.secure_url);
			}

			const updatedGoat = {
				...goat,
				images: [...goat.images, ...uploadedUrls],
				price: goat.forSale ? Number(goat.price) : null,
			};

			await axiosInstance.put(`/goats/${id}`, updatedGoat, {
				headers: { Authorization: `Bearer ${token}` },
			});

			await fetchGoats(); // ✅ Refetch goats before redirect

			alert('Goat updated successfully!');
			navigate('/manage-goats'); // ✅ Use correct route (no /admin if not needed)
		} catch (err) {
			console.error(err);
			setError('Failed to update goat.');
		}
	};

	if (!goat) return <div className='p-6'>Loading goat data...</div>;

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white shadow rounded-lg'>
			<h2 className='text-2xl font-bold mb-4'>Edit Goat</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				{[
					'nickname',
					'registeredName',
					'dob',
					'gender',
					'adgaId',
					'additionalInfo',
					'price',
				].map((field) => (
					<div key={field}>
						<label className='block font-medium'>{field}</label>
						<input
							type={
								field === 'dob' ? 'date' : field === 'price' ? 'number' : 'text'
							}
							name={field}
							value={goat[field] || ''}
							onChange={handleChange}
							className='w-full border px-3 py-2 rounded'
						/>
					</div>
				))}

				<div>
					<label className='block font-medium mb-1'>Gender</label>
					<select
						name='gender'
						value={goat.gender}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded'
					>
						<option value=''>Select</option>
						<option value='Doe'>Doe</option>
						<option value='Buck'>Buck</option>
						<option value='Wether'>Wether</option>
					</select>
				</div>

				{/* Pedigree */}
				<fieldset className='border p-4 rounded'>
					<legend className='text-sm font-semibold mb-2'>Pedigree</legend>
					{Object.entries(goat.pedigree).map(([key, value]) => (
						<div key={key}>
							<label>{key}</label>
							<input
								type='text'
								name={key}
								value={value}
								onChange={handleChange}
								className='w-full border px-3 py-2 rounded'
							/>
						</div>
					))}
				</fieldset>

				{/* Awards */}
				<div>
					<label className='block font-medium mb-1'>Awards</label>
					{goat.awards.map((award, index) => (
						<input
							key={index}
							type='text'
							value={award}
							onChange={(e) => handleAwardsChange(index, e.target.value)}
							className='w-full mb-2 border px-3 py-2 rounded'
						/>
					))}
					<button
						type='button'
						onClick={addAward}
						className='text-blue-600 text-sm hover:underline'
					>
						+ Add Award
					</button>
				</div>
				<label className='block font-medium mb-1'>Additional Info</label>
				<textarea
					name='additionalInfo'
					value={goat.additionalInfo}
					onChange={handleChange}
					rows={4}
					className='w-full border px-3 py-2 rounded'
				/>
				{/* Checkboxes */}
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='dnaConfirmed'
						checked={goat.dnaConfirmed}
						onChange={handleChange}
					/>
					<label>DNA Confirmed</label>
				</div>
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='forSale'
						checked={goat.forSale}
						onChange={handleChange}
					/>
					<label>For Sale</label>
				</div>

				{/* Images */}
				<div>
					<label className='block font-medium mb-1'>Current Images</label>
					<div className='flex flex-wrap gap-4'>
						{goat.images.map((img, i) => (
							<div key={i} className='relative'>
								<img
									src={img}
									alt={`Goat ${i}`}
									className='h-32 w-32 object-cover rounded shadow'
								/>
								<button
									type='button'
									onClick={() => removeImage(i)}
									className='absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-600'
								>
									&times;
								</button>
							</div>
						))}
					</div>
				</div>

				<div>
					<label className='block font-medium mb-1'>Upload New Images</label>
					<input
						type='file'
						accept='image/*'
						multiple
						onChange={handleImageUpload}
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800'
				>
					Update Goat
				</button>
			</form>
		</div>
	);
};

export default EditGoat;
