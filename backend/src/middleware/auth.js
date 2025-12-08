const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            console.log('❌ Auth failed: No token provided');
            return res.status(401).json({ error: 'No authentication token found' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('❌ CRITICAL: JWT_SECRET is missing from .env!');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            console.log('❌ Auth failed: User not found for ID:', decoded.userId);
            throw new Error('User not found');
        }

        console.log('✅ Auth successful for user:', user.email);
        req.user = user;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log('❌ Auth error:', error.message);
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;
