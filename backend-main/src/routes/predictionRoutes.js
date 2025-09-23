const express = require('express');
const router = express.Router();
const { predictCropYield } = require('../controllers/predictionController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, predictCropYield);

module.exports = router;