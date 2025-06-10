// src/pages/forum/ForumPostForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { Title, Meta, Link as HeadLink } from 'react-head';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForumPostForm = ({ onPostSuccess }) => {
	const { addPost } = useForumContext();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content) return;

		const postData = {
			title,
			content,
			author: author.trim() ? author.trim() : 'Anonymous',
		};

		try {
			await addPost(postData);
			toast.success('Post created successfully!');
			setTimeout(() => navigate('/forum'), 500);
			setTitle('');
			setContent('');
			setAuthor('');
			onPostSuccess?.();
		} catch (err) {
			console.error('Post creation failed:', err.message);
		}
	};

	return (
		<>
			<Title>Start a New Forum Post | Blueberry Dairy</Title>
			<Meta
				name='description'
				content='Join the discussion on our community forum. Share ideas, ask questions, or chat with other farm supporters.'
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/forum/new' />

			<div className='relative min-h-screen w-full overflow-hidden font-lora'>
				{/* Animated background */}
				<div
					className='absolute inset-0 bg-cover bg-center animate-zoom-in-once z-0'
					style={{
						backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749519200/sunset_appalachians_uaedll.jpg')`,
						filter: 'blur(2px) brightness(85%)',
					}}
				/>

				{/* Form container */}
				<div className='relative z-10 px-6 py-20 flex justify-center items-center'>
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
								className='w-full border-2 border-gray-100 p-3 rounded placeholder-white placeholder:font-semibold placeholder:text-lg text-black font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
							/>

							<textarea
								placeholder="What's on your mind?"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								rows={16}
								className='w-full border-2 border-gray-200 p-3 rounded placeholder-white placeholder:font-semibold placeholder:text-lg text-black font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
							/>

							<input
								type='text'
								placeholder='Your name (optional)'
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								className='w-full border-2 border-gray-200 p-3 rounded placeholder-white placeholder:font-semibold placeholder:text-lg text-black font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
							/>

							<div className='flex justify-between items-center'>
								<button
									type='button'
									onClick={() => {
										setTitle('');
										setContent('');
										setAuthor('');
									}}
									className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition duration-200'
								>
									Clear
								</button>

								<button
									type='submit'
									className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
								>
									Post
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForumPostForm;
