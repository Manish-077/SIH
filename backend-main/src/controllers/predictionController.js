const Prediction = require('../models/Prediction');
const { getPrediction } = require('../services/pythonService');
const asyncHandler = require('express-async-handler');

exports.predictCropYield = asyncHandler(async (req, res) => {
    const { Soil_Type, Rainfall_mm, Temperature_C, Fertilizer_Used_kg_per_acre } = req.body;

    if (!Soil_Type || !Rainfall_mm || !Temperature_C || !Fertilizer_Used_kg_per_acre) {
        res.status(400);
        throw new Error('Please provide all required fields: Soil_Type, Rainfall_mm, Temperature_C, Fertilizer_Used_kg_per_acre');
    }

    const farmerData = {
        Soil_Type,
        Rainfall_mm,
        Temperature_C,
        Fertilizer_Used_kg_per_acre
    };

    const aiRes = await getPrediction(farmerData);
    const prediction = aiRes.Predicted_Yield;

    const pred = new Prediction({
        farmer: req.farmer._id,
        input: farmerData,
        result: prediction,
        timestamp: new Date()
    });
    await pred.save();

    res.json({ "Predicted_Yield": prediction });
});