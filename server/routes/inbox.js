const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Notification = require('../models/Notification');

// GET endpoint to retrieve all messages for a user
router.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      // Assuming you have defined sender and receiver accordingly in your Message model
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 }); // Sorting by newest first, as an example

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

// GET endpoint to retrieve all notifications for a user
router.get('/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

module.exports = router;