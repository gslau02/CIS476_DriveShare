const User = require('../../models/User');

class SecurityQuestionHandler {
  constructor() {
    this.successor = null;
  }

  setSuccessor(successor) {
    this.successor = successor;
  }

  async handleRequest(req, res) {
    throw new Error('handleRequest method must be implemented in concrete classes');
  }
}

class SecurityQuestion1Handler extends SecurityQuestionHandler {
  async handleRequest(req, res) {
    const { email, answers } = req.body;
    const user = await User.findOne({ email });
    if (user && user.securityQuestion1.answer === answers[0]) {
      return res.status(200).json({ message: 'Security question 1 answer is correct', status: true });
    }
    return this.successor ? this.successor.handleRequest(req, res) : null;
  }
}

class SecurityQuestion2Handler extends SecurityQuestionHandler {
  async handleRequest(req, res) {
    const { email, answers } = req.body;
    const user = await User.findOne({ email });
    if (user && user.securityQuestion2.answer === answers[1]) {
      return res.status(200).json({ message: 'Security question 2 answer is correct', status: true });
    }
    return this.successor ? this.successor.handleRequest(req, res) : null;
  }
}

class SecurityQuestion3Handler extends SecurityQuestionHandler {
  async handleRequest(req, res) {
    const { email, answers } = req.body;
    const user = await User.findOne({ email });
    if (user && user.securityQuestion3.answer === answers[2]) {
      return res.status(200).json({ message: 'Security question 3 answer is correct', status: true });
    }
    return this.successor ? this.successor.handleRequest(req, res) : null;
  }
}

module.exports = { 
  SecurityQuestionHandler, 
  SecurityQuestion1Handler, 
  SecurityQuestion2Handler, 
  SecurityQuestion3Handler 
};
