import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React from 'react';

const SlideShow = () => {
	const images = [
		'/images/Ada.jpg',
		'/images/BlueberriesInHand.jpg',
		'/images/house.jpg',
		'/images/Pond.jpg',
		'/images/Pond2.jpg',
		'/images/Robert.jpg',
		'/images/smoothie.jpg',
	];

	return (
		<div className="w-full h-[80vh] sm:h-[700px] bg-gray-200">

			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000 }}
				loop={true}
				className='w-full h-full'
			>
				{images.map((src, index) => (
					<SwiperSlide key={index} className='w-full h-full'>
						<img
							src={src}
							alt={`Farm Image ${index + 1}`}
							className='w-full h-full object-cover object-center'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SlideShow;
