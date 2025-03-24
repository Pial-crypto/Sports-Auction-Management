import storage from "@/class/storage";
import { generateJWT } from "./generateJWT";

export const ValidateLogin = async ({ data, setLoading, setSeverity, setMessage, router }) => {
  setLoading(true); // Start loading
  try {
    // Simulate loading (you can replace this with an actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("inside validate login",data)

    let loggedUser = { email: data.email, password: data.password };

    // Send login request
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loggedUser),
    });

    const responseData = await res.json();
    loggedUser=responseData.user;
    console.log("Logged user" ,responseData)


    if (res.ok) {
      
      console.log("Logged user" ,loggedUser)

      // Login success, now generate JWT token
  await generateJWT(loggedUser,setSeverity,setMessage,router)
    } else {
      // Login failed
      setSeverity("error");
      console.log(responseData.error, "Login failed");
      setMessage(responseData.error || "Invalid credentials");
    }
  } catch (error) {
    // Catch all errors
    console.error("Error:", error);
    setSeverity("error");
    setMessage(error.message || "Something went wrong");
  } finally {
    setLoading(false); // Stop loading after completion
  }
};
