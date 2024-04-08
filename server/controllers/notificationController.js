// notificationController.js
const Notification = require('../models/Notification');

const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ recipient: userId }).sort({ timestamp: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

module.exports = {
  getNotificationsByUser
};
