const handleImageUpload = async () => {
	if (!selectedFile) return;
	setUploading(true);
	try {
		const uploadData = new FormData();
		uploadData.append('file', selectedFile);
		uploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

		const uploadRes = await axios.post(
			import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
			uploadData
		);

		const imageUrl = uploadRes.data.secure_url;

		// ✅ Update image and mark form as changed
		setFormData((prev) => {
			const updated = { ...prev, image: imageUrl };
			setIsChanged(JSON.stringify(updated) !== JSON.stringify(initialData));
			return updated;
		});
		toast.success('Image uploaded successfully');
	} catch (err) {
		console.error('Cloudinary upload error:', err);
		toast.error('Image upload failed');
	} finally {
		setUploading(false);
	}
};

await axiosInstance.put(`/blog/${id}`, formData, {
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

