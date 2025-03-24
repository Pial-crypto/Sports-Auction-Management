import storage from '@/class/storage';
import prisma from '@/lib/prisma';

const createTournament = async (formData) => {
  try {
    const user = storage.get("user");
    console.log(user.id, "userid");
  //  console.log(formData,user,"formData inside create tournament")
    const response = await fetch('/api/createTournament', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData,createdBy:user.id}),
    });

    const data = await response.json();
    console.log(data,"data")

    if (response.ok) {
      //alert('Tournament created successfully!');
      
   
console.log(data,"data")
alert(data.message)
const {updatedUser} = data;
      

      storage.set("user", updatedUser);
      setForceRender(true);
      // Handle success (e.g., redirect or clear form)
    } else {
      alert(data.error || 'Failed to create tournament');
    }
  } catch (error) {
    console.error('Error creating tournament:', error);
    alert('An error occurred. Please try again.');
  }
};

export default createTournament;