// NotificationObserver.js
const Observer = require('./Observer');
const Notification = require('../models/Notification');
const Subject = require('./Subject');

// class NotificationObserver extends Observer {
//   async update(recipient, message) {
//     try {
//       await Notification.create({ recipient, message });
//       console.log(`Notification sent to ${recipient}: ${message}`);
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }
//   }
// }

class NotificationObserver extends Observer {
  constructor(subject) {
      super();
      this.subject = subject;
      this.subject.addObserver(this);
  }

  async update(recipient, message) {
      try {
          await Notification.create({ recipient, message });
          console.log(`Notification sent to ${recipient}: ${message}`);
      } catch (error) {
          console.error('Error sending notification:', error);
      }
  }
}

module.exports = NotificationObserver;
