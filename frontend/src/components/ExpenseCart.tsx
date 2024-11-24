import { Flex, Image, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import ExpenseDetail from './ExpenseDetail'
import { getMonth, getMonthString } from '../utils/dates'
import { ownAmount } from '../utils/amount';

const ExpenseCart = ({ data, userId, setOwe }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount,setAmount] = useState<number>(null);

  const handleOpen = (e: React.MouseEvent) => {
    if (!open) {
      e.stopPropagation();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    const res = ownAmount(data)
    
    setAmount(res)

    if(amount) setOwe(prev => prev+= amount)
  },[data])
  

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ cursor: "pointer" }}
      w={500}
      onClick={handleOpen}
    >
      <Flex align="center" gap={20}>
        <Flex direction="column" align="center">
          <Text size="sm" style={{ lineHeight: "13px" }}>
            {getMonthString(data.createDate)}
          </Text>
          <Text size="sm" style={{ lineHeight: "13px" }}>
            {getMonth(data.createDate)}
          </Text>
        </Flex>
        <Image
          w={40}
          style={{ borderRadius: "100%" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"
        />
        <Text ml={35}>{data.description}</Text>
      </Flex>
      <Text>{amount<0 ? "-$ ":"$ "}{Math.abs(amount)}</Text>
      <ExpenseDetail open={open} setOpen={handleClose} data={data} userId={userId} />
    </Flex>
  );
};

export default ExpenseCart