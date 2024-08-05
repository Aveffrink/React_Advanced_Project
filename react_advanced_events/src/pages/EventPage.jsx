import React, { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { SelectedEventCard } from "../components/SelectedEventCard";
import { DeleteEventButton } from "../components/DeleteEventButton";
import { EditEventButton } from "../components/EditEventButton";

export const loader = async ({ params }) => {
  try {
    const usersResponse = await fetch("http://localhost:3000/users");
    const eventResponse = await fetch(
      `http://localhost:3000/events/${params.eventId}`
    );
    const categoriesResponse = await fetch("http://localhost:3000/categories");

    if (!usersResponse.ok || !eventResponse.ok || !categoriesResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const users = await usersResponse.json();
    const event = await eventResponse.json();
    const categories = await categoriesResponse.json();

    return { users, event, categories };
  } catch (error) {
    console.error("Error loading data:", error);
    return { users: [], event: null, categories: [] };
  }
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
