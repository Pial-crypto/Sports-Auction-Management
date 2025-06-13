"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSaveDraft = void 0;

var _validateCreateTournamentForm = require("./validateCreateTournamentForm");

var _jspdf = _interopRequireDefault(require("jspdf"));

var _mockData = require("@/constants/JoinTournament/mockData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var handleSaveDraft = function handleSaveDraft(formData, setError, MIN_REGISTRATION_FEE) {
  //console.log("tournament",formData)
  if ((0, _validateCreateTournamentForm.validateForm)(formData, setError, MIN_REGISTRATION_FEE)) {
    if (!formData.name || formData.registrationFee < MIN_REGISTRATION_FEE) {
      setError("Please fill in all required fields correctly before generating PDF.");
      return;
    }

    try {
      var doc = new _jspdf["default"]();

      var formatDate = function formatDate(date) {
        try {
          return dayjs(date).format("YYYY-MM-DD");
        } catch (_unused) {
          return date;
        }
      };

      var currentY = 20;
      var lineHeight = 12;

      var addY = function addY() {
        var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : lineHeight;
        currentY += amount;

        if (currentY >= 270) {
          doc.addPage();
          currentY = 20;
        }
      };

      var addTableRow = function addTableRow(label, value) {
        var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [30, 41, 59];
        doc.setFillColor(248, 250, 252); // Very light gray

        doc.rect(20, currentY - 5, 170, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor.apply(doc, _toConsumableArray(color));
        doc.text(label, 25, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(String(value), 100, currentY);
        addY();
      };

      var addSectionHeader = function addSectionHeader(title) {
        doc.setFillColor(241, 245, 249); // Light gray

        doc.rect(20, currentY - 5, 170, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(16);
        doc.text(title, 25, currentY + 5);
        doc.setFontSize(12);
        addY(20);
      }; // 🔵 HEADER


      doc.setFillColor(37, 99, 235); // Blue

      doc.rect(0, 0, 220, 40, "F");
      doc.setTextColor(255, 255, 255); // White text

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold"); // ✅ Text-only emoji version (no weird chars)

      doc.text("Tournament Draft", 20, 25); // Will appear as plain text

      currentY = 50; // 🔹 SECTION: Tournament Details

      addSectionHeader("1. Tournament Details");
      addTableRow("Tournament Name:", formData.name);
      addTableRow("Game Type:", formData.gameType);
      addTableRow("Tournament Date:", formatDate(formData.tournamentDate), [22, 163, 74]); // Green

      addTableRow("Registration Deadline:", formatDate(formData.registrationDeadline), [37, 99, 235]); // Blue

      addTableRow("Auction Date:", formatDate(formData.auctionDate), [37, 99, 235]); // Blue
      // 🔹 SECTION: Financial Info

      addSectionHeader("2. Financial Information");
      addTableRow("Registration Fee:", "$".concat(formData.registrationFee.toLocaleString()), [220, 38, 38]); // Red

      addTableRow("Prize Money:", "$".concat(formData.prizeMoney.toLocaleString()), [234, 179, 8]); // Gold

      addTableRow("Total Budget:", "$".concat(formData.budget.toLocaleString()), [37, 99, 235]); // Blue
      // 🔹 SECTION: Budget Breakdown

      addSectionHeader("3. Budget Breakdown");
      var totalBudget = formData.budget || 1;

      var addBudgetRow = function addBudgetRow(label, amount, percentage) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, currentY - 5, 170, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.text(label, 25, currentY + 5);
        doc.setFont("helvetica", "normal");
        doc.text("$".concat(amount.toLocaleString()), 100, currentY + 5); // Progress bar

        doc.setFillColor(203, 213, 225); // Gray background

        doc.rect(130, currentY + 2, 50, 5, "F");
        doc.setFillColor(37, 99, 235); // Blue progress

        doc.rect(130, currentY + 2, 50 * (percentage / 100), 5, "F");
        addY(20);
      };

      addBudgetRow("Venue Budget", formData.venueBudget, formData.venueBudget / totalBudget * 100);
      addBudgetRow("Equipment Budget", formData.equipmentBudget, formData.equipmentBudget / totalBudget * 100);
      addBudgetRow("Staff Budget", formData.staffBudget, formData.staffBudget / totalBudget * 100); // 🔻 FOOTER

      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(37, 99, 235); // Blue footer

      doc.rect(0, 280, 220, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Generated on ".concat(new Date().toLocaleDateString()), 20, 290); // 🔸 Save as PDF

      var pdfName = "".concat(formData.name.replace(/\s+/g, "_"), "_tournament_draft.pdf");
      doc.save(pdfName);
    } catch (error) {
      setError("Failed to generate PDF: ".concat(error.message));
    }
  }
};

exports.handleSaveDraft = handleSaveDraft;