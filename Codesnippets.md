<>
	<SeoHead
		title='Nigerian Dwarf Goats for Sale | Blueberry Dairy'
		description='View our registered Nigerian Dwarf goats currently available for sale. In-person pickup only.'
		url='https://www.blueberrydairy.com/goats/for-sale'
		image='https://res.cloudinary.com/YOUR_CLOUDINARY_ACCOUNT/image/upload/v123456/goats-for-sale-banner.png'
	/>

	{/* Full-width Banner */}
	<div className='w-full'>
		<img
			src='https://res.cloudinary.com/YOUR_CLOUDINARY_ACCOUNT/image/upload/v123456/goats-for-sale-banner.png'
			alt='Nigerian Dwarf Goats for Sale'
			className='w-full h-[50vh] object-cover object-center'
		/>
	</div>

	{/* White space below banner */}
	<div className='h-8 bg-white'></div>

	{/* Card Section with background */}
	<section className='w-full px-4 py-12 bg-gray-50'>
		{goats.length === 0 ? (
			<p className='text-center text-gray-600 text-lg'>
				No goats currently available for sale. Check back soon!
			</p>
		) : (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{goats.map((goat) => (
					<GoatCard key={goat._id} goat={goat} />
				))}
			</div>
		)}
	</section>
</>
