const express = require('express');
const router = express.Router();
const { registerFarmer, authFarmer, getProfile, getFarmers, predictCropYield, deleteFarmer } = require('../controllers/farmerController');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminAuthMiddleware');

router.post('/register', registerFarmer);
router.post('/login', authFarmer);
router.get('/profile', protect, getProfile);
router.post('/predict', protect, predictCropYield);
router.get('/', getFarmers);
router.delete('/:id', adminProtect, deleteFarmer);

module.exports = router;
