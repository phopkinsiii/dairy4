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

			<div
				className='relative h-screen w-full bg-cover bg-center px-6 py-10'
				style={{
					backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749317846/appalachian_cabin_v5flx0.jpg')`,
					fontFamily: `'Lora', serif`,
				}}
			>
				{/* Farm Badge */}
				<img
					src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237539/blueberrydairy/page_images/gb2tbfao1fno3furhdwt.png'
					alt='Blueberry Dairy Farm Badge'
					className='w-20 h-auto absolute top-6 right-6 rounded-lg bg-white/30 backdrop-blur-sm shadow-md z-50'
				/>

				{/* Contact Block */}
				<div className='bg-white/20 backdrop-blur-sm p-10 shadow-2xl w-full h-full rounded-none grid md:grid-cols-2 gap-10 contact-form'>
					{/* Address + Map */}
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

						{/* <div className='mt-6 rounded overflow-hidden shadow-lg'>
							<iframe
								title='Google Map to Blueberry Dairy'
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3210.257458614023!2d-83.10907582344926!3d36.42715677235585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885b083950932e01%3A0x744c741dad1699f7!2s154%20Pressmens%20Home%20Rd%2C%20Rogersville%2C%20TN%2037857!5e0!3m2!1sen!2sus!4v1749347267840!5m2!1sen!2sus'
								width='100%'
								height='300'
								style={{ border: 0 }}
								allowFullScreen=''
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							></iframe>
						</div> */}
					</div>

					{/* Contact Form */}
					<form
						onSubmit={handleSubmit}
						className='h-full flex flex-col justify-between gap-6'
					>
						<div className='grid sm:grid-cols-2 gap-6'>
							<input
								type='text'
								name='firstName'
								value={firstName}
								onChange={handleChange}
								placeholder='First Name'
								className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder:font-semibold'
							/>
							<input
								type='text'
								name='lastName'
								value={lastName}
								onChange={handleChange}
								placeholder='Last Name'
								className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder:font-semibold'
							/>
						</div>

						<input
							type='email'
							name='email'
							value={email}
							onChange={handleChange}
							placeholder='Email'
							className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder:font-semibold'
						/>

						<input
							type='text'
							name='company'
							value={company}
							onChange={handleChange}
							placeholder='Company (optional)'
							className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder:font-semibold'
						/>

						<input
							type='text'
							name='subject'
							value={subject}
							onChange={handleChange}
							placeholder='Subject'
							className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder:font-semibold'
						/>

						<textarea
							name='message'
							value={message}
							onChange={handleChange}
							rows={5}
							placeholder='Your message...'
							className='w-full border-2 border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-black font-semibold placeholder-white placeholder:font-semibold resize-none'
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
		</>
	);
}
