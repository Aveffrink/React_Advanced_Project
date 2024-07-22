export const EventFilter = ({
  events,
  sportsChecked,
  gamesChecked,
  relaxationChecked,
}) => {
  if (!sportsChecked && !gamesChecked && !relaxationChecked) {
    return events;
  }

  const sportsId = 1;
  const gamesId = 2;
  const relaxationId = 3;

  return events.filter((event) => {
    const { categoryIds } = event;

    // Check if the event's categories match the checked categories
    if (sportsChecked && gamesChecked && relaxationChecked) {
      return (
        categoryIds.includes(sportsId) &&
        categoryIds.includes(gamesId) &&
        categoryIds.includes(relaxationId)
      );
    }

    if (sportsChecked && gamesChecked) {
      return categoryIds.includes(sportsId) && categoryIds.includes(gamesId);
    }
    if (sportsChecked && relaxationChecked) {
      return (
        categoryIds.includes(sportsId) && categoryIds.includes(relaxationId)
      );
    }
    if (gamesChecked && relaxationChecked) {
      return (
        categoryIds.includes(gamesId) && categoryIds.includes(relaxationId)
      );
    }
    if (sportsChecked) {
      return categoryIds.includes(sportsId);
    }
    if (gamesChecked) {
      return categoryIds.includes(gamesId);
    }
    if (relaxationChecked) {
      return categoryIds.includes(relaxationId);
    }

    // If no categories are checked, return false (no events)
    return false;
  });
};
