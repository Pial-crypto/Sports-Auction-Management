"use strict";

var _require = require("redis"),
    createClient = _require.createClient; // Redis client তৈরি


var redisClient = createClient();
redisClient.on("error", function (err) {
  return console.error("❌ Redis error:", err);
});
redisClient.connect().then(function () {
  console.log("✅ Connected to Redis");
});
module.exports = redisClient;