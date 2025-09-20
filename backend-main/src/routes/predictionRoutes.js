const express = require('express');
const router = express.Router();
const { predictYield } = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');

// Use protect to require login; remove protect if public access is desired
router.post('/', protect, predictYield);

module.exports = router;
