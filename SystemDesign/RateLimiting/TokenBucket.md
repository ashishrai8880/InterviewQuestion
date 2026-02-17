```
import { CronJob } from 'cron';
import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const RATE_LIMIT = 10;

const tokenBucket = [];

// Function to refill the bucket
const refillBucket = () => {
  if (tokenBucket.length < RATE_LIMIT) {
    tokenBucket.push(Date.now());
  }
};

// API endpoint to check the bucket's status
app.get('/bucket', (req, res) => {

  res.json({
    bucketLimit: RATE_LIMIT,
    currentBucketSize: tokenBucket.length,
    bucket: tokenBucket
  });
});

// Middleware for rate limiting
const rateLimitMiddleware = (req, res, next) => {

  if (tokenBucket.length > 0) {
    const token = tokenBucket.shift();
    console.log(`Token ${token} is consumed`);
    
    res.set('X-RateLimit-Remaining', tokenBucket.length);
    next();
  } 
  else 
  {
    res.status(429).set('X-RateLimit-Remaining', 0).set('Retry-After', 2).json({
      success: false,
      message: 'Too many requests'
    });
  }
};

app.use(rateLimitMiddleware);

// Sample endpoint for testing rate limiting
app.get('/test', (req, res) => {
  const ROCK_PAPER_SCISSORS = ['rock 🪨', 'paper 📃', 'scissors ✂️'];

  const randomIndex = Math.floor(Math.random() * 3);
  const randomChoice = ROCK_PAPER_SCISSORS[randomIndex];

  res.json({
    success: true,
    message: `You got ${randomChoice}`
  });
});

// Cron job to periodically refill the bucket
const job = new CronJob('*/2 * * * * *', () => {
  refillBucket();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  job.start();
});

```

Question 1 : If we have express rate limiter then why we would anyone use token bucket ?

Answer =>  express-rate-limiter by default uses fixed window rate limiting strategies . In this it is fixed that in every unit
minute user can access this much request . Now suppose if user hits server at the max limit at the edges of minute 
, then it will violate server limit . So to make it more controlled and as per requirement we would go with other 
rate limiting strategies . 

Class Based Implementation

```

import cron from "cron";
import express from "express";

const app = express();
const port = 3000;

// const tokenBucket = [];
const RATE_LIMIT = 10; // Maximum number of tokens in the bucket
const REFILL_RATE = 2000; // Time in milliseconds to add a token to the bucket

class TokenBucket {
  constructor(rateLimit, refillRate) {
    this.rateLimit = rateLimit;
    this.refillRate = refillRate;
    this.tokens = rateLimit;
    this.lastRefill = Date.now();
  }

  refillBucket() {
    const now = Date.now();
    const elapsedTime = now - this.lastRefill;
    const tokensToAdd = Math.floor(elapsedTime / this.refillRate);

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.rateLimit, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  consumeToken() {
    this.refillBucket();
    if (this.tokens > 0) {
      this.tokens -= 1;
      return true;
    } else {
      return false;
    }
  }
}

const tokenBucket = new TokenBucket(RATE_LIMIT, REFILL_RATE);

const rateLimiting = (req, res, next) => {

  if (tokenBucket.consumeToken() == true) {
    res.set("X-RateLimit-Remaining", tokenBucket.tokens);
    next();
  } else {
    return res
      .set("X-RateLimit-Remaining", 0)
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }
};

app.use(rateLimiting);

app.get("/test", (req, res) => {
  return res.json({
    message: `${Math.random() * 100} number `,
    remainingTokens: tokenBucket.tokens,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


```



