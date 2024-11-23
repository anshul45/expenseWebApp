import { ActionIcon, Box, Center, Flex, Input, Modal, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { addExpenseUser } from "../api/apiRequest";

const SelectFriends = ({ mode, open, setOpen }: any) => {
  const [inputFriend, setInputFriends] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);


  const friends = ["user1", "user2", "hello", "temp", "tempUser"];
  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(inputFriend.toLowerCase())
  );


  // Dynamically call the API based on the mode
  const addUser = async () => {
    if (selectedFriends.length === 0) return;

    try {
      const modeType = mode.toLowerCase(); // Ensure mode is case-insensitive
      const responses = await addExpenseUser(modeType, selectedFriends);
      console.log("Responses:", responses); // Handle success or further logic here
    } catch (error) {
      console.error("Error adding users:", error); // Handle errors gracefully
    }
  };

  const handleSelect = (friend: string) => {
    if (mode === "Individual") {
      setSelectedFriends([friend]); // Only one friend for Individual mode
    } else {
      setSelectedFriends((prev) =>
        prev.includes(friend)
          ? prev.filter((f) => f !== friend) // Deselect if already selected
          : [...prev, friend] // Add new selection
      );
    }
    setInputFriends("");
  };

  const handleSubmit = async () => {
    await addUser();
    setOpen(false); // Close the modal after submission
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="New Expense"
    >
      <Flex direction="column" justify="space-between" gap={10}>
        <Box>
          <Input
            value={inputFriend}
            onChange={(e) => setInputFriends(e.target.value)}
          />
          <Flex align="center" gap={5}>
            <Text my={10}>With you & </Text>
            {selectedFriends.length > 0 && (
              <Text>{selectedFriends.join(", ")}</Text>
            )}
          </Flex>
          {filteredFriends?.map((data, idx) => (
            <Text
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(data)}
            >
              {data}
            </Text>
          ))}
        </Box>
        <Center>
          <ActionIcon onClick={handleSubmit} disabled={!selectedFriends.length}>
            <IconCheck />
          </ActionIcon>
        </Center>
      </Flex>
    </Modal>
  );
};

export default SelectFriends;
