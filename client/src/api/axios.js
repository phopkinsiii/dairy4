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

// Add request interceptor with detailed logging
axiosInstance.interceptors.request.use((config) => {
	console.log('🚀 Axios Request:', {
		method: config.method,
		url: config.url,
		fullUrl: config.baseURL + config.url,
		headers: config.headers,
		data: config.method === 'get' ? 'GET request' : config.data
	});
	
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const token = storedUser?.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (error) => {
	console.error('❌ Axios Request Error:', error);
	return Promise.reject(error);
});

// Add response interceptor with detailed logging
axiosInstance.interceptors.response.use(
	(response) => {
		console.log('✅ Axios Response:', {
			status: response.status,
			url: response.config.url,
			data: response.data
		});
		return response;
	},
	(error) => {
		console.error('❌ Axios Response Error:', {
			error: error,
			message: error.message,
			response: error.response?.data,
			status: error.response?.status,
			url: error.config?.url
		});
		return Promise.reject(error);
	}
);

console.log('📦 Axios is using baseURL:', baseURL);

// No need for duplicate interceptor since we've already handled API path

export default axiosInstance;
