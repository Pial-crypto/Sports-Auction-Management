import createTournament from "./createTournament";
import { validateForm } from "./validateCreateTournamentForm";

export const handlePublish = async (formData,setError,MIN_REGISTRATION_FEE,setIsAlreadyCreated) => {
    if (validateForm(formData,setError,MIN_REGISTRATION_FEE)) {
   //console.log("Tournament published successfully:", formData);
   createTournament(formData,setIsAlreadyCreated)
    }
  };
