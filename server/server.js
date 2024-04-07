require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const bookingRoutes = require('./routes/booking');

// Create an Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Set up routes
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/car', carRoutes);
app.use('/booking', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
