const express = require('express');
const router = express.Router();
const { registerFarmer, authFarmer, getProfile } = require('../controllers/farmerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerFarmer);
router.post('/login', authFarmer);
router.get('/profile', protect, getProfile);

module.exports = router;
