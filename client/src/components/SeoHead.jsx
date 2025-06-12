// @ts-nocheck
import { Title, Meta, Link as HeadLink } from 'react-head';

const SeoHead = ({
	title = '',
	description = '',
	image = 'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
	url = 'https://www.blueberrydairy.com',
	keywords,
	post = {}, // ✅ Accept full post object
}) => {
	if (!title || !description || !url) return null;

	const imageAlt = `Image preview for: ${title}`;
	const siteName = 'Blueberry Dairy';
	const fallbackDate = new Date().toISOString();
	const datePublished = new Date(post.createdAt || fallbackDate).toISOString();
	const dateModified = new Date(
		post.updatedAt || post.createdAt || fallbackDate
	).toISOString();

	return (
		<>
			<Title>{title}</Title>
			<Meta name='description' content={description} />
			{keywords && <Meta name='keywords' content={keywords} />}
			<Meta name='author' content='Blueberry Dairy' />
			<Meta name='robots' content='index, follow' />
			{/* Open Graph / Facebook */}
			<Meta property='og:title' content={title} />
			<Meta property='og:description' content={description} />
			<Meta property='og:image' content={image} />
			<Meta property='og:image:alt' content={imageAlt} />
			<Meta property='og:url' content={url} />
			<Meta property='og:site_name' content={siteName} />
			<Meta property='og:type' content='article' />
			{/* Twitter */}
			<Meta name='twitter:card' content='summary_large_image' />
			<Meta name='twitter:title' content={title} />
			<Meta name='twitter:description' content={description} />
			<Meta name='twitter:image' content={image} />
			<Meta name='twitter:image:alt' content={imageAlt} />
			<Meta name='twitter:site' content='@BlueberryDairy' />{' '}
			{/* Replace if needed */}
			{/* LinkedIn (optional fallback) */}
			<Meta property='linkedin:title' content={title} />
			<Meta property='linkedin:description' content={description} />
			<Meta property='linkedin:image' content={image} />
			<HeadLink rel='canonical' href={url} />
			{/* JSON-LD Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: title,
						description: description,
						image: [image],
						author: {
							'@type': 'Organization',
							name: 'Blueberry Dairy',
						},
						publisher: {
							'@type': 'Organization',
							name: 'Blueberry Dairy',
							logo: {
								'@type': 'ImageObject',
								url: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
							},
						},
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': url,
						},
						datePublished,
						dateModified,
					}),
				}}
			/>
		</>
	);
};

export default SeoHead;
