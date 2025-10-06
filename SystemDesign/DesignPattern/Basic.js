
// ========================================================== 1. Singleton Pattern ===================================
/*
The Singleton Pattern ensures that a class has only one instance and provides a global point of access to that instance. 
This is useful when you need to control access to a shared resource, such as a configuration object, database connection, or logging service.

Key Characteristics of Singleton Pattern:
Single Instance: The Singleton pattern guarantees that only one instance of the class will exist during the application’s lifecycle.
Global Access: The instance is usually accessible globally, so any part of the program that needs it can access it.
Lazy Initialization: The instance of the class is created when it is first needed, not before.
*/

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance; // If an instance exists, return it.
    }

    this.value = Math.random(); // Initialize some data
    Singleton.instance = this; // Store the instance as a static property
  }

  getValue() {
    return this.value;
  }
}

const instance1 = new Singleton();
console.log(instance1.getValue()); // Random value
console.log(Singleton.instance === instance1); // true, same instance

const instance2 = new Singleton();
console.log(instance1 === instance2); // true, both are the same instance


// 2. Factory Pattern
/*
The Factory Pattern is a creational design pattern that provides an interface for creating objects, but allows subclasses to alter the type of objects that will be
created. In simpler terms, the Factory Pattern allows you to create objects without specifying the exact class of object that will be created.

Instead of calling a constructor directly (like new Car()), you use a factory method that returns the object for you, so you don't need to worry about the specifics 
of the object creation process.

Why use the Factory Pattern?
Decouples object creation: The client code (the part that uses the object) doesn’t need to know how the object is created or what type of object it is.
Flexibility: You can change how objects are created without affecting the rest of your codebase.
Code Reusability: If you have similar objects to create (like different types of vehicles), a factory can help generate them efficiently.

Real-World Example:
Imagine you're in a car rental business, and you have a fleet of different types of vehicles: Sedans, SUVs, and Trucks. Instead of manually creating each
type of car (e.g., new Sedan() or new Truck()), you can use a CarFactory to create the right type of vehicle for you.

Factory Pattern in JavaScript
Let’s create a simple example where a VehicleFactory creates different types of vehicles based on the input.
*/
// Step 1: Define the base class for all vehicles
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  drive() {
    console.log(`Driving a ${this.type}`);
  }
}

class Sedan extends Vehicle {
  constructor() {
    super('Sedan');
  }
}

class SUV extends Vehicle {
  constructor() {
    super('SUV');
  }
}

class Truck extends Vehicle {
  constructor() {
    super('Truck');
  }
}

// Step 3: Create the Factory Class
class VehicleFactory {
  static createVehicle(type) {
    if (type === 'sedan') {
      return new Sedan();
    } else if (type === 'suv') {
      return new SUV();
    } else if (type === 'truck') {
      return new Truck();
    } else {
      throw new Error('Unknown vehicle type');
    }
  }
}

// Step 4: Use the Factory to create vehicles
const sedan = VehicleFactory.createVehicle('sedan');
const suv = VehicleFactory.createVehicle('suv');
const truck = VehicleFactory.createVehicle('truck');

sedan.drive();  // "Driving a Sedan"
suv.drive();    // "Driving an SUV"
truck.drive();  // "Driving a Truck"




// ---------------- Second Example 
// Base class for all users
class User {
  constructor(name) {
    this.name = name;
  }

  getRole() {
    throw 'Method getRole() should be implemented by subclass';
  }
}

// Admin class
class Admin extends User {
  constructor(name) {
    super(name);
  }

  getRole() {
    return 'Admin';
  }
}

// Customer class
class Customer extends User {
  constructor(name) {
    super(name);
  }

  getRole() {
    return 'Customer';
  }
}

// Factory to create users
class UserFactory {
  static createUser(type, name) {
    if (type === 'admin') {
      return new Admin(name);
    } else if (type === 'customer') {
      return new Customer(name);
    } else {
      throw new Error('Invalid user type');
    }
  }
}

// Creating users through the factory
const admin = UserFactory.createUser('admin', 'Alice');
const customer = UserFactory.createUser('customer', 'Bob');

console.log(admin.getRole()); // "Admin"
console.log(customer.getRole()); // "Customer"



// =================================================================== 3. Observer Pattern ===========================================================
/*
The Observer Pattern is a behavioral design pattern where one object (the "subject") maintains a list of observers (other objects), and notifies them automatically
when there is a change in its state. This allows objects to communicate with each other without being tightly coupled.

In simpler terms, it's like a newsletter subscription model:
You (the observer) subscribe to updates from a service (the subject).

Whenever the service has new information (like new content or a status change), it notifies all subscribers (observers) so they can act on the new information.

Key Concepts:
Subject: The object being observed. It maintains a list of observers and notifies them of state changes.
Observer: The object that listens for changes. It reacts to the notifications from the subject.
Decoupling: The subject and observer are loosely coupled. The subject doesn’t need to know about the details of the observer, just that it needs to notify it.

Why Use the Observer Pattern?
Decouples the components of your system. The subject doesn't need to know about the observers' internal workings, and vice versa.
It allows for dynamic subscription to events, so multiple observers can be notified of changes without hardcoding.
Great for event-driven systems, like UI updates or real-time applications.

Real-World Example:
Let’s use an example where a news agency (the subject) is sending updates to subscribers (the observers). When a new piece of news is available, all subscribed 
users will receive it.

Observer Pattern in JavaScript
Step-by-Step Example: News Agency and Subscribers
*/

// Step 1: Define the Subject (NewsAgency)
class NewsAgency {
  constructor() {
    this.subscribers = []; // List of observers
  }

  // Method to add observers (subscribers)
  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  // Method to remove observers
  removeSubscriber(subscriber) {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  // Method to notify all observers (subscribers)
  notifySubscribers(news) {
    this.subscribers.forEach(subscriber => subscriber.update(news));
  }

  // Method to post new news
  postNews(news) {
    console.log(`News posted: ${news}`);
    this.notifySubscribers(news); // Notify all subscribers
  }
}

// Step 2: Define the Observer (Subscriber)
class Subscriber {
  constructor(name) {
    this.name = name;
  }

  // Observer's update method (called when notified)
  update(news) {
    console.log(`${this.name} received news: ${news}`);
  }
}

// Step 3: Use the Observer Pattern

// Create the subject (news agency)
const newsAgency = new NewsAgency();

// Create some observers (subscribers)
const subscriber1 = new Subscriber("Alice");
const subscriber2 = new Subscriber("Bob");
const subscriber3 = new Subscriber("Charlie");

// Subscribe to news updates
newsAgency.addSubscriber(subscriber1);
newsAgency.addSubscriber(subscriber2);
newsAgency.addSubscriber(subscriber3);

// Post some news (notify all subscribers)
newsAgency.postNews("Breaking News: JavaScript is awesome!");

// Output:
// News posted: Breaking News: JavaScript is awesome!
// Alice received news: Breaking News: JavaScript is awesome!
// Bob received news: Breaking News: JavaScript is awesome!
// Charlie received news: Breaking News: JavaScript is awesome!

// Step 4: Remove a subscriber and post new news

newsAgency.removeSubscriber(subscriber2); // Bob unsubscribes

newsAgency.postNews("New Update: Observer Pattern in action!");

// Output:
// News posted: New Update: Observer Pattern in action!
// Alice received news: New Update: Observer Pattern in action!
// Charlie received news: New Update: Observer Pattern in action!



// 4. Module Pattern 



// 5. Decorator Pattern 



// 6. Strategy Pattern 



// 7. Command Pattern 





// 8. Adapter Pattern



// 9. Prototype Pattern 






















