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
        const User = require('../models/User'); // Import User for auto-save

        // Check if API key exists
        if (!groq || !process.env.GROQ_API_KEY) {
            return res.json({
                result: "API Key missing. Please check backend configuration."
            });
        }

        console.log(`DEBUG: Quiz request received: ${quizType}`);

        // Define prompts
        const prompts = {
            color: `You are a personalized color analysis expert. Determine the user's "Color Season" (e.g., True Winter, Soft Autumn). Provide recommendations.`,
            body: `You are a professional fashion stylist. Identify the user's body shape (e.g., Hourglass, Pear). Provide silhouette recommendations.`,
            skincare: `You are a skincare specialist. Recommend a COMPLETE routine (Morning & Night) based on skin type and budget.`,
            makeup: `You are a celebrity makeup artist. Recommend a personalized makeup kit based on features and budget.`
        };

        const systemPrompt = prompts[quizType] || "You are a fashion and beauty expert.";
        const modelToUse = 'llama-3.3-70b-versatile';

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        // Call Groq API with streaming
        const stream = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `${systemPrompt} 
                    
                    STRICT GLOBAL ACCURACY RULES:
                    1. BE A GLOBAL STYLIST.
                    2. OCCASION MATCHING.
                    3. BRAND DIVERSITY.
                    4. REAL PRODUCTS ONLY.
                    
                    FORMATTING RULES:
                    Start your response with a clear title line like "RESULT: [Season/Shape Name]".
                    Then use "###" to separate sections.
                    
                    ###
                    **THE PROFILE**
                    [Deep dive...]
                    
                    ###
                    **THE RECOMMENDATIONS**
                    [List products...]
                    
                    ###
                    **THE STRATEGY**
                    [Philosophy...]`
                },
                {
                    role: 'user',
                    content: `User Profile:
                    - Identification: ${answers.gender || 'Not specified'}
                    - Budget Preference: ${answers.budget || 'Not specified'}
                    - Detailed Answers: ${JSON.stringify(answers)}
                    
                    Tailor advice to ${answers.gender}.
                    For COLOR/BODY tests, ONLY clothing. For SKINCARE/MAKEUP, ONLY beauty products.`
                },
            ],
            model: modelToUse,
            temperature: 0.6,
            max_tokens: 1500,
            stream: true,
        });

        let fullContent = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                fullContent += content;
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        // --- AUTO-SAVE LOGIC ---
        try {
            console.log(`Auto-saving ${quizType} results for user ${req.userId}...`);

            // Try to extract a short result title (e.g. "Soft Autumn")
            let resultTitle = 'AI Analyzed';
            const titleMatch = fullContent.match(/RESULT:\s*(.*?)(?:\n|$)/i);
            if (titleMatch && titleMatch[1]) {
                resultTitle = titleMatch[1].trim().replace(/\*\*/g, '');
            }

            const updateData = {};
            if (quizType === 'color') {
                updateData['preferences.colorAnalysis'] = {
                    season: resultTitle,
                    undertone: answers.undertone || 'AI Analyzed',
                    recommendations: fullContent
                };
            } else if (quizType === 'body') {
                updateData['preferences.bodyShape'] = {
                    shape: resultTitle,
                    recommendations: fullContent
                };
            }

            // Only save if we have data to update
            if (Object.keys(updateData).length > 0) {
                await User.findByIdAndUpdate(
                    req.userId,
                    { $set: updateData },
                    { new: true, runValidators: true }
                );
                console.log('✅ Auto-save successful.');
            }
        } catch (saveError) {
            console.error('❌ Auto-save failed:', saveError);
        }
        // -----------------------

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();

    } catch (error) {
        console.error('❌ Error in quiz result:', error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
});

module.exports = router;
