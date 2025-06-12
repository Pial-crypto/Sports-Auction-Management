const { createClient } = require("redis");

// Redis client তৈরি
const redisClient = createClient();

redisClient.on("error", (err) => console.error("❌ Redis error:", err));

redisClient.connect().then(() => {
  console.log("✅ Connected to Redis");
});

module.exports = redisClient;
