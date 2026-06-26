const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
 
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
 
const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
 
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SecureBank API is running' });
});
 
// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });