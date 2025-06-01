// @ts-nocheck
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';
import { Title, Meta, Link as HeadLink } from 'react-head';

const stripHtml = (html) => html.replace(/<[^>]*>/g, '');
const truncate = (str, length = 160) =>
	str.length > length ? str.slice(0, length) + '...' : str;
const extractKeywords = (text, limit = 12) => {
	const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];

	const frequency = words.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {});

	const sorted = Object.entries(frequency)
		.sort((a, b) => b[1] - a[1])
		.map(([word]) => word);

	return sorted.slice(0, limit).join(', ');
};

const BlogPost = () => {
	const { id } = useParams();
	const { state, fetchPostById } = useBlogContext();
	const { singlePost: post, loading, error } = state;

	useEffect(() => {
		if (id) fetchPostById(id);
	}, [id, fetchPostById]);

	if (loading || !post)
		return <div className='p-10 text-lg'>Loading post...</div>;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;
	if (!post) return null;

	const cleanContent = stripHtml(post.content || '');
	const metaDescription = truncate(cleanContent, 160);
	const keywords = extractKeywords(cleanContent);

	return (
		<>
			<Title>{`${post.title} | Blueberry Dairy Blog`}</Title>
			<Meta name='description' content={metaDescription} />
			<Meta name='keywords' content={keywords} />
			<HeadLink
				rel='canonical'
				href={`https://blueberrydairy.com/blog/${post._id}`}
			/>

			<div className='max-w-3xl mx-auto px-6 py-12'>
				<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
				{/* <p className='text-gray-600 mb-8'>By {post.author?.name}</p> */}

				{post.image && (
					<img
						src={post.image}
						alt={post.title}
						className='w-full rounded-xl shadow-md mb-8'
					/>
				)}

				<div
					className='prose max-w-none'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>
		</>
	);
};

export default BlogPost;
