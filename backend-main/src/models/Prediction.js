const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
    input: Object,
    result: Number,
    timestamp: Date
});

module.exports = mongoose.model('Prediction', PredictionSchema);