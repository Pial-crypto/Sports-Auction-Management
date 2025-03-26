export const validateForm = (formData,setError,MIN_REGISTRATION_FEE) => {
    if (!formData.gameType) {
      setError("Please select a sport type");
      return false;
    }
    if (!formData.tournamentDate) {
      setError("Please select tournament date");
      return false;
    }
    if (!formData.name) {
      setError("Please enter tournament name");
      return false;
    }

    const today = new Date();
const selectedDate = new Date(formData.tournamentDate);

if (selectedDate <= today) {
  setError("The starting date should be in the future");
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

    if(formData.prizeMoney + formData.venueBudget + formData.equipmentBudget + formData.staffBudget < formData.budget){
      setError("Total budget should be less than or equal to the total budget");
      return false;
    }
    return true;
  };