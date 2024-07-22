import { Checkbox, CheckboxGroup, Stack, Text } from "@chakra-ui/react";

export const CategoryCheckboxes = ({
  handleChangeSports,
  handleChangeGames,
  handleChangeRelaxation,
}) => {
  return (
    <>
      <Text align="center" color="green.700" fontWeight="bold">
        Select a category:
      </Text>
      <CheckboxGroup>
        <Stack spacing={5} direction="row" justifyContent="center">
          <Checkbox
            colorScheme="green"
            value="sports"
            onChange={handleChangeSports}
          >
            Sports
          </Checkbox>
          <Checkbox
            colorScheme="green"
            value="games"
            onChange={handleChangeGames}
          >
            Games
          </Checkbox>
          <Checkbox
            colorScheme="green"
            value="relaxation"
            onChange={handleChangeRelaxation}
          >
            Relaxation
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </>
  );
};
