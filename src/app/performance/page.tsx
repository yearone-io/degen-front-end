// app/(performance)/page.tsx
"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function PerformancePage() {
  return (
    <Box p={4}>
      <Heading>Performance Tokens</Heading>
      <Text mt={2}>Coming soon!</Text>
      <Text mt={2}>Vote if you want to see this feature in action.</Text>
      <Button mt={4} colorScheme="teal" isDisabled>
        Cast Your Vote
      </Button>
    </Box>
  );
}