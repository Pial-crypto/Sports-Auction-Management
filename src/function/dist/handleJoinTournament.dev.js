"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = void 0;

var getStatus = function getStatus(tournament) {
  // Check if registration deadline exists and is valid
  if (!tournament.registrationDeadline || isNaN(new Date(tournament.registrationDeadline))) {
    return "active"; // Default to active if no valid deadline
  } // Convert both dates to UTC strings for consistent comparison


  var deadline = new Date(tournament.registrationDeadline).toISOString();
  var now = new Date().toISOString();
  return deadline > now ? "active" : "completed";
};

exports.getStatus = getStatus;