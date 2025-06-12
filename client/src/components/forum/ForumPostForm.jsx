// src/pages/forum/ForumPostForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TipTapEditor from '../../pages/blog/TipTapEditor';

const ForumPostForm = ({ onPostSuccess }) => {
	const { addPost } = useForumContext();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState(''); // HTML from TipTap
	const [author, setAuthor] = useState('');
	const [imageUrls, setImageUrls] = useState([]);
	const [uploading, setUploading] = useState(false);
	const navigate = useNavigate();

	const handleImageUpload = async (e) => {
		const files = Array.from(e.target.files);
		if (!files.length) return;

		setUploading(true);
		const uploaded = [];

		for (const file of files) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append(
				'upload_preset',
				import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
			);

			try {
				const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
					method: 'POST',
					body: formData,
				});
				const data = await res.json();
				if (data.secure_url) uploaded.push(data.secure_url);
			} catch (err) {
				console.error('Upload failed:', err);
				toast.error('Image upload error.');
			}
		}

		setImageUrls((prev) => [...prev, ...uploaded]);
		setUploading(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content) return;

		const postData = {
			title,
			content,
			author: author.trim() || 'Anonymous',
			images: imageUrls,
		};

		try {
			await addPost(postData);
			toast.success('Post created!');
			navigate('/forum');
			setTitle('');
			setContent('');
			setAuthor('');
			setImageUrls([]);
			onPostSuccess?.();
		} catch (err) {
			console.error('Post creation failed:', err.message);
		}
	};

	const inputStyles =
		'w-full border-2 border-white p-3 rounded placeholder-white placeholder:font-semibold placeholder:text-lg text-black font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400';

	return (
		<div className='bg-white/30 dark:bg-white/10 backdrop-blur-md p-10 rounded-lg shadow-2xl w-full max-w-[80%] min-h-[75vh]'>
			<h2 className='text-4xl font-bold text-stone-800 dark:text-stone-100 mb-6 text-center'>
				Start a New Discussion
			</h2>

			<form onSubmit={handleSubmit} className='grid gap-6'>
				<input
					type='text'
					placeholder='Post Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={`${inputStyles} h-[3.5rem]`}
				/>

				<TipTapEditor
					content={content}
					setContent={setContent}
					placeholder="What's on your mind?"
					height='min-h-[300px]'
				/>

				<input
					type='text'
					placeholder='Your name (optional)'
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className={inputStyles}
				/>

				<div className='flex flex-col gap-2'>
					<label className='font-semibold text-stone-700 dark:text-stone-200'>
						Add Images (optional)
					</label>
					<label className='inline-block w-fit bg-blue-600 text-white px-4 py-2 rounded font-semibold cursor-pointer hover:bg-blue-700 transition'>
						Upload Images
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							className='hidden'
						/>
					</label>
					{uploading && <p className='text-sm text-yellow-600'>Uploading...</p>}
					{imageUrls.length > 0 && (
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
							{imageUrls.map((url, i) => (
								<img
									key={i}
									src={url}
									alt={`Upload ${i + 1}`}
									className='rounded shadow-md max-h-48 object-contain'
								/>
							))}
						</div>
					)}
				</div>

				<div className='flex justify-between items-center'>
					<button
						type='button'
						onClick={() => {
							setTitle('');
							setContent('');
							setAuthor('');
							setImageUrls([]);
						}}
						className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition duration-200'
					>
						Clear
					</button>

					<button
						type='submit'
						disabled={uploading}
						className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
					>
						{uploading ? 'Uploading...' : 'Post'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForumPostForm;
