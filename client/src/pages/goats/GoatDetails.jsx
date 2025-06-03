// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';

const GoatDetails = () => {
	const { id } = useParams();
	const [goat, setGoat] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const res = await axiosInstance.get(`/goats/${id}`);
				setGoat(res.data);
			} catch (err) {
				setError('Goat not found.');
			} finally {
				setLoading(false);
			}
		};

		fetchGoat();
	}, [id]);

	if (loading) return <Spinner />;
	if (error) return <div className='p-8 text-red-600'>{error}</div>;
	if (!goat) return null;

	const {
		nickname,
		registeredName,
		dob,
		adgaId,
		awards,
		pedigree,
		dnaConfirmed,
		forSale,
		price,
		additionalInfo,
		images = [],
	} = goat;

	return (
		<>
			<SeoHead
				title={`${nickname} | Blueberry Dairy Nigerian Dwarf Goat`}
				description={
					additionalInfo?.slice(0, 150) ||
					`Learn more about ${nickname}, a Nigerian Dwarf Goat at Blueberry Dairy.`
				}
				image={images[0]}
				url={`https://www.blueberrydairy.com/goats/${id}`}
			/>

			<div className='max-w-5xl mx-auto px-6 py-12'>
				<h1 className='text-4xl font-bold text-amber-900 mb-6'>{nickname}</h1>
				<p className='text-lg text-gray-700 mb-4 italic'>
					{registeredName}
				</p>

				{/* Image gallery */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
					{images.map((url, idx) => (
						<img
							key={idx}
							src={url}
							alt={`${nickname} - ${idx + 1}`}
							className='w-full h-auto object-cover rounded shadow-md'
							loading='lazy'
						/>
					))}
				</div>

				<ul className='space-y-2 text-gray-800'>
					<li><strong>Date of Birth:</strong> {dob}</li>
					<li><strong>ADGA ID:</strong> {adgaId}</li>
					<li><strong>DNA Confirmed:</strong> {dnaConfirmed ? 'Yes' : 'No'}</li>
					<li><strong>Available for Sale:</strong> {forSale ? `Yes - $${price}` : 'No'}</li>
				</ul>

				{awards.length > 0 && (
					<div className='mt-6'>
						<h2 className='text-xl font-semibold text-amber-800'>Awards</h2>
						<ul className='list-disc list-inside text-gray-700'>
							{awards.map((award, idx) => (
								<li key={idx}>{award}</li>
							))}
						</ul>
					</div>
				)}

				<div className='mt-6'>
					<h2 className='text-xl font-semibold text-amber-800'>Pedigree</h2>
					<ul className='text-gray-700 space-y-1'>
						{Object.entries(pedigree).map(([key, value]) => (
							<li key={key}>
								<strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
							</li>
						))}
					</ul>
				</div>

				{additionalInfo && (
					<div className='mt-6'>
						<h2 className='text-xl font-semibold text-amber-800'>
							Additional Information
						</h2>
						<p className='text-gray-700 mt-2'>{additionalInfo}</p>
					</div>
				)}
			</div>
		</>
	);
};

export default GoatDetails;
