// components/forum/ForumPostForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';

const ForumPostForm = ({ onPostSuccess }) => {
	const { addPost } = useForumContext();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState(''); // New field

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
			setTitle('');
			setContent('');
			setAuthor('');
			onPostSuccess?.();
		} catch (err) {
			console.error('Post creation failed:', err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mb-8">
			<h2 className="text-xl font-semibold">Create a New Post</h2>

			<input
				type="text"
				placeholder="Post title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="w-full border p-2 rounded"
			/>

			<textarea
				placeholder="Your message"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className="w-full border p-2 rounded h-32"
			/>

			<input
				type="text"
				placeholder="Your name (optional)"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				className="w-full border p-2 rounded"
			/>

			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Post
			</button>
		</form>
	);
};

export default ForumPostForm;
