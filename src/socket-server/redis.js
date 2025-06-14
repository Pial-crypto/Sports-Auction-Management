const { createClient } = require("redis");

// Redis client তৈরি
const redisClient = createClient();

redisClient.on("error", (err) => console.error("❌ Redis error:", err));

redisClient.connect().then(() => {
  console.log("✅ Connected to Redis");
});

module.exports = redisClient;
// const { createClient } = require("redis");

// const redisClient = createClient();

// // ❗ Handle errors gracefully
// redisClient.on("error", (err) => {
//   if (err?.code === "ECONNREFUSED") {
//     // Suppress or log once if needed
//     // console.warn("Redis connection refused. Is the Redis server running?");
//   } else {
//     console.error("Unexpected Redis error:", err);
//   }
// });


// module.exports = redisClient;
