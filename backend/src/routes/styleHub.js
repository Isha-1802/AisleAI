const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');

// Initialize Groq directly
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

console.log('🔧 Groq initialized in styleHub.js');
console.log('API Key present:', !!process.env.GROQ_API_KEY);

// Color analysis
router.post('/color-analysis', auth, async (req, res) => {
    try {
        const { skinTone, preferences } = req.body;

        if (!groq || !process.env.GROQ_API_KEY) {
            return res.json({
                colors: ['Deep Purple', 'Emerald Green', 'Royal Blue', 'Burgundy'],
                message: 'Based on your preferences!',
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional color analyst for fashion. Recommend 4-6 colors that would complement the user.',
                },
                {
                    role: 'user',
                    content: `Recommend colors for: Skin tone: ${skinTone}, Preferences: ${preferences}`,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;

        res.json({ analysis: response });
    } catch (error) {
        console.error('Color analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze colors' });
    }
});

// Style recommendations
router.post('/style-recommendations', auth, async (req, res) => {
    try {
        const { occasion, preferences } = req.body;

        if (!groq || !process.env.GROQ_API_KEY) {
            return res.json({
                recommendations: [
                    'Try a silk saree for a classic look',
                    'Consider fusion Indo-Western outfits',
                    'Experiment with contemporary ethnic wear',
                ],
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert fashion stylist specializing in Indian fashion. Provide specific style recommendations.',
                },
                {
                    role: 'user',
                    content: `Occasion: ${occasion}, User preferences: ${JSON.stringify(preferences)}. Give me 5 specific outfit recommendations.`,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.8,
        });

        const response = completion.choices[0].message.content;

        res.json({ recommendations: response });
    } catch (error) {
        console.error('Style recommendations error:', error);
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
});

// Quiz Result Route
router.post('/quiz-result', auth, async (req, res) => {
    try {
        const { quizType, answers } = req.body;

        // Check if API key exists
        if (!groq || !process.env.GROQ_API_KEY) {
            return res.json({
                result: "API Key missing. Please check backend configuration."
            });
        }

        // Define prompts for each quiz type
        const prompts = {
            color: "You are a color analysis expert. Determine the user's color season.",
            body: "You are a fashion stylist. Identify the body type and recommend silhouettes.",
            skincare: "You are a dermatologist. Recommend a skincare routine.",
            makeup: "You are a makeup artist. Recommend makeup products."
        };

        const systemPrompt = prompts[quizType] || "You are a fashion expert.";

        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: `User Answers: ${JSON.stringify(answers)}. 
                    
                    Provide a concise analysis.
                    
                    IMPORTANT: Use "###" to separate these 3 sections:
                    
                    ###
                    **THE PROFILE**
                    [Analysis with **bold** traits]
                    ###
                    **THE RECOMMENDATIONS**
                    • **[Item Name]**: [Short description]
                    • **[Item Name]**: [Short description]
                    • **[Item Name]**: [Short description]
                    ###
                    **THE STRATEGY**
                    [One sentence strategy]
                    
                    Keep it short.`
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;
        res.json({ result: response });

    } catch (error) {
        console.log('Error in quiz result:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
