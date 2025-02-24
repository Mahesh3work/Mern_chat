import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

import UserBadgeItem from './../useAvatar/UserBadgeItem';
import UserListItem from './../useAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchMessages,fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user/all?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  // const handleRemove = async (user1) => {
  //   console.log("user is : "+user1);
  //   if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
  //     toast({
  //       title: "Only admins can remove someone!",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     const response = await axios.put(
  //       `/api/chat/groupremove`,
  //       {
  //         chatId: selectedChat._id,
  //         userId: user1._id,
  //       },
  //       config
  //     );
  //     console.log("Response data:", response); // Log the entire response to check its structure
      
  //     const { data } = response;
  //     console.log("Extracted data:", data); // Log extracted data for further clarity

  //     user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
  //     setFetchAgain(!fetchAgain);
  //     fetchMessages();
  //     setLoading(false);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //   }
  //   setGroupChatName("");
  // };


  // const handleRemove = async (user1) => {
  //   if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
  //     toast({
  //       title: "Only admins can remove someone!",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     const response = await axios.put(
  //       `/api/chat/groupremove`,
  //       {
  //         chatId: selectedChat._id,
  //         userId: user1._id,
  //       },
  //       config
  //     );
  
  //     const { data } = response;
  //     console.log("Extracted data:", data); // Data is logged successfully
  
  //     // If the user is removing themselves, clear the selected chat
  //     if (user1._id === user._id) {
  //       setSelectedChat(null); // Clear the selected chat
  //     } else {
  //       setSelectedChat(data); // Update selected chat with the new data
  //     }
  
  //     setFetchAgain(!fetchAgain);
  //     fetchMessages(); // Refetch messages after update
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("Error response:", error.response); // This is likely undefined in some cases
  //     toast({
  //       title: "Error Occurred!",
  //       description: error.response?.data?.message || "Something went wrong!",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //   }
  //   setGroupChatName(""); // Clear group chat name input
  // };
  const handleRemove = async (user1) => {
    try {
      console.log("Removing user:", user1);
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(`/api/chat/groupremove`, {
        chatId: selectedChat._id,
        userId: user1._id,
      }, config);
      
      console.log("Response data:", response.data); // Ensure response is logged before usage
      if (user1._id === user._id) {
        setSelectedChat(null);
      } else {
        setSelectedChat(response.data); // Safely use the response
      }
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      console.error("Error occurred during remove operation:", error); // More detailed logging
    }
    setLoading(false);
  };
  
  
  return (
    <>
      <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;