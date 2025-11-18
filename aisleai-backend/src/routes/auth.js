const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User'); // adjust path if needed

function sha256Hash(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User exists' });

    const hashed = sha256Hash(password);
    console.log(password, hashed)
    const user = new User({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User created' });
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        
        const hashed = sha256Hash(password);
        console.log(password, hashed)
    if (user.password !== hashed) return res.status(401).json({ message: 'Invalid credentials' });

    // generate token or return success
    res.json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;