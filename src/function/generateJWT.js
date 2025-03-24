import storage from "@/class/storage";

export const generateJWT=async(loggedUser,setSeverity,setMessage,router)=>{
      try {
    
            console.log("Logged user" ,loggedUser)
    
    
       
            const jwtResponse = await fetch("/api/auth/JWTGeneration", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(loggedUser),
            });
    
            const jwtData = await jwtResponse.json();
    
            if (jwtResponse.ok) {
              // JWT successfully generated, handle success
              console.log(jwtData, "JWT generated successfully");
              const token=jwtData.token;
    console.log("logged user",loggedUser)
              storage.set("token",token)
              console.log("Before login email",loggedUser.email)
              storage.set("email",loggedUser.email)
              console.log("before login user",loggedUser)
              storage.set("user",loggedUser)
              console.log("Token",token)
              setSeverity("success");
              setMessage("Logged in successfully!");
              router.push("/");
            } else {
              // JWT generation failed
              setSeverity("error");
              setMessage(jwtData.error || "Error generating JWT");
            }
          } catch (jwtError) {
            // Handle error during JWT generation
            console.error("Error generating JWT:", jwtError);
            setSeverity("error");
            setMessage(jwtError.message || "Error generating JWT");
          }
}