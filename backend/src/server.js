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
    origin: (origin, callback) => {
      // Allow requests from any origin
      callback(null, true);
    },
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
