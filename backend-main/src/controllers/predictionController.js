const Prediction = require('../models/Prediction');
const Farmer = require('../models/Farmer');
const { getPrediction } = require('../services/pythonService');

exports.predictCropYield = async (req, res) => {
    try {
        const farmerData = req.body;
        // Call Flask AI service via pythonService.js
        const aiRes = await getPrediction(farmerData);
        const prediction = aiRes.prediction;

        // Save farmer info and prediction
        let farmer = await Farmer.findOne({ phone: farmerData.phone });
        if (!farmer) {
            farmer = new Farmer(farmerData);
            await farmer.save();
        }
        const pred = new Prediction({
            farmer: farmer._id,
            input: farmerData,
            result: prediction,
            timestamp: new Date()
        });
        await pred.save();

        res.json({ prediction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};