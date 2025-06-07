// src/components/goats/GoatCard.jsx
import { Link } from 'react-router-dom';

const GoatCard = ({ goat }) => {
	const image = goat.images?.[0]; // assume this is a full Cloudinary URL

	return (
		<div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-200'>
			<Link to={`/goats/${goat._id}`}>
				{/* Goat Image */}
				{image ? (
					<div className='w-full'>
						<img
							src={image}
							alt={goat.nickname || 'Goat'}
							className='w-full object-cover aspect-[4/3]'
							loading='lazy'
						/>
					</div>
				) : (
					<div className='w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400'>
						No image
					</div>
				)}

				{/* Info */}
				<div className='p-4'>
					<h3 className='text-xl font-bold text-amber-800 mb-1'>
						{goat.nickname}
					</h3>
					<p className='text-sm text-gray-700'>ADGA ID: {goat.adgaId}</p>
					<p className='text-sm text-gray-700'>Gender: {goat.gender}</p>
					{goat.forSale && (
						<p className='text-green-700 font-semibold mt-1'>
							For Sale: ${goat.price}
						</p>
					)}
				</div>
			</Link>
		</div>
	);
};

export default GoatCard;
