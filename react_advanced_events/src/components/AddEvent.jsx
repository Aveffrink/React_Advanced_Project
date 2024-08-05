import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Input,
  Checkbox,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { PostEvent } from "./PostEvent";

export const AddEvent = ({ addNewEvent }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  const [sportsChecked, setSportsChecked] = useState(false);
  const [gamesChecked, setGamesChecked] = useState(false);
  const [relaxationChecked, setRelaxationChecked] = useState(false);

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
    const newEvent = {
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
      const response = await PostEvent(newEvent);
      console.log("Event posted successfully:", response);
      newEvent.id = response.id;
      console.log(newEvent);

      addNewEvent(newEvent);

      setCreatedBy("");
      setTitle("");
      setDescription("");
      setSource("");
      setLocation("");
      setStartTime("");
      setEndTime("");
      setSportsChecked(false);
      setGamesChecked(false);
      setRelaxationChecked(false);
      onClose();
      toast({
        title: "Event added.",
        description: "You have added an event.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  return (
    <Box align="center">
      <Button
        bg="green.600"
        color="white"
        _hover={{ bg: "green.700" }}
        onClick={onOpen}
      >
        Add event
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
                  onChange={handleChangeCreatedBy}
                  marginBottom="1rem"
                ></Input>
                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Title:
                </FormLabel>
                <Input
                  value={title}
                  onChange={handleChangeTitle}
                  marginBottom="1rem"
                ></Input>
                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Description:
                </FormLabel>
                <Input
                  value={description}
                  onChange={handleChangeDescription}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Image url:
                </FormLabel>
                <Input
                  type="url"
                  value={source}
                  onChange={handleChangeSource}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Categories:
                </FormLabel>
                <Checkbox
                  marginLeft="8px"
                  value={1}
                  onChange={handleChangeSports}
                >
                  sports
                </Checkbox>
                <Checkbox
                  marginLeft="8px"
                  value={2}
                  onChange={handleChangeGames}
                >
                  games
                </Checkbox>
                <Checkbox
                  marginLeft="8px"
                  value={3}
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
                  onChange={handleChangeLocation}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  Start time:
                </FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={handleChangeStartTime}
                  marginBottom="1rem"
                ></Input>

                <FormLabel fontWeight={"normal"} marginBottom="1px">
                  End time:
                </FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={handleChangeEndTime}
                  marginBottom="1rem"
                ></Input>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" mr={4} onClick={handleSubmit}>
                Add event
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
