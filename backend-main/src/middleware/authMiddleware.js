const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Farmer = require('../models/Farmer');
require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get farmer from the token
            req.farmer = await Farmer.findById(decoded.id).select('-password');

            if (!req.farmer) {
                res.status(401);
                throw new Error('Not authorized, farmer not found');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
