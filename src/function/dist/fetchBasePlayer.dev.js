"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fetchbasePrice = function fetchbasePrice() {
  var response, basePrice;
  return regeneratorRuntime.async(function fetchbasePrice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/getbaseprice", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 3:
          response = _context.sent;

          if (!response.ok) {//throw new Error("Failed to fetch base price");
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          basePrice = _context.sent;
          console.log(basePrice, "basePrice");
          return _context.abrupt("return", basePrice.allbaseprice);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error in fetchbasePrice:", _context.t0);
          return _context.abrupt("return", []);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var _default = fetchbasePrice;
exports["default"] = _default;