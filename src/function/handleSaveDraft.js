import { validateForm } from "./validateCreateTournamentForm";
import jsPDF from "jspdf";
import { sportIcons } from "@/constants/JoinTournament/mockData";

export const handleSaveDraft = (formData, setError, MIN_REGISTRATION_FEE) => {
  if (validateForm(formData, setError, MIN_REGISTRATION_FEE)) {
    try {
      // Create PDF document
      const doc = new jsPDF();
      
      // Add fancy header
      doc.setFillColor(37, 99, 235); // Blue background
      doc.rect(0, 0, 220, 40, "F");
      
      // Add title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Tournament Draft", 20, 25);

      // Add sport icon
      doc.setFontSize(20);
      doc.text(sportIcons[formData.gameType.toLowerCase()], 180, 25);

      // Add tournament name section
      doc.setFillColor(241, 245, 249); // Light gray background
      doc.rect(20, 50, 170, 20, "F");
      doc.setTextColor(30, 41, 59); // Dark text
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Tournament Details", 25, 63);

      // Add main content table
      const startY = 80;
      const lineHeight = 12;
      let currentY = startY;

      // Helper function for table rows
      const addTableRow = (label, value, color = [30, 41, 59]) => {
        doc.setFillColor(248, 250, 252); // Very light gray
        doc.rect(20, currentY - 5, 170, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(label, 25, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(value, 100, currentY);
        currentY += lineHeight;
      };

      // Add content with styled rows
      addTableRow("Tournament Name:", formData.name);
      addTableRow("Game Type:", formData.gameType);
      addTableRow("Tournament Date:", formData.tournamentDate.format('YYYY-MM-DD'), [22, 163, 74]); // Green
      addTableRow("Registration Deadline:", formData.registrationDeadline.format('YYYY-MM-DD'), [37, 99, 235]); // Blue
      addTableRow("Auction Date:", formData.auctionDate.format('YYYY-MM-DD'), [37, 99, 235]); // Blue

      // Add financial section header
      currentY += 10;
      doc.setFillColor(241, 245, 249);
      doc.rect(20, currentY - 5, 170, 15, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Financial Information", 25, currentY + 5);
      currentY += 20;

      // Add financial details
      addTableRow("Registration Fee:", `$${formData.registrationFee.toLocaleString()}`, [220, 38, 38]); // Red
      addTableRow("Prize Money:", `$${formData.prizeMoney.toLocaleString()}`, [234, 179, 8]); // Gold
      addTableRow("Total Budget:", `$${formData.budget.toLocaleString()}`, [37, 99, 235]); // Blue

      // Add budget breakdown section
      currentY += 10;
      doc.setFillColor(241, 245, 249);
      doc.rect(20, currentY - 5, 170, 15, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Budget Breakdown", 25, currentY + 5);
      currentY += 20;

      // Add budget details with progress bars
      const addBudgetRow = (label, amount, percentage) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, currentY - 5, 170, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.text(label, 25, currentY + 5);
        doc.setFont("helvetica", "normal");
        doc.text(`$${amount.toLocaleString()}`, 100, currentY + 5);
        
        // Add progress bar
        doc.setFillColor(203, 213, 225); // Light gray for background
        doc.rect(130, currentY, 50, 5, "F");
        doc.setFillColor(37, 99, 235); // Blue for progress
        doc.rect(130, currentY, 50 * (percentage / 100), 5, "F");
        
        currentY += 20;
      };

      const totalBudget = formData.budget;
      addBudgetRow("Venue Budget", formData.venueBudget, (formData.venueBudget / totalBudget) * 100);
      addBudgetRow("Equipment Budget", formData.equipmentBudget, (formData.equipmentBudget / totalBudget) * 100);
      addBudgetRow("Staff Budget", formData.staffBudget, (formData.staffBudget / totalBudget) * 100);

      // Add footer
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 280, 220, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 290);

      // Save the PDF
      const pdfName = `${formData.name.replace(/\s+/g, '_')}_tournament_draft.pdf`;
      doc.save(pdfName);

    } catch (error) {
      setError(`Failed to generate PDF: ${error.message}`);
    }
  }
};