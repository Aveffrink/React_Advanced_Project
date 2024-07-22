import { Box, Input, Text } from "@chakra-ui/react";

export const TextInput = ({ changeFn }) => {
  return (
    <Box align="center" padding="1rem" color="green.700">
      <Text align="center" color="green.700" fontWeight="bold">
        Search for an event:
      </Text>
      <Input
        background="blue.50"
        width={{ base: "10rem", sm: "20rem" }}
        margin="6px"
        onChange={changeFn}
      />
    </Box>
  );
};
