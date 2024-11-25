import {
  ActionIcon,
  Box,
  Flex,
  TextInput,
  Title,
  Select,
  NumberInput,
  Center,
  Text,
  Button,
} from "@mantine/core";
import {
  IconArrowLeftDashed,
  IconFileDescription,
  IconCurrencyRupee,
  IconEqual,
  IconEqualNot,
} from "@tabler/icons-react";
import SplitExpenseEqually from "../components/SplitExpenseEqually";
import SplitExpenseUnequally from "../components/SplitExpenseUnequally";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleTransaction, getUserExpense, addExpense, editExpense } from "../api/apiRequest";

interface User {
  name: string;
  amount: number;
}

const NewExpense = () => {
  const navigate = useNavigate();
  const { transactionId, userId } = useParams();

  const [openEqually, setOpenEqually] = useState<boolean>(false);
  const [openUnequally, setOpenUnequally] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false); // To track save state
  const [expense, setExpense] = useState<any>(null);
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();
  const [paidBy, setPaidBy] = useState<string>("you");
  const [paidTo, setPaidTo] = useState<string[]>([]);
  const [paidToUser, setPaidToUser] = useState<User[]>([]);

  // Fetch user expense by ID
  const fetchUserExpense = async (userId: string) => {
    try {
      const data = await getUserExpense(userId);
      if (data) {
        setExpense(data);
        setPaidTo(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching user expense:", error);
    }
  };

 

  // Fetch transaction details by ID
  const fetchTransaction = async (transactionId: string) => {
    try {
      const data = await getSingleTransaction(transactionId);
      if (data) {
        setExpense(data);
        setDesc(data.transaction.desc || "");
        setAmount(data.transaction.amount || undefined);
        setPaidTo(data.users || []);
        setPaidBy(data.transaction.paidBy || "you");
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  // Save expense details
  const saveExpense = async () => {
    if (!desc || !amount || !paidBy ||!paidToUser) {
      alert("Please fill in all fields before saving.");
      return;
    }
    setLoading(true);
    try {
      if(userId){
        await addExpense(expense._id, desc, amount, paidBy,paidToUser);
      }
      else if(transactionId)
      {
        await editExpense(transactionId,desc,amount,paidBy,paidToUser)
      }
      navigate(`/expense/${expense._id}`);
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (transactionId) {
      fetchTransaction(transactionId);
    } else if (userId) {
      fetchUserExpense(userId);
    }
  }, [transactionId, userId]);


  return (
    <Box px={40} py={15} w="100%">
      <Flex gap={10} mb={30} align="center">
        <ActionIcon
          onClick={() =>
            navigate(`/expense/${expense?._id}`)
          }
        >
          <IconArrowLeftDashed />
        </ActionIcon>
        <Title size={20}>{transactionId ? "Edit Expense" : "New Expense"}</Title>
      </Flex>

      <Center>
        <Text>{`With you & ${expense?.name}`}</Text>
      </Center>

      <Flex mt={8} gap={10} justify="center" align="center" direction="column">
        {/* Description Input */}
        <Flex align="center">
          <IconFileDescription />
          <TextInput
            w={300}
            placeholder="Expense description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Flex>

        {/* Amount Input */}
        <Flex align="center">
          <IconCurrencyRupee />
          <NumberInput
            w={300}
            placeholder="Amount"
            value={amount}
            onChange={(value) => setAmount(value !== '' ? Number(value) : undefined)}
            hideControls
          />
        </Flex>

        {/* Paid By Selector */}
        <Center>
          <Text pr={10}>Paid by</Text>
          <Select
            w={170}
            value={paidBy}
            data={paidTo}
            onChange={(value: string | null) => setPaidBy(value || "")}
            placeholder="Select payer"
          />
        </Center>

        {/* Split Options */}
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

        {/* Split Components */}
        <Box h={205} style={{overflowY:"scroll", scrollbarWidth:"none"}}>
        {openEqually && <SplitExpenseEqually
    amount={amount ?? 0}
    users={paidTo}
    setPaidToUser={(updatedUsers) => setPaidToUser(updatedUsers)} 
  />}
        {openUnequally && (
          <SplitExpenseUnequally
            amount={amount ?? 0}
            users={paidTo}
            setPaidToUser={(updatedUsers) => setPaidToUser(updatedUsers)} 
          />
        )}
</Box>

        {/* Save Button */}
        <Button
          variant="default"
          w={450}
          onClick={saveExpense}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Flex>
    </Box>
  );
};

export default NewExpense;
