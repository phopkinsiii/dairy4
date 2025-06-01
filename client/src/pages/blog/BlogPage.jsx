// src/pages/BlogPage.jsx
import { useEffect } from 'react';
import { useBlogContext } from '../../contexts/BlogContext';
import Spinner from '../../components/Spinner';
import BlogCard from '../../components/blog/BlogCard';

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
				<BlogCard key={post._id} post={post} />
			))}
		</div>
	);
};

export default BlogPage;
