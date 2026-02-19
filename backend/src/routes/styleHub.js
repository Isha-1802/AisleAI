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

        console.log(`DEBUG: Quiz request received: ${quizType}`);
        console.log(`DEBUG: Answers:`, JSON.stringify(answers));

        // Define prompts for each quiz type with gender context
        const prompts = {
            color: `You are a personalized color analysis expert. Based on the user's hair, eyes, and skin undertones, determine their "Color Season" (e.g., True Winter, Soft Autumn). Provide recommendations for clothing colors, accent colors, and jewelry that would make them look their absolute best.`,

            body: `You are a professional fashion stylist. Analyze the user's body proportions (shoulders vs hips, waist definition). Identify their body shape (e.g., Hourglass, Pear, Inverted Triangle, Rectangle) and provide specific silhouette recommendations (necklines, waistlines, hemlines) that flatter their unique build.`,

            skincare: `You are a skincare specialist. Based on the user's skin type, concerns (acne, aging, etc.), and budget preference (${answers.budget || 'Any'}), recommend a COMPLETE routine.
            
            CRITICAL REQUIREMENT: You MUST provide two separate routines:
            1. **THE MORNING RITUAL**: Focused on protection and hydration.
            2. **THE NIGHT RITUAL**: Focused on repair and treatment.
            
            For EACH step in both rituals (Cleanser, Serum, etc.), you MUST provide exactly one specific product recommendation that fits the user's requested budget (${answers.budget}).
            
            Ensure recommendations are gender-aware (${answers.gender}).`,

            makeup: `You are a celebrity makeup artist. Based on the user's facial features, preferences (finish, coverage), and budget preference (${answers.budget || 'Any'}), recommend a personalized makeup kit. 
            
            For EACH item (Foundation, Blush, etc.), you MUST provide exactly one specific product recommendation that fits the user's requested budget (${answers.budget}).
            
            Ensure shade and product recommendations are gender-aware (${answers.gender}).`
        };

        const systemPrompt = prompts[quizType] || "You are a fashion and beauty expert.";

        console.log(`DEBUG: Sending ${quizType} quiz request to Groq...`);

        const modelToUse = 'llama-3.3-70b-versatile';

        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `${systemPrompt} 
                    
                    STRICT GLOBAL ACCURACY RULES:
                    1. BE A GLOBAL STYLIST: Your knowledge spans across Seoul (Korean aesthetic), Paris, New York, and Mumbai. Use this breadth to suit the user's data.
                    2. OCCASION MATCHING: Recommendations MUST be precisely tailored to the user's intent. Never default to a generic "Sabyasachi Gown" if it doesn't fit.
                    3. BRAND DIVERSITY: Use any real-world brand that fits (e.g., Ader Error, Jacquemus, Uniqlo, Raw Mango, Reformation, etc.).
                    4. REAL PRODUCTS ONLY: Every product MUST be a real, buyable item in the real world.
                    5. NO FABRICATION: Do not invent names or brands.`
                },
                {
                    role: 'user',
                    content: `User Profile:
                    - Identification: ${answers.gender || 'Not specified'}
                    - Budget Preference: ${answers.budget || 'Not specified'}
                    - Detailed Answers: ${JSON.stringify(answers)}
                    
                    Provide a luxury-tier personal analysis. 
                    If identification is 'Male', ensure all recommendations (clothing, skincare, makeup) are tailored to men. If 'Female', tailor to women.
                    
                    FORMATTING RULES:
                    Use "###" to separate these 3 main sections:
                    
                    ###
                    **THE PROFILE**
                    [One paragraph deep-dive into why these results fit the user. Use **bold** for key characteristics.]
                    
                    ###
                    **THE RECOMMENDATIONS**
                    [ONLY show REAL products for the user's selected budget: ${answers.budget}]
                    [For each category, list one specific, real-world product.]
                    **Category Name**
                    - Brand Name & REAL Product Name
                    [If skincare, do this for both Morning and Night sections]
                    
                    ###
                    **THE STRATEGY**
                    [A concluding "Fashion/Beauty Philosophy" sentence for the user.]
                    
                    Keep the tone sophisticated, encouraging, and premium.`
                },
            ],
            model: modelToUse,
            temperature: 0.6,
            max_tokens: 1500,
        });

        const response = completion.choices[0].message.content;
        console.log(`✅ ${quizType} quiz generated successfully using ${modelToUse}`);
        res.json({ result: response });

    } catch (error) {
        console.error('❌ Error in quiz result:', error);
        res.status(500).json({
            error: `Atelier AI Error: ${error.message}`,
            details: error.response?.data || "No additional details"
        });
    }
});

module.exports = router;
