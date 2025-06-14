// @ts-nocheck
// src/api/axios.js
import axios from 'axios';

// Ensure no double /api
const API_BASE_PATH = import.meta.env.VITE_API_BASE_URL.endsWith('/api') 
	? '' 
	: '/api';

const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log('🔧 Axios Configuration:', {
	mode: import.meta.env.MODE,
	baseURL,
	apiPath: API_BASE_PATH,
	fullUrl: `${baseURL}${API_BASE_PATH}`
});

const axiosInstance = axios.create({
	baseURL: `${baseURL}${API_BASE_PATH}`,
	withCredentials: true,
});

// Add interceptor to handle relative URLs
axiosInstance.interceptors.request.use((config) => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const token = storedUser?.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

console.log('📦 Axios is using baseURL:', baseURL);

// No need for duplicate interceptor since we've already handled API path

export default axiosInstance;
