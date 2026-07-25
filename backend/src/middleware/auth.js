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

        // Verify the token signature/expiry first. A failure here means the
        // token is genuinely invalid → 401 (client should re-login).
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.log('❌ Auth failed: invalid/expired token —', jwtError.message);
            return res.status(401).json({ error: 'Session expired, please log in again' });
        }

        // Look up the user. If the DB is momentarily unavailable (e.g. a cold
        // start on Render's free tier), this can throw even though the token is
        // perfectly valid — that must NOT masquerade as an auth failure, or the
        // user gets wrongly logged out. Return 503 so the client can retry.
        let user;
        try {
            user = await User.findById(decoded.userId).select('-password');
        } catch (dbError) {
            console.error('⚠️ Auth: DB lookup failed (transient):', dbError.message);
            return res.status(503).json({ error: 'Service warming up, please retry' });
        }

        if (!user) {
            console.log('❌ Auth failed: User not found for ID:', decoded.userId);
            return res.status(401).json({ error: 'Account not found, please log in again' });
        }

        req.user = user;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('❌ Auth middleware unexpected error:', error.message);
        res.status(503).json({ error: 'Service temporarily unavailable, please retry' });
    }
};

module.exports = auth;
