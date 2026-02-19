const axios = require('axios');
const API_URL = 'http://localhost:5001/api';

async function testChat() {
    try {
        // 1. Get a token (assuming test user exists)
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'new@bjik.com',
            password: 'password' // Assuming this is correct
        });
        const token = loginRes.data.token;
        console.log('Token obtained');

        // 2. Test streaming
        const response = await fetch(`${API_URL}/chat/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message: 'Hello' })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        console.log('Starting stream read...');

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            process.stdout.write(chunk);
        }
    } catch (err) {
        console.error('Test failed:', err.message);
    }
}

testChat();
