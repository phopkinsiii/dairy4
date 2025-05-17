import {useState} from 'react';
import BlogEditor from './BlogEditor.jsx';

import axiosInstance from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';

const AddBlogPost = () => {
	const { state } = useUserContext();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const token = state.user?.token;
			let imageUrl = '';

			// 1. Upload image to server
			if (imageFile) {
				const formData = new FormData();
				formData.append('image', imageFile);

				const uploadRes = await axiosInstance.post('/uploads', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				});

				imageUrl = uploadRes.data.imageUrl; // assuming backend returns { imageUrl: '/uploads/filename.jpg' }
			}
			console.log('📝 Blog content before submit:', content);
			// 2. Submit blog post
			await axiosInstance.post(
				'/blog',
				{
					title,
					content,
					image: imageUrl,
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
			className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'
		>
			<h2 className='text-3xl font-bold mb-6 text-gray-800'>
				Create New Blog Post
			</h2>

			{error && <p className='text-red-600 mb-4'>{error}</p>}

			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Post Title'
				required
				className='w-full mb-4 p-3 border border-gray-300 rounded'
			/>
			{/* Image Upload Input Button */}
			<div className='mb-4'>
				<label
					htmlFor='imageUpload'
					className='inline-block bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300'
				>
					Choose Image
				</label>
				<input
					id='imageUpload'
					type='file'
					accept='image/*'
					onChange={handleImageChange}
					className='hidden'
				/>
				{imageFile && (
					<p className='mt-2 text-sm text-gray-600'>
						Selected file: <span className='font-medium'>{imageFile.name}</span>
					</p>
				)}
			</div>

			<BlogEditor content={content} onChange={setContent} />

			<button
				type='submit'
				className='mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700'
			>
				Publish
			</button>
		</form>
	);
};

export default AddBlogPost;
