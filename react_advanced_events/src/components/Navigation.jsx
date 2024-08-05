import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box background="green.600">
      <nav>
        <Heading color="white" padding="1rem" align="center">
          <Link to="/">Homepage</Link>
        </Heading>
      </nav>
    </Box>
  );
};
