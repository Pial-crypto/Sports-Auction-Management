"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClient = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// lib/redis.js
var redisClient = new _ioredis["default"]({
  host: "localhost",
  // অথবা production host
  port: 6379 // password: "your_redis_password" // যদি লাগে

});
exports.redisClient = redisClient;