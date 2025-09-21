const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    location: String,
    // Add other fields as needed
});

module.exports = mongoose.model('Farmer', FarmerSchema);