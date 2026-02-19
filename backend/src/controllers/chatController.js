const Groq = require('groq-sdk');
const Conversation = require('../models/Conversation');
const Product = require('../models/Product');
const User = require('../models/User');

// Initialize Groq directly
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

console.log('🔧 Groq initialized in chatController.js');
console.log('API Key present:', !!process.env.GROQ_API_KEY);

// Get all conversations for a user
exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ userId: req.userId })
            .sort({ updatedAt: -1 })
            .select('_id title createdAt updatedAt messages');

        // Format for frontend
        const formatted = conversations.map(conv => ({
            id: conv._id,
            title: conv.title || (conv.messages[0]?.content.substring(0, 30) + '...' || 'New Chat'),
            date: conv.createdAt.toLocaleDateString(),
            messageCount: conv.messages.length
        }));

        res.json({ conversations: formatted });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

// Get a specific conversation
exports.getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json({ messages: conversation.messages });
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
};

// Create new conversation
exports.createConversation = async (req, res) => {
    try {
        const conversation = new Conversation({
            userId: req.userId,
            title: 'New Chat',
            messages: []
        });

        await conversation.save();

        res.json({
            conversationId: conversation._id,
            title: conversation.title,
            messages: []
        });
    } catch (error) {
        console.error('Create conversation error:', error);
        res.status(500).json({ error: 'Failed to create conversation' });
    }
};

// AI Stylist Chat
exports.chat = async (req, res) => {
    try {
        const { message, conversationId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Find or create conversation
        let conversation;
        if (conversationId) {
            conversation = await Conversation.findOne({
                _id: conversationId,
                userId: req.userId
            });
        }

        if (!conversation) {
            conversation = new Conversation({
                userId: req.userId,
                title: message.substring(0, 50),
                messages: []
            });
        }

        // Add user message
        conversation.messages.push({
            role: 'user',
            content: message,
        });

        let aiResponse = '';

        try {
            console.log(`🚀 DEBUG: Processing chat message: "${message}"`);

            const user = await User.findById(req.userId);
            const userGender = user?.preferences?.gender || 'not specified';
            const products = await Product.find().limit(5);
            const productContext = products.map(p => `${p.name}`).join(', ');

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are "The AisleAI Stylist", an elite fashion consultant.
                        USER GENDER: ${userGender}
                        BOUTIQUE PIECES: ${productContext}
                        
                        STRICT RULES:
                        1. RECOMMEND REAL PRODUCTS from global brands (Korean, Western, Modern Indian).
                        2. Match the specific occasion.
                        3. Provide Affordable, Mid-range, and Luxury options.
                        4. Tone: Sophisticated and Sharp.`
                    },
                    ...conversation.messages.slice(-10).map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 1000,
            });

            aiResponse = completion.choices[0].message.content;
            console.log('✅ AI Response generated successfully');

            conversation.messages.push({
                role: 'assistant',
                content: aiResponse,
            });
            conversation.updatedAt = new Date();
            await conversation.save();

            res.json({
                message: aiResponse,
                conversationId: conversation._id
            });

        } catch (error) {
            console.error('❌ AI error:', error.message);
            res.status(500).json({ error: `AI Error: ${error.message}` });
        }
    } catch (error) {
        console.error('Chat error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to process message' });
        }
    }
};

// Delete conversation
exports.deleteConversation = async (req, res) => {
    try {
        await Conversation.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        res.json({ message: 'Conversation deleted' });
    } catch (error) {
        console.error('Delete conversation error:', error);
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
};
