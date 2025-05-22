import storage from '@/class/storage';
import { create } from '@mui/material/styles/createTransitions';

export const fetchPlayerQueueForAuction = async () => {
  try {
   
   
    const response = await fetch('/api/getCurrentTournamentPlayerQueue', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
     
    });

    const data = await response.json();
    //console.log(data,"data from get player queue")

    if (response.ok) {
      
    //  console.log(data,"data from get player queue api call")
   return data


     
    } else {
      alert(data.error || 'Failed to get player queue');
    }
  } catch (error) {
    console.error('Error  getting queue:', error);
    alert('An error occurred. Please try again.');
  }
};

export default fetchPlayerQueueForAuction;