import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  FormLabel,
  FormControl,
  Checkbox,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { PatchEvent } from "./PatchEvent";

export const EditEventButton = ({ event, updateEvent }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createdBy, setCreatedBy] = useState(event.createdBy);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [source, setSource] = useState(event.image);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);

  const handleChangeCreatedBy = (event) => {
    setCreatedBy(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleChangeEndTime = (event) => {
    setEndTime(event.target.value);
  };

  const initialSports = event.categoryIds.includes(1);
  const initialGames = event.categoryIds.includes(2);
  const initialRelaxation = event.categoryIds.includes(3);

  const [sportsChecked, setSportsChecked] = useState(initialSports);
  const [gamesChecked, setGamesChecked] = useState(initialGames);
  const [relaxationChecked, setRelaxationChecked] = useState(initialRelaxation);

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

  const eventId = event.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryIdsArray = [];

    const setCategoryIdsArray = () => {
      if (sportsChecked) {
        categoryIdsArray.push(1);
      }
      if (gamesChecked) {
        categoryIdsArray.push(2);
      }
      if (relaxationChecked) {
        categoryIdsArray.push(3);
      }
    };
    setCategoryIdsArray();
    const editedEvent = {
      id: eventId,
      createdBy: Number(createdBy),
      title: title,
      description: description,
      image: source,
      categoryIds: categoryIdsArray,
      location: location,
      startTime: startTime,
      endTime: endTime,
    };
    try {
      const response = await PatchEvent(editedEvent);
      console.log("Event patched:", response);

      updateEvent(editedEvent);
      onClose();
      toast({
        title: "Event edited.",
        description: "You have edited this event.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error patching event:", error);
      toast({
        title: "Event edit unsuccessfull.",
        description: "Something went wrong when editing this event.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Button
        bg="green.600"
        color="white"
        _hover={{ bg: "green.700" }}
        width="5rem"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={["full", "md"]}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add an event:</ModalHeader>
            <ModalCloseButton></ModalCloseButton>
            <ModalBody
              height={["full", "fit-content"]}
              display="flex"
              justifyContent="center"
              alignItems={["center", "flex-start"]}
              flexDir="column"
            >
              <FormControl isRequired>
                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Created by: `This would normally be taken taken from the login
                  data of the logged in user. As that is beyond the scope of
                  this project I will use 1 or 2, which are the user IDs in
                  events.json.`
                </FormLabel>
                <Input
                  value={createdBy}
                  placeholder={createdBy}
                  onChange={handleChangeCreatedBy}
                  marginBottom="1rem"
                ></Input>
                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Title:
                </FormLabel>
                <Input
                  value={title}
                  placeholder={title}
                  onChange={handleChangeTitle}
                  marginBottom="1rem"
                ></Input>
                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Description:
                </FormLabel>
                <Input
                  value={description}
                  placeholder={description}
                  onChange={handleChangeDescription}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Image url:
                </FormLabel>
                <Input
                  type="url"
                  value={source}
                  placeholder={source}
                  onChange={handleChangeSource}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Categories:
                </FormLabel>
                <Checkbox
                  marginLeft="8px"
                  value={1}
                  isChecked={sportsChecked}
                  onChange={handleChangeSports}
                >
                  sports
                </Checkbox>
                <Checkbox
                  marginLeft="8px"
                  value={2}
                  isChecked={gamesChecked}
                  onChange={handleChangeGames}
                >
                  games
                </Checkbox>
                <Checkbox
                  marginLeft="8px"
                  value={3}
                  isChecked={relaxationChecked}
                  onChange={handleChangeRelaxation}
                  marginBottom="1rem"
                >
                  relaxation
                </Checkbox>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Location:
                </FormLabel>
                <Input
                  value={location}
                  placeholder={location}
                  onChange={handleChangeLocation}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Start time:
                </FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  placeholder={startTime}
                  onChange={handleChangeStartTime}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  End time:
                </FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  placeholder={endTime}
                  onChange={handleChangeEndTime}
                  marginBottom="1rem"
                ></Input>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" mr={4} onClick={handleSubmit}>
                Edit event
              </Button>
              <Button variant="ghost" onClick={onClose} mr={4}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};
