import { ActionIcon, Box, Flex, TextInput, Title, Select, NumberInput, Center, Text, Button } from "@mantine/core";
import { IconArrowLeftDashed, IconFileDescription, IconCurrencyRupee, IconEqual, IconEqualNot } from "@tabler/icons-react";
import SplitExpenseEqually from "../components/SplitExpenseEqually";
import SplitExpenseUnequally from "../components/SplitExpenseUnequally";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleTransaction,  } from "../api/apiRequest";

const NewExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openEqually, setOpenEqually] = useState<boolean>(false);
  const [openUnequally, setOpenUnequally] = useState<boolean>(false);
  const [expense, setExpense] = useState<any>(null); 
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();
  const [paidBy, setPaidBy] = useState<string[]>(["you"]);
  const { selectedFriends } = location.state || {};
  const { id } = useParams();

  const fetchExpense = async (id: string) => {
    const data = await getSingleTransaction(id);
    if (data) {
      setExpense(data);
      setDesc(data.transaction.desc || "");
      setAmount(data.transaction.amount || undefined);
      setPaidBy([data.transaction.paidBy]);
    }
  };

  

  useEffect(() => {
    if (selectedFriends) {
      setPaidBy((prev) =>
        Array.from(new Set([...prev, ...selectedFriends.map((friend: string) => String(friend))]))
      );
    }

    if (id) {
      // Edit mode: Fetch the existing expense
      fetchExpense(id);
    } else {
      // Create mode: Reset fields
      setExpense(null);
      setDesc("");
      setAmount(undefined);
      setPaidBy(["you"]);
    }
  }, [selectedFriends, id]);

  const handleSave = async () => {
    // if (id) {updateExpense
    //   // Update existing expense
    //   await updateExpense(id, { desc, amount, paidBy });
    // } else {
    //   // Create new expense
    //   await createExpense({ desc, amount, paidBy });
    // }
    navigate("/"); // Navigate back to home or expenses list
  };

  return (
    <Box bg="yellow" px={40} py={15} w="100%">
      <Flex gap={10} mb={40} align="center">
        <ActionIcon bg="yellow" onClick={() => navigate(id ? `/expense/${expense._id}` : "/")}>
          <IconArrowLeftDashed />
        </ActionIcon>
        <Title size={20}>{id ? "Edit Expense" : "New Expense"}</Title>
      </Flex>
      <Center>
        <Text>{id ? `With you & ${expense?.name}` : "With you & selected friends"}</Text>
      </Center>
      <Flex mt={8} gap={10} justify="center" align="center" direction="column">
        <Flex align="center">
          <IconFileDescription />
          <TextInput
            w={300}
            placeholder="Expense description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
         
        </Flex>
        <Flex align="center">
          <IconCurrencyRupee />
          <NumberInput
            w={300}
            placeholder="Amount"
            value={amount}
            onChange={setAmount}
            hideControls
          />
        </Flex>
        <Center>
          <Text pr={10}>Paid by</Text>
          <Select w={170} data={paidBy} defaultValue="you" />
        </Center>
        <Center>
          <Title size={25}>How to Split</Title>
        </Center>
        <Flex gap={45}>
          <Flex
            direction="column"
            align="center"
            onClick={() => {
              setOpenUnequally(false);
              setOpenEqually(true);
            }}
          >
            <ActionIcon>
              <IconEqual />
            </ActionIcon>
            <Text>Equally</Text>
          </Flex>
          <Flex
            direction="column"
            align="center"
            onClick={() => {
              setOpenEqually(false);
              setOpenUnequally(true);
            }}
          >
            <ActionIcon>
              <IconEqualNot />
            </ActionIcon>
            <Text>Unequally</Text>
          </Flex>
        </Flex>
        {openEqually && <SplitExpenseEqually amount={amount} user={paidBy} />}
        {openUnequally && <SplitExpenseUnequally amount={amount} user={paidBy} />}
        <Button variant="default" w={450} onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default NewExpense;
