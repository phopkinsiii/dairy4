const Login = () => {
	// ...state, handlers, etc.

	return (
		<DarkPageLayout>
			<div className='flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden'>
				{/* Left: Dark form section */}
				<div className='w-1/2 bg-gray-900 text-white p-10 flex flex-col justify-center'>
					<h2 className='text-3xl font-bold mb-6'>Sign in to your account</h2>
					{error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}

					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Email */}
						<div>
							<label htmlFor='email' className='block text-lg font-medium'>
								Email address
							</label>
							<input
								type='email'
								name='email'
								value={credentials.email}
								onChange={handleChange}
								required
								className='mt-1 w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
							/>
						</div>

						{/* Password */}
						<div>
							<label htmlFor='password' className='block text-lg font-medium'>
								Password
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={credentials.password}
								onChange={handleChange}
								required
								className='mt-1 w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
							/>
							<div className='mt-2 flex items-center space-x-2'>
								<input
									id='show-password'
									type='checkbox'
									checked={showPassword}
									onChange={() => setShowPassword((prev) => !prev)}
									className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
								/>
								<label htmlFor='show-password' className='text-sm text-gray-300'>
									Show Password
								</label>
							</div>
							<div className='mt-2 text-right'>
								<Link
									to='/forgot-password'
									className='text-sm text-indigo-400 hover:underline'
								>
									Forgot your password?
								</Link>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition duration-200'
						>
							Sign in
						</button>
					</form>

					<p className='text-sm mt-4 text-center text-gray-300'>
						Don’t have an account?{' '}
						<Link
							to='/register'
							className='text-indigo-400 hover:underline font-semibold'
						>
							Register here
						</Link>
					</p>
				</div>

				{/* Right: Light background for logo */}
				<div className='w-1/2 flex items-center justify-center bg-gray-100'>
					<Logo />
				</div>
			</div>
		</DarkPageLayout>
	);
};