✅ Pages where SEO metadata is important:
These are routed pages users may land on directly via search engines or social shares:
✅  = Done
🏠 General Pages
Home.jsx✅ 

Contact.jsx✅ 

OurFarm.jsx✅ 

Accessibility.jsx✅ 

🧀 Products
ProductList.jsx✅ 

ProductDetails.jsx ✅ (important to add meta based on the product’s name, category, and description)

Checkout.jsx ✅(less important, but still good for branding keywords)

Confirmation.jsx ✅

✍️ Blog
BlogPage.jsx✅

BlogPost.jsx ✅(important — dynamic metadata based on post title/content/author)

🐐 Goats
GoatList.jsx ✅

Individual goat detail pages (if you later implement them — useful for goat name, awards, sale status, ADGA registration, etc.)

💬 Forum
ForumPage.jsx

ForumPost.jsx (use dynamic meta for title, author, and tags)

👤 Auth
Login.jsx, Register.jsx, ForgotPassword.jsx — SEO not critical, but can include minimal branding metadata

🚫 Components that do not need SEO metadata:
These are not directly routed or user-facing entry points, and shouldn’t contain SEO metadata like <Title> or <Meta>.

GoatCard.jsx

ProductCard.jsx

BlogCard.jsx

import { Title, Meta, HeadLink } from 'react-head';

const SeoHead = ({
	title = 'Blueberry Dairy',
	description = 'Explore Blueberry Dairy’s organic farm goods, including raw goat milk, blueberries, apples, and more.',
	image = 'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
	url = 'https://www.blueberrydairy.com',
	keywords, // ✅ Accept keywords as prop
}) => {
	return (
		<>
			<Title>{title}</Title>
			<Meta name="description" content={description} />
			{keywords && <Meta name="keywords" content={keywords} />} {/* ✅ Inserted here */}
			<Meta property="og:title" content={title} />
			<Meta property="og:description" content={description} />
			<Meta property="og:image" content={image} />
			<Meta property="og:url" content={url} />
			<Meta property="og:type" content="website" />
			<Meta name="twitter:card" content="summary_large_image" />
			<Meta name="twitter:title" content={title} />
			<Meta name="twitter:description" content={description} />
			<Meta name="twitter:image" content={image} />
			<Meta name="linkedin:title" content={title} />
			<Meta name="linkedin:description" content={description} />
			<Meta name="linkedin:image" content={image} />
			<HeadLink rel="canonical" href={url} />
		</>
	);
};

export default SeoHead;

import { Link } from 'react-router-dom';

const GoatCard = ({ goat }) => {
	const { _id, nickname, image, forSale } = goat;

	return (
		<Link
			to={`/goats/${_id}`}
			className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
			aria-label={`View details about ${nickname}`}
		>
			<img
				src={image}
				alt={nickname || registeredName}
				className="w-full h-64 object-cover"
				loading="lazy"
			/>

			<div className="p-4">
				<h3 className="text-xl font-semibold text-amber-900">{nickname}</h3>
				<p className="text-gray-600">
					{forSale ? 'Available for Sale' : 'Not for Sale'}
				</p>
			</div>
		</Link>
	);
};

export default GoatCard;

