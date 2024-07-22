import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box background="green.600">
      <nav>
        <List
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <ListItem>
            <Heading color="white" padding="1rem">
              <Link to="/">Events</Link>
            </Heading>
          </ListItem>
          <ListItem>
            <Heading color="white" padding="1rem">
              <Link to="/event/1">Event</Link>
            </Heading>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
