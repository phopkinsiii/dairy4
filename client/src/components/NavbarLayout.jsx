// @ts-nocheck
import React from 'react';
import StickyNavbar from './StickyNavbar';
import { useNavbarContext } from '../contexts/NavbarContext';
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';


const excludedRoutes = ['/login', '/register'];

const NavbarLayout = ({ children }) => {
	const { isScrolled } = useNavbarContext();
	const { state: cartState } = useCartContext();
	const location = useLocation();


	return (
		<>
			{/* Sticky Navbar */}
			<StickyNavbar isScrolled={isScrolled} />



			{/* Page content */}
			<main>
				{children}
			</main>
		</>
	);
};

export default NavbarLayout;
