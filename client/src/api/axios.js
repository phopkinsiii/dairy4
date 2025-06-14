// @ts-nocheck
// src/api/axios.js
import axios from 'axios';

const API_BASE_PATH = '/api';
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (import.meta.env.MODE === 'development') {
	console.log('🔧 Axios Base URL (DEV):', baseURL);
}

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

// Add interceptor to handle API path
axiosInstance.interceptors.request.use((config) => {
	// If the URL doesn't start with /api, add it
	if (!config.url.startsWith(API_BASE_PATH)) {
		config.url = `${API_BASE_PATH}${config.url.startsWith('/') ? '' : '/'}${config.url}`;
	}
	
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
