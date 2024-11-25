import { Flex, Image, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { ownAmount } from "../utils/amount"
import { Expense } from "../utils/types"

interface UserProps {
  data: Expense;
}

const User:React.FC<UserProps> = ({data}) => {

  const navigate = useNavigate()
  const totalAmount = ownAmount(data?.transactions);
  return (
    <Flex justify="space-between" my={20} align="center" style={{cursor:"pointer"}} onClick={() => navigate("/expense/"+data._id)}>
        <Flex align="center" gap={10}>
            <Image w={35} h={35} style={{borderRadius:"100%"}} src={`https://avatar.iran.liara.run/public?username=${data?.name}`}/>
            <Text size="xl">{data?.name}</Text>
        </Flex>
        <Text c={totalAmount<0 ? "red":"green"}>{totalAmount<0 ? "-$ ":"$ "}{Math.abs(totalAmount)}</Text>
    </Flex>
  )
}

export default User