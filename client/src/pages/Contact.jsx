// @ts-nocheck
import React from 'react';
import { useContactContext } from '../contexts/ContactContext';
import { Title, Meta, Link as HeadLink } from 'react-head';

export default function Contact() {
	const { state, dispatch, submitContactForm } = useContactContext();
	const { firstName, lastName, email, company, subject, message, loading } =
		state;

	//Handle changes in any input field by creating the {name, value} object
	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch({ type: 'UPDATE_FIELD', field: name, value });
	};

	//Handle form submission; dispatch actions and call the backend.
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
			<Meta
				name="description"
				content="Have questions about our raw goat milk, farm pickups, or local deliveries? Contact Blueberry Dairy — we'd love to hear from you!"
			/>
			<HeadLink rel="canonical" href="https://blueberrydairy.com/contact" />
			
		<div className="bg-gray-200">
		{/* Parent container for both columns */}
		<div className="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-7xl lg:pt-40">
		  
		  {/* Left column: Contact Form */}
		  <div className="px-6 lg:px-8 flex items-center">
			<div className="mx-auto max-w-xl">
			  <h2 className="mt-0 text-6xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
				We'd love to hear from you!
			  </h2>
			  <p className="mt-2 text-3xl text-gray-600">
				Drop your questions or comments in the message box below and we'll get in touch as soon as possible.
			  </p>
			  <form onSubmit={handleSubmit} className="mt-16">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
				  <div>
					<label htmlFor="firstName" className="block text-3xl font-semibold text-gray-900">
					  First name
					</label>
					<div className="mt-2.5 text-2xl">
					  <input
						id="firstName"
						name="firstName"
						type="text"
						value={firstName}
						onChange={handleChange}
						autoComplete="given-name"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				  <div>
					<label htmlFor="lastName" className="block text-3xl font-semibold text-gray-900">
					  Last name
					</label>
					<div className="mt-2.5">
					  <input
						id="lastName"
						name="lastName"
						type="text"
						value={lastName}
						onChange={handleChange}
						autoComplete="family-name"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				  <div className="sm:col-span-2">
					<label htmlFor="email" className="block text-3xl font-semibold text-gray-900">
					  Email
					</label>
					<div className="mt-2.5">
					  <input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={handleChange}
						autoComplete="email"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				  <div className="sm:col-span-2">
					<label htmlFor="company" className="block text-3xl font-semibold text-gray-900">
					  Company
					</label>
					<div className="mt-2.5">
					  <input
						id="company"
						name="company"
						type="text"
						value={company}
						onChange={handleChange}
						autoComplete="organization"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				  <div className="sm:col-span-2">
					<div className="flex justify-between text-3xl">
					  <label htmlFor="subject" className="block font-semibold text-gray-900">
						Subject
					  </label>
					</div>
					<div className="mt-2.5">
					  <input
						id="subject"
						name="subject"
						type="text"
						value={subject}
						onChange={handleChange}
						autoComplete="subject"
						aria-describedby="subject-description"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				  <div className="sm:col-span-2">
					<div className="flex justify-between text-3xl">
					  <label htmlFor="message" className="block font-semibold text-gray-900">
						How can we help you?
					  </label>
					  <p id="message-description" className="text-gray-300 text-2xl">
						Max 500 characters
					  </p>
					</div>
					<div className="mt-2.5">
					  <textarea
						id="message"
						name="message"
						rows={4}
						value={message}
						onChange={handleChange}
						aria-describedby="message-description"
						className="block w-full rounded-md bg-white px-3.5 py-2 text-xl sm:text-2xl text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
					  />
					</div>
				  </div>
				</div>
				<div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
				  <button
					type="submit"
					className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				  >
					{loading ? 'Sending...' : 'Send message'}
				  </button>
				</div>
			  </form>
			</div>
		  </div>
  
		  {/* Right column: Image */}
		  <div className="px-6 lg:px-8 flex items-center justify-center">
			<img
			  src="/images/blueberriesxl.jpg"
			  alt="Goat photo"
			  className="w-full h-full object-cover rounded-lg"
			/>
		  </div>
		</div>
	  </div>
	  </>
	);
}
