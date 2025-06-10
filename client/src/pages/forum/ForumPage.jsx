// @ts-nocheck
// pages/ForumPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForumContext } from '../../contexts/ForumContext';
import SeoHead from '../../components/SeoHead';

const ForumPage = () => {
	const { posts, fetchPosts, loading, error } = useForumContext();

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<>
			<SeoHead
				title='Community Forum | Blueberry Dairy'
				description='Join the Blueberry Dairy community forum to ask questions, share farm stories, and connect with fellow supporters of local, organic agriculture.'
				url='https://www.blueberrydairy.com/forum'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1749518190/blue_ridge_parkway_yoxhuz.jpg'
			/>

			<div className='relative min-h-screen w-full overflow-hidden font-lora'>
				{/* Animated background image */}
				<div
					className='absolute inset-0 bg-cover bg-center animate-zoom-in-once z-0'
					style={{
						backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749518190/blue_ridge_parkway_yoxhuz.jpg')`,
						filter: 'blur(4px) brightness(85%)',
					}}
				/>

				{/* Foreground content */}
				<div className='relative z-10 px-4 py-20 max-w-5xl mx-auto'>
					<div className='bg-white/30 backdrop-blur-md rounded-lg p-6 md:p-10 shadow-lg text-stone-900 dark:text-white'>
						<div className='flex justify-between items-center mb-6'>
							<h1 className='text-3xl font-bold'>Community Forum</h1>
							<Link
								to='/forum/new'
								className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
							>
								New Post
							</Link>
						</div>

						{loading && <p className='text-lg'>Loading posts...</p>}
						{error && <p className='text-red-600'>{error}</p>}

						<div className='space-y-6'>
							{posts.map((post) => (
								<Link
									to={`/forum/${post._id}`}
									key={post._id}
									className='block p-4 rounded-lg bg-white/60 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 transition'
								>
									<h2 className='text-xl font-semibold mb-1'>{post.title}</h2>
									<p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
										By {post.author?.name || 'Anonymous'} •{' '}
										{new Date(post.createdAt).toLocaleString()}
									</p>
									<p className='line-clamp-3'>{post.content}</p>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForumPage;
