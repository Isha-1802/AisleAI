const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dbConfig = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// allow the Vite frontend origin (adjust if different)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// enable preflight response for all routes
app.options('*', cors());

// Database connection
dbConfig();

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});