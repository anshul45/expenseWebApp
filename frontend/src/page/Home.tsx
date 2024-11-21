import { Box, Divider, Flex, Title } from "@mantine/core"
import Expenses from "./Expenses"
import { getallExpense } from "../api/apiRequest"
import { useEffect, useState } from "react"

const Home = () => {
 
  const[data,setData] = useState([]);

  useEffect(()=>{
    const datafetch = async ()=>{
      const res = await getallExpense("individual");
      setData(res);
    }
    datafetch()
  },[])
  

  return (
    <Box w="100%"  p={20}>
      <Title pb={18}>Outstanding Expenses</Title>
    <Flex justify="space-between"   bg="yellow" w='100%' h="calc(100vh - 102px)" >
      <Expenses title="Individual" expenseData={data}/>
      <Divider orientation="vertical" />
      <Expenses title="Group" expenseData={data}/>
    </Flex>
    </Box>
  )
}

export default Home