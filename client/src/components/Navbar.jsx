// @ts-nocheck

import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';

import StickyNavbar from './StickyNavbar';

export default function Navbar({ isScrolled }) {
	const { dispatch, state } = useUserContext();
	const { role } = state;

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<>
			<Disclosure
				as='nav'
				className={`fixed top-0 left-0 w-full h-[500px] bg-cover bg-center transition-opacity duration-300 ${
					isScrolled
						? 'opacity-0 pointer-events-none hidden z-30'
						: 'opacity-100 z-40'
				}`}
				style={{
					backgroundImage: "url('/images/farm-banner.jpg')",
				}}
			>
				<div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
					<div className='flex h-16 justify-between'>
						<div className='inline-flex px-2 lg:px-0'>
							<Link className='flex shrink-0 items-center'>
								<img
									alt='Your Company'
									src='/images/myLogo.png'
									className='h-12 w-12 pt-2'
								/>
							</Link>
							{/* Navigation Links */}
							<div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
								<Link
									to='/'
									className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-2xl font-medium text-white hover:border-gray-300 hover:text-gray-700'
								>
									Home
								</Link>
								<Link
									to='/products'
									className='inline-flex items-center 
								px-1 pt-1 font-medium text-white text-2xl'
								>
									Products
								</Link>
								<Link
									to='/our-farm'
									className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-2xl font-medium text-white hover:border-gray-300 hover:text-gray-700'
								>
									The Farm
								</Link>
								<Link
									to='/contact'
									className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-2xl font-medium text-white hover:border-gray-300 hover:text-gray-700'
								>
									Contact
								</Link>

								{/* Admin Menu-restricted access */}
								{role === 'admin' && (
									<Menu
										as='div'
										className='relative flex justify-center items-center'
									>
										<MenuButton className='inline-flex items-center border-b-2 border-transparent px-4 pt-2 text-2xl font-bold text-white hover:border-red-500 hover:text-red-800'>
											Admin Panel
										</MenuButton>

										<MenuItems
											transition
											className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
										>
											<MenuItem>
												{({ active }) => (
													<Link
														to='/add-product'
														className={`block px-4 py-2 text-sm text-gray-700 ${
															active ? 'bg-gray-100' : ''
														}`}
													>
														Add Product
													</Link>
												)}
											</MenuItem>
											<MenuItem>
												{({ active }) => (
													<Link
														to='/update-product'
														className={`block px-4 py-2 text-sm text-gray-700 ${
															active ? 'bg-gray-100' : ''
														}`}
													>
														Update Product
													</Link>
												)}
											</MenuItem>
											<MenuItem>
												{({ active }) => (
													<Link
														to='/delete-product'
														className={`block px-4 py-2 text-sm text-gray-700 ${
															active ? 'bg-gray-100' : ''
														}`}
													>
														Delete Product
													</Link>
												)}
											</MenuItem>
											<hr className='border-gray-300' />
											<MenuItem>
												{({ active }) => (
													<Link
														to='/manage-users'
														className={`block px-4 py-2 text-sm text-gray-700 ${
															active ? 'bg-gray-100' : ''
														}`}
													>
														Manage Users
													</Link>
												)}
											</MenuItem>
										</MenuItems>
									</Menu>
								)}
							</div>
						</div>
						<div className='flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end'>
							<div className='grid w-full max-w-lg grid-cols-1 lg:max-w-xs'>
								<input
									name='search'
									type='search'
									placeholder='Search'
									className='col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
								<MagnifyingGlassIcon
									aria-hidden='true'
									className='pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400'
								/>
							</div>
						</div>

						<div className='hidden lg:ml-4 lg:flex lg:items-center'>
							<Link to='/cart'>
								<ShoppingCartIcon className='h-6 w-6 text-gray-500' />
							</Link>
							{state.user ? (
								<button
									onClick={handleLogout}
									className='bg-red-600 px-4
								py-2
								rounded'
								>
									Logout
								</button>
							) : (
								<Link to='/login' className='bg-blue-600 px-4 py-2 rounded'>
									Login
								</Link>
							)}

							{/* <button
              type="button"
              className="relative shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

							{/* Profile dropdown */}
							{/* <Menu as="div" className="relative ml-4 shrink-0">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu> */}
						</div>
					</div>
				</div>

				<DisclosurePanel className='lg:hidden'>
					<div className='space-y-1 pt-2 pb-3'>
						{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
						<DisclosureButton
							as='a'
							href='#'
							className='block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700'
						>
							Dashboard
						</DisclosureButton>
						<DisclosureButton
							as='a'
							href='#'
							className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
						>
							Team
						</DisclosureButton>
						<DisclosureButton
							as='a'
							href='#'
							className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
						>
							Projects
						</DisclosureButton>
						<DisclosureButton
							as='a'
							href='#'
							className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
						>
							Calendar
						</DisclosureButton>
					</div>
					<div className='border-t border-gray-200 pt-4 pb-3'>
						<div className='flex items-center px-4'>
							<div className='shrink-0'>
								<img
									alt=''
									src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
									className='size-10 rounded-full'
								/>
							</div>
							<div className='ml-3'>
								<div className='text-base font-medium text-gray-800'>
									Tom Cook
								</div>
								<div className='text-sm font-medium text-gray-500'>
									tom@example.com
								</div>
							</div>
							{/* <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}
						</div>
						<div className='mt-3 space-y-1'>
							<ShoppingCartIcon class='h-6 w-6 text-gray-500' />
							<DisclosureButton
								as='a'
								href='#'
								className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
							>
								Your Profile
							</DisclosureButton>
							<DisclosureButton
								as='a'
								href='#'
								className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
							>
								Settings
							</DisclosureButton>
							<DisclosureButton
								as='a'
								href='#'
								className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
							>
								Sign out
							</DisclosureButton>
						</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<StickyNavbar isScrolled={isScrolled} />
		</>
	);
}
