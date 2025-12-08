const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function createTestUser() {
    console.log('🧪 Creating test user...\n');

    const testUser = {
        name: 'Test User',
        email: 'test@aisleai.com',
        password: 'test123'
    };

    try {
        // Try to register
        console.log('Attempting to register...');
        const response = await axios.post(`${API_URL}/auth/register`, testUser);

        console.log('✅ User created successfully!');
        console.log('\n📋 LOGIN CREDENTIALS:');
        console.log('Email:', testUser.email);
        console.log('Password:', testUser.password);
        console.log('\nToken:', response.data.token);
        console.log('\n🌐 Go to: http://localhost:5173/login');
        console.log('And log in with the credentials above!');

    } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error === 'Email already registered') {
            console.log('ℹ️  User already exists!');
            console.log('\n📋 LOGIN CREDENTIALS:');
            console.log('Email:', testUser.email);
            console.log('Password:', testUser.password);
            console.log('\n🌐 Go to: http://localhost:5173/login');
            console.log('And log in with the credentials above!');
        } else {
            console.error('❌ Error:', error.response?.data || error.message);
        }
    }
}

createTestUser();
