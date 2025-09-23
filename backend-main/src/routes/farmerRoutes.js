const express = require('express');
const router = express.Router();
const { registerFarmer, authFarmer, getProfile, getFarmers, predictCropYield } = require('../controllers/farmerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerFarmer);
router.post('/login', authFarmer);
router.get('/profile', protect, getProfile);
router.post('/predict', protect, predictCropYield);
router.get('/', getFarmers);

module.exports = router;
