import { Box, Center, Flex, Text, Title } from '@mantine/core';
import SplitExpenseUnequallyUser from './SplitExpenseUnequallyUser';
import { useState } from 'react';

type User = {
  _id: string;
  name: string;
  amount: number;
};

const SplitExpenseUnequally = ({ user, amount }: { user: User[]; amount: number }) => {
  const [restAmount, setRestAmount] = useState(0);

  const handleUserAmountChange = (userId: string, newAmount: number) => {
    setRestAmount((prevRestAmount) => {
      const otherUsersTotal = user
        .filter((u) => u._id !== userId) // Exclude the current user
        .reduce((sum, u) => sum + (u.amount || 0), 0); // Sum all other users' amounts

      return otherUsersTotal + newAmount;
    });
  };

  return (
    <Box>
      <Center>
        <Title size={20}>Split Expense Unequally</Title>
      </Center>
      <Text mb={10}>Select which people owe an equal share</Text>
      {user?.length ? (
        user.map((u) => (
          <SplitExpenseUnequallyUser
            key={u._id}
            userId={u._id}
            userName={u.name}
            amount={u.amount}
            onAmountChange={handleUserAmountChange}
            restAmount={restAmount}
            totalAmount={amount}
          />
        ))
      ) : (
        <Text>No users to display</Text>
      )}
      <Flex justify="center" align="center" direction="column">
        <Text>{restAmount} of {amount || 0}</Text>
        <Text>{Math.abs(amount - restAmount)} left</Text>
      </Flex>
    </Box>
  );
};

export default SplitExpenseUnequally;
