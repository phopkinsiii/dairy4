import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = ['http://localhost:5173']; // Add your deployed domain later too

// ✅ Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
); //be sure to add real domain name after deployment.
app.use(morgan('dev'));
app.use(express.json());

// ✅ Serve static files from /uploads
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);
// Error handler
app.use(errorHandler);

// Connect to DB and start server
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
