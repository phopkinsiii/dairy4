// server/config/corsOptions.js
const allowedOrigins = [
	process.env.CLIENT_URL,
	'https://www.blueberrydairy.com',
	'http://localhost:5173',
	'http://127.0.0.1:5173',
].filter(Boolean);

console.log('✅ Allowed CORS Origins:', allowedOrigins);

export const corsOptions = {
	origin: function (origin, callback) {
		// Allow requests with no origin (like curl or mobile apps)
		if (!origin) return callback(null, true);

		if (allowedOrigins.includes(origin)) {
			console.log('✅ CORS Allowed:', origin);
			callback(null, true);
		} else {
			console.warn('❌ CORS Rejected:', origin);
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};
