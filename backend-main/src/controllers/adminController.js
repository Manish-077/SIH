const asyncHandler = require('express-async-handler');
const Prediction = require('../models/Prediction');
const Farmer = require('../models/Farmer');
const Admin = require('../models/Admin'); // Import Admin model
const bcrypt = require('bcryptjs'); // Import bcryptjs
const generateToken = require('../utils/generateToken'); // Import generateToken
const axios = require('axios'); // Import axios
const fs = require('fs'); // Import fs module

// Load environment variables
require('dotenv').config();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Public (for now)
const getAnalytics = asyncHandler(async (req, res) => {
    // 1. Usage Stats
    const totalPredictions = await Prediction.countDocuments();
    const totalFarmers = await Farmer.countDocuments();

    // 2. Yield Trends (monthly average yield)
    const yieldTrends = await Prediction.aggregate([
        {
            $group: {
                _id: { $month: "$timestamp" },
                averageYield: { $avg: "$result" }
            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                yield: "$averageYield"
            }
        }
    ]);

    // 3. Predictions by Soil Type
    const predictionsBySoilType = await Prediction.aggregate([
        {
            $group: {
                _id: "$input.Soil_Type",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "count": -1 }
        },
        {
            $project: {
                _id: 0,
                soilType: "$_id",
                count: "$count"
            }
        }
    ]);

    res.json({
        usageStats: {
            totalPredictions,
            totalFarmers
        },
        yieldTrends,
        predictionsBySoilType
    });
});

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Upload dataset for AI model retraining
// @route   POST /api/admin/dataset
// @access  Private
const datasetUpload = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const filePath = req.file.path;

    try {
        // Read the CSV file content
        const csvData = fs.readFileSync(filePath, 'utf8');

        // Forward the CSV data to the Flask AI service for retraining
        const aiResponse = await axios.post(`${AI_SERVICE_URL}/retrain`, csvData, {
            headers: {
                'Content-Type': 'text/csv'
            }
        });

        // Optionally, delete the temporary file after forwarding
        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'Dataset uploaded and sent for retraining', aiResponse: aiResponse.data });

    } catch (error) {
        console.error('Error during dataset upload or AI retraining:', error);
        res.status(500).json({ message: 'Dataset upload failed', error: error.message });
    }
});

module.exports = { getAnalytics, registerAdmin, loginAdmin, datasetUpload };