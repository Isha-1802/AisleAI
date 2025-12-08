const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// Get all conversations
router.get('/conversations', auth, chatController.getConversations);

// Get specific conversation
router.get('/conversations/:id', auth, chatController.getConversation);

// Create new conversation
router.post('/conversations', auth, chatController.createConversation);

// Send message (chat)
router.post('/message', auth, chatController.chat);

// Delete conversation
router.delete('/conversations/:id', auth, chatController.deleteConversation);

module.exports = router;
