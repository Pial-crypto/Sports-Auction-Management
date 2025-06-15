import { validateForm } from "./validateCreateTournamentForm";
import jsPDF from "jspdf";
import dayjs from "dayjs"; // ✅ Missing import fixed
import { sportIcons } from "@/constants/JoinTournament/mockData";

export const handleSaveDraft = (formData, setError, MIN_REGISTRATION_FEE) => {
  if (validateForm(formData, setError, MIN_REGISTRATION_FEE)) {
    if (!formData.name || formData.registrationFee < MIN_REGISTRATION_FEE) {
      setError("Please fill in all required fields correctly before generating PDF.");
      return;
    }

    try {
      const doc = new jsPDF();

      const formatDate = (date) => {
        try {
          return dayjs(date).format("YYYY-MM-DD");
        } catch {
          return date;
        }
      };

      let currentY = 20;
      const lineHeight = 12;

      const addY = (amount = lineHeight) => {
        currentY += amount;
        if (currentY >= 270) {
          doc.addPage();
          currentY = 20;
        }
      };

      const addTableRow = (label, value, color = [30, 41, 59]) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, currentY - 5, 170, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...color);
        doc.text(label, 25, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(String(value), 100, currentY);
        addY();
      };

      const addSectionHeader = (title) => {
        doc.setFillColor(241, 245, 249);
        doc.rect(20, currentY - 5, 170, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(16);
        doc.text(title, 25, currentY + 5);
        doc.setFontSize(12);
        addY(20);
      };

      // 🔵 HEADER
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 220, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Tournament Draft", 20, 25);
      currentY = 50;

      // 🔹 SECTION: Tournament Details
      addSectionHeader("1. Tournament Details");
      addTableRow("Tournament Name:", formData.name);
      addTableRow("Game Type:", formData.gameType);
      addTableRow("Tournament Date:", formatDate(formData.tournamentDate), [22, 163, 74]);
      addTableRow("Registration Deadline:", formatDate(formData.registrationDeadline), [37, 99, 235]);
      addTableRow("Auction Date:", formatDate(formData.auctionDate), [37, 99, 235]);

      // 🔹 SECTION: Financial Info
      addSectionHeader("2. Financial Information");
      addTableRow("Registration Fee:", `$${formData.registrationFee.toLocaleString()}`, [220, 38, 38]);
      addTableRow("Prize Money:", `$${formData.prizeMoney.toLocaleString()}`, [234, 179, 8]);
      addTableRow("Total Budget:", `$${formData.budget.toLocaleString()}`, [37, 99, 235]);

      // 🔹 SECTION: Budget Breakdown
      addSectionHeader("3. Budget Breakdown");
      const totalBudget = formData.budget || 1;

      const addBudgetRow = (label, amount, percentage) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, currentY - 5, 170, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.text(label, 25, currentY + 5);
        doc.setFont("helvetica", "normal");
        doc.text(`$${amount.toLocaleString()}`, 100, currentY + 5);

        // Progress bar
        doc.setFillColor(203, 213, 225);
        doc.rect(130, currentY + 2, 50, 5, "F");
        doc.setFillColor(37, 99, 235);
        doc.rect(130, currentY + 2, 50 * (percentage / 100), 5, "F");

        addY(20);
      };

      addBudgetRow("Venue Budget", formData.venueBudget, (formData.venueBudget / totalBudget) * 100);
      addBudgetRow("Equipment Budget", formData.equipmentBudget, (formData.equipmentBudget / totalBudget) * 100);
      addBudgetRow("Staff Budget", formData.staffBudget, (formData.staffBudget / totalBudget) * 100);

      // 🔻 FOOTER
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(37, 99, 235);
      doc.rect(0, 280, 220, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 290);

      // 🔸 Save as PDF
      const pdfName = `${formData.name.replace(/\s+/g, "_")}_tournament_draft.pdf`;
      doc.save(pdfName);

    } catch (error) {
      setError(`Failed to generate PDF: ${error.message}`);
    }
  }
};
