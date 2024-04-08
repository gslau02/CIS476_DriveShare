const express = require('express');
const router = express.Router();
const { getNotificationsByUser } = require('../controllers/notificationController');

router.get('/getNotificationsByUser/:userId', getNotificationsByUser);

module.exports = router;