import {
  Card,
  CardBody,
  Heading,
  Tag,
  TagLabel,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsCard = ({ event, categories }) => {
  const returnCategory = (Id, categories) => {
    const category = categories.find((category) => category.id === Id);
    const categoryName = category.name;
    return categoryName;
  };

  return (
    <Card
      width="20rem"
      backgroundColor="blue.50"
      margin="1rem"
      boxShadow="7px 7px 10px"
    >
      <Link to={`event/${event.id}`}>
        <CardBody padding="1rem">
          <Image
            src={event.image}
            borderRadius="lg"
            width="100%"
            height="10rem"
            objectFit="cover"
          ></Image>
          <Heading size="md" align="center" paddingTop="1rem">
            {event.title}
          </Heading>
          <Text align="center" paddingBottom="1rem">
            {event.description}
          </Text>
          <Text align="center">Date: {event.startTime.slice(0, 10)}</Text>
          <Text align="center">
            Start time: {event.startTime.slice(11, 16)}
          </Text>
          <Text align="center">End time: {event.endTime.slice(11, 16)}</Text>
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
        </CardBody>
      </Link>
    </Card>
  );
};
