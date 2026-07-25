const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Triggering nodemon restart

dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://aisle-ai-4avu.vercel.app",
      "https://aisle-ai-4avu-dhtqcg0q8-isha-1802s-projects.vercel.app",
      "https://aisleai-8.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175"
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

// ---------------------------------------------------------------------------
// Keep-alive: prevent Render free-tier cold starts.
// Render spins the instance down after ~15 min of no inbound traffic, which
// makes the first AI request afterwards hang or fail. Pinging our own /api/health
// every ~13 min keeps the instance warm so Groq/AI works around the clock.
// Render provides RENDER_EXTERNAL_URL automatically; SELF_URL is a manual override.
// ---------------------------------------------------------------------------
const SELF_URL = process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL;
if (SELF_URL && process.env.NODE_ENV !== 'test') {
  const KEEP_ALIVE_MS = 13 * 60 * 1000; // 13 minutes (under Render's 15-min idle window)
  setInterval(async () => {
    try {
      const response = await fetch(`${SELF_URL.replace(/\/$/, '')}/api/health`);
      console.log(`💓 Keep-alive ping → ${response.status}`);
    } catch (err) {
      console.warn('⚠️ Keep-alive ping failed:', err.message);
    }
  }, KEEP_ALIVE_MS);
  console.log(`💓 Keep-alive enabled for ${SELF_URL}`);
}
