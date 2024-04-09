const mongoose = require('mongoose');

// Notification schema definition
const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient (referenced to the User model)
  message: { type: String, required: true }, // Notification message
  timestamp: { type: Date, default: Date.now } // Timestamp of the notification
});

// Notification model creation using the notification schema
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
