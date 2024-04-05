const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityQuestion1: { type: String, required: true },
  securityQuestion2: { type: String, required: true },
  securityQuestion3: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
