const bcrypt = require('bcrypt');
const User = require('../models/User');
const SessionManager = require('../utils/SessionManager');
const { 
  SecurityQuestion1Handler, 
  SecurityQuestion2Handler, 
  SecurityQuestion3Handler 
}  = require('../utils/SecurityQuestionHandler');

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

const getSecurityQuestions = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { securityQuestion1, securityQuestion2, securityQuestion3 } = user;
    const questions = [
      securityQuestion1.question,
      securityQuestion2.question,
      securityQuestion3.question,
    ];
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error retrieving security questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const verifySecurityQuestions = async (req, res) => {
  try {
    const { email, answers } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the chain of responsibility
    const handler1 = new SecurityQuestion1Handler();
    const handler2 = new SecurityQuestion2Handler();
    const handler3 = new SecurityQuestion3Handler();
    handler1.setSuccessor(handler2);
    handler2.setSuccessor(handler3);

    // Start the chain with the first handler
    const response = await handler1.handleRequest({ body: { email, answers } }, res);
    
    if (response) {
      // Answer is correct, handle success
      return res.status(200).json(response.data);
    } else {
      // No handler in the chain was able to verify the answer
      return res.status(200).json({ message: 'Security questions answers are incorrect', status: false });
    }
    
  } catch (error) {
    console.error('Error verifying answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
  auth,
  verifySession,
  logout,
  getSecurityQuestions,
  verifySecurityQuestions,
  updatePassword
};
