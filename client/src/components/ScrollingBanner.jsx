const ScrollingBanner = () => {
	return (
		<div className='hidden md:flex relative mt-4 pb-6 pt-8 bg-gray-700 text-white text-2xl overflow-hidden h-12 items-center'>
			<div className='animate-scroll hover:[animation-play-state:paused]'>
				<span className='px-8'>
					🌿 Welcome to Blueberry Dairy – Farm-fresh goat milk, hand-picked
					organic fruits, and more!
				</span>
				<span className='px-8'>
					🫐 Our First Market Day in Knoxville is June 21!
				</span>
				<span className='px-8'>🥛 We now sell pet milk!</span>
			</div>
		</div>
	);
};

export default ScrollingBanner;
