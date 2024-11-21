import { Box, Button, Center, Flex, Modal, Text } from "@mantine/core"
import User from "./User"
import { useNavigate } from "react-router-dom"

const SettleUp = ({openSettleUp, setOpenSettleUp}:any) => {
    const navigate = useNavigate()
    const handleClick = () => {
        setOpenSettleUp(false)
        navigate("/expense/1")
    }
  return (
    <Modal opened={openSettleUp} onClose={() =>{setOpenSettleUp(false)} } title="Settle Payment">
        <Flex justify="space-between">
            <Text>You receive</Text>
            <Text>amount</Text>
        </Flex>
        <Box mx={15}>
    <User/>
        </Box>
<Center mt={20}>
        <Button onClick={handleClick}>Settle</Button>
</Center>
    </Modal>
  )
}

export default SettleUp