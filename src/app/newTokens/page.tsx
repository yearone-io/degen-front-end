// src/app/new-tokens/page.tsx
"use client";

import {
  Box,
  Heading,
  VStack,
  Link as ChakraLink,
  Spinner,
  Text,
  Container,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import Navbar from "@/components/Navbar";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function NewTokensPage() {
  const { data: tokens, error, isLoading } = useSWR(FEED_ENDPOINT, fetcher, {
    refreshInterval: 10000,
    fallbackData: [],
  });

  if (isLoading) {
    return (
      <Box bg="degen.primary" minH="100vh">
        <Navbar />
        <Container maxW="container.xl" py={10}>
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Spinner color="degen.accent" size="xl" />
            <Text color="white" ml={4}>Loading token data...</Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="degen.primary" minH="100vh">
        <Navbar />
        <Container maxW="container.xl" py={10}>
          <Box p={8} bg="red.500" color="white" borderRadius="md">
            <Text fontSize="lg">Error loading token data</Text>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={10}>
        <Heading as="h1" size="xl" color="white" mb={6}>
          New Tokens
        </Heading>
        
        <VStack spacing={4} align="stretch">
          {tokens.map((token: any) => (
            <Box
              key={token.address}
              p={4}
              bg="degen.secondary"
              borderRadius="md"
              boxShadow="md"
              _hover={{ transform: "translateY(-2px)", transition: "transform 0.2s" }}
            >
              <ChakraLink
                as={NextLink}
                href={`/token/${token.chainId}/${token.address}`}
                _hover={{ textDecoration: "none" }}
              >
                <Heading size="md" color="white">
                  {token.name} ({token.symbol})
                </Heading>
                <Text color="whiteAlpha.800">Address: {token.address}</Text>
                <Text color="whiteAlpha.800">Pair Address: {token.pairAddress}</Text>
                {token.socialLinks && (
                  <Text color="whiteAlpha.800">
                    Social Links: {JSON.stringify(token.socialLinks)}
                  </Text>
                )}
              </ChakraLink>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}