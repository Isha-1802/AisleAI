const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Starting database connection check...');

// Check if we have the necessary environment variables
const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!uri) {
    console.error('Oops! It looks like MONGODB_URI is missing from your .env file.');
    console.error('Please make sure you have a .env file in the root directory with your Mongo connection string.');
    process.exit(1);
}

if (!jwtSecret) {
    console.warn('Just a heads up: JWT_SECRET is currently missing. You\'ll need this for authentication to work properly.');
} else {
    console.log('Environment variables look good.');
}

console.log('Connecting to MongoDB...');

// Attempt to connect
mongoose.connect(uri)
    .then((conn) => {
        console.log(`Success! Connected to the database: ${conn.connection.name}`);
        console.log('Everything seems to be working correctly.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Ah, something went wrong while connecting to MongoDB.');
        console.error('Error details:', err.message);
        console.log('Please check your connection string and ensure your IP is whitelisted in Atlas.');
        process.exit(1);
    });
