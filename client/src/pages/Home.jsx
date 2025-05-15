import SlideShow from '../components/SlideShow';
import ScrollingBanner from '../components/ScrollingBanner.jsx';
import HomeLinksSection from '../components/HomeLinksSection.jsx';

import { Title, Meta, Link } from 'react-head';

const Home = () => {
	return (
		<>
			<Title>Blueberry Dairy | Regenerative Farm in East Tennessee</Title>
			<Meta
				name='description'
				content='Welcome to Blueberry Dairy — a regenerative farm in East Tennessee offering organic apples, blueberries, and raw goat milk from Nigerian Dwarf goats. Experience sustainable agriculture and natural goodness.'
			/>
			<Link rel='canonical' href='https://blueberrydairy.com/' />

			{/* Your existing components */}
			<ScrollingBanner />
			<HomeLinksSection />
			<div className='bg-white min-h-screen flex flex-col items-center'>
				<SlideShow />
			</div>
		</>
	);
};

export default Home;
