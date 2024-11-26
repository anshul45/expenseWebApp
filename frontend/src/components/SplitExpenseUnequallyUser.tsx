import { Flex, Image, NumberInput } from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';
import { useState } from 'react';

type SplitExpenseUnequallyUserProps = {
  showAlert: (title: string, message: string) => void;
  userId: string;
  userName: string;
  onAmountChange: (userId: string, newAmount: number) => void;
  restAmount: number;
  totalAmount: number;
};

const SplitExpenseUnequallyUser = ({
  showAlert,
  userId,
  userName,
  onAmountChange,
  restAmount,
  totalAmount,
}: SplitExpenseUnequallyUserProps) => {
  const [value, setValue] = useState<number|undefined>();

  const handleChange = (newValue: number | string) => {
    const updatedValue = typeof newValue === 'string' ? parseFloat(newValue) : newValue;
    const remainingAmount = totalAmount - restAmount + (value ?? 0);

    if (updatedValue > remainingAmount) {
      showAlert(
        "Missing Details", `You cannot exceed the total amount of ${totalAmount}. Remaining amount is ${remainingAmount}.`
      );
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
          src={`https://avatar.iran.liara.run/public?username=${userName}`}
          alt="user"
        />
        <span>{userName}</span>
      </Flex>
      <NumberInput
      w={130}
      value={value}
      onChange={handleChange}
      /* @ts-ignore: */
        icon={<IconCurrencyRupee />}
        placeholder="Enter amount"
        hideControls
      />
    </Flex>
  );
};

export default SplitExpenseUnequallyUser;
