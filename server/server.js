require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// Create an Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Set up routes
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
