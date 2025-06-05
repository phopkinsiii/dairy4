const { fetchGoats } = useGoatContext(); // Destructure this at the top of your component

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
