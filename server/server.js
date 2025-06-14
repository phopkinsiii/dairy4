// @ts-nocheck
import dotenv from 'dotenv-flow';

// Load environment variables
const envPath = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

console.log('🔧 Loading environment from:', envPath);
dotenv.config({ path: envPath });

// Validate environment
console.log('🧠 Environment variables loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  CLIENT_URL: process.env.CLIENT_URL
});

import Stripe from 'stripe'; // ✅ Moved before use
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { validateEnv } from './config/validateEnv.js';
validateEnv(); // ✅ Ensure all env variables are defined

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { corsOptions } from './config/corsOptions.js';
import { globalLimiter } from './middleware/rateLimiter.js'; // Global limiter

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import goatRoutes from './routes/goatRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

import {
	uploadsMiddleware,
	uploadsCORSHeaders,
} from './middleware/uploadsMiddleware.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ✅ CORS
app.use(
	cors(corsOptions)
);

// Debug CORS settings
console.log('✅ CORS configuration:', {
	allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
	credentials: corsOptions.credentials,
	origin: corsOptions.origin
});

// Body parsing middleware must come after CORS
app.use(
	express.json({
		limit: '50mb'
	})
);

app.use(
	express.urlencoded({
		extended: true,
		limit: '50mb'
	})
);

// ✅ Compression first for better performance
app.use(compression());

// ✅ Security headers
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
	})
);

app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			'default-src': ["'self'"],
			'img-src': ["'self'", 'data:', 'blob:', '*.cloudinary.com'],
			'script-src': ["'self'", 'https://js.stripe.com'],
			'style-src': [
				"'self'",
				"'unsafe-inline'",
				'https://fonts.googleapis.com',
			],
			'font-src': ["'self'", 'https://fonts.gstatic.com'],
			'frame-src': ["'self'", 'https://js.stripe.com'],
		},
	})
);

// ✅ Logger (only in development)
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// ✅ CORS
app.use(cors(corsOptions));
//app.options('*', cors(corsOptions)); // ⛑ Handle preflight OPTIONS requests globally

// ✅ Stripe webhook needs raw body parsing
app.use(
	'/webhook',
	express.raw({ type: 'application/json' }),
	(req, res, next) => {
		req.stripe = stripe;
		next();
	},
	webhookRoutes
);

// ✅ Global JSON parser
app.use(express.json());

// ✅ Apply global rate limiter to all /api routes
app.use('/api', globalLimiter);

// ✅ Static file serving for image uploads
app.use('/uploads', uploadsCORSHeaders, uploadsMiddleware);

// ✅ Route mounts (specific rate limits like authLimiter are inside// Mount routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', contactRoutes);
app.use('/api', blogRoutes);
app.use('/api', uploadRoutes);
app.use('/api', orderRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', webhookRoutes);
app.use('/api', forumRoutes);
app.use('/api', goatRoutes);
app.use('/api', healthRoutes);

// ✅ Fallback for unknown API routes
app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

// ✅ Global error handler
app.use(errorHandler);

// ✅ Start server
connectDB();

const PORT = process.env.PORT || 5050;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🔧 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT,
    MONGO_URI: process.env.MONGO_URI?.substring(0, 20) + '...', // Mask sensitive parts
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY?.substring(0, 10) + '...' // Mask sensitive parts
  });
});
