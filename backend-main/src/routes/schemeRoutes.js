const express = require('express');
const router = express.Router();
const { getSchemes, createScheme, deleteScheme } = require('../controllers/schemeController');
const { protect } = require('../middleware/authMiddleware'); // Assuming admin routes should be protected

// For now, I'm assuming only admin can modify schemes.
// The GET route can be public if needed.
router.route('/')
  .get(getSchemes)
  .post(protect, createScheme); // Protect the POST route

router.route('/:id')
  .delete(protect, deleteScheme); // Protect the DELETE route

module.exports = router;
