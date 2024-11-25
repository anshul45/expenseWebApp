import { ActionIcon, Flex, Text } from "@mantine/core"
import { IconHome,IconAward, IconUser} from "@tabler/icons-react"
import { Link } from "react-router-dom"
const Nav = () => {
  
  const navigations = [{logo:<IconHome/>,title:"Home",path:"/"},{logo:<IconAward/>,title:"Rewards",path:"/reward"},{logo:<IconUser/>,title:"Profile",path:"/profile"}]
  return (
    <Flex direction="column" mt={50} gap={20}>
        {navigations.map((data,idx)=>(
          <Link to={data.path} style={{textDecoration:"none", color:"inherit"}} key={idx}>
          <Flex align="center" gap={5} mx={10} >
            <ActionIcon style={{border:"none"}}>
              {data.logo}
            </ActionIcon>
            <Text mt={7}>{data.title}</Text>
          </Flex>
          </Link>
        ))}
    </Flex>
  )
}

export default Nav