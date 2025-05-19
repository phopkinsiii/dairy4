// @ts-nocheck
import SlideShow from '../components/SlideShow';
import ScrollingBanner from '../components/ScrollingBanner.jsx';
import HomeLinksSection from '../components/HomeLinksSection.jsx';
import { Link as RouterLink } from 'react-router-dom';
import { Link as HeadLink, Title, Meta } from 'react-head';

import FarmMap from '../components/FarmMap.jsx';

const Home = () => {
	return (
		<>
			<Title>Blueberry Dairy | Organic Farm in East Tennessee</Title>
			<Meta
				name='description'
				content='Welcome to Blueberry Dairy — a regenerative organic farm in East Tennessee offering organic apples, blueberries, and raw goat milk from Nigerian Dwarf goats. Experience sustainable agriculture and natural goodness.'
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/' />

			<ScrollingBanner />
<section
  className="relative w-full h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
  style={{
    backgroundImage: "url('/images/mountain_in_clouds.jpeg')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl px-6 text-center space-y-6">
    <h2 className="text-3xl sm:text-4xl font-bold leading-snug drop-shadow-md">
      Read any labels at the grocery store lately and wondered what those scary-sounding, seven syllable words meant? So have we!
    </h2>
    <p className="text-lg sm:text-xl drop-shadow-md text-pretty">
      You want healthy, natural food that nourishes your body and your family. At Blueberry Dairy and Hickory Cove Orchards, we grow nutrient-dense, organically raised food with care, right here in East Tennessee. You don't have to settle for processed groceries, laden with chemicals and trucked in from far away—come discover local food that makes a difference.
    </p>
    <RouterLink
      to="/products"
      className="inline-block px-6 py-3 bg-stone-400 hover:bg-amber-700 text-white font-semibold rounded-md text-lg shadow-lg transition-all duration-300"
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
