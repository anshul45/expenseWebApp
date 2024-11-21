import { ActionIcon, Flex, Text } from "@mantine/core"
import { IconHome,IconAward, IconUser} from "@tabler/icons-react"
import { Link } from "react-router-dom"
const Nav = () => {
  const navigations = [{logo:<IconHome/>,title:"Home",path:"/"},{logo:<IconAward/>,title:"Rewards",path:"/reward"},{logo:<IconUser/>,title:"Profile",path:"/profile"}]
  return (
    <Flex direction="column" gap={10}>
        {navigations.map((data,idx)=>(
          <Link to={data.path} style={{textDecoration:"none", color:"inherit"}} key={idx}>
          <Flex bg="green" align="center" mx={10} >
            <ActionIcon bg="inherit">
              {data.logo}
            </ActionIcon>
            <Text>{data.title}</Text>
          </Flex>
          </Link>
        ))}
    </Flex>
  )
}

export default Nav