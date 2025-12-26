const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://aisle-ai-4avu.vercel.app", // production frontend
      "https://aisle-ai-4avu-dhtqcg0q8-isha-1802s-projects.vercel.app", // vercel preview
      "http://localhost:5173" // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/user', require('./routes/user'));
app.use('/api/style-hub', require('./routes/styleHub'));
app.use('/api/reviews', require('./routes/reviews'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AisleAI Backend is running!' });
});

// Root Route
app.get('/', (req, res) => {
  res.send('<h1>AisleAI Backend is Live! 🚀</h1><p>The server is running. Use endpoints like /api/products or /api/auth.</p>');
});


// const PORT = 5001; // Force 5001 to avoid macOS conflict
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
