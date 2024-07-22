import {
  Card,
  CardBody,
  Heading,
  Flex,
  Tag,
  TagLabel,
  Image,
  Text,
  Center,
  Stack,
} from "@chakra-ui/react";

export const SelectedEventCard = ({ event, categories, user }) => {
  const returnCategory = (Id, categories) => {
    const category = categories.find((category) => category.id === Id);
    const categoryName = category.name;
    return categoryName;
  };

  return (
    <Center>
      <Card
        width={{ base: "20rem", md: "80vw" }}
        backgroundColor="blue.50"
        margin="1rem"
        boxShadow="7px 7px 10px"
      >
        <CardBody>
          <Image
            src={event.image}
            borderRadius="lg"
            width="100%"
            height={{ base: "10rem", md: "25rem" }}
            objectFit="cover"
          ></Image>

          <Heading
            size={{ base: "md", md: "3xl" }}
            align="center"
            paddingTop="1rem"
            marginBottom={{ md: "1rem" }}
          >
            {event.title}
          </Heading>
          <Text
            align="center"
            paddingBottom={{ md: "1rem" }}
            fontSize={{ md: "2xl" }}
          >
            {event.description}
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={{ md: "center" }}
          >
            <Flex
              direction="column"
              mt="6"
              spacing="2"
              align={{ base: "center", md: "flex-start" }}
            >
              <Text align="center">Date: {event.startTime.slice(0, 10)}</Text>
              <Text align="center">
                Start time: {event.startTime.slice(11, 16)}
              </Text>
              <Text align="center">
                End time: {event.endTime.slice(11, 16)}
              </Text>
              <Text align="center">Location: {event.location}</Text>

              <Text align="center" color="green.500" marginTop="1rem">
                Categories:
              </Text>
              <Flex spacing={3} justifyContent="center">
                {event.categoryIds.map((Id) => (
                  <Tag key={Id} color="green.500" maxW="full" margin="6px">
                    <TagLabel whiteSpace="normal">
                      {returnCategory(Id, categories)}
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Flex
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              flexDirection="column"
              marginTop="1rem"
              paddingLeft={{ md: "2rem" }}
            >
              <Text>Created by:</Text>
              <Image
                src={user.image}
                borderRadius="50%"
                margin="6px"
                height="8rem"
              ></Image>
              <Text>{user.name}</Text>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
