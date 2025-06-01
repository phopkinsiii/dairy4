import { Link, useNavigate } from 'react-router-dom';

const BlogCard = ({ post }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/blog/${post._id}`);
	};

	return (
		<section
			onClick={handleCardClick}
			className='cursor-pointer bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow'
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
				<h2 className='text-2xl font-semibold text-amber-800'>{post.title}</h2>

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
					onClick={(e) => e.stopPropagation()} // 🛑 prevent card click from firing
				>
					Read more →
				</Link>
			</div>
		</section>
	);
};

export default BlogCard;
