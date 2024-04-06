const Message = require('../models/Message'); // Replace with your actual message model
const Notification = require('../models/Notification'); // Replace with your actual notification model

// Method to get all messages for a user
const getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Should be provided by client, ideally secured via JWT

    // Fetch messages
    const messages = await Message.find({ receiver: userId });

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error getting messages: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Method to get all notifications for a user
const getNotificationsForUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Should be provided by client, ideally secured via JWT

    // Fetch notifications
    const notifications = await Notification.find({ user: userId });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error getting notifications: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMessagesForUser,
  getNotificationsForUser
};