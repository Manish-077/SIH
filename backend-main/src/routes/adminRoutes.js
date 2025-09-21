const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { getAnalytics, uploadDataset } = require('../controllers/adminController');

router.get('/analytics', getAnalytics);
router.post('/upload', upload.single('file'), uploadDataset);

// Admin Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name: username, email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;