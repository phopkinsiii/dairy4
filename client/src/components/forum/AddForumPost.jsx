// @ts-nocheck
// src/pages/AddForumPost.jsx
import ForumPostForm from './ForumPostForm';
import { useForumContext } from '../../contexts/ForumContext';
import { useNavigate } from 'react-router-dom';
import SeoHead from '../../components/SeoHead';

const AddForumPost = () => {
	const { fetchPosts } = useForumContext();
	const navigate = useNavigate();

	const handlePostSuccess = () => {
		fetchPosts();
		navigate('/forum');
	};

	return (
		<>
			<SeoHead
				title='Create New Forum Post | Blueberry Dairy'
				description='Start a new discussion on the Blueberry Dairy community forum. Share your thoughts, ask questions, or tell your farm story.'
				url='https://www.blueberrydairy.com/forum/new'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1749519200/sunset_appalachians_uaedll.jpg'
			/>

			<div className='relative min-h-screen w-full overflow-hidden font-lora'>
				{/* Animated Background */}
				<div
					className='absolute inset-0 bg-cover bg-center animate-zoom-in-once z-0'
					style={{
						backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749519200/sunset_appalachians_uaedll.jpg')`,
						filter: 'blur(8px) brightness(85%)',
					}}
				/>

				{/* Foreground Content */}
				<div className='relative z-10 px-4 py-20 flex justify-center'>
					<ForumPostForm onPostSuccess={handlePostSuccess} />
				</div>
			</div>
		</>
	);
};

export default AddForumPost;
