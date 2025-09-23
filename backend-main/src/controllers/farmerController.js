const asyncHandler = require('express-async-handler');
const Farmer = require('../models/Farmer');
const Prediction = require('../models/Prediction'); // Import Prediction model
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const axios = require('axios'); // Import axios

// Load environment variables
require('dotenv').config();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

// @desc    Register a new farmer
// @route   POST /api/farmers/register
// @access  Public
const registerFarmer = asyncHandler(async (req, res) => {
  const { name, phone, password, location } = req.body;

  if (!name || !phone || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const farmerExists = await Farmer.findOne({ phone });

  if (farmerExists) {
    res.status(400);
    throw new Error('Farmer already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const farmer = await Farmer.create({
    name,
    phone,
    password: hashedPassword,
    location,
  });

  if (farmer) {
    res.status(201).json({
      _id: farmer.id,
      name: farmer.name,
      phone: farmer.phone,
      token: generateToken(farmer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid farmer data');
  }
});

// @desc    Authenticate a farmer
// @route   POST /api/farmers/login
// @access  Public
const authFarmer = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const farmer = await Farmer.findOne({ phone });

  if (farmer && (await bcrypt.compare(password, farmer.password))) {
    res.json({
      _id: farmer.id,
      name: farmer.name,
      phone: farmer.phone,
      token: generateToken(farmer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get farmer profile
// @route   GET /api/farmers/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.farmer._id);
  if (farmer) res.json(farmer);
  else {
    res.status(404);
    throw new Error('Farmer not found');
  }
});


// @desc    Get all farmers
// @route   GET /api/farmers
// @access  Public
const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await Farmer.find({});
  res.json(farmers);
});

// @desc    Predict crop yield
// @route   POST /api/farmers/predict
// @access  Private
const predictCropYield = asyncHandler(async (req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall, crop, soil_type, fertilizer } = req.body;

    try {
        const aiResponse = await axios.post(`${AI_SERVICE_URL}/predict`, {
            N, P, K, temperature, humidity, ph, rainfall, crop, soil_type, fertilizer
        });

        const predictionResult = aiResponse.data.prediction;

        const prediction = await Prediction.create({
            farmer: req.farmer._id,
            input: { N, P, K, temperature, humidity, ph, rainfall, crop, soil_type, fertilizer },
            result: predictionResult,
            timestamp: new Date(),
        });

        res.status(200).json({ prediction: predictionResult, savedPrediction: prediction });

    } catch (error) {
        console.error('Error during crop yield prediction:', error);
        res.status(500).json({ message: 'Prediction failed', error: error.message });
    }
});

module.exports = { registerFarmer, authFarmer, getProfile, getFarmers, predictCropYield };
