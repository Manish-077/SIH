// Load environment variables from parent folder .env
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const farmerRoutes = require('./src/routes/farmerRoutes');
const predictionRoutes = require('./src/routes/predictionRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// ✅ Allow requests from Flutter & React
app.use(
  cors({
    origin: [
      "http://localhost:3000", // React Admin Dashboard
      "http://localhost:8080", // React (alternate dev port)
      "http://localhost:5173", // Vite React default
      "http://localhost:5000", // For testing APIs directly
      "http://10.0.2.2:5000"   // Android Emulator to backend
    ],
    credentials: true,
  })
);

// Health check route
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/admins', adminRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/predict', predictionRoutes); // <- will forward to AI Service

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
