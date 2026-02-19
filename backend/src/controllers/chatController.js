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
            console.log(`🚀 DEBUG: Starting real-time stream for user message: "${message}"`);
            if (!groq || !process.env.GROQ_API_KEY) {
                throw new Error('Groq API key not configured');
            }

            const user = await User.findById(req.userId);
            const userGender = user?.preferences?.gender || 'not specified';
            const products = await Product.find().limit(10);
            const productContext = products.map(p => `${p.name} (${p.category}) by ${p.brand} - ₹${p.price}`).join(', ');

            // Set headers for SSE
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const stream = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are "The AisleAI Stylist", an elite fashion consultant for a luxury boutique. 
                        
                        USER PROFILE:
                        - Gender Identity: ${userGender}
                        - Aesthetic: Sophisticated, High-End, Personalized.
                        
                        YOUR OBJECTIVE:
                        1. GLOBAL EXPERTISE: You are an expert in world fashion—from Paris High Fashion and Korean Street Style to modern Indian Couture and Minimalist Western trends.
                        2. OCCASION PRECISION: Only suggest outfits that strictly fit the specific occasion mentioned. DO NOT repeat generic gowns for everything.
                        3. BRAND DIVERSITY: Recommend REAL products from any relevant global brand (e.g., Jacquemus, Gentle Monster, Ader Error, Masaba, Zara, Cos, etc.).
                        4. OUR BOUTIQUE: You may *subtly* mention items from our curated selection if they are a perfect fit, but never prioritize them over the user's specific style need: ${productContext}.
                        5. REAL-WORLD DATA: Every single recommendation must be a real, existing product that the user can buy in the real world.
                        6. BUDGETING: Provide choices for **Affordable**, **Mid-range**, and **Luxury** tiers.
                        7. TONE: Sophisticated, Modern, and Sharp.`
                    },
                    ...conversation.messages.slice(-10).map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 1000,
                stream: true,
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    aiResponse += content;
                    res.write(`data: ${JSON.stringify({ content })}\n\n`);
                }
            }

            // After stream ends, save the full response to database
            conversation.messages.push({
                role: 'assistant',
                content: aiResponse,
            });
            conversation.updatedAt = new Date();
            await conversation.save();

            res.write(`data: ${JSON.stringify({ done: true, conversationId: conversation._id })}\n\n`);
            res.end();

        } catch (error) {
            console.error('❌ Streaming AI error:', error.message);
            const errorMsg = `ERROR: ${error.message}`;
            res.write(`data: ${JSON.stringify({ error: errorMsg })}\n\n`);
            res.end();
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
