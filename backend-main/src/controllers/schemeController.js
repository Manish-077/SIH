const asyncHandler = require('express-async-handler');
const Scheme = require('../models/Scheme');

// @desc    Get all schemes
// @route   GET /api/admin/schemes
// @access  Public
const getSchemes = asyncHandler(async (req, res) => {
  const schemes = await Scheme.find({}).sort({ createdAt: -1 });
  res.json(schemes);
});

// @desc    Create a new scheme
// @route   POST /api/admin/schemes
// @access  Private (Admin)
const createScheme = asyncHandler(async (req, res) => {
  const { title, description, url } = req.body;

  if (!title || !description || !url) {
    res.status(400);
    throw new Error('Please provide title, description, and url');
  }

  const scheme = new Scheme({
    title,
    description,
    url,
  });

  const createdScheme = await scheme.save();
  res.status(201).json(createdScheme);
});

// @desc    Delete a scheme
// @route   DELETE /api/admin/schemes/:id
// @access  Private (Admin)
const deleteScheme = asyncHandler(async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (scheme) {
    await scheme.remove();
    res.json({ message: 'Scheme removed' });
  } else {
    res.status(404);
    throw new Error('Scheme not found');
  }
});

module.exports = { getSchemes, createScheme, deleteScheme };
