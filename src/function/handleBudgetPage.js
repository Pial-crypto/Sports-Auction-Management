import saveTransaction from "./saveTransaction";
import updateBudget from "./updateBudget";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handleUpdateCategory = (setBudgetData, categoryId, type, amount) => {
  setBudgetData(prev => {
    const category = prev.categories.find(cat => cat.id === categoryId);
    
    // Check if trying to refund more than spent
    if (type === 'income' && amount > category.spent) {
      return prev; // Don't update if trying to refund more than spent
    }

    const newCategories = prev.categories.map(cat => {
      if (cat.id === categoryId) {
        const newSpent = type === 'expense' 
          ? cat.spent + amount 
          : cat.spent - amount;

        // Don't allow negative spent values
        if (newSpent < 0) return cat;

        return {
          ...cat,
          spent: newSpent
        };
      }
      return cat;
    });

    const newSpent = newCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const newRemaining = prev.totalBudget - newSpent;

    // Don't allow negative remaining budget
    if (newRemaining < 0) return prev;

    return {
      ...prev,
      categories: newCategories,
      spent: newSpent,
      remaining: newRemaining
    };
  });
};

export const handleAddTransaction = (transaction, setBudgetData, budgetData, id) => {
  // Check if this is a valid transaction
  const category = budgetData.categories.find(cat => cat.name === transaction.category);
  
  if (transaction.type === 'income' && transaction.amount > category.spent) {
    alert(`Cannot refund more than spent amount in ${category.name}`);
    return;
  }

  console.log("I am calling save transaction");
  saveTransaction({...transaction, tournamentId: id});
  
  setBudgetData(prev => {
    const updatedBudget = {
      ...prev,
      recentTransactions: [transaction, ...prev.recentTransactions].slice(0, 10)
    };

    const budget = {
      id: id,
      budgetSpent: updatedBudget.spent,
      remainingBudget: updatedBudget.remaining,
      prizeMoneySpent: updatedBudget.categories[0].spent,
      venueSpent: updatedBudget.categories[1].spent,
      equipmentSpent: updatedBudget.categories[2].spent,
      staffSpent: updatedBudget.categories[3].spent
    };

    if (budget.remainingBudget < 0) {
      alert("No budget available");
      return prev;
    }

    updateBudget(budget);
    return updatedBudget;
  });
};

export const generateBudgetReport = async (budgetData) => {
  // Create new document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add header with logo and title
  doc.setFillColor(33, 150, 243);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Budget Report", pageWidth/2, 25, { align: "center" });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth/2, 35, { align: "center" });

  // Budget Overview Section
  doc.setTextColor(33, 150, 243);
  doc.setFontSize(18);
  doc.text("Budget Overview", 20, 60);

  // Budget summary table
  await autoTable(doc, {
    startY: 70,
    head: [["Total Budget", "Total Spent", "Remaining"]],
    body: [[
      `৳${budgetData.totalBudget.toLocaleString()}`,
      `৳${budgetData.spent.toLocaleString()}`,
      `৳${budgetData.remaining.toLocaleString()}`
    ]],
    headStyles: { 
      fillColor: [33, 150, 243],
      textColor: 255,
      fontSize: 12,
      fontStyle: 'bold'
    },
    styles: { 
      halign: 'center',
      fontSize: 11
    },
  });

  // Category Breakdown Section
  doc.setFontSize(18);
  doc.text("Category Breakdown", 20, doc.lastAutoTable.finalY + 20);

  const categoryData = budgetData.categories.map(cat => [
    cat.name,
    `৳${cat.amount.toLocaleString()}`,
    `৳${cat.spent.toLocaleString()}`,
    `${((cat.spent/cat.amount) * 100).toFixed(1)}%`
  ]);

  await autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Category", "Allocated", "Spent", "Usage"]],
    body: categoryData,
    headStyles: { 
      fillColor: [33, 150, 243],
      textColor: 255,
      fontSize: 12,
      fontStyle: 'bold'
    },
    styles: { fontSize: 11 },
  });

  // Recent Transactions Section
  doc.setFontSize(18);
  doc.text("Recent Transactions", 20, doc.lastAutoTable.finalY + 20);

  const transactionData = budgetData.recentTransactions.map(trans => [
    trans.date,
    trans.description,
    trans.category,
    trans.type === 'income' ? `+৳${trans.amount.toLocaleString()}` : `-৳${trans.amount.toLocaleString()}`
  ]);

  await autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Date", "Description", "Category", "Amount"]],
    body: transactionData,
    headStyles: { 
      fillColor: [33, 150, 243],
      textColor: 255,
      fontSize: 12,
      fontStyle: 'bold'
    },
    styles: { fontSize: 11 },
    columnStyles: {
      3: { 
        halign: 'right',
        cellWidth: 40
      }
    },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(100);
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth/2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Save the PDF
  doc.save(`budget-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
