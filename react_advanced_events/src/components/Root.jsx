import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bgColor={"green.100"} paddingBottom={"1.5rem"} minHeight="100vh">
      <Navigation />
      <Outlet />
    </Box>
  );
};
