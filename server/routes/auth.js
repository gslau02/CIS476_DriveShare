const express = require('express');
const router = express.Router();
const { register, auth, verifySession } = require('../controllers/authController');

router.post('/register', register);
router.post('/auth', auth);
router.post('/verify-session', verifySession);

module.exports = router;
