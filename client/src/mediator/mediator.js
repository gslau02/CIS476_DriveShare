// Mediator.js
class Mediator {
    constructor() {
      this.subscriptions = {};
    }
  
    subscribe(eventName, callback) {
      if (!this.subscriptions[eventName]) {
        this.subscriptions[eventName] = [];
      }
      this.subscriptions[eventName].push(callback);
    }
  
    unsubscribe(eventName, callback) {
      if (this.subscriptions[eventName]) {
        this.subscriptions[eventName] = this.subscriptions[eventName].filter(cb => cb !== callback);
      }
    }
  
    publish(eventName, ...args) {
      if (this.subscriptions[eventName]) {
        this.subscriptions[eventName].forEach(callback => callback(...args));
      }
    }
  }
  
  const mediator = new Mediator();
  export default mediator;
  