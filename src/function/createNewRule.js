import storage from '@/class/storage';
import { create } from '@mui/material/styles/createTransitions';

export const createRule = async (rule) => {
  try {
    console.log(rule,"rule from create new rule before api call")
   
    const response = await fetch('/api/createNewTournamentRule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
     
    });

    const data = await response.json();
    console.log(data,"data from create new rule")

    if (response.ok) {
      
      console.log(data,"data from create new rule after api call")
   return data.rule


     
    } else {
      alert(data.error || 'Failed to create rule');
    }
  } catch (error) {
    console.error('Error creating tournament:', error);
    alert('An error occurred. Please try again.');
  }
};

export default createRule;