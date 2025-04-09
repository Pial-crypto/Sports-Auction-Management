export const savePlayerRequest = async (playerData) => {
   // console.log(playerData,"I am the player data in savePlayerRequest")
    try {
        const response = await fetch("/api/saveNewJoiningReq", {
            method: "POST",
            body: JSON.stringify({...playerData,approved:false}),
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
