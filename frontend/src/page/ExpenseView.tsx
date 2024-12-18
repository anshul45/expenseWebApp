import { ActionIcon, Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core"
import { IconArrowLeftDashed, IconPencilPlus } from "@tabler/icons-react"
import ExpenseCart from "../components/ExpenseCart"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import SettleUp from "../components/SettleUp"
import { deleteUser, getUserExpense } from "../api/apiRequest"
import { Expense } from "../utils/types"

const ExpenseView = () => {
  const [openSettleUp,setOpenSettleUp] = useState<boolean>(false)
  const {id} = useParams();
  const navigate = useNavigate()
  const[expenseData,setExpenseData] = useState<Expense>()
  const[transactionId, setTransactionId] = useState<string[]>([]);
  const[owe,setOwe] = useState<number>(0);


  const fetchData = async(id :string) => {
    const data = await getUserExpense(id)
    setExpenseData(data)
  }
  useEffect(()=>{ 
    if(id)
    fetchData(id)
  },[id])

  const handleDeleteUser = async(id:string) => {
    await deleteUser(id);
    navigate("/");
  }


  useEffect(()=>{
    if(expenseData)
    {
      const ids = expenseData?.transactions?.map(transaction => transaction._id);
     setTransactionId(ids)
    }
    },[expenseData])  

  return (
    <Box px={40} py={15} w="100%"  h={615}>
        <ActionIcon mb={30} onClick={()=> navigate("/")}> <IconArrowLeftDashed/> </ActionIcon>
        <Flex  direction="column" justify="space-between" h="90%">
        <Box>
        <Center>
            <Flex direction="column" align="center">
            <Image w={50} mb={5} src={`https://avatar.iran.liara.run/public?username=${expenseData?.name}`}/>
            <Title size={20} mb={3}>{expenseData?.name}</Title>
            <Text mb={5} c={owe<0 ? "red":"green"}>{owe<0 ?"You owe":"You are owed" } $ {Math.abs(owe)} overall</Text>
            <Button variant="default"  onClick={()=> setOpenSettleUp(true)}>Settle up</Button>
            </Flex>
            <SettleUp userId={id} transactionIds={transactionId} openSettleUp={openSettleUp} setOpenSettleUp={setOpenSettleUp}/>
        </Center>
        <Flex mt={30} px={20} justify="space-between" gap={35} h={300} style={{flexWrap:"wrap", overflowY:"scroll",scrollbarWidth: "none"}}>
          {expenseData?.transactions?.map((transaction) => (
            <ExpenseCart refreshData={() => id && fetchData(id)} key={transaction._id} name={expenseData?.name} setOwe={setOwe} data={transaction}/>
          ))}
        </Flex>
          </Box>
        <Flex justify="center" align="center" gap={50}>
        <Button variant="filled" color="green" style={{backgroundColor:"green"}}   onClick={() => navigate("/new-expense/"+id)}>
        <IconPencilPlus/> 
        <Text size="sm" ml={7}> Add expense</Text>
        </Button>
        <Button variant="filled" color="red" onClick={()=> id && handleDeleteUser(id)}>DeleteUser</Button>
        </Flex>
        
          </Flex>
        
    </Box>
  )
}

export default ExpenseView