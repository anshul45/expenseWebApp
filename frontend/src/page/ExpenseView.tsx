import { ActionIcon, Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core"
import { IconArrowLeftDashed } from "@tabler/icons-react"
import ExpenseCart from "../components/ExpenseCart"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import SettleUp from "../components/SettleUp"
import { getSingleExpense } from "../api/apiRequest"

const ExpenseView = () => {
  const [openSettleUp,setOpenSettleUp] = useState<boolean>(false)
  const {id} = useParams();
  const navigate = useNavigate()
  const[expenseData,setExpenseData] = useState([])
  const fetchData = async(id :string) => {
    const data = await getSingleExpense(id)
    setExpenseData(data)
  }
  useEffect(()=>{ 
    if(id)
    fetchData(id)
  },[])
  return (
    <Box bg='yellow' px={40} py={15} w="100%">
        <ActionIcon mb={50} bg="yellow" onClick={()=> navigate("/")}> <IconArrowLeftDashed/> </ActionIcon>
        <Center>
            <Flex direction="column" align="center">
            <Image w={120} src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"/>
            <Title size={20}>{expenseData?.name}</Title>
            <Text>You owe $xxxx overall</Text>
            <Button variant="default" onClick={()=> setOpenSettleUp(true)}>Settle up</Button>
            </Flex>
            <SettleUp openSettleUp={openSettleUp} setOpenSettleUp={setOpenSettleUp}/>
        </Center>
        <Flex mt={30} justify="space-between" gap={20} style={{flexWrap:"wrap"}}>
          {expenseData?.transactions?.map((transaction) => (
            <ExpenseCart key={transaction._id} data={transaction} userId={expenseData?._id}/>
          ))}
        </Flex>
        
    </Box>
  )
}

export default ExpenseView