import React from 'react';
import { Title, Meta, Link as HeadLink } from 'react-head';
import ProductGrid from '../components/ProductGrid'; // adjust this import if needed

const ProductList = () => {
	return (
		<>
			{/* SEO Metadata */}
			<Title>Our Farm Products | Blueberry Dairy</Title>
			<Meta name="description" content="Browse organic farm products including raw goat milk, cheese, yogurt, apples, blueberries, and more from Blueberry Dairy." />
			<HeadLink rel="canonical" href="https://blueberrydairy.com/products" />

			{/* Page Content */}
			<main className="min-h-screen bg-white pt-12 px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-6">Farm Products</h1>
				<p className="text-lg text-gray-600 mb-10">
					Fresh, local, and organic. Explore our selection of raw goat milk, handcrafted cheeses, blueberries, apples, and more.
				</p>

				<ProductGrid />
			</main>
		</>
	);
};

export default ProductList;
