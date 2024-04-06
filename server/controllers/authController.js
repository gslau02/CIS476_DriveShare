const bcrypt = require('bcrypt');
const User = require('../models/User');
const SessionManager = require('../utils/SessionManager');

const sessionManager = SessionManager.getInstance();

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      securityQuestion1: req.body.securityQuestion1,
      securityQuestion2: req.body.securityQuestion2,
      securityQuestion3: req.body.securityQuestion3
    });
    await user.save();
    const sessionToken = sessionManager.createSession(user.id);
    res.status(200).json({ userId: user.id, sessionToken: sessionToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const auth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const sessionToken = sessionManager.createSession(user.id);
    res.status(200).json({ userId: user.id, sessionToken: sessionToken});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifySession = async (req, res) => {
  try {
    const sessionToken = req.body.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const session = sessionManager.getSession(sessionToken);
    if (!session || session.expireDate < new Date()) {
      return res.status(401).json({ message: 'Session expired' });
    }
    res.status(200).json({ userId: session.userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const sessionToken = req.body.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    sessionManager.deleteSession(sessionToken);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  auth,
  verifySession,
  logout
};
