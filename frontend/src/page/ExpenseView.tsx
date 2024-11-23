import { ActionIcon, Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core"
import { IconArrowLeftDashed, IconPencilPlus } from "@tabler/icons-react"
import ExpenseCart from "../components/ExpenseCart"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import SettleUp from "../components/SettleUp"
import { getUserExpense } from "../api/apiRequest"

const ExpenseView = () => {
  const [openSettleUp,setOpenSettleUp] = useState<boolean>(false)
  const {id} = useParams();
  const navigate = useNavigate()
  const[expenseData,setExpenseData] = useState([])
  const fetchData = async(id :string) => {
    const data = await getUserExpense(id)
    setExpenseData(data)
  }
  useEffect(()=>{ 
    if(id)
    fetchData(id)
  },[id,expenseData])
  return (
    <Box bg='yellow' px={40} py={15} w="100%">
        <ActionIcon mb={50} bg="yellow" onClick={()=> navigate("/")}> <IconArrowLeftDashed/> </ActionIcon>
        <Flex  direction="column" justify="space-between" h="85%">
        <Box>
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
            <ExpenseCart key={transaction._id} userId={id} data={transaction}/>
          ))}
        </Flex>
          </Box>
        <Center onClick={() => navigate("/new-expense/"+id)}>
        <IconPencilPlus/> 
        <Text size="sm" ml={7}> Add expense</Text>
        </Center>
          </Flex>
        
    </Box>
  )
}

export default ExpenseView