import { Box, Divider, Flex, Title } from "@mantine/core";
import Expenses from "./Expenses";
import { getallExpense } from "../api/apiRequest";
import { useCallback, useEffect, useState } from "react";
import { Expense } from "../utils/types";

const Home = () => {
  const [individualData, setIndividualData] = useState<Expense[]>([]);
  const [groupData, setGroupData] = useState<Expense[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [individual, group] = await Promise.all([
        getallExpense("individual"),
        getallExpense("group"),
      ]);
      setIndividualData(individual);
      setGroupData(group);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(() => {

    fetchData();
  }, []);


  return (
    <Box w="100%" p={20}>
      <Title pb={18}>Outstanding Expenses</Title>
      <Flex justify="space-between" w="100%" h="calc(100vh - 102px)">
        <Expenses title="Individual" expenseData={individualData} refreshData={fetchData} />
        <Divider orientation="vertical" />
        <Expenses title="Group" expenseData={groupData} refreshData={fetchData} />
      </Flex>
    </Box>
  );
};

export default Home;
