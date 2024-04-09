// Observer.js
class Observer {
    update(recipient, message) {
      throw new Error('This method must be overridden');
    }
  }
  
  module.exports = Observer;
  