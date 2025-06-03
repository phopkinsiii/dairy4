// src/components/goats/GoatCard.jsx
import { Link } from 'react-router-dom';

const GoatCard = ({ goat }) => {
	const { _id, nickname, registeredName, image, forSale, price, dob } = goat;

	return (
		<article className='bg-white-300/60 text-white backdrop-blur-sm p-4 rounded-b'>
			<Link to={`/goats/${_id}`} className='block hover:no-underline'>
				{image && (
					<img
						src={image}
						alt={registeredName || nickname}
						className='w-full h-90 object-cover'
						loading='lazy'
					/>
				)}

				<div className='p-4 space-y-2'>
					<h3 className='text-xl font-semibold text-black'>{nickname}</h3>
					<p className='text-md text-gray-800 italic'>{registeredName}</p>
					<p className='text-md text-gray-700'>
						DOB: {new Date(dob).toLocaleDateString()}
					</p>

					{forSale && (
						<p className='text-green-700 font-semibold'>For Sale – ${price}</p>
					)}
				</div>
			</Link>
		</article>
	);
};

export default GoatCard;
