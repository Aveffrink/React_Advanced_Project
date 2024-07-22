import React, { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { SelectedEventCard } from "../components/SelectedEventCard";
import { DeleteEventButton } from "../components/DeleteEventButton";
import { EditEventButton } from "../components/EditEventButton";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();

  const returnUser = (Id, users) => {
    const user = users.find((user) => user.id === Id);
    return user;
  };

  const [updatedEvent, setUpdatedEvent] = useState(event);

  const updateEvent = (editedEvent) => {
    setUpdatedEvent(editedEvent);
  };

  return (
    <>
      <Heading align="center" color="green.700" padding="1rem">
        Event
      </Heading>
      <Flex justify="center" gap="8">
        <EditEventButton
          event={updatedEvent}
          updateEvent={updateEvent}
        ></EditEventButton>
        <DeleteEventButton event={updatedEvent}></DeleteEventButton>
      </Flex>
      <SelectedEventCard
        event={updatedEvent}
        categories={categories}
        user={returnUser(updatedEvent.createdBy, users)}
      ></SelectedEventCard>
    </>
  );
};
