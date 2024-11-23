import { Box, Center, Flex, Text } from "@mantine/core"
import User from "../components/User"
import { IconPencilPlus } from "@tabler/icons-react"
import SelectFriends from "../components/SelectFriends"
import { useState } from "react"

const Expenses = ({title,expenseData}:any) => {
  const [open,setOpen] = useState<boolean>(false)
  return (
    <Box py={10} px={15} h={505} style={{flex:0.5, overflowY:"scroll",scrollbarColor:"inherit"}}>
      <Flex justify="space-between" h="100%" direction="column">
        <Box>
      <Center w="100%">
        <Text size="xl" mb={15}>
        {title}
        </Text>
      </Center>
      {expenseData?.map((data,idx)=>(
      
      <User data={data} key={idx}/>
      ))}
        </Box>
        <Center w="100%" style={{cursor:"pointer"}} onClick={() =>setOpen(true)}>
        <IconPencilPlus/> 
      <Text size="sm" ml={7}> Add expense</Text>
        </Center>
      </Flex>
      <SelectFriends mode={title} open={open} setOpen={setOpen}/>
    </Box>
  )
}

export default Expenses