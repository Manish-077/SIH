const express = require('express');
const { registerAdmin, authAdmin, getAdminProfile } = require('../controllers/adminController'); // Make sure "AdminController.js" matches
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);
router.get('/profile', protectAdmin, getAdminProfile);

module.exports = router;
