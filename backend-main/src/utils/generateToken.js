const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

console.log("JWT_SECRET in use:", process.env.JWT_SECRET);

module.exports = generateToken;
