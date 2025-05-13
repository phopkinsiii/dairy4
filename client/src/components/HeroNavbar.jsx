// components/HeroNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthButton from './AuthButton.jsx';
import UserGreeting from './UserGreeting';

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/our-farm' },
	{ name: 'Products', href: '/products' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contact', href: '/contact' },
];

const HeroNavbar = ({ isScrolled }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-[300px] transition-all duration-500 ease-in-out ${
				isScrolled
					? 'opacity-0 -translate-y-5 z-30'
					: 'opacity-100 translate-y-0 z-60'
			}`}
		>
			{/* Background image (non-interactive) */}
			<div
				className='absolute inset-0 bg-cover bg-center pointer-events-none'
				style={{
					backgroundImage: "url('/images/isaac_banner.jpg')",
				}}
			></div>

			{/* Foreground content */}
			<div className='relative z-10 mx-auto flex flex-col justify-between h-full max-w-7xl px-6 py-6'>
				{/* Logo (top) */}
				<div>
					<img
						src='/images/myLogo.png'
						alt='Blueberry Dairy'
						className='h-16'
					/>
				</div>

				{/* Nav row with AuthButton */}
				<nav className='w-full flex justify-between items-center mt-4'>
					{/* Left: nav links */}
					<ul className='flex gap-6'>
						{navigation.map((item) => (
							<li key={item.name}>
								<NavLink
									to={item.href}
									className={({ isActive }) =>
										`inline-block text-white text-2xl font-medium ${
											isActive
												? 'underline text-yellow-300'
												: 'hover:text-yellow-200'
										}`
									}
								>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>

					{/* Right: AuthButton */}
					<div className='flex items-center justify-end space-x-12 z-10'>
						<UserGreeting />
						<AuthButton />
					</div>
				</nav>
			</div>

			{/* Optional Hero Text */}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
					isScrolled ? 'opacity-0' : 'opacity-100'
				}`}
			>
				{/* Add banner text here if needed */}
			</div>
		</div>
	);
};

//export default HeroNavbar;
