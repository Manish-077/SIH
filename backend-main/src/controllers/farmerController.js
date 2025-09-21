const asyncHandler = require('express-async-handler');
const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
// const { token } = require('morgan');

const registerFarmer = asyncHandler(async (req, res) => {
  console.log('Register request body:', req.body);
  const { name, phone, password, location } = req.body;
  try {
    const exists = await Farmer.findOne({ phone });
    if (exists) {
      console.log('Farmer already exists:', phone);
      return res.status(400).json({ message: 'Farmer already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const farmer = await Farmer.create({ name, phone, password: hash, location });
    if (farmer) {
      console.log('Farmer registered:', farmer);
      res.status(201).json({
        _id: farmer._id,
        name: farmer.name,
        phone: farmer.phone,
        location: farmer.location,
        token: generateToken(farmer._id)
      });
    } else {
      console.log('Invalid data received');
      res.status(400).json({ message: 'Invalid data' });
    }
  } catch (err) {
    console.error('Error in registerFarmer:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

const authFarmer = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const farmer = await Farmer.findOne({ phone });
  if (!farmer) {
    return res.status(400).json({ message: 'Farmer not registered' });
  }
  const isMatch = await bcrypt.compare(password, farmer.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({
    _id: farmer._id,
    name: farmer.name,
    phone: farmer.phone,
    token: generateToken(farmer._id)
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.farmer._id);
  if (farmer) res.json(farmer);
  else { res.status(404); throw new Error('Farmer not found'); }
});

module.exports = { registerFarmer, authFarmer, getProfile };
