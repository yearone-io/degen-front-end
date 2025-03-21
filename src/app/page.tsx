// src/app/page.tsx
"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  Container,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Link as ChakraLink,
  Flex,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function HomePage() {
  const { data: tokens, error, isLoading } = useSWR(FEED_ENDPOINT, fetcher, {
    refreshInterval: 10000,
    fallbackData: [],
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
            {/* Placeholder for illustration/image */}
            <Box 
              width="100%" 
              height="100%" 
              display="flex" 
              justifyContent="center"
              alignItems="center"
            >
              <Text color="whiteAlpha.700">Degen Dispatch Logo/Illustration</Text>
            </Box>
          </GridItem>
        </Grid>
        
        {/* Recent Tokens Preview */}
        <Box mt={12}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h2" size="lg" color="white">
              Recent Tokens
            </Heading>
            <Button 
              as={NextLink} 
              href="/new-tokens" 
              variant="outline" 
              colorScheme="orange" 
              size="sm"
            >
              View All
            </Button>
          </Flex>
          
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" height="200px">
              <Spinner color="degen.accent" />
              <Text color="white" ml={4}>Loading tokens...</Text>
            </Flex>
          ) : error ? (
            <Box p={4} bg="red.500" color="white" borderRadius="md">
              <Text>Error loading token data</Text>
            </Box>
          ) : (
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
              gap={4}
            >
              {tokens.slice(0, 3).map((token: any) => (
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
                    <Text color="whiteAlpha.800" noOfLines={1}>Address: {token.address}</Text>
                  </ChakraLink>
                </Box>
              ))}
            </Grid>
          )}
        </Box>
        
        {/* Feature Highlights */}
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}
          mt={12}
        >
          {[
            { 
              icon: "🎲", 
              title: "Token Roulette", 
              description: "Feeling lucky? Try our token roulette!",
              link: "/roulette"
            },
            {
              icon: "🐳",
              title: "Whale Tracking",
              description: "Follow the big players in the crypto world.",
              link: "/whales"
            },
            {
              icon: "🤖",
              title: "Trading Bots",
              description: "Automate your trading strategies.",
              link: "/bots"
            },
            {
              icon: "💰",
              title: "Exclusive Deals",
              description: "Get early access to promising projects.",
              link: "/deals"
            }
          ].map((feature, index) => (
            <Box 
              key={index}
              bg="degen.secondary"
              p={5}
              borderRadius="lg"
              textAlign="center"
              _hover={{ transform: "translateY(-2px)", transition: "transform 0.2s" }}
            >
              <Text fontSize="3xl" mb={2}>{feature.icon}</Text>
              <Heading as="h3" size="md" color="white" mb={2}>
                {feature.title}
              </Heading>
              <Text color="whiteAlpha.800" mb={4}>
                {feature.description}
              </Text>
              <Button 
                as={NextLink}
                href={feature.link}
                variant="outline" 
                colorScheme="orange" 
                size="sm"
              >
                Explore
              </Button>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}