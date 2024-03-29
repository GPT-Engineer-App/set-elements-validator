import React, { useState } from "react";
import { Box, Button, Input, VStack, HStack, Text, Divider, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const SetDisplay = ({ title, elements }) => (
  <VStack border="1px" borderColor="gray.200" p={4} borderRadius="md">
    <Text fontSize="lg" fontWeight="bold">
      {title}
    </Text>
    <Wrap>
      {elements.map((el, index) => (
        <WrapItem key={index} p={1} borderRadius="md" bg="gray.100">
          {el}
        </WrapItem>
      ))}
    </Wrap>
  </VStack>
);

const Index = () => {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [setC, setSetC] = useState([]);
  const toast = useToast();

  const handleSetChange = (e, setFunc) => {
    const newSet = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setFunc(newSet);
  };

  const calculateSets = () => {
    // Calculate A\(B ∪ C)
    const unionBC = new Set([...setB, ...setC]);
    const differenceAUnionBC = setA.filter((item) => !unionBC.has(item));

    // Calculate (A\B) ∩ (A\C)
    const differenceAB = new Set(setA.filter((item) => !setB.includes(item)));
    const differenceAC = new Set(setA.filter((item) => !setC.includes(item)));
    const intersectionABAC = [...differenceAB].filter((item) => differenceAC.has(item));

    // Check if both results are the same
    const isValid = JSON.stringify(differenceAUnionBC) === JSON.stringify(intersectionABAC);

    toast({
      title: isValid ? "Valid" : "Invalid",
      description: isValid ? "The sets satisfy the statement A\\(B ∪ C) = (A\\B) ∩ (A\\C)." : "The sets do not satisfy the statement A\\(B ∪ C) = (A\\B) ∩ (A\\C).",
      status: isValid ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4}>
      <HStack>
        <VStack>
          <Text>Set A</Text>
          <Input placeholder="Enter elements separated by comma" onChange={(e) => handleSetChange(e, setSetA)} />
        </VStack>
        <VStack>
          <Text>Set B</Text>
          <Input placeholder="Enter elements separated by comma" onChange={(e) => handleSetChange(e, setSetB)} />
        </VStack>
        <VStack>
          <Text>Set C</Text>
          <Input placeholder="Enter elements separated by comma" onChange={(e) => handleSetChange(e, setSetC)} />
        </VStack>
      </HStack>

      <Button colorScheme="blue" leftIcon={<FaCheck />} onClick={calculateSets}>
        Validate Statement
      </Button>

      <Box w="100%">
        <Divider my={4} />
        <HStack justifyContent="space-evenly" w="100%">
          <SetDisplay title="A\(B ∪ C)" elements={setA.filter((item) => !new Set([...setB, ...setC]).has(item))} />
          <SetDisplay title="(A\B) ∩ (A\C)" elements={[...new Set(setA.filter((item) => !setB.includes(item)))].filter((item) => new Set(setA.filter((item) => !setC.includes(item))).has(item))} />
        </HStack>
      </Box>
    </VStack>
  );
};

export default Index;
