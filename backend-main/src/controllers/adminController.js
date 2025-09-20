const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if admin exists
  const exists = await Admin.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// Login Admin
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get Admin Profile
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-password');

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

module.exports = { registerAdmin, authAdmin, getAdminProfile };
