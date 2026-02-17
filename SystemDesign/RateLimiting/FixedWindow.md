```

import express from "express";
const app = express();
const port = 3000;

class FixedWindow {
  map = new Map();
  constructor(windowSize, capacity) {
    this.windowSize = windowSize;
    this.capacity = capacity;
  }

  isRequestAllowed(ip) {
    const currentTime = Date.now();

    if (!this.map.has(ip)) {
      this.map.set(ip, { count: 1, startTime: currentTime });
      return true;
    }

    const userData = this.map.get(ip);

    const elapsedTime = currentTime - userData.startTime;

    if (elapsedTime < this.windowSize) {
      userData.count += 1;
      if (userData.count > this.capacity) {
        return false;
      }
      return true;
    } else {
      this.map.set(ip, { count: 1, startTime: currentTime });
      return true;
    }
  }

  getInfo(ip) {
    return this.map.get(ip);
  }
}

const limiter = new FixedWindow(60 * 1000, 5);

const rateLimitingMiddleware = (req, res, next) => {
  if (limiter.isRequestAllowed(req.ip)) {
    next();
  } else {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }
};

app.use(rateLimitingMiddleware);

app.get("/testing", (req, res) => {
  return res.json({ message: "success", info: limiter.getInfo(req.ip) });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


```
