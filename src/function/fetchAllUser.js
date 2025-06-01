const fetchAllUsers = async () => {
  try {
    const response = await fetch("/api/getAllUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return users.users;
  } catch (error) {
    console.error("Error in fetchAllUsers:", error);
    return [];
  }
};

export default fetchAllUsers;
