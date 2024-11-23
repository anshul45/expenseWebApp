import { Box, Divider, Flex, Title } from "@mantine/core";
import Expenses from "./Expenses";
import { getallExpense } from "../api/apiRequest";
import { useEffect, useState } from "react";

const Home = () => {
  const [individualData, setIndividualData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both data 
        const [individual, group] = await Promise.all([
          getallExpense("individual"),
          getallExpense("group"),
        ]);
        setIndividualData(individual);
        setGroupData(group);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box w="100%" p={20}>
      <Title pb={18}>Outstanding Expenses</Title>
      <Flex justify="space-between" bg="yellow" w="100%" h="calc(100vh - 102px)">
        <Expenses title="Individual" expenseData={individualData} />
        <Divider orientation="vertical" />
        <Expenses title="Group" expenseData={groupData} />
      </Flex>
    </Box>
  );
};

export default Home;
