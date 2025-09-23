const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Farmer', FarmerSchema);