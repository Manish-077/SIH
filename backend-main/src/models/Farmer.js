const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  input: { type: Object },
  recommendedCrop: String,
  predictedYield: Number,
  fertilizer: String,
  rawAIResponse: Object
});

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  district: String,
  soilType: String,
  cropPreference: String,
  predictions: [PredictionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Farmer', FarmerSchema);
