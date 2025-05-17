// @ts-nocheck
// src/pages/BlogPost.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios.js';

const BlogPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axiosInstance.get(`/blog/${id}`);
				setPost(response.data);
			} catch (error) {
				console.error('Error fetching blog post:', error);
			}
		};

		fetchPost();
	}, [id]);

	if (!post) return <div className='p-10 text-lg'>Loading post...</div>;

	return (
		<div className='max-w-3xl mx-auto px-6 py-12'>
			<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
			<p className='text-gray-600 mb-8'>By {post.author?.name}</p>
			<img
				src={
					post.image
						? `${import.meta.env.VITE_MEDIA_BASE_URL}${post.image}`
						: '/images/placeholder.jpg'
				}
				alt={post.title}
				className='w-full rounded-xl shadow-md'
			/>

			<div
				className='prose max-w-none'
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</div>
	);
};

export default BlogPost;
