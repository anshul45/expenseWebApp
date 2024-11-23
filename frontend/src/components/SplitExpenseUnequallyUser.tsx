import { Flex, Image, NumberInput } from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';
import { useState } from 'react';

type SplitExpenseUnequallyUserProps = {
  userId: string;
  userName: string;
  amount: number;
  onAmountChange: (userId: string, newAmount: number) => void;
  restAmount: number;
  totalAmount: number;
};

const SplitExpenseUnequallyUser = ({
  userId,
  userName,
  amount,
  onAmountChange,
  restAmount,
  totalAmount,
}: SplitExpenseUnequallyUserProps) => {
  const [value, setValue] = useState(amount || 0);

  const handleChange = (newValue: number | undefined) => {
    const updatedValue = newValue || 0;
    const remainingAmount = totalAmount - restAmount + value;

    if (updatedValue > remainingAmount) {
      alert(
        `You cannot exceed the total amount of ${totalAmount}. Remaining amount is ${remainingAmount}.`
      );
      return;
    }

    setValue(updatedValue);
    onAmountChange(userId, updatedValue);
  };

  return (
    <Flex justify="space-between" align="center" my={10} style={{ cursor: 'pointer' }}>
      <Flex align="center" gap={10}>
        <Image
          width={35}
          height={35}
          style={{ borderRadius: '100%' }}
          src="data:image/jpeg;base64,..."
          alt="user"
        />
        <span>{userName}</span>
      </Flex>
      <NumberInput
        value={value}
        onChange={handleChange}
        icon={<IconCurrencyRupee />}
        placeholder="Enter amount"
        min={0}
      />
    </Flex>
  );
};

export default SplitExpenseUnequallyUser;
