// ================================== Low Level Design and High Level Design ===========================================
/*
🔷 High-Level Design (HLD) — “The Big Picture”

Think of this as designing the "blueprint" of a building.

🔑 What it includes:
Main components / modules of the system
How components talk to each other (APIs, protocols, communication flows)
Choice of technologies (e.g., use a SQL DB or NoSQL? Kafka or RabbitMQ?)
Deployment architecture (load balancer, caching layer, database)
Scalability, availability, and fault tolerance concerns

💬 Describes:
"What does the system look like overall, and how does the data flow between major parts?"

🔷 Low-Level Design (LLD) — “The Details”
Think of this as the detailed plumbing and wiring inside the building.

🔑 What it includes:
Class diagrams, interfaces, method-level design
How data is structured and stored internally
DB schema, object models, validation logic
Function signatures, error handling
Detailed algorithm and data structure choices

💬 Describes:
"How will each individual part/module be implemented internally?"

🏢 Real-World Industry Example: Designing Uber
Let’s say you're designing a simplified version of Uber.

🔶 High-Level Design (HLD):
System will have services like:
User Service (register/login)
Driver Service (track location)
Ride Matching Service (match rider and driver)

Payment Service
Communication: Use REST APIs or gRPC between services
Store data in:
User info → SQL DB
Ride location tracking → NoSQL or Redis
Use Kafka for event-driven updates (e.g. driver status changes)
Deploy behind a load balancer, and use caching for repeated queries (e.g. nearby drivers)

💡 This gives you a clear view of how the system is structured, and how the components interact.

🔶 Low-Level Design (LLD):
Inside Ride Matching Service:
Class: RideRequest with fields like userId, pickupLocation, destination
Class: Driver with driverId, currentLocation, status
Method: matchDriver(RideRequest request)
Use a priority queue or quad-tree to find nearest available drivers

Design DB table:

CREATE TABLE RideRequest (
    id INT PRIMARY KEY,
    user_id INT,
    pickup_lat FLOAT,
    pickup_lng FLOAT,
    destination_lat FLOAT,
    destination_lng FLOAT,
    status ENUM('pending', 'matched', 'completed')
);


💡 This gives implementation-level detail — how each component works internally.

🧠 Quick Analogy:
Design Level	Analogy
HLD	Architect's building plan — shows rooms, floors, elevators
LLD	Interior design — where each wire, pipe, switch goes
*/


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


// *********************************************** MongoDB Connection using Singleton **************************************
import mongoose from "mongoose";

class MongooseConnection {
  static connection = null;
  static connectingPromise = null;

  static async connect() {
    if (this.connection) {
      console.log("✅ Mongoose already connected");
      return this.connection;
    }

    console.log("✅ DB Connection Started........... ");
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/testdb";

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    this.connectingPromise = (async () => {
      try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(uri, {
          maxPoolSize: 10, // production ready
          minPoolSize: 2,
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          autoIndex: false, // disable in production
          retryWrites: true,
        });

        this.connection = mongoose.connection;

        console.log("✅ Mongoose connected");

        this.connection.on("error", (err) => {
          console.error("❌ MongoDB error:", err);
        });

        this.connection.on("disconnected", () => {
          console.warn("⚠ MongoDB disconnected");
        });

        return this.connection;
      } catch (error) {
        this.connectingPromise = null;
        console.error("❌ Mongoose connection failed", error);
        throw error;
      }
    })();

    return this.connectingPromise;
  }

  static async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      this.connectingPromise = null;
      console.log("🔌 Mongoose disconnected");
    }
  }
}

export default MongooseConnection;

// app.js file

const app = express();
import MongooseConnection from "./mongoConnection.js";

async function startApp() {
  try {
    await MongooseConnection.connect();
    await MongooseConnection.connect(); // only create one connection
    await MongooseConnection.connect();
    await MongooseConnection.connect();
    await MongooseConnection.connect();
    await MongooseConnection.connect();
    console.log("🚀 Application started");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startApp();


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






















