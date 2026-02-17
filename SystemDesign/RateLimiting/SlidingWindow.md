```
import express from "express";
const app = express();
const port = 3000;

const WINDOW_SIZE = 10 * 1000; // 1 minute in milliseconds
const CAPACITY = 5; // Maximum number of requests allowed in the window

class SlidingWindow {
  map = new Map();
  constructor(windowSize, capacity) {
    this.windowSize = windowSize;
    this.capacity = capacity;
  }

  isRequestAllowed(ip) {
    const currentTime = Date.now();
    const startTime = currentTime - this.windowSize; // in millliseconds

    if (!this.map.has(ip)) {
      this.map.set(ip, [currentTime]);
      return true;
    }

    const requestTimes = this.map.get(ip);

    // Remove timestamps that are outside the current window
    while (requestTimes.length > 0 && requestTimes[0] < startTime) {
      requestTimes.shift();
    }

    if (requestTimes.length < this.capacity) {
      requestTimes.push(currentTime);
      this.map.set(ip, requestTimes);
      return true;
    } else {
      return false;
    }
  }
}

const limiter = new SlidingWindow(WINDOW_SIZE, CAPACITY);

const rateLimitingMiddleware = (req, res, next) => {
  if (limiter.isRequestAllowed(req.ip)) {
    res.set("X-RateLimit-Remaining", CAPACITY - limiter.map.get(req.ip).length);
    next();
  } else {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }
};

app.use(rateLimitingMiddleware);

app.get("/testing", (req, res) => {
  return res.json({
    message: "success",
    remaining: CAPACITY - limiter.map.get(req.ip).length,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


```
