// @ts-nocheck
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../contexts/BlogContext';
import Spinner from '../components/Spinner';

const BlogPage = () => {
	const { state, fetchPosts } = useBlogContext();
	const { posts, loading, error } = state;

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	if (loading) return <Spinner />;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;
	if (!posts || posts.length === 0)
		return <div className='p-10 text-gray-700'>No blog posts found.</div>;

	return (
		<div className='max-w-6xl mx-auto px-6 py-12 space-y-10'>
			<h1 className='text-5xl font-extrabold text-center text-amber-950 mb-12'>
				Farm Blog
			</h1>

			{posts.map((post) => (
				<article
					key={post._id}
					className='bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6'
				>
					{post.image && post.image !== '' && (
						<img
							src={post.image}
							alt={post.title}
							className='w-full md:w-60 h-48 object-cover rounded-lg shadow-sm'
							loading='lazy'
						/>
					)}

					<div className='flex-1 space-y-2'>
						<h2 className='text-2xl font-semibold text-amber-800'>
							<Link to={`/blog/${post._id}`}>{post.title}</Link>
						</h2>

						<div className='flex items-center gap-x-4 text-sm text-gray-600'>
							<time dateTime={post.createdAt}>
								Posted: {new Date(post.createdAt).toLocaleDateString()}
							</time>
							<span>
								Updated: {new Date(post.updatedAt).toLocaleDateString()}
							</span>
							{post.tags?.length > 0 && (
								<span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'>
									{post.tags[0]}
								</span>
							)}
						</div>

						<div
							className='prose line-clamp-3 text-gray-700'
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>

						<Link
							to={`/blog/${post._id}`}
							className='inline-block text-blue-600 hover:underline mt-2 text-sm'
						>
							Read more →
						</Link>
					</div>
				</article>
			))}
		</div>
	);
};

export default BlogPage;
