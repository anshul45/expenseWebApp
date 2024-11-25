import { Box, Center, Flex, Text } from "@mantine/core"
import User from "../components/User"
import { IconPencilPlus } from "@tabler/icons-react"
import SelectFriends from "../components/SelectFriends"
import React, { useState } from "react"
import { ExpensesProps } from "../utils/types"

const Expenses:React.FC<ExpensesProps> = ({title,expenseData,refreshData}) => {
  const [open,setOpen] = useState<boolean>(false)

  return (
    <Box py={10} px={15} h={525} style={{flex:0.5}}>
      <Flex justify="space-between" h="100%" direction="column">
        <Box>
      <Center w="100%">
        <Text size="xl" mb={15}>
        {title}
        </Text>
      </Center>
      <Box h={430} px={10} style={{overflowY:"scroll", scrollbarWidth: "none"}}>
      {expenseData?.map((data,idx:number)=>(
      
      <User data={data} key={idx}/>
      ))}
      </Box>
        </Box>
        <Center w="100%" style={{cursor:"pointer"}} onClick={() =>setOpen(true)}>
        <IconPencilPlus/> 
      <Text size="sm" ml={7}> Add expense</Text>
        </Center>
      </Flex>
      <SelectFriends mode={title} open={open} setOpen={setOpen} refreshData={refreshData}/>
    </Box>
  )
}

export default Expenses