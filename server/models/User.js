const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Unique user email
  password: { type: String, required: true }, // Password
  name: { type: String, required: true }, //User full name
  securityQuestion1: { // Security question 1 and answer
    type: { question: String, answer: String },
    required: true 
  },
  securityQuestion2: { // Security question 2 and answer
    type: { question: String, answer: String } , 
    required: true 
  },
  securityQuestion3: { // Security question 3 and answer
    type: { question: String, answer: String } , 
    required: true 
  },
  isCarOwner: { type: Boolean, default: false } // User status (if a car owner or not)
});

// User model creation using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
