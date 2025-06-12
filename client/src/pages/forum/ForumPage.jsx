// @ts-nocheck
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForumContext } from '../../contexts/ForumContext';
import Spinner from '../../components/Spinner';

const ForumPage = () => {
	const { posts, fetchPosts, loading } = useForumContext();

	useEffect(() => {
		fetchPosts();
	}, []);

	if (loading) return <Spinner />;

	return (
		<section className='min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8'>
			<div className='max-w-5xl mx-auto'>
				<div className='mb-10 text-center'>
					<h1 className='text-4xl font-bold mb-2'>Community Forum</h1>
					<p className='text-lg text-gray-600 dark:text-gray-300'>
						Read, share, and engage with fellow farm supporters.
					</p>
					<Link
						to='/forum/new'
						className='inline-block mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded transition duration-200'
					>
						Start a New Post
					</Link>
				</div>

				{posts?.length === 0 ? (
					<p className='text-center text-gray-600 dark:text-gray-300'>
						No posts yet. Be the first to start a discussion!
					</p>
				) : (
					<div className='space-y-6'>
						{posts.map((post) => (
							<div
								key={post._id}
								className='bg-white dark:bg-gray-800 p-6 rounded shadow space-y-2'
							>
								<Link
									to={`/forum/${post._id}`}
									className='text-2xl font-semibold text-blue-700 dark:text-blue-400 hover:underline'
								>
									{post.title}
								</Link>

								<p className='text-sm text-gray-500 dark:text-gray-400'>
									By {post.author?.name || 'Anonymous'} •{' '}
									{new Date(post.createdAt).toLocaleString()}
								</p>

								{/* Optional images preview */}
								{Array.isArray(post.images) && post.images.length > 0 && (
									<img
										src={post.images[0]}
										alt='Post preview'
										className='rounded shadow-md max-h-60 w-full object-cover my-2'
									/>
								)}

								{/* Render snippet of content */}
								<div
									className='prose dark:prose-invert line-clamp-4 overflow-hidden'
									dangerouslySetInnerHTML={{ __html: post.content }}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ForumPage;
