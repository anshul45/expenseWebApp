import { Flex } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
  <Flex>
      <Sidebar/>
      <Outlet/>
  </Flex>
  )
}

export default App