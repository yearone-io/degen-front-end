// src/app/roulette/page.tsx
"use client";

import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import Navbar from "@/components/Navbar";
import SpinCarousel from "../SpinComponent";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function RoulettePage() {
  const { data: tokens, error, isLoading } = useSWR(FEED_ENDPOINT, fetcher, {
    refreshInterval: 10000,
    fallbackData: [],
  });

  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="white" mb={2}>
              Token Roulette
            </Heading>
            <Text color="whiteAlpha.800">
              Feeling lucky? Spin the wheel and discover your next gem!
            </Text>
          </Box>
          
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Spinner color="degen.accent" size="xl" />
              <Text color="white" ml={4}>Loading tokens...</Text>
            </Box>
          ) : error ? (
            <Box p={8} bg="red.500" color="white" borderRadius="md" textAlign="center">
              <Text fontSize="lg">Error loading token data</Text>
            </Box>
          ) : (
            <SpinCarousel tokens={tokens} />
          )}
          
          <Box bg="degen.secondary" p={6} borderRadius="lg" mt={8}>
            <Heading as="h3" size="md" color="white" mb={4}>
              How It Works
            </Heading>
            <Text color="whiteAlpha.800">
              The Token Roulette randomly selects a token from our curated list. Will you discover the next 100x gem? Try your luck by clicking the Spin button!
            </Text>
            <Text color="whiteAlpha.600" mt={2} fontSize="sm">
              Note: This is for entertainment purposes only. Always do your own research before investing.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}