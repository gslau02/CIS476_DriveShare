const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityQuestion1: { 
    type: { question: String, answer: String },
    required: true 
  },
  securityQuestion2: {
    type: { question: String, answer: String } , 
    required: true 
  },
  securityQuestion3: {
    type: { question: String, answer: String } , 
    required: true 
  },
  isCarOwner: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
