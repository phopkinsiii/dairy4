// components/StickyNavbar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import UserGreeting from './UserGreeting';
import AdminDropdown from './AdminDropdown';
import { useUserContext } from '../contexts/UserContext';
import { useCartContext } from '../contexts/CartContext'; // ✅ match the export

const StickyNavbar = () => {
  const { state: userState } = useUserContext();
  const { cartItems } = useCartContext(); // ✅ use the correct hook

  const isAdmin = userState.user?.role === 'admin';
  const cartItemCount = cartItems?.length || 0;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/our-farm' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className='sticky top-0 left-0 w-full z-50 shadow-md text-xl'
      style={{
        backgroundImage: "url('/images/navbar-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className='flex items-center justify-between max-w-7xl mx-auto px-6 py-4'>
        <Link to='/' className='flex items-center'>
          <img
            src='/images/goat_logo1.png'
            alt='Blueberry Dairy Logo'
            className='h-20 w-20 object-contain rounded-full bg-white/60 backdrop-blur-sm p-1 shadow-lg ring-2 ring-amber-950'
          />
        </Link>

        <ul className='flex gap-6'>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `text-2xl font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-stone-950 underline'
                      : 'text-white hover:text-gray-300'
                  }`
                }
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
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-8 w-8 text-white hover:text-yellow-300 transition" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-sm bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
