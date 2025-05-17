import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUserContext } from '../contexts/UserContext';
import { registerUser } from '../services/authService';

const Register = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useUserContext();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await registerUser(formData, dispatch);
			toast.success(
				`Welcome, ${formData.name}! Your account has been created.`,
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					theme: 'colored',
				}
			);
			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Registration Failed');
		}
	};

	return (
		<div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-md'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>Register</h2>

			{state.loading && <p>Loading...</p>}
			{error && <p className='text-red-500'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					className='w-full p-3 border border-gray-300 rounded-md'
					name='name'
					placeholder='Name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type='email'
					className='w-full p-3 border border-gray-300 rounded-md'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type={showPassword ? 'text' : 'password'}
					className='w-full p-3 border border-gray-300 rounded-md'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
				/>

				<label className='inline-flex items-center text-sm text-gray-700'>
					<input
						type='checkbox'
						checked={showPassword}
						onChange={(e) => setShowPassword(e.target.checked)}
						className='mr-2'
					/>
					Show Password
				</label>

				<button
					type='submit'
					className='w-full bg-green-600 text-white p-3 font-semibold rounded-md hover:bg-green-700 transition'
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
