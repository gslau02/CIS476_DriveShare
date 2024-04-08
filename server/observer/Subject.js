// Subject.js

const AbstractSubject = require('./AbstractSubject');

// class Subject extends AbstractSubject {
//     constructor() {
//         this.observers = [];
//     }

//     addObserver(observer) {
//         this.observers.push(observer);
//     }

//     removeObserver(observer) {
//         this.observers = this.observers.filter(obs => obs !== observer);
//     }

//     notifyObservers(recipient, message) {
//         this.observers.forEach(observer => {
//             observer.update(recipient, message);
//         });
//     }
// }

class Subject extends AbstractSubject {
    constructor() {
        super();
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(recipient, message) {
        this.observers.forEach(observer => {
            observer.update(recipient, message);
        });
    }
}

module.exports = Subject;
