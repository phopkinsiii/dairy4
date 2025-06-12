const normalize = (url) => url?.replace(/\/$/, ''); // remove trailing slash

export const corsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true); // Allow no-origin requests like Postman

		const allowed = (process.env.ALLOWED_ORIGINS || '')
			.split(',')
			.map(normalize);

		const incoming = normalize(origin);

		if (allowed.includes(incoming)) {
			return callback(null, true);
		}

		console.error(`❌ CORS blocked: ${origin} not in allowed list.`);
		callback(new Error(`Not allowed by CORS: ${origin}`));
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
