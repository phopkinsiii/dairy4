// @ts-nocheck
import { useContactContext } from '../contexts/ContactContext';
import Spinner from '../components/Spinner';
import { validateContactForm } from '../utils/validators';
import SeoHead from '../components/SeoHead';

export default function Contact() {
	const { state, dispatch, submitContactForm } = useContactContext();
	const {
		firstName,
		lastName,
		email,
		company,
		subject,
		message,
		loading,
		successMessage,
		errorMessage,
	} = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch({ type: 'UPDATE_FIELD', field: name, value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { firstName, lastName, email, company, subject, message };

		const error = validateContactForm(formData);
		if (error) {
			dispatch({ type: 'SUBMIT_FAILURE', payload: error });
			return;
		}

		await submitContactForm(formData);
	};

	if (loading) return <Spinner />;

	return (
		<>
			<SeoHead
				title='Contact Us | Blueberry Dairy'
				description="Have questions about our raw goat milk, farm pickups, or local deliveries? Contact Blueberry Dairy — we'd love to hear from you!"
				url='https://www.blueberrydairy.com/contact'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>

			<div className='relative min-h-screen w-full overflow-hidden font-lora'>
				{/* Background image with zoom/focus animation */}
				<div
					className='absolute inset-0 bg-cover bg-center animate-zoom-in-once z-0'
					style={{
						backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749317846/appalachian_cabin_v5flx0.jpg')`,
						filter: 'blur(8px) brightness(90%)',
					}}
				/>

				{/* Glass overlay */}

				<div className='relative z-10 px-6 py-20 max-w-8xl mx-auto'>
					<div className='grid md:grid-cols-[1fr_1.25fr] gap-2 px-8'>
						{/* Address Section */}
						<div className='text-white text-3xl space-y-4'>
							<h3 className='text-4xl font-bold mb-2'>Visit Us</h3>
							<p>Blueberry Dairy at Hickory Cove Orchards</p>
							<p>154 Pressmens Home Road</p>
							<p>Rogersville, TN 37857</p>
							<p className='flex items-center gap-2 text-white text-lg mt-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='w-6 h-6 text-white'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 5h2l.4 2M7 3h10l1 2h2M8 7h8M5 9h14l-1.34 6.72a2 2 0 01-1.97 1.64H8.31a2 2 0 01-1.97-1.64L5 9z'
									/>
								</svg>
								(423) 293-4487
							</p>
							<p>✉️ hello@blueberrydairy.com</p>

							{/* Farm Badge below address */}
							<div className='mt-8'>
								<img
									src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237561/blueberrydairy/product_images/pu0slgkfnuiauzjj0egs.png'
									alt='Blueberry Dairy Farm Badge'
									className='w-28 h-28 rounded-full bg-white/60 backdrop-blur-md shadow-md animate-float'
								/>
							</div>
						</div>

						{/* Contact Form */}
						<form
							onSubmit={handleSubmit}
							className='bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg space-y-6'
						>
							{successMessage && (
								<div className='p-3 bg-green-100 text-green-800 rounded text-sm'>
									{successMessage}
								</div>
							)}

							{errorMessage && (
								<div className='p-3 bg-red-100 text-red-800 rounded text-sm'>
									{errorMessage}
								</div>
							)}

							<div className='grid sm:grid-cols-2 gap-6'>
								<input
									type='text'
									name='firstName'
									value={firstName}
									onChange={handleChange}
									placeholder='First Name'
									className='w-full border-2 border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400'
								/>
								<input
									type='text'
									name='lastName'
									value={lastName}
									onChange={handleChange}
									placeholder='Last Name'
									className='w-full border-2 border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400'
								/>
							</div>

							<input
								type='email'
								name='email'
								value={email}
								onChange={handleChange}
								placeholder='Email'
								className='w-full border-2 border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400'
							/>

							<input
								type='text'
								name='company'
								value={company}
								onChange={handleChange}
								placeholder='Company (optional)'
								className='w-full border-2 border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400'
							/>

							<input
								type='text'
								name='subject'
								value={subject}
								onChange={handleChange}
								placeholder='Subject'
								className='w-full border-2 border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400'
							/>

							<textarea
								name='message'
								value={message}
								onChange={handleChange}
								rows={5}
								placeholder='Your message...'
								className='w-full border-2 border-gray-300 p-3 rounded focus:bg-white focus:text-black font-semibold resize-none focus:ring-2 focus:ring-indigo-400'
							/>

							<div className='flex justify-between items-center'>
								<button
									type='button'
									onClick={() => dispatch({ type: 'RESET_FORM' })}
									className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
								>
									Clear Form
								</button>
								<button
									type='submit'
									className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
								>
									Send
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
