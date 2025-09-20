const axios = require('axios');
const AI_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

const getPrediction = async (payload) => {
  try {
    const resp = await axios.post(`${AI_URL}/predict_advanced`, payload, { timeout: 15000 });
    return resp.data;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'AI service error';
    throw new Error(msg);
  }
};

module.exports = { getPrediction };
