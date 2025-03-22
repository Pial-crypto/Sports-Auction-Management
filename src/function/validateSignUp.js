import { generateJWT } from "./generateJWT";

export const validateSignUp = async (newUser, setSeverity, setMessage, setLoading, router) => {
    setLoading(true); // Start loading
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser), // Pass newUser
      });
  
      const responseData = await res.json();
  
      if (res.ok) {
       generateJWT(newUser,setSeverity,setMessage,router)
      } else {
        setSeverity("error");
        setMessage(responseData.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSeverity("error");
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  