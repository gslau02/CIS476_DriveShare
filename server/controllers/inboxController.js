const Message = require('../models/Message');
const Notification = require('../models/Notification');
const User = require('../models/User');

const createMessage = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    const message = new Message({ sender, recipient, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

const fetchMessagesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ $or: [{ recipient: userId }, { sender: userId }] }).sort({ createdAt: -1 });

    const updatedMessages = await Promise.all(messages.map(async (message) => {
      let user;
      if (message.sender.toString() === userId.toString()) {
        user = await User.findById(message.recipient);
      } else {
        user = await User.findById(message.sender);
      }
    
      return {
        ...message.toObject(),
        targetName: user.name
      };
    }));

    res.json(updatedMessages);
  } catch (error) {
    console.error('Error fetching messages by user:', error);
    res.status(500).json({ message: 'Error fetching messages by user' });
  }
}

const fetchChatRoomMessages = async (req, res, next) => {
  try {
    const { userId, recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat room messages:', error);
    res.status(500).json({ message: 'Error fetching chat room messages' });
  }

}

const fetchNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

module.exports = {
  fetchAllMessages,
  fetchNotifications,
  createMessage,
  fetchMessagesByUser,
  fetchChatRoomMessages
};
