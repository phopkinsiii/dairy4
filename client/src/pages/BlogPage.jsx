// @ts-nocheck
import { useEffect } from 'react';
import { Title, Meta, Link as HeadLink } from 'react-head';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../contexts/BlogContext';

const BlogPage = () => {
	const { state, fetchPosts } = useBlogContext();
	const { posts, loading, error } = state;

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return (
		<>
			<Title>Our Farm Blog | Blueberry Dairy</Title>
			<Meta
				name='description'
				content='Check out our latest blog posts and get updates on our joys, trials, and discoveries at Hickory Cove Orchards and Blueberry Dairy.'
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/blog' />

			<div className='bg-white py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl lg:max-w-4xl'>
						<h2 className='text-4xl font-semibold text-gray-900 sm:text-5xl'>From the blog</h2>
						<p className='mt-2 text-lg text-gray-600'>
							Learn how to grow your farm, your food, and your future.
						</p>

						{loading ? (
							<p className="text-center py-10">Loading posts...</p>
						) : error ? (
							<p className="text-center text-red-500 py-10">{error}</p>
						) : (
							<div className='mt-16 space-y-20'>
								{posts.map((post) => (
									<article key={post._id} className='relative isolate flex flex-col gap-8 lg:flex-row'>
										<Link to={`/blog/${post._id}`} className='relative w-full max-w-xs lg:w-64 block'>
											<img
												alt={post.title}
												src={`${import.meta.env.VITE_MEDIA_BASE_URL}${post.image}`}
												className='w-full h-full rounded-2xl bg-gray-50'
											/>
											<div className='absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset' />
										</Link>

										<div>
											<div className='flex items-center gap-x-4 text-xs'>
												<time dateTime={post.createdAt} className='text-gray-500'>
													{new Date(post.createdAt).toLocaleDateString()}
												</time>
												<span className='bg-gray-50 px-3 py-1.5 text-gray-600 rounded-full'>
													{post.tags?.[0] || 'General'}
												</span>
											</div>
											<div className='group relative max-w-xl'>
												<h3 className='mt-3 text-lg font-semibold text-gray-900'>
													<Link to={`/blog/${post._id}`}>{post.title}</Link>
												</h3>
												<p className='mt-5 text-sm text-gray-600 line-clamp-3'>
													{post.content?.replace(/<[^>]+>/g, '').slice(0, 200)}...
												</p>
											</div>
											<div className='mt-6 flex border-t border-gray-900/5 pt-6'>
												<img
													alt=''
													src='/images/goat_logo1.png'
													className='size-10 rounded-full bg-gray-50'
												/>
												<div className='text-sm ml-3'>
													<p className='font-semibold text-gray-900'>
														{post.author?.name || 'Admin'}
													</p>
													<p className='text-gray-600'>Contributor</p>
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPage;
