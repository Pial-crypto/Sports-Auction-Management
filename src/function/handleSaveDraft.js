import { validateForm } from "./validateCreateTournamentForm";
import jsPDF from "jspdf";
export const handleSaveDraft = (formData,setError,MIN_REGISTRATION_FEE) => {
    if (validateForm(formData,setError,MIN_REGISTRATION_FEE)) {
      try {
        const doc = new jsPDF();
  
        // Add title with color
        doc.setFontSize(20);
        doc.setTextColor(40, 116, 240); // Blue color
        doc.text('Tournament Draft', 20, 20);
  
        // Add content with different colors
        doc.setFontSize(12);
        let yPosition = 40;
        
        const content = [
          { text: `Tournament Name: ${formData.name}`, color: [0, 0, 0] }, // Black
          { text: `Game Type: ${formData.gameType}`, color: [0, 0, 0] }, // Black
          { text: `Tournament Date: ${formData.tournamentDate.format('YYYY-MM-DD')}`, color: [34, 139, 34] }, // Green
          { text: `Registration Fee: $${formData.registrationFee}`, color: [255, 69, 0] }, // Red
          { text: `Prize Money: $${formData.prizeMoney}`, color: [255, 215, 0] }, // Gold
          { text: `Number of Teams: ${formData.numberOfTeams}`, color: [0, 0, 255] }, // Blue
         
        ];
  
        content.forEach(line => {
          doc.setTextColor(...line.color);
          doc.text(line.text, 20, yPosition);
          yPosition += 10;
        });
  
        // If there's a tournament icon, add it; otherwise, use a default image
        const imageUrl = formData.tournamentIcon || 'https://images.unsplash.com/photo-1522778119026-d647f0596c20';
        doc.addImage(imageUrl, 'JPEG', 20, yPosition, 40, 40);
  
        const pdfName = `${formData.name} tournament-draft.pdf`;
        // Save the PDF
        doc.save(pdfName);
      } catch (error) {
        setError(`Failed to generate PDF: ${error.message}`);
      }
    }
  };