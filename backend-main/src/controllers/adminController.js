const Prediction = require('../models/Prediction');
const Farmer = require('../models/Farmer');
const axios = require('axios');

exports.getAnalytics = async (req, res) => {
    // Example: most suggested crops, yield trends
    const predictions = await Prediction.find().populate('farmer');
    // Aggregate analytics here
    res.json({ predictions });
};

exports.uploadDataset = async (req, res) => {
    // req.file is available if multer is used in the route
    // Optionally send file to Flask for retraining
    // await axios.post(process.env.AI_SERVICE_URL, { file: req.file.path });
    res.json({ status: 'uploaded', filename: req.file ? req.file.filename : null });
};