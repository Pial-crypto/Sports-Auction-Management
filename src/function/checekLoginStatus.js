import storage from "@/class/storage";

export const LoginStatus = async () => {
    try {
   const token=storage.get('token')
   console.log(token)
  
      // যদি টোকেন না থাকে, তাহলে এরর দেখানো হবে
      if (!token) {
        console.log("No token detected")
        return false
      }
  
      const res = await fetch('/api/auth/protectedTokenverificationroute', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization header এর মাধ্যমে টোকেন পাঠানো
          'Content-Type': 'application/json',
        },
      });
  
      const responseData = await res.json();
      if (res.ok) {
        
        console.log('Protected data:', responseData); // API রেসপন্স দেখানো
        return true

      } else {
        console.error('Error:', responseData.message); // টোকেন ভ্যালিড না হলে error দেখানো
    return false  
    }
    } catch (error) {
       
      //console.error('Error:', error.message);
      return false
    }
  };
  