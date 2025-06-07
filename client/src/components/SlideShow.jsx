import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

import {
	Navigation,
	Pagination,
	Autoplay,
	A11y,
	Keyboard,
} from 'swiper/modules';

const SlideShow = () => {
	const images = [
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237515/blueberrydairy/goat_images/gspttkyjj6weppcslvo4.jpg',
			alt: 'Nigerian Dwarf goat Ada grazing in pasture',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237557/blueberrydairy/product_images/fmoj03hcidd4anmqhv2a.jpg',
			alt: 'Freshly picked blueberries held in hand',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237548/blueberrydairy/page_images/gpjtsi0g9p8hi9pjvx08.jpg',
			alt: 'Farmhouse view from the front garden',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237553/blueberrydairy/page_images/ckdfcsjpwd0opwa9yopl.jpg',
			alt: 'View of the pond with trees reflecting on water',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237542/blueberrydairy/page_images/pszii9vxjf4kkdp60eer.jpg',
			alt: 'Evening light over the second pond',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237534/blueberrydairy/goat_images/oskxab5zqtiafozrfnp0.jpg',
			alt: 'Robert the goat on pasture',
		},
		{
			src: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237563/blueberrydairy/product_images/evuu6tqm8kxtwm6a4cwb.jpg',
			alt: 'Berry smoothie made with farm ingredients',
		},
	];

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div className='w-full h-[80vh] sm:h-[700px] bg-gray-200 group relative'>
			<Swiper
				modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
				loop={true}
				autoplay={{ delay: 3000 }}
				pagination={{ clickable: true }}
				keyboard={{ enabled: true }}
				a11y={{
					enabled: true,
					prevSlideMessage: 'Previous slide',
					nextSlideMessage: 'Next slide',
					paginationBulletMessage: 'Go to slide {{index}}',
				}}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				onBeforeInit={(swiper) => {
					if (swiper.params.navigation) {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}
				}}
				tabIndex={0}
				className='w-full h-full'
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className='w-full h-full'>
						<img
							src={image.src}
							alt={image.alt}
							className='w-full h-full object-cover object-center'
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Prev Button */}
			<button
				ref={prevRef}
				className='swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-14 h-14 hidden group-hover:flex group-focus-within:flex items-center justify-center z-10 transition-all duration-200 ease-in-out hover:scale-105 hover:brightness-110 focus:scale-105 focus:brightness-110'
				aria-label='Previous slide'
			>
				<span className='sr-only'>Previous</span>
				<span className='text-2xl font-bold'>‹</span>
			</button>

			{/* Next Button */}
			<button
				ref={nextRef}
				className='swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-14 h-14 hidden group-hover:flex group-focus-within:flex items-center justify-center z-10 transition-all duration-200 ease-in-out hover:scale-105 hover:brightness-110 focus:scale-105 focus:brightness-110'
				aria-label='Next slide'
			>
				<span className='sr-only'>Next</span>
				<span className='text-2xl font-bold'>›</span>
			</button>
		</div>
	);
};

export default SlideShow;
