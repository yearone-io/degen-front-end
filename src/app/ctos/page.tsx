"use client";

import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Spinner,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function CTOsPage() {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  
  // Handle iframe load complete
  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

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
          position="relative"
        >
          {isIframeLoading && (
            <Flex 
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              justifyContent="center"
              alignItems="center"
              bg="degen.secondary"
              zIndex={1}
              flexDirection="column"
              gap={4}
            >
              <Spinner 
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="degen.accent"
                size="xl"
              />
              <Text color="white">Loading ChadTakeovers.com...</Text>
            </Flex>
          )}
          
          <iframe 
            src="https://chadtakeovers.com/" 
            width="100%" 
            height="100%" 
            style={{ border: "none" }}
            title="Chad Takeovers"
            onLoad={handleIframeLoad}
          />
        </Box>
      </Container>
    </Box>
  );
}