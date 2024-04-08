const express = require('express');
const router = express.Router();
const { fetchAllMessages, createMessage, fetchNotifications, fetchMessagesByUser, fetchChatRoomMessages } = require('../controllers/inboxController');

router.post('/messages', createMessage);
router.get('/messages', fetchAllMessages);
router.get('/messages/:userId', fetchMessagesByUser)
router.get('/messages/:userId/:recipientId', fetchChatRoomMessages);

router.get('/notifications', fetchNotifications);

module.exports = router;
