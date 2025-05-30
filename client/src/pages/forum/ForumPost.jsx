// src/pages/ForumPost.jsx
import { useParams } from 'react-router-dom';
import { useForumContext } from '../../contexts/ForumContext';
import { useUserContext } from '../../contexts/UserContext';
import ForumReplyForm from '../../components/forum/ForumReplyForm';
import Spinner from '../../components/Spinner';

const ForumPost = () => {
	const { id } = useParams();
	const { posts, loading } = useForumContext();
	const { state: userState } = useUserContext();

	const post = posts.find((p) => p._id === id);

	if (loading) return <Spinner />;

	if (!post) {
		return (
			<div className='text-center text-red-500 mt-10'>
				<p>⚠️ Post not found.</p>
			</div>
		);
	}

	return (
		<section className='max-w-4xl mx-auto py-8 px-4 text-pretty'>
			<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
			<p className='text-gray-600 text-sm mb-2'>
				By {post.author?.name || 'Anonymous'} •{' '}
				{new Date(post.createdAt).toLocaleString()}
			</p>
			<p className='mb-6 text-gray-800 dark:text-gray-100'>{post.content}</p>

			<hr className='my-6' />

			<h2 className='text-xl font-semibold mb-4'>Replies</h2>
			<div className='space-y-4'>
				{post.replies.length === 0 ? (
					<p className='text-gray-500'>No replies yet.</p>
				) : (
					post.replies.map((reply) => (
						<div
							key={reply._id}
							className='border border-gray-200 p-3 rounded bg-gray-50 dark:bg-gray-700'
						>
							<p className='text-sm text-gray-600 dark:text-gray-300'>
								<strong>{reply.author?.name || 'Anonymous'}</strong> –{' '}
								{new Date(reply.createdAt).toLocaleString()}
							</p>
							<p className='mt-1 text-gray-800 dark:text-gray-100'>{reply.content}</p>
						</div>
					))
				)}
			</div>

			{/* ✅ Show reply form only to logged-in users */}
			{userState.user && (
				<div className='mt-6'>
					<ForumReplyForm postId={post._id} />
				</div>
			)}
		</section>
	);
};

export default ForumPost;
