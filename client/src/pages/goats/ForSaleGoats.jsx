// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import GoatCard from '../../components/goats/GoatCard';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';


const ForSaleGoats = () => {
	const [goats, setGoats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGoatsForSale = async () => {
			try {
				const res = await axiosInstance.get('/goats?sale=true');
				setGoats(res.data);
			} catch (err) {
				console.error('❌ Failed to fetch sale goats:', err);
				setError('Could not load sale goats.');
			} finally {
				setLoading(false);
			}
		};

		fetchGoatsForSale();
	}, []);

	if (loading) return <Spinner />;
	if (error) return <div className='text-red-600 p-6 text-center'>{error}</div>;

	return (
		<>
			<SeoHead
				title='Nigerian Dwarf Goats for Sale | Blueberry Dairy'
				description='View our registered Nigerian Dwarf goats currently available for sale. In-person pickup only.'
				url='https://www.blueberrydairy.com/goats/for-sale'
			/>

			<div className='max-w-7xl mx-auto px-4 py-12'>
				<h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
					Goats for Sale
				</h1>

				{goats.length === 0 ? (
					<p className='text-center text-gray-600'>No goats currently available for sale. Check back soon!</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{goats.map((goat) => (
							<GoatCard key={goat._id} goat={goat} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default ForSaleGoats;
