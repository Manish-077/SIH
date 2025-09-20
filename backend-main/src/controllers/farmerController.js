const asyncHandler = require('express-async-handler');
const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
// const { token } = require('morgan');

const registerFarmer = asyncHandler(async (req, res) => {
  const { name, email, password, district, soilType, cropPreference } = req.body;
  const exists = await Farmer.findOne({ email });
  if (exists) { res.status(400); throw new Error('Farmer already exists'); }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const farmer = await Farmer.create({ name, email, password: hash, district, soilType, cropPreference });
  if (farmer) {
    res.status(201).json({
      _id: farmer._id,
      name: farmer.name,
      email: farmer.email,
      token: generateToken(farmer._id)
    });
  } else {
    res.status(400); throw new Error('Invalid data');
  }
});

const authFarmer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const farmer = await Farmer.findOne({ email });
  if (farmer) {
    const isMatch = await bcrypt.compare(password, farmer.password);
    console.log(isMatch);
    if (isMatch) {
      res.json({
        _id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        token: generateToken(farmer._id)
    
      });
      console.log(generateToken(farmer._id));
    }
  }
  else {
    console.log("No farmer found with email:", email);
  }
  
});

const getProfile = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.farmer._id);
  if (farmer) res.json(farmer);
  else { res.status(404); throw new Error('Farmer not found'); }
});

module.exports = { registerFarmer, authFarmer, getProfile };
