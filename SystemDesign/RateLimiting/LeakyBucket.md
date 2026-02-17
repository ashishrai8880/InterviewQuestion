```
import express from "express";
const app = express();
const port = 3000;

class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.bucket = 0;
    this.lastLeakTime = Date.now();
  }

  leak() {
    const now = Date.now();
    const elapsedTime = Math.floor((now - this.lastLeakTime) / 1000);
    const servedRequest = elapsedTime * this.leakRate;
    this.bucket = Math.max(0, this.bucket - servedRequest);
    this.lastLeakTime = now;
  }

  isRequestAllowed() {
    this.leak();
    if (this.bucket < this.capacity) {
      this.bucket += 1;
      return true;
    } else {
      return false;
    }
  }
}

const LEAK_RATE = 1;
const CAPACITY = 10;
const limiter = new LeakyBucket(CAPACITY, LEAK_RATE);

const rateLimitingMiddleware = (req, res, next) => {
  if (limiter.isRequestAllowed()) {
    res.set("X-RateLimit-Remaining", CAPACITY - limiter.bucket);
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
    message: "Success",
    remaining: CAPACITY - limiter.bucket,
    bucket: limiter.bucket,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

Best Article : https://medium.com/@tripathisaurabh147/understanding-rate-limiting-with-the-leaky-bucket-algorithm-3a8aab22e5c7
