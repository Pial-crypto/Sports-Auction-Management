import storage from '@/class/storage';
const DEFAULT_TOURNAMENT_ICON = "https://images.unsplash.com/photo-1522778119026-d647f0596c20";
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
      body: JSON.stringify({...formData,createdBy:user.id,tournamentIcon: (formData.tournamentIcon && formData.tournamentIcon !== 'https://example.com/icon.png') ? formData.tournamentIcon : DEFAULT_TOURNAMENT_ICON}),
     // tournamentIcon: (formData.tournamentIcon && formData.tournamentIcon !== 'https://example.com/icon.png') ? formData.tournamentIcon : DEFAULT_TOURNAMENT_ICON
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