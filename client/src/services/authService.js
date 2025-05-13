import axiosInstance from '../api/axios.js';

//Register User
export const registerUser = async (userData, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		const response = await axiosInstance.post('/register', userData);
		dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Registration failed.',
		});
		throw error;
	}
};

//Login User
export const loginUser = async (credentials, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });

		const response = await axiosInstance.post('/users/login', credentials);
		dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Request Failed',
		});
	}
};

//Request Password Reset
export const resetPassword = async (resetToken, newPassword, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		await axiosInstance.post('/reset-password', { resetToken, newPassword });
		dispatch({ type: 'SET_LOADING', payload: false });
	} catch (error) {
		dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message });
		throw error;
	}
};

//Reset Password
export const requestPasswordReset = async (email, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		await axiosInstance.post('/request-reset', { email });
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Request Failed',
		});
		throw error;
	}
};

//Set Admin Role (protected)
export const setAdminRole = async (userId, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		await axiosInstance.put(`/set-admin/${userId}`);
		dispatch({ type: 'SET_LOADING', payload: false });
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Admin update failed',
		});
		throw error;
	}
};

//Get all Users (protected)
export const getAllUsers = async (dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		const response = await axiosInstance('/');
		dispatch({ type: 'SET_LOADING', payload: false });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Failed to fetch users',
		});
		throw error;
	}
};

//Logout User (clear context)
export const logoutUser = (dispatch) => {
	dispatch({ type: 'LOGOUT' });
};
