import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.jsx';
import { loginUser } from '../services/authService';
import Logo from '../components/Logo.jsx';

const Login = () => {
	const navigate = useNavigate();
	const { dispatch } = useUserContext();

	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false); // 👈 Add this

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await loginUser(credentials, dispatch);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed.');
		}
	};

	return (
		<div className='flex min-h-screen'>
			{/* Left: Form */}
			<div className='w-1/2 flex items-center justify-center px-8 bg-gray-50'>
				<div className='max-w-md w-full'>
					<h2 className='text-3xl font-bold text-gray-800 mb-6'>
						Sign in to your account
					</h2>
					{error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}

					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='email'
								className='block text-lg font-medium text-gray-700'
							>
								Email address
							</label>
							<input
								type='email'
								name='email'
								value={credentials.email}
								onChange={handleChange}
								required
								className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-lg font-medium text-gray-700'
							>
								Password
							</label>
							<input
								type={showPassword ? 'text' : 'password'} // 👈 Toggle here
								name='password'
								value={credentials.password}
								onChange={handleChange}
								required
								className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base'
							/>
							<div className='mt-2 flex items-center space-x-2'>
								<input
									id='show-password'
									type='checkbox'
									checked={showPassword}
									onChange={() => setShowPassword((prev) => !prev)}
									className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
								/>
								<label
									htmlFor='show-password'
									className='text-sm text-gray-600'
								>
									Show Password
								</label>
							</div>
							<div className='mt-2 text-right'>
	<Link
		to='/forgot-password'
		className='text-sm text-indigo-600 hover:underline'
	>
		Forgot your password?
	</Link>
</div>

						</div>

						<button
							type='submit'
							className='w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition duration-200'
						>
							Sign in
						</button>
					</form>
					<p className='text-sm mt-4 text-center text-gray-700'>
						Don’t have an account?{' '}
						<Link
							to='/register'
							className='text-indigo-600 hover:underline font-semibold'
						>
							Register here
						</Link>
					</p>
				</div>
			</div>

			{/* Right: Logo */}
			<div className='w-1/2 flex items-center justify-center bg-gradient-to-br from-green-100 to-gray-200'>
				<Logo />
			</div>
		</div>
	);
};

export default Login;
