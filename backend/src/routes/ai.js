const express = require('express');
const router = express.Router();

// Placeholder for AI routes (can be same as chat for now)
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.post('/chat', auth, chatController.chat);

module.exports = router;
