// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ fixed
import axiosInstance from '../../api/axios';
import { useUserContext } from '../../contexts/UserContext';
import BlogEditor from './BlogEditor.jsx';
import ImageUploadWithPreview from '../../components/ImageUploadWithPreview.jsx';
import rawMilkHTML from '../../content/rawMilkContent';

const AddBlogPost = () => {
	const { state } = useUserContext();
	const [title, setTitle] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState(null);
	const [content, setContent] = useState(rawMilkHTML);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const token = state.user?.token;
			let imageUrl = '';

			// ✅ Upload to Cloudinary
			if (imageFile) {
				const formData = new FormData();
				formData.append('file', imageFile);
				formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

				const uploadRes = await axios.post(
					import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
					formData
				);

				imageUrl = uploadRes.data.secure_url;
			}

			console.log('📝 Final blog title:', title);
			console.log('📝 Final blog content HTML:', content);
			console.log('🖼️ Image URL:', imageUrl);

			// ✅ Submit blog post to your backend
			await axiosInstance.post(
				'/blog',
				{
					title,
					content,
					image: imageUrl,
					tags: [],
					published: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			navigate('/blog');
		} catch (err) {
			console.error('Blog post failed:', err.response?.data || err.message);
			setError(err.response?.data?.message || 'Failed to send post');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
		>
			<h2 className="text-3xl font-bold mb-6 text-gray-800">
				Create New Blog Post
			</h2>

			{error && <p className="text-red-600 mb-4">{error}</p>}

			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Post Title"
				required
				className="w-full mb-4 p-3 border border-gray-300 rounded"
			/>

			<ImageUploadWithPreview onCompressedImage={setImageFile} />

			<BlogEditor content={content} setContent={setContent} />

			<button
				type="submit"
				className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
			>
				Publish
			</button>
		</form>
	);
};

export default AddBlogPost;
