// index.js
import express from 'express';
import connectDB from './src/config/db.js'; // MongoDB connection file
import routes from './src/routes/index.js';
import path from 'path';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files from the "uploads" directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', routes); // Mount all routes under /api

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));