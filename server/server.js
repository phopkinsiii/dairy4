import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './config/corsOptions.js';

// Debug the loaded environment variable
console.log('✅ CLIENT_URL from .env:', process.env.CLIENT_URL);

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import forumRoutes from './routes/forumRoutes.js';
import goatRoutes from './routes/goatRoutes.js';
import {
	uploadsMiddleware,
	uploadsCORSHeaders,
} from './middleware/uploadsMiddleware.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoutes);
app.use(express.json());

// ✅ Serve static uploads
app.use('/uploads', uploadsCORSHeaders, uploadsMiddleware);

// ✅ API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/goats', goatRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ Connect to DB and start server
connectDB();

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`✅ Server listening on port ${port}`);
});
