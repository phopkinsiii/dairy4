// @ts-nocheck
//Tools and Packages

import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages and components
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import OurFarm from './pages/OurFarm';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import ExampleProducts from './pages/ExampleProducts';
import Login from './pages/Login.jsx';
import AdminRoute from './pages/admin/AdminRoute.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import Home from './pages/Home.jsx';
import BlogPage from './pages/BlogPage.jsx';
import NavbarLayout from './components/NavbarLayout.jsx';
import AddBlogPost from './pages/admin/AddBlogPost.jsx';
import EditProduct from './pages/admin/EditProduct.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {


	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className='p-4'
			/>
			<NavbarLayout >
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<ProductList />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/our-farm' element={<OurFarm />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/manage-products'
						element={
							<AdminRoute adminOnly>
								<ManageProducts />
							</AdminRoute>
						}
					/>
					<Route
						path='/add-product'
						element={
							<AdminRoute >
								<AddProduct />
							</AdminRoute>
						}
					/>
					<Route path="/admin/edit-product/:id"
						element={
							<AdminRoute >
								<EditProduct />
							</AdminRoute>
						}
					/>
					<Route
						path='/add-blog'
						element={
							<AdminRoute >
								<AddBlogPost />
							</AdminRoute>
						}
					/>
					<Route path='/blog' element={<BlogPage />} />
					<Route path='/checkout' element={<Checkout />} />

					{/* <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/admin' element={<AdminDashboard />} /> */}
				</Routes>
			</NavbarLayout>
		</>
	);
}

export default App;
