// @ts-nocheck
import React from 'react';
import { useContactContext } from '../contexts/ContactContext';
import { Title, Meta, Link as HeadLink } from 'react-head';

export default function Contact() {
	const { state, dispatch, submitContactForm } = useContactContext();
	const { firstName, lastName, email, company, subject, message, loading } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch({ type: 'UPDATE_FIELD', field: name, value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { firstName, lastName, email, company, subject, message };
		dispatch({
			type: 'SUBMIT_SUCCESS',
			payload: 'Your message has been sent successfully. Thank you!',
		});
		try {
			await submitContactForm(formData);
		} catch (error) {
			console.error('Your message failed to submit. Please try again!', error);
		}
	};

	return (
		<>
			{/* SEO Metadata */}
			<Title>Contact Us | Blueberry Dairy</Title>
			<Meta name="description" content="Contact Blueberry Dairy about raw goat milk, blueberries, farm pickups, and local deliveries." />
			<HeadLink rel="canonical" href="https://blueberrydairy.com/contact" />

			<div
				className="min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center"
				style={{
					backgroundImage: "url('/images/blueberriesxl.jpg')",
					fontFamily: "'Lora', serif",
				}}
			>
				{/* Transparent Glass Card */}
				<div className="bg-white/20 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-4xl w-full border border-white/30">
					<h2 className="text-4xl font-playfair text-white mb-8 text-center drop-shadow-md">
						Let us know how we can help you eat healthy!
					</h2>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white">
						<div>
							<label htmlFor="firstName" className="block font-semibold">First Name</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={firstName}
								onChange={handleChange}
								required
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							/>
						</div>

						<div>
							<label htmlFor="lastName" className="block font-semibold">Last Name</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={lastName}
								onChange={handleChange}
								required
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="email" className="block font-semibold">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={handleChange}
								required
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="company" className="block font-semibold">Company (optional)</label>
							<input
								type="text"
								id="company"
								name="company"
								value={company}
								onChange={handleChange}
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="subject" className="block font-semibold">Subject</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={subject}
								onChange={handleChange}
								required
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="message" className="block font-semibold">Message</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								value={message}
								onChange={handleChange}
								required
								className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							></textarea>
						</div>

						<div className="sm:col-span-2 text-right">
							<button
								type="submit"
								className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold shadow-md"
							>
								{loading ? 'Sending...' : 'Send Message'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
