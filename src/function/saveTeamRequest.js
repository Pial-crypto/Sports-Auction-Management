export const saveTeamRequest = async (teamData) => {
         try {
         const response = await fetch("/api/saveNewTeamJoiningReq", {
             method: "POST",
             body: JSON.stringify({...teamData,approved:false}),
             headers: {
                 'Content-Type': 'application/json',
             },
         });
 
         if(response.ok){
             const data = await response.json();
             console.log(data,"I am the data")
             return data;
         }
        
         if (!response.ok) {
             console.log("I am the error")
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
 
       
     } catch (error) {
         console.error("Error saving player request:", error);
         return { success: false, message: error.message };
     }
 };
 