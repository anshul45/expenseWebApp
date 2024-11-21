import { Box, Flex, Text,ActionIcon,Modal, Button} from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFullDate } from "../utils/dates"

const ExpenseDetail = ({open, setOpen,data}:{open:boolean,setOpen: (value: boolean) => void,data:any,userId:string}) => {
  const navigate = useNavigate();
  const[openDelete, setOpenDelete] = useState<boolean>(false);

  const clickedYes = () => {
    setOpenDelete(false)
    setOpen(false)
  }


  

  return (
    <Modal opened={open} onClose={()=>{setOpen(false)}} title={data.description}>
      <Box bg="green" px={8} py={5}> 
    <Box>
      <ActionIcon onClick={()=> navigate("/new-expense/"+data._id)}> 
<IconPencil/>
      </ActionIcon>
      <ActionIcon ml={10} onClick={()=> setOpenDelete(true)}>
<IconTrash/>
      </ActionIcon>
    </Box>
    <Modal opened={openDelete} onClose={()=>setOpenDelete(false) } title="Do you want to delete this expense">
     <Flex justify="space-between">
      <Button onClick={clickedYes}>Yes</Button>
      <Button onClick={() => setOpenDelete(false)}>No</Button>
     </Flex>
    </Modal>
  
    
    <Text>{data.amount}</Text>
    <Text size="sm">{getFullDate(data.createDate)}</Text>
      </Box>
      <Box px={9} py={4}>
        <Text size="lg">Paid BY</Text>
        <Flex justify="space-between">
          <Text size="xs">{data.paidBy}</Text>
          <Text size="xs">{data.amount}</Text>
        </Flex>
      </Box>
      <Box px={9}>
        <Text size="lg">Paid To</Text>
        {data?.paidTo?.map((data,idx)=>(
          <Flex justify="space-between" py={5} key={idx}>
          <Text size="xs">{data.name}</Text>
          <Text size="xs">{data.amount}</Text>
        </Flex>
        ))}
      </Box>
    </Modal>
  )
}

export default ExpenseDetail