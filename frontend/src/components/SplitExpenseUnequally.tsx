import { Box, Center, Flex, Text, Title } from '@mantine/core';
import SplitExpenseUnequallyUser from './SplitExpenseUnequallyUser';
import { useState } from 'react';

type User = {
  _id: string;
  name: string;
  amount: number;
};

const SplitExpenseUnequally = ({
  showAlert,
  users,
  amount,
  setPaidToUser,
}: {
  showAlert: (title: string, message: string) => void;
  users: string[];
  amount: number;
  setPaidToUser: (data: { name: string; amount: number }[]) => void;
}) => {
  const initialUsers = users.map((name, index) => ({ _id: String(index), name, amount: 0 }));
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [restAmount, setRestAmount] = useState<number | undefined>(undefined);

  const handleUserAmountChange = (userId: string, newAmount: number) => {
   
    const updatedUsers = userList.map((user) =>
      user._id === userId ? { ...user, amount: newAmount } : user
    );

    setUserList(updatedUsers);


    const newRestAmount = updatedUsers.reduce((sum, user) => sum + user.amount, 0);
    setRestAmount(newRestAmount);

    
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
        showAlert={showAlert}
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
          Total Distributed: {restAmount ? restAmount : 0} of {amount}
        </Text>
        <Text>{restAmount ?? 0 > amount ? 0 :Math.abs(amount - (restAmount ? restAmount: 0))} left to distribute</Text>
      </Flex>
    </Box>
  );
};

export default SplitExpenseUnequally;
