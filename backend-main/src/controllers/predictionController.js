const asyncHandler = require('express-async-handler');
const Farmer = require('../models/Farmer');
const { getPrediction } = require('../services/pythonService');

const predictYield = asyncHandler(async (req, res) => {
  // input from farmer app
  const { location, soilType, pastYield, rainfall, temp } = req.body;
  if (!location || !soilType) { res.status(400); throw new Error('Missing required fields'); }

  const aiPayload = { location, soilType, pastYield, rainfall, temp };

  // call python ai service
  const aiRes = await getPrediction(aiPayload);
  // expected aiRes: { recommendedCrop, predictedYield, fertilizerSuggestion, ... }

  const predictionDoc = {
    input: aiPayload,
    recommendedCrop: aiRes.recommendedCrop,
    predictedYield: aiRes.predictedYield,
    fertilizer: aiRes.fertilizerSuggestion || aiRes.fertilizer,
    rawAIResponse: aiRes
  };

  // if user authenticated, save prediction to their history
  if (req.farmer) {
    const farmer = await Farmer.findById(req.farmer._id);
    farmer.predictions.push(predictionDoc);
    await farmer.save();
  }

  res.json({ success: true, prediction: predictionDoc });
});

module.exports = { predictYield };
