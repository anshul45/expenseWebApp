import { Flex, Image, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import ExpenseDetail from './ExpenseDetail'
import { getMonth, getMonthString } from '../utils/dates'
import { ownAmount } from '../utils/amount';
import { Transaction } from '../utils/types';

interface ExpenseCartProps{
  refreshData: any,
  data: Transaction,
  name:string,
  setOwe :React.Dispatch<React.SetStateAction<number>> 
}

const ExpenseCart:React.FC<ExpenseCartProps> = ({refreshData, data,name, setOwe }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount,setAmount] = useState<number>(0);

  const handleOpen = (e: React.MouseEvent) => {
    if (!open) {
      e.stopPropagation();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

console.log("data",data)

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
      w={400}
      onClick={handleOpen}
    >
      <Flex align="center" gap={10}>
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
          src={`https://avatar.iran.liara.run/public?username=${name}`}
        />
        <Text ml={35}>{data.desc}</Text>
      </Flex>
      <Text c={amount<0 ? "red":"green"}>{amount<0 ? "-$ ":"$ "}{Math.abs(amount)}</Text>
      
      <ExpenseDetail refreshData={refreshData} open={open} setOpen={handleClose} data={data}/>
    </Flex>
  );
};

export default ExpenseCart