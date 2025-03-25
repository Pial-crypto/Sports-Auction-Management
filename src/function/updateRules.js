const updateRule = async ({ id, title, description, category,isDelete }) => {
  try {
    // Validate inputs
    console.log(id,"id from update rule")
    console.log(title,"title from update rule")
    console.log(description,"description from update rule")
    console.log(category,"category from update rule")
    if (!isDelete && (!id || !title || !description || !category)) {
      throw new Error("Missing required fields");
    }
if(id!=8 && id!=9 && id!=3){
    const response = await fetch("/api/updateRules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        category,
        isDelete
      }),
    });

    const data = await response.json();
    console.log(data,"data from update rule")
    if (!response.ok) {
      throw new Error(data.error || "Failed to update rule");
    }

}


  } catch (error) {
    console.error("Update rule error:", error);
    throw error;
  }
};


export default updateRule;
