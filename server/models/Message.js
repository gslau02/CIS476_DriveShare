const mongoose = require('mongoose');

// Message schema definition
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Sender (referenced to the User model)
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient (referenced to the User model)
  content: { type: String, required: true }, // Message content 
  createdAt: { type: Date, default: Date.now } // Time of message created at
});

// Message model creation using the message schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
