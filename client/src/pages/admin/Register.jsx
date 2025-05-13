import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useUserContext } from '../../contexts/userContext';
import { registerUser } from '../../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useUserContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null) 

        try {
            await registerUser(formData, dispatch);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration Failed')
        }
    }


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {state.loading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{state.error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" className="w-full p-2 border" 
            name='name' 
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            />
            <input type="email" className="w-full p-2 border" 
            name='email' 
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            />
            <input type="password" className="w-full p-2 border" 
            name='password' 
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            />
            <button type='submit' className="w-full bg-green-600 text-white p-2 font-bold">Register</button>
        </form>
    </div>
  )
}

export default Register
