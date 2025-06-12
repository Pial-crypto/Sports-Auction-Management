// lib/redis.js
import Redis from "ioredis";

export const redisClient = new Redis({
  host: "localhost", // অথবা production host
  port: 6379,
  // password: "your_redis_password" // যদি লাগে
});
