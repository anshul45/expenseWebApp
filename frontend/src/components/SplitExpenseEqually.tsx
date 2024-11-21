import {  Box, Center, Flex, Text, Title } from "@mantine/core"
import SplitExpenseEquallyUser from "./SplitExpenseEquallyUser"
import { useState } from "react"

const SplitExpenseEqually = ({user,amount}:any) => {
  const [selectedPerson, setSelectedPerson] = useState<number>(0)
  return (<Box>
    <Center>
    <Title size={20}>SplitExpenseEqually</Title>
    </Center>
    <Text mb={10}>Select which people owe an equal share</Text>
    {user?.map((user:string,idx:number)=>(
    <SplitExpenseEquallyUser userName={user} setSelectedPerson={setSelectedPerson} key={idx}/>
    ))}
      <Flex justify="center" align="center" direction="column">
          <Text>{amount/selectedPerson} / person</Text>
          <Text>({selectedPerson} people)</Text>
        </Flex>
  </Box>
  )
}

export default SplitExpenseEqually