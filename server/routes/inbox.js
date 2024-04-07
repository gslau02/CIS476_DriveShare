const express = require('express');
const router = express.Router();
const { fetchMessages, createMessage, fetchNotifications } = require('../controllers/inboxController');

router.get('/messages', fetchMessages);
router.post('/messages/:userId', createMessage);

router.get('/notifications', fetchNotifications);

module.exports = router;
