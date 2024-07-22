export const PostEvent = async (newEvent) => {
  try {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create a new event. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred while creating an event:", error);
  }
};
