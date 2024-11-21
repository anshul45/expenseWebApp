import { Box, Flex } from "@mantine/core"
import Logo from "./Logo"
import Nav from "./Nav"
import SpiceLogo from "../assets/spice.jpg"
const Sidebar = () => {
  return (
    <Flex bg="blue" justify="space-between" direction="column" w={200} h='100vh' py={10}>
        <Box>
       <Logo img="https://imgs.search.brave.com/SnwaTVIQ4JIAS123Gih2LjD8zptZT286g7F0i1_-VPY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC91c2VyLWlj/b24tMjU2eDI1Ni0x/bjU0a3B0MS5wbmc" text="Anshul Garwal"/>
       <Nav/>
        </Box>
       <Logo img={SpiceLogo} text="Spice"/>
    </Flex>
  )
}

export default Sidebar