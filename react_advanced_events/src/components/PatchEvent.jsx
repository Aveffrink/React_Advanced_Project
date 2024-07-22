export const PatchEvent = async (editedEvent) => {
  try {
    const response = await fetch(
      `http://localhost:3000/events/${editedEvent.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedEvent),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to patch a new event. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred while patching an event:", error);
  }
};
