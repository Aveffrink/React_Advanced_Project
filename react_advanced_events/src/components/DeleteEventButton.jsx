import {
  Button,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const DeleteEventButton = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete the event. Status: ${response.status}`
        );
      }
      navigate("/");
    } catch (error) {
      console.error("An error occurred while deleting an event:", error);
    }
  };

  return (
    <>
      <Box align="center">
        <Button onClick={onOpen} colorScheme="orange" width="5rem">
          Delete
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginTop="1em">
            Are you sure you want to delete this event?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              colorScheme="orange"
              marginRight="12px"
              onClick={() => handleDelete()}
            >
              Yes, delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
