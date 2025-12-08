const Groq = require('groq-sdk');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    try {
        console.log('Testing Groq API...');
        console.log('Key:', process.env.GROQ_API_KEY ? 'Present' : 'Missing');

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say "Groq is working!"' }],
            model: 'llama-3.3-70b-versatile',
        });

        console.log('✅ Success:', chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.error) console.error('Details:', error.error);
    }
}

main();
