// @ts-nocheck
// src/pages/BlogPage.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios.js';
import { Link } from 'react-router-dom';
import { Title, Meta, Link as HeadLink } from 'react-head';

const BlogPage = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axiosInstance.get('/blog');
				setPosts(res.data);
			} catch (err) {
				console.error('Error fetching blog posts:', err);
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			{/* SEO Metadata */}
			<Title>Our Farm Blog | Blueberry Dairy</Title>
			<Meta
				name='description'
				content='Check out our latest blog posts and get updates on our joys, trials, and discoveries at Hickory Cove Orchards and Blueberry Dairy.'
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/blog' />
			<div className='bg-white py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl lg:max-w-4xl'>
						<h2 className='text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
							From the blog
						</h2>
						<p className='mt-2 text-lg text-gray-600'>
							Learn how to grow your farm, your food, and your future.
						</p>

						<div className='mt-16 space-y-20 lg:mt-20 lg:space-y-20'>
							{posts.map((post) => (
								<article
									key={post._id}
									className='relative isolate flex flex-col gap-8 lg:flex-row'
								>
									{/* Image Section */}
									<div className='relative w-full max-w-xs lg:w-64'>
										<img
											alt=''
											src={
												post.image
													? `http://localhost:5000${post.image}`
													: '/images/placeholder.jpg'
											}
											className='w-full h-full rounded-2xl bg-gray-50'
										/>
										<div className='absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset' />
									</div>

									{/* Content Section */}
									<div>
										<div className='flex items-center gap-x-4 text-xs'>
											<time dateTime={post.createdAt} className='text-gray-500'>
												{new Date(post.createdAt).toLocaleDateString()}
											</time>
											<span className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600'>
												{post.tags?.[0] || 'General'}
											</span>
										</div>

										<div className='group relative max-w-xl'>
											<h3 className='mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600'>
												<Link
													to={`/blog/${post._id}`}
													className='relative inline-block'
												>
													{post.title}
												</Link>
											</h3>

											<p className='mt-5 text-sm text-gray-600 line-clamp-3'>
												{post.content?.replace(/<[^>]+>/g, '').slice(0, 200)}...
											</p>
										</div>

										{/* Author Section */}
										<div className='mt-6 flex border-t border-gray-900/5 pt-6'>
											<div className='relative flex items-center gap-x-4'>
												<img
													alt=''
													src='/images/goat_logo1.png'
													className='size-10 rounded-full bg-gray-50'
												/>
												<div className='text-sm'>
													<p className='font-semibold text-gray-900'>
														{post.author?.name || 'Admin'}
													</p>
													<p className='text-gray-600'>Contributor</p>
												</div>
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPage;
