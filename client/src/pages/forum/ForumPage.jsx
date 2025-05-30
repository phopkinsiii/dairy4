// src/pages/ForumPage.jsx
import { useForumContext } from '../../contexts/ForumContext';
import ForumPostForm from '../../components/forum/ForumPostForm';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';


const ForumPage = () => {
	const { posts, loading, error } = useForumContext();

	if (loading) return <Spinner />;
	if (error) return <p className='text-red-600 text-center mt-8'>{error}</p>;

	return (
		<main className='min-h-screen bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-100 py-12 px-4'>
			<section className='max-w-5xl mx-auto'>

				<h1 className='text-4xl font-bold text-amber-800 dark:text-amber-300 mb-4 text-center'>
					🌿 Community Forum
				</h1>

				<p className='text-center text-stone-700 dark:text-stone-300 mb-10 text-lg'>
					Welcome! Browse or join the conversation about farming, dairy goats,
					or living closer to nature.
				</p>

				<ForumPostForm />

				<hr className='my-12 border-stone-300 dark:border-stone-700' />

				<div className='space-y-8'>
					{posts.length === 0 ? (
						<p className='text-center text-stone-600 dark:text-stone-400'>
							No posts yet. Be the first to start a discussion!
						</p>
					) : (
						posts.map((post) => (
							<div
								key={post._id}
								className='border border-stone-300 dark:border-stone-700 rounded-lg p-6 bg-stone-50 dark:bg-stone-800 hover:shadow-lg transition-shadow'
							>
								<h2 className='text-2xl font-semibold text-amber-900 dark:text-yellow-300 hover:underline'>
									<Link to={`/forum/${post._id}`}>{post.title}</Link>
								</h2>
								<p className='text-sm text-stone-600 dark:text-stone-400 mt-1'>
									By {post.author?.name || 'Anonymous'} •{' '}
									{new Date(post.createdAt).toLocaleString()}
								</p>
								<p className='mt-3 line-clamp-3'>{post.content}</p>
							</div>
						))
					)}
				</div>
			</section>
		</main>
	);
};

export default ForumPage;
