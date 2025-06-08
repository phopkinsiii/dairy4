// @ts-nocheck
import SlideShow from '../components/SlideShow';
import ScrollingBanner from '../components/ScrollingBanner.jsx';
import HomeLinksSection from '../components/HomeLinksSection.jsx';
import { Link as RouterLink } from 'react-router-dom';
import SeoHead from '../components/SeoHead.jsx';
import FarmMap from '../components/FarmMap.jsx';

const Home = () => {
	return (
		<>
			<SeoHead
				title='Blueberry Dairy | Organic Farm in East Tennessee'
				description='Welcome to Blueberry Dairy — a regenerative organic farm in East Tennessee offering organic apples, blueberries, and raw goat milk from Nigerian Dwarf goats. Experience sustainable agriculture and natural goodness.'
				url='https://blueberrydairy.com/'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237560/blueberrydairy/product_images/xo36pirtbvdqfc6ffznn.png'
			/>

			{/* Hidden on small screens */}
			<ScrollingBanner />

			{/* Hero Section */}
			<section className='relative'>
				{/* Background Image Only */}
				<div
					className='w-full h-[60vh] sm:h-[70vh] bg-cover bg-center bg-no-repeat'
					style={{
						backgroundImage:
							"url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749237555/blueberrydairy/page_images/guxkeusbedbyw3lvubzt.jpg')",
					}}
				/>

				{/* Text + Button (overlay on md+, stacked on small) */}
				<div className='px-6 py-4 md:py-0 text-center space-y-6 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 max-w-4xl mx-auto'>
					<h1 className='text-4xl text-indigo-900 sm:text-4xl font-bold leading-snug drop-shadow-md pb-12'>
						Blueberry Dairy at Hickory Cove Orchards
					</h1>
					<p className='text-lg sm:text-xl text-white bg-black/20 backdrop-blur-lg px-4 py-4 rounded-lg inline-block'>
						"You want real, nourishing food for your family—but grocery store
						labels are confusing, even scary. At Blueberry Dairy and Hickory
						Cove Orchards, we raise naturally nutritious food organically and
						with care, right here in East Tennessee. Skip the chemicals and
						shipping from factory farms hundreds or thousands of miles
						away—discover the difference local food makes."
					</p>
					<RouterLink
						to='/products'
						aria-label='Browse our local farm products'
						className='inline-block px-6 py-4 bg-stone-400 hover:bg-amber-700 text-white font-semibold rounded-md text-lg shadow-lg transition-all duration-300'
					>
						Shop Local Products
					</RouterLink>
				</div>
			</section>

			<HomeLinksSection />

			<div className='bg-white min-h-screen flex flex-col items-center'>
				<SlideShow />
				<FarmMap />
			</div>
		</>
	);
};

export default Home;
