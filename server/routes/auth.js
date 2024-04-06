const express = require('express');
const router = express.Router();
const { register, auth, verifySession, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/auth', auth);
router.post('/verify-session', verifySession);
router.post('/logout', logout);

module.exports = router;
