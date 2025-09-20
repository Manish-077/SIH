const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idealSoil: String,
  fertilizerRecommendation: String,
  notes: String
});

module.exports = mongoose.model('Crop', CropSchema);
