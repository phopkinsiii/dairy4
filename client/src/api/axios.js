// @ts-nocheck
// src/api/axios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (import.meta.env.MODE === 'development') {
	console.log('🔧 Axios Base URL (DEV):', baseURL);
}

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

export default axiosInstance;
