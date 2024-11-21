import { ActionIcon, Box, Center, Flex, Input, Modal, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addExpenseUser } from "../api/apiRequest"

const SelectFriends = ({mode,open,setOpen}:any) => {

  const[inputFriend, setInputFriends] = useState("");
  const[selectedFriends, setSelectedFriends] = useState<string[]>([]);
   
  const addUser = async () => {
    const res = await addExpenseUser("individual",selectedFriends[0]);
  
    }
  const navigate = useNavigate()
 
  const friends=["user1","user2","hello","temp","tempUser"]

const filteredFriends = friends.filter(friend => friend.includes(inputFriend));

const handleSelect = (friend:string) =>{
  if (mode === "Individual") {
    setSelectedFriends([friend]); 
} else {
    setSelectedFriends(prev =>
        prev.includes(friend)
            ? prev.filter(f => f !== friend) 
            : [...prev, friend] 
    );
}
setInputFriends("");
}

const handleSubmit = async() => {
 
  addUser();
  // navigate("/new-expense",{state:{
  //   selectedFriends
  // }})
}

  return (
    <Modal opened={open} onClose={() => {setOpen(false)}} title="New Expense">
        <Flex direction="column" justify="space-between" gap={10}>
<Box>

        <Input value={inputFriend} onChange={e => setInputFriends(e.target.value)}/>
  
        <Flex align="center" gap={5}>

        <Text my={10}>With you & </Text>
        {selectedFriends.length > 0 && (
                            <Text>{selectedFriends.join(", ")}</Text>
                        )}
        </Flex>
        {filteredFriends?.map((data,idx) =>
        <Text key={idx} style={{cursor:"pointer"}} onClick={() => handleSelect(data)}>{data}</Text>
        )}
      
</Box>
<Center>
    <ActionIcon onClick={handleSubmit} disabled={!selectedFriends.length}>
        <IconCheck/>
    </ActionIcon>
</Center>
        </Flex>
    </Modal>
  )
}

export default SelectFriends