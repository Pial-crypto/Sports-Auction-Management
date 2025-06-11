"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewAuction = void 0;

var _storage = _interopRequireDefault(require("@/class/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addNewAuction = function addNewAuction(auctionData) {
  var response, data;
  return regeneratorRuntime.async(function addNewAuction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/addAuction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(auctionData)
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          console.log(data, "Response from addAuction");

          if (response.ok) {//alert("Auction added successfully!");
          } else {
            alert(data.error || "Failed to add auction");
          }

          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          // console.error("Error adding auction:", error);
          alert("Something went wrong while adding the auction.");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.addNewAuction = addNewAuction;