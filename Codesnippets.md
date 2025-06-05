const allowedOrigins = [
	process.env.CLIENT_URL,
	'http://localhost:5173',
	'http://127.0.0.1:5173',
].filter(Boolean); // Remove undefined entries

app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (like mobile apps or curl)
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
	})
);
