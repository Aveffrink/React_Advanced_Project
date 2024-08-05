import React, { useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";
import { CategoryCheckboxes } from "../components/CategoryCheckboxes";
import { EventFilter } from "../components/EventFilter";
import { TextInput } from "../components/TextInput";
import { AddEvent } from "../components/AddEvent";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events: initialEvents, categories } = useLoaderData();
  const [events, setEvents] = useState(initialEvents);

  const addNewEvent = (event) => {
    setEvents([...events, event]);
  };

  const [sportsChecked, setSportsChecked] = useState(false);
  const [gamesChecked, setGamesChecked] = useState(false);
  const [relaxationChecked, setRelaxationChecked] = useState(false);

  const handleChangeSports = () => {
    if (sportsChecked) {
      setSportsChecked(false);
    } else {
      setSportsChecked(true);
    }
  };

  const handleChangeGames = () => {
    if (gamesChecked) {
      setGamesChecked(false);
    } else {
      setGamesChecked(true);
    }
  };

  const handleChangeRelaxation = () => {
    if (relaxationChecked) {
      setRelaxationChecked(false);
    } else {
      setRelaxationChecked(true);
    }
  };

  const eventsFiltered = EventFilter({
    events,
    sportsChecked,
    gamesChecked,
    relaxationChecked,
  });

  const [searchField, setSearchField] = useState("");
  const handleChange = (event) => setSearchField(event.target.value);

  const matchedEvents = eventsFiltered.filter((event) => {
    const searchFieldLower = searchField.toLowerCase();
    const containsPartialMatch = event.title
      .toLowerCase()
      .includes(searchFieldLower);

    return containsPartialMatch;
  });

  return (
    <>
      <Heading align="center" color="green.700" padding="1rem">
        List of events
      </Heading>
      <CategoryCheckboxes
        handleChangeSports={handleChangeSports}
        handleChangeGames={handleChangeGames}
        handleChangeRelaxation={handleChangeRelaxation}
      ></CategoryCheckboxes>
      <TextInput changeFn={handleChange} />
      <AddEvent addNewEvent={addNewEvent}></AddEvent>

      {matchedEvents.length === 0 ? (
        <Text align="center" color="red.500" marginTop="1rem" fontSize="3xl">
          No events found
        </Text>
      ) : (
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          flexWrap={"wrap"}
        >
          {matchedEvents.map((event) => (
            <EventsCard
              key={event.id}
              event={event}
              categories={categories}
            ></EventsCard>
          ))}
        </Flex>
      )}
    </>
  );
};
