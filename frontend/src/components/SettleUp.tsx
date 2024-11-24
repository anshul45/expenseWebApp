import { Button, Flex, Modal } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { deleteExpense } from "../api/apiRequest"

const SettleUp = ({userId,openSettleUp,transactionIds, setOpenSettleUp}:any) => {
    const navigate = useNavigate()
    const handleClick = async() => {
      await Promise.all(transactionIds.map((id) => deleteExpense(id)));
      setOpenSettleUp(false)
        navigate("/expense/"+userId)
    }


  return (
    <Modal opened={openSettleUp} onClose={() =>{setOpenSettleUp(false)} }  title="Do you want to delete this expense">
     <Flex justify="space-between">
      <Button onClick={handleClick}>Yes</Button>
      <Button onClick={() => setOpenSettleUp(false)}>No</Button>
     </Flex>
    </Modal>
  )
}

export default SettleUp