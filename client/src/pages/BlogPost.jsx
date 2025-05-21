// @ts-nocheck
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../contexts/BlogContext';

const BlogPost = () => {
	const { id } = useParams();
	const { state, fetchPostById } = useBlogContext();
	const { singlePost: post, loading, error } = state;


	useEffect(() => {
		if (id) fetchPostById(id);
	}, [id, fetchPostById]);

	if (loading || !post) return <div className='p-10 text-lg'>Loading post...</div>;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;
	if (!post) return null;

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
