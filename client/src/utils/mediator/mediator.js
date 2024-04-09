// Mediator.js
class Mediator {
  // Constructor (initialize subscriptions object)
    constructor() {
      this.subscriptions = {};
    }
  
    // Subscribe to an event method
    subscribe(eventName, callback) {
      if (!this.subscriptions[eventName]) {
        this.subscriptions[eventName] = []; // Create array if event does not exist
      }
      this.subscriptions[eventName].push(callback);
    }
  
    // Unsubscribe to an event method
    unsubscribe(eventName, callback) {
      if (this.subscriptions[eventName]) {
        this.subscriptions[eventName] = this.subscriptions[eventName].filter(cb => cb !== callback);
      }
    }
  
    // Publish an event method
    publish(eventName, ...args) {
      if (this.subscriptions[eventName]) {
        this.subscriptions[eventName].forEach(callback => callback(...args));
      }
    }
  }
  
  // Create instance of the Mediator (singleton)
  const mediator = new Mediator();
  export default mediator;
  