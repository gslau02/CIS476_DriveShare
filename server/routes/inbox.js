const express = require('express');
const router = express.Router();
const { fetchMessages, fetchNotifications } = require('../controllers/inboxController');

router.get('/messages', fetchMessages);
router.get('/notifications', fetchNotifications);

module.exports = router;
