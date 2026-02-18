Questioin 1 : Write a Node.js script to read a JSON file and log a property to the console.
```
const fs = require('fs');
const path = require('path');

// Path to JSON file
const filePath = path.join(__dirname, 'data.json');

// Read file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // Log a specific property
    console.log('Name:', jsonData.name);

  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
```

Question 2 : Create a custom event emitter that emits a message on an event and listens for it.

```

class CustomeEmitter {
  
  events = {} ;
  
  on(topic , callback){
    if(!this.events[topic]){
      this.events[topic] = null;
    }
    
    this.events[topic] = callback ;
  }
  
  emit(topic , data){
    const callback = this.events[topic];
    if(!callback){
      throw new Error("Not registered any callback for this event");
    }
    
    callback(data);
  }
  
}

const emitter = new CustomeEmitter();

emitter.on("testing" , (data)=>{
  console.log({data})
})

emitter.emit("testing" , {name : "Ashish"})

```

Question 3 : Use a readable stream to read a large text file line-by-line.

```
const fs = require('fs');
const readline = require('readline');

// Create a readable stream
const fileStream = fs.createReadStream('largeFile.txt', {
  encoding: 'utf8'
});

// Create readline interface
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break
});

// Read file line-by-line
rl.on('line', (line) => {
  console.log('Line:', line);
});

// Handle close event
rl.on('close', () => {
  console.log('Finished reading file.');
});

// Handle errors
fileStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

```

Question 4 : Explain the difference between callback & promise-based code for the same I/O task.

1️⃣ Callback-Based (Traditional Node.js Style)

```
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log('File contents:', data);
});

```
How it works
      You pass a function (callback) to readFile
      Node executes that function after the I/O operation completes
      The callback follows the error-first pattern: (err, result)

Characteristics
      Relies on nested functions
      Error handling is manual (if (err))
      Harder to chain multiple async operations
      Can lead to “callback hell” when deeply nested


2️⃣ Promise-Based Version

```
const fs = require('fs').promises;

fs.readFile('data.txt', 'utf8')
  .then((data) => {
    console.log('File contents:', data);
  })
  .catch((err) => {
    console.error('Error reading file:', err);
  });

```
How it works
      readFile returns a Promise
      .then() runs when the operation succeeds
      .catch() handles errors

Characteristics
      Cleaner chaining of async operations
      Centralized error handling
      Avoids deep nesting

3️⃣ Promise-Based with async/await (Modern & Cleanest)

```
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('data.txt', 'utf8');
    console.log('File contents:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();

```

Question 5 : Demonstrate how to export multiple functions from one module and import them in another.
1️⃣ CommonJS (Default Node.js)
```
// math.js

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// Export multiple functions
module.exports = {
  add,
  subtract,
  multiply
};

```
app.js (Importing Functions)
```
// app.js

const math = require('./math');
//const { add, subtract } = require('./math');  same

console.log(math.add(5, 3));       // 8
console.log(math.subtract(5, 3));  // 2
console.log(math.multiply(5, 3));  // 15

```

2️⃣ ES Modules (Modern Syntax)
```
// Named exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}
export default function defaultFunction(a, b) {
  return a * b;
}

```
```
// Named imports
import defaultFunction , { add, subtract, multiply } from './math.js';

console.log(add(4, 2));
console.log(subtract(4, 2));
console.log(multiply(4, 2));

```

Question 6 : What are buffers in Nodejs ?
Buffers in Node.js are objects used to handle binary data directly in memory.
JavaScript normally works with strings (UTF-16), but many low-level operations (like file systems, TCP streams, HTTP, images)
deal with raw bytes.
That’s where Buffer comes in.

```
const buf = Buffer.from('Hello');
console.log(buf);

//<Buffer 48 65 6c 6c 6f> Output
```










