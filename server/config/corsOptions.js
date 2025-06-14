const normalize = (url) => url?.replace(/\/$/, ''); // remove trailing slash

export const corsOptions = {
	origin: (origin, callback) => {
		console.log('🌐 CORS Origin Check:', {
			incoming: origin,
			env: process.env.NODE_ENV,
			allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
			credentials: corsOptions.credentials
		});

		if (!origin) {
			console.log('✅ CORS: Allowing no-origin request');
			return callback(null, true);
		}

		const allowed = (process.env.ALLOWED_ORIGINS || '')
			.split(',')
			.map(normalize);

		const incoming = normalize(origin);

		if (allowed.includes(incoming)) {
			console.log('✅ CORS: Allowing request from:', incoming);
			return callback(null, true);
		}

		console.error('❌ CORS blocked:', {
			incoming,
			allowed,
			env: process.env.NODE_ENV,
			message: 'Origin not in allowed list'
		});
		callback(new Error(`Not allowed by CORS: ${origin}`));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
	optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	maxAge: 86400, // 24 hours
};
