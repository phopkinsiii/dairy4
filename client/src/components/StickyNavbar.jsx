import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import UserGreeting from './UserGreeting';
import AdminDropdown from './AdminDropdown';
import { useUserContext } from '../contexts/UserContext';
import { useCartContext } from '../contexts/CartContext';

const StickyNavbar = () => {
	const { state: userState } = useUserContext();
	const { cartItems } = useCartContext();
	const cartItemCount = cartItems?.length || 0;
	const isAdmin = userState.user?.role === 'admin';

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/our-farm' },
		{ name: 'Products', href: '/products' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: '/contact' },
	];

	return (
		<nav className='sticky top-0 left-0 w-full z-50'>
			<div
				className={`relative transition-all duration-300 ${
					scrolled ? 'backdrop-blur-md bg-white/20' : 'bg-transparent'
				}`}
			>
				{/* Background image layer */}
				<div
					className="absolute inset-0 z-[-1] bg-[url('/images/navbar-bg.png')] bg-cover bg-center bg-no-repeat"
					style={{
						opacity: scrolled ? 0.2 : 1,
						transition: 'opacity 0.3s ease-in-out',
					}}
				/>

				{/* Navbar content */}
				<div className='flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-xl'>
					<Link to='/' className='flex items-center'>
						<img
							src='/images/goat_logo1.png'
							alt='Blueberry Dairy Logo'
							className='h-20 w-20 object-contain rounded-full bg-white/60 backdrop-blur-sm p-1 shadow-lg ring-2 ring-amber-950'
						/>
					</Link>

					<ul className='flex gap-6'>
						{navigation.map((item, index) => (
							<li key={item.name}>
								<NavLink
									to={item.href}
									className={({ isActive }) =>
										`text-2xl font-semibold opacity-0 transition-all duration-200 transform hover:scale-105 active:scale-95 fade-in-up ${
											isActive
												? 'text-stone-950 underline'
												: 'text-white hover:text-gray-300'
										}`
									}
									style={{ animationDelay: `${index * 100}ms` }} // staggered animation
								>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>

					<div className='flex items-center space-x-6'>
						{isAdmin && <AdminDropdown />}
						<UserGreeting />
						<AuthButton />
						<Link to='/cart' className='relative'>
							<ShoppingCartIcon className='h-8 w-8 text-white hover:text-yellow-300 transition' />
							{cartItemCount > 0 && (
								<span className='absolute -top-2 -right-2 text-sm bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold'>
									{cartItemCount}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default StickyNavbar;
