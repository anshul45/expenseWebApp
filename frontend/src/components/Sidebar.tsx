import { Box, Flex } from "@mantine/core"
import Logo from "./Logo"
import Nav from "./Nav"
import SpiceLogo from "../assets/spice.webp"
const Sidebar = () => {

  return (
    <Flex justify="space-between" align="center" direction="column" w={200} h='100vh' py={10}>
        <Box>
       <Logo img="https://avatar.iran.liara.run/public?username=anshul" text="Anshul"/>
       <Nav/>
        </Box>
       <Logo img={SpiceLogo} text="Spice"/>
    </Flex>
  )
}

export default Sidebar