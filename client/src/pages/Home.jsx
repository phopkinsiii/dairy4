import React from 'react';
import SlideShow from '../components/SlideShow';
import ScrollingBanner from '../components/ScrollingBanner.jsx';
import HomeLinksSection from '../components/HomeLinksSection.jsx';

const Home = () => {
	return (
		<>
			<ScrollingBanner />
			
			{/* Remove the background wrapper here */}
			<HomeLinksSection />
			
			<div className='bg-white min-h-screen flex flex-col items-center'>
				<SlideShow />
			</div>
		</>
	);
};

export default Home;
