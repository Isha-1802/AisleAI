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

        let aiResponse;

        try {
            console.log('DEBUG: Processing chat message');
            console.log('DEBUG: Groq available:', !!groq);
            console.log('DEBUG: API Key exists:', !!process.env.GROQ_API_KEY);

            if (!groq || !process.env.GROQ_API_KEY) {
                console.error('DEBUG: Groq API key missing');
                throw new Error('Groq API key not configured');
            }

            // Get user data for gender if available
            const user = await User.findById(req.userId);
            const userGender = user?.preferences?.gender || 'not specified';

            // Get recent products for context
            const products = await Product.find().limit(10);
            const productContext = products.map(p => `${p.name} (${p.category}) by ${p.brand} - ₹${p.price}`).join(', ');

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are "The AisleAI Stylist", an elite fashion consultant for a luxury boutique. 
                        
                        USER PROFILE:
                        - Gender Identity: ${userGender}
                        - Aesthetic: Sophisticated, High-End, Personalized.
                        
                        YOUR OBJECTIVE:
                        1. Provide deep fashion expertise tailored to their gender (${userGender}). 
                        2. INTEGRATE OUR CATALOG: We have curated pieces in our store: ${productContext}.
                        3. REAL-WORLD DATA: When recommending items outside our catalog, you MUST ONLY use real, existing products and brands that exist in the real world.
                           - NO FABRICATED OR INVENTED PRODUCTS.
                           - Use your real-world knowledge of brands like Zara, H&M, Sabyasachi, Estee Lauder, etc.
                        4. BUDGETING: Provide choices for **Affordable**, **Mid-range**, and **Luxury** tiers.
                        5. MORNING/NIGHT: If asked about skincare/beauty, provide separate Morning and Night routines.
                        6. TONE: Sophisticated, Minimalist, and Encouraging. Use "WE" when referring to AisleAI.`
                    },
                    ...conversation.messages.slice(-10).map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 800,
            });

            aiResponse = completion.choices[0].message.content;
            console.log('✅ Groq AI response generated');
        } catch (error) {
            console.error('❌ Groq AI error:', error.message);
            aiResponse = `HEARTBEAT ERROR: ${error.message}. Please check your Groq API status or model availability. Defaulting to manual assistant mode: Hi! I'm your AI fashion stylist. How can I help you today?`;
        }

        // Add AI response
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
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to process message' });
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
