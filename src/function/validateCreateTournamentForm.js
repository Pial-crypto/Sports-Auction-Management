export const validateForm = (formData, setError, MIN_REGISTRATION_FEE) => {
  // Check if dates are provided
  if (!formData.tournamentDate) {
    setError("Please select tournament start date");
    return false;
  }
  if (!formData.registrationDeadline) {
    setError("Please select registration deadline");
    return false;
  }
  if (!formData.auctionDate) {
    setError("Please select auction date");
    return false;
  }

  // Convert dates for comparison
  const today = new Date();
  const startDate = new Date(formData.tournamentDate);
  const regDeadline = new Date(formData.registrationDeadline);
  const auctionDate = new Date(formData.auctionDate);

  // Check if tournament start date is in future
  // if (startDate <= today) {
  //   setError("The tournament start date should be in the future");
  //   return false;
  // }

  // Check if registration deadline is before tournament start date
  if (regDeadline > startDate) {
    setError("Registration deadline must be before tournament start date");
    return false;
  }

  // Check if auction date is after registration deadline
  if (auctionDate < regDeadline) {
    setError("Auction date must be after registration deadline");
    return false;
  }

  // Check if auction date is before tournament start date
  if (auctionDate > startDate) {
    setError("Auction date must be before tournament start date");
    return false;
  }

  // Rest of the validations
  if (!formData.gameType) {
    setError("Please select a sport type");
    return false;
  }

  if (!formData.name) {
    setError("Please enter tournament name");
    return false;
  }

  if (!formData.registrationFee || formData.registrationFee < MIN_REGISTRATION_FEE) {
    setError(`Registration fee must be at least ${MIN_REGISTRATION_FEE}`);
    return false;
  }

  if (!formData.prizeMoney || formData.prizeMoney <= 0) {
    setError("Please enter prize money");
    return false;
  }

  if (!formData.numberOfTeams) {
    setError("Please select number of teams");
    return false;
  }

  if (!formData.venueBudget || formData.venueBudget <= 0) {
    setError("Please enter venue budget");
    return false;
  }

  if (!formData.equipmentBudget || formData.equipmentBudget <= 0) {
    setError("Please enter equipment budget");
    return false;
  }

  if (!formData.staffBudget || formData.staffBudget <= 0) {
    setError("Please enter staff budget");
    return false;
  }

  if (formData.prizeMoney + formData.venueBudget + formData.equipmentBudget + formData.staffBudget > formData.budget) {
    setError("Total expenses should be less than or equal to the total budget");
    return false;
  }

  return true;
};