const axios = require('axios');
require('dotenv').config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

/**
 * Calls the Python AI service to get a crop yield prediction.
 * @param {object} data - The input data for the prediction model.
 * @returns {Promise<object>} - The prediction result from the AI service.
 */
const getPrediction = async (data) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/predict`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error calling AI service:', error.message);
        // If the AI service is down or returns an error, re-throw to be caught by the controller
        throw new Error('Could not get prediction from AI service.');
    }
};

module.exports = {
    getPrediction
};