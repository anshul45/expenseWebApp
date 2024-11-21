import { Box, Center, Flex, Text, Title } from '@mantine/core'
import SplitExpenseUnequallyUser from './SplitExpenseUnequallyUser'
import { useState } from 'react'

const SplitExpenseUnequally = ({user,amount}:any) => {
  const[restAmount,setRestAmount]=useState(0)
  return (
    <Box>
      <Center >
    <Title size={20}>SplitExpenseEqually</Title>
      </Center>
    <Text mb={10}>Select which people owe an equal share</Text>
    {user?.map((user:string,idx:number)=>(
    <SplitExpenseUnequallyUser setRestAmount={setRestAmount} userName={user} key={idx}/>
    ))}
     <Flex justify="center" align="center" direction="column">
          <Text>{restAmount} of {amount? amount:0}</Text>
          <Text>{amount?amount-restAmount:0} left</Text>
        </Flex>
  </Box>
  )
}

export default SplitExpenseUnequally