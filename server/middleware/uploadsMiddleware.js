// server/middleware/uploadsMiddleware.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ✅ Resolve __dirname (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}
// ✅ Serve static files (uploads)
export const uploadsMiddleware = express.static(uploadsDir);

export const uploadsCORSHeaders = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
};
