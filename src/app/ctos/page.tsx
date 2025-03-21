"use client";

import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

export default function CTOsPage() {
  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      
      <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        <VStack align="center" spacing={{ base: 4, md: 6 }} px={{ base: 2, md: 0 }} mb={8}>
          <Heading 
            as="h1" 
            size={{ base: "xl", md: "2xl" }} 
            color="white"
            textAlign="center"
          >
            CTOs
          </Heading>
          
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="whiteAlpha.800"
            textAlign="center"
            fontWeight="bold"
          >
            Build Communities Around Tokens You Love
          </Text>
        </VStack>
        
        <Box 
          width="100%" 
          height={{ base: "70vh", md: "80vh" }}
          borderRadius="md"
          overflow="hidden"
          boxShadow="lg"
        >
          <iframe 
            src="https://chadtakeovers.com/" 
            width="100%" 
            height="100%" 
            style={{ border: "none" }}
            title="Chad Takeovers"
          />
        </Box>
      </Container>
    </Box>
  );
}