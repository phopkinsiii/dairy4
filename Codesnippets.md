// src/pages/BlogPost.jsx
import { extractKeywords } from '../../utils/seo'; // ✅ Reuse shared util
import SeoHead from '../../components/SeoHead';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';

const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

const truncate = (str, length = 160) =>
	str.length > length ? str.slice(0, length) + '...' : str;

const BlogPost = () => {
	const { id } = useParams();
	const { state, fetchPostById } = useBlogContext();
	const { singlePost: post, loading, error } = state;

	useEffect(() => {
		if (id) fetchPostById(id);
	}, [id, fetchPostById]);

	if (loading || !post)
		return <div className='p-10 text-lg'>Loading post...</div>;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;

	// SEO metadata generation
	const cleanText = stripHtml(post.content || '');
	const metaDescription = truncate(cleanText, 160);
	const metaKeywords = extractKeywords(`${post.title} ${cleanText}`); // ✅

	const seoImage =
		post.image ||
		'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png';

	return (
		<>
			<SeoHead
				title={`${post.title} | Blueberry Dairy`}
				description={metaDescription}
				image={seoImage}
				url={`https://www.blueberrydairy.com/blog/${post._id}`}
				keywords={metaKeywords} // ✅ Pass to generalized SeoHead
			/>

			{post.image && (
				<div className='w-full h-[100vh] relative mt-[24px]'>
					<img
						src={post.image}
						alt={`Photo related to blog post: ${post.title}`}
						title={post.title}
						className='absolute inset-0 w-full h-full object-cover object-center'
					/>
				</div>
			)}

			<div className='max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-12 py-12'>
				<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>

				<div
					className='prose prose-xl lg:prose-3xl max-w-none text-pretty'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>
		</>
	);
};

export default BlogPost;
