import { Box, Center, Flex, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import SplitExpenseEquallyUser from "./SplitExpenseEquallyUser";

const SplitExpenseEqually = ({
  users,
  amount,
  setPaidToUser,
}: {
  users: string[];
  amount: number;
  setPaidToUser: (updatedUsers: { name: string; amount: number }[]) => void;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(users);

  const toggleUserSelection = (userName: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userName)
        ? prev.filter((user) => user !== userName) 
        : [...prev, userName] 
    );
  };

  useEffect(() => {
    const perPersonAmount = amount / Number(selectedUsers.length || 1);

    const paidToUser = selectedUsers.map((userName) => ({
      name: userName,
      amount: perPersonAmount,
    }));

    // Update selected users in parent state
    setPaidToUser(paidToUser);
  }, [selectedUsers]);

  return (
    <Box>
      <Center>
        <Title size={20}>Split Expense Equally</Title>
      </Center>
      <Text mb={10}>Select which people owe an equal share</Text>

      {/* Render user list */}
      {users?.map((userName: string, idx: number) => (
        <SplitExpenseEquallyUser
          userName={userName}
          key={idx}
          isSelected={selectedUsers.includes(userName)}
          onToggle={() => toggleUserSelection(userName)}
        />
      ))}

      {/* Display split info */}
      <Flex justify="center" align="center" direction="column" mt={10}>
        <Text>
          {selectedUsers.length > 0
            ? `${(amount / selectedUsers.length).toFixed(2)} / person (${selectedUsers.length} people)`
            : "No users selected"}
        </Text>
      </Flex>
    </Box>
  );
};

export default SplitExpenseEqually