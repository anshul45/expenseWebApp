import { Box, Center, Flex, Text, Title } from '@mantine/core';
import SplitExpenseUnequallyUser from './SplitExpenseUnequallyUser';
import { useState } from 'react';

type User = {
  _id: string;
  name: string;
  amount: number;
};

const SplitExpenseUnequally = ({
  users,
  amount,
  setPaidToUser,
}: {
  users: string[];
  amount: number;
  setPaidToUser: (data: { name: string; amount: number }[]) => void;
}) => {
  const initialUsers = users.map((name, index) => ({ _id: String(index), name, amount: 0 }));
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [restAmount, setRestAmount] = useState<number | undefined>(undefined);

  const handleUserAmountChange = (userId: string, newAmount: number) => {
    // Update the user's amount
    const updatedUsers = userList.map((user) =>
      user._id === userId ? { ...user, amount: newAmount } : user
    );

    setUserList(updatedUsers);

    // Recalculate the total distributed amount
    const newRestAmount = updatedUsers.reduce((sum, user) => sum + user.amount, 0);
    setRestAmount(newRestAmount);

    // Update the setPaidToUser state
    const paidToUserData = updatedUsers.map(({ name, amount }) => ({ name, amount }));
    setPaidToUser(paidToUserData);
  };


  return (
    <Box>
      <Center>
        <Title size={20}>Split Expense Unequally</Title>
      </Center>
      <Text mb={10}>Select how much each person owes</Text>
      {userList.map((user) => (
        <SplitExpenseUnequallyUser
          key={user._id}
          userId={user._id}
          userName={user.name}
          onAmountChange={handleUserAmountChange}
          restAmount={restAmount ?? 0}
          totalAmount={amount}
        />
      ))}
      <Flex justify="center" align="center" direction="column" mt={20}>
        <Text>
          Total Distributed: {restAmount} of {amount}
        </Text>
        <Text>{Math.abs(amount - (restAmount ?? 0))} left to distribute</Text>
      </Flex>
    </Box>
  );
};

export default SplitExpenseUnequally;
