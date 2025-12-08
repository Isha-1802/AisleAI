const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testGroqAPI() {
    console.log('🧪 TESTING GROQ API\n');
    console.log('='.repeat(50));

    // Step 1: Check if user is logged in
    console.log('\n📋 STEP 1: Checking Authentication');
    console.log('-'.repeat(50));

    const token = 'YOUR_TOKEN_HERE'; // User needs to replace this

    if (token === 'YOUR_TOKEN_HERE') {
        console.log('❌ ERROR: You need to provide your authentication token!');
        console.log('\n📝 HOW TO GET YOUR TOKEN:');
        console.log('1. Open your browser');
        console.log('2. Go to http://localhost:5173');
        console.log('3. Log in to your account');
        console.log('4. Press F12 to open Developer Tools');
        console.log('5. Go to Console tab');
        console.log('6. Type: localStorage.getItem("token")');
        console.log('7. Copy the token (without quotes)');
        console.log('8. Replace YOUR_TOKEN_HERE in this file with your token');
        console.log('\nThen run this script again: node src/test-api.js\n');
        process.exit(1);
    }

    // Step 2: Test Quiz Endpoint
    console.log('\n📋 STEP 2: Testing Quiz Endpoint');
    console.log('-'.repeat(50));

    try {
        const quizData = {
            quizType: 'body',
            answers: {
                height: 'Average (5\'4" - 5\'7")',
                shoulders: 'Shoulders are narrower',
                waist: 'Somewhat defined',
                hips: 'Curvy / Full',
                weight: 'Stomach / Midsection',
                jeans: 'Gap at the waist',
                top: 'Loose around waist'
            }
        };

        console.log('Sending quiz request...');
        const response = await axios.post(
            `${API_URL}/style-hub/quiz-result`,
            quizData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('✅ SUCCESS! Quiz API is working!');
        console.log('\nResponse:');
        console.log(response.data.result.substring(0, 200) + '...');
    } catch (error) {
        console.log('❌ FAILED! Quiz API error:');
        console.log('Status:', error.response?.status);
        console.log('Error:', error.response?.data?.error || error.message);

        if (error.response?.status === 401) {
            console.log('\n⚠️  Authentication failed! Your token might be expired.');
            console.log('Please log in again and get a new token.');
        }
    }

    // Step 3: Test Chat Endpoint
    console.log('\n\n📋 STEP 3: Testing Chat Endpoint');
    console.log('-'.repeat(50));

    try {
        const chatData = {
            message: 'Hello! Can you help me with outfit recommendations?'
        };

        console.log('Sending chat message...');
        const response = await axios.post(
            `${API_URL}/chat/message`,
            chatData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('✅ SUCCESS! Chat API is working!');
        console.log('\nResponse:');
        console.log(response.data.message.substring(0, 200) + '...');
    } catch (error) {
        console.log('❌ FAILED! Chat API error:');
        console.log('Status:', error.response?.status);
        console.log('Error:', error.response?.data?.error || error.message);
    }

    console.log('\n' + '='.repeat(50));
    console.log('🏁 TEST COMPLETE\n');
}

testGroqAPI();
