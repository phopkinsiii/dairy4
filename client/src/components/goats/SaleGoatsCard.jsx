// src/components/products/SaleGoatCard.jsx
import { Link } from 'react-router-dom';

const SaleGoatCard = () => {
	return (
		<Link to='/goats/for-sale'>
			<div className='bg-white shadow-md rounded-lg p-0 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-transform relative'>
				{/* For Sale Badge */}
				<span className='absolute top-40 left-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm'>
					For Sale
				</span>

				{/* Image */}
				<img
					src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749585193/Isaac4_megkej.jpg'
					alt='Nigerian Dwarf Goats for Sale'
					className='w-full h-48 object-cover rounded mb-4'
				/>

				{/* Text content */}
				<div className='px-4 flex flex-col flex-grow'>
					<h3 className='text-lg font-semibold text-gray-900 mb-1'>
						Nigerian Dwarf Goats for Sale
					</h3>
					<p className='text-gray-600 text-sm mb-4'>
						<span className='font-semibold text-md'>Click the logo to meet our available goats.</span>
						<span className='italic'> In-person sales only.</span>
					</p>

					{/* Logo as CTA */}
					<div className='mt-auto mb-4 pb-4'>
						<img
							src='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
							alt='View Goats'
							className='h-30 w-30 mx-auto hover:opacity-90 transition'
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SaleGoatCard;
