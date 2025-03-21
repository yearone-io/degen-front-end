"use client";

import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  Spinner,
  Flex,
  Container,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  ListIcon,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import { useState } from "react";
import SpinCarousel from "./SpinComponent";
import { CheckCircleIcon } from "@chakra-ui/icons";

// Import Navbar (would actually need to create this file)
import Navbar from "../components/Navbar";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Adjust the endpoint/chainId as needed
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function HomePage() {
  // Use SWR with fallbackData so that data is never undefined.
  const { data: tokens, error } = useSWR(FEED_ENDPOINT, fetcher, {
    refreshInterval: 10000,
    revalidateOnMount: false, // Avoid immediate revalidation that might cause mismatch
    fallbackData: [],         // Always start with an empty array
  });

  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      
      <Container maxW="container.xl" py={10}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
          <GridItem>
            <VStack align="start" spacing={6}>
              <Heading as="h1" size="2xl" color="white">
                Degen Dispatch: Real-Time Crypto Whale Tracker Bot
              </Heading>
              
              <Text fontSize="lg" color="whiteAlpha.800">
                Subscribe to whale wallets and track their transactions in real-time with 
                Degen Dispatch. Our Telegram bot provides instant alerts, spam filtration, 
                and advanced token details.
              </Text>
              
              <List spacing={3} width="100%">
                <ListItem display="flex" alignItems="center">
                  <CheckCircleIcon color="yellow.400" mr={2} />
                  <Text fontWeight="bold" mr={2}>
                    Realtime Alerts
                  </Text>
                  <Text color="whiteAlpha.800">- Track whale moves in real-time</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems="center">
                  <CheckCircleIcon color="yellow.400" mr={2} />
                  <Text fontWeight="bold" mr={2}>
                    Spam Filtration
                  </Text>
                  <Text color="whiteAlpha.800">- Proprietary smart tracking avoids spam transactions</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems="center">
                  <CheckCircleIcon color="yellow.400" mr={2} />
                  <Text fontWeight="bold" mr={2}>
                    Advanced Token Details
                  </Text>
                  <Text color="whiteAlpha.800">- Get contract analysis and social links</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems="center">
                  <CheckCircleIcon color="yellow.400" mr={2} />
                  <Text fontWeight="bold" mr={2}>
                    Default Whale Alpha
                  </Text>
                  <Text color="whiteAlpha.800">- Get started with a curated alpha list</Text>
                </ListItem>
              </List>
              
              <Button variant="alpha" size="lg">
                GET ALPHA
              </Button>
              
              <HStack spacing={4}>
                <Text>Find us on</Text>
                <Box as="span">X</Box>
                <Box as="span">Telegram</Box>
              </HStack>
            </VStack>
          </GridItem>
          
          <GridItem>
            {/* Placeholder for the illustration/image from the screenshot */}
            <Box 
              width="100%" 
              height="100%" 
              display="flex" 
              justifyContent="center"
              alignItems="center"
            >
              {/* You would need to add the actual image here */}
              <Text color="whiteAlpha.700">Degen Dispatch Logo/Illustration</Text>
            </Box>
          </GridItem>
        </Grid>
        
        {/* You can add the tabs section here if needed */}
        <Box mt={10}>
          <Tabs variant="soft-rounded" colorScheme="orange">
            <TabList>
              <Tab>Current</Tab>
              <Tab as={NextLink} href="/performance">
                Performance Tokens
              </Tab>
              <Tab as={NextLink} href="/whales">
                Whales
              </Tab>
              <Tab>Token Roulette</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  {tokens.map((token: any) => (
                    <Box
                      key={token.address}
                      p={4}
                      bg="degen.secondary"
                      borderRadius="md"
                      boxShadow="md"
                    >
                      <ChakraLink
                        href={`/token/${token.chainId}/${token.address}`}
                        target="_blank"
                        _hover={{ textDecoration: "underline" }}
                      >
                        <Heading size="md" color="white">
                          {token.name} ({token.symbol})
                        </Heading>
                        <Text color="whiteAlpha.800">Address: {token.address}</Text>
                        <Text color="whiteAlpha.800">Pair Address: {token.pairAddress}</Text>
                        <Text color="whiteAlpha.800">
                          Social Links: {JSON.stringify(token.socialLinks)}
                        </Text>
                      </ChakraLink>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <Text color="white">Coming soon!</Text>
              </TabPanel>
              <TabPanel>
                <Text color="white">Coming soon!</Text>
              </TabPanel>
              <TabPanel>
                <SpinCarousel tokens={tokens} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}