"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePublish = void 0;

var _createTournament = _interopRequireDefault(require("./createTournament"));

var _validateCreateTournamentForm = require("./validateCreateTournamentForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handlePublish = function handlePublish(formData, setError, MIN_REGISTRATION_FEE, setForceRender) {
  return regeneratorRuntime.async(function handlePublish$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if ((0, _validateCreateTournamentForm.validateForm)(formData, setError, MIN_REGISTRATION_FEE)) {
            //console.log("Tournament published successfully:", formData);
            (0, _createTournament["default"])(formData, setForceRender, setForceRender);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.handlePublish = handlePublish;