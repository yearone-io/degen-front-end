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
  useBreakpointValue,
  Icon,
  Image,
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
      
      <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        {/* Hero Section */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 8 }}>
          <GridItem>
            <VStack align="start" spacing={{ base: 4, md: 6 }} px={{ base: 2, md: 0 }}>
              <Heading 
                as="h1" 
                size={{ base: "xl", md: "2xl" }} 
                color="white"
                lineHeight="1.2"
              >
                Degen Dispatch: Your Edge in AI Crypto Discovery
              </Heading>
              
              <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800">
                Find high-potential tokens before anyone else with Degen Dispatch. Our platform offers curated new token discoveries, performance analysis, whale tracking, and automated alerts.
              </Text>
              
              <List spacing={3} width="100%">
                <ListItem display="flex" alignItems={{ base: "flex-start", md: "center" }} flexDirection={{ base: "column", sm: "row" }}>
                  <Flex minWidth={{ base: "100%", sm: "auto" }} mb={{ base: 1, sm: 0 }} alignItems="center">
                    <CheckCircleIcon color="yellow.400" mr={2} />
                    <Text fontWeight="bold" mr={2}>
                      Token Discovery
                    </Text>
                  </Flex>
                  <Text color="whiteAlpha.800">- Find filtered brand new tokens with potential</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems={{ base: "flex-start", md: "center" }} flexDirection={{ base: "column", sm: "row" }}>
                  <Flex minWidth={{ base: "100%", sm: "auto" }} mb={{ base: 1, sm: 0 }} alignItems="center">
                    <CheckCircleIcon color="yellow.400" mr={2} />
                    <Text fontWeight="bold" mr={2}>
                      Performance Analysis
                    </Text>
                  </Flex>
                  <Text color="whiteAlpha.800">- Curated tokens that pass our strict criteria</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems={{ base: "flex-start", md: "center" }} flexDirection={{ base: "column", sm: "row" }}>
                  <Flex minWidth={{ base: "100%", sm: "auto" }} mb={{ base: 1, sm: 0 }} alignItems="center">
                    <CheckCircleIcon color="yellow.400" mr={2} />
                    <Text fontWeight="bold" mr={2}>
                      Whale Tracking
                    </Text>
                  </Flex>
                  <Text color="whiteAlpha.800">- Follow what successful traders are buying and selling</Text>
                </ListItem>
                
                <ListItem display="flex" alignItems={{ base: "flex-start", md: "center" }} flexDirection={{ base: "column", sm: "row" }}>
                  <Flex minWidth={{ base: "100%", sm: "auto" }} mb={{ base: 1, sm: 0 }} alignItems="center">
                    <CheckCircleIcon color="yellow.400" mr={2} />
                    <Text fontWeight="bold" mr={2}>
                      Automated Alerts
                    </Text>
                  </Flex>
                  <Text color="whiteAlpha.800">- Get notified via Telegram for new tokens and whale moves</Text>
                </ListItem>
              </List>
              
              {/* <Button 
                variant="alpha" 
                size={{ base: "md", md: "lg" }}
                width={{ base: "100%", sm: "auto" }}
              >
                GET ALPHA
              </Button> */}
              
              <HStack spacing={4} flexWrap="wrap">
                <Text>Find us on</Text>
                <Flex 
                  alignItems="center" 
                  bg="whiteAlpha.800" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  _hover={{ bg: "whiteAlpha.900" }}
                  cursor="pointer"
                >
                <a href="https://x.com/YearOneIO" target="_blank" aria-label="Open link to Twitter" rel="noopener noreferrer">
                  <Image src="./logo-black.png" alt="X" width='30px' _hover={{transform:  'scale(1.1)'}} />
                </a>
                </Flex>
                <Flex 
                  alignItems="center" 
                  bg="whiteAlpha.800" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  _hover={{ bg: "whiteAlpha.900" }}
                  cursor="pointer"
                >
                                 <a href="https://yearone.io" target="_blank" aria-label="Open link" rel="noopener noreferrer">
                  <Image src="./logo.jpg" alt="X" width='35px' _hover={{transform:  'scale(1.1)'}} borderRadius={'50px'} />
                </a>
                </Flex>
              </HStack>
            </VStack>
          </GridItem>
          
          <GridItem display={{ base: "none", md: "block" }}>
            <Image 
              src="/hero-image.png" 
              alt="Degen Dispatch"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </GridItem>

        </Grid>
        
        {/* Recent Tokens Preview */}
        <Box mt={{ base: 8, md: 12 }} px={{ base: 2, md: 0 }}>
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
          >
            <Heading as="h2" size={{ base: "md", md: "lg" }} color="white">
              Recent Tokens
            </Heading>
            <Button 
              as={NextLink} 
              href="/new-tokens" 
              variant="outline" 
              colorScheme="orange" 
              size="sm"
              width={{ base: "100%", sm: "auto" }}
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
              templateColumns={{ 
                base: "1fr", 
                sm: "repeat(2, 1fr)", 
                lg: "repeat(3, 1fr)" 
              }} 
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
                    <Heading size="md" color="white" noOfLines={1}>
                      {token.name} ({token.symbol})
                    </Heading>
                    <Text 
                      color="whiteAlpha.800" 
                      noOfLines={1}
                      fontSize="sm"
                      mt={1}
                    >
                      Address: {token.address.substring(0, 6)}...{token.address.substring(token.address.length - 4)}
                    </Text>
                  </ChakraLink>
                </Box>
              ))}
            </Grid>
          )}
        </Box>
        
        {/* Feature Highlights */}
        <Grid 
          templateColumns={{ 
            base: "1fr", 
            sm: "repeat(2, 1fr)", 
            lg: "repeat(4, 1fr)" 
          }}
          gap={{ base: 4, md: 6 }}
          mt={{ base: 8, md: 12 }}
          px={{ base: 2, md: 0 }}
        >
          {[
            { 
              icon: "🔍", 
              title: "New Token Discovery", 
              description: "Find filtered brand new tokens with high potential.",
              link: "/newTokens"
            },
            {
              icon: "⭐",
              title: "Performance Picks",
              description: "Tokens that passed our strict analysis criteria.",
              link: "/deals"
            },
            {
              icon: "🐳",
              title: "Whale Tracking",
              description: "Follow successful traders' moves in real-time.",
              link: "/whales"
            },
            {
              icon: "🎲",
              title: "Token Roulette",
              description: "Try your luck when analysis isn't enough.",
              link: "/roulette"
            }
          ].map((feature, index) => (
            <Box 
              key={index}
              bg="degen.secondary"
              p={{ base: 4, md: 5 }}
              borderRadius="lg"
              textAlign="center"
              _hover={{ transform: "translateY(-2px)", transition: "transform 0.2s" }}
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack spacing={2} mb={4}>
                <Text fontSize={{ base: "2xl", md: "3xl" }} mb={1}>{feature.icon}</Text>
                <Heading as="h3" size={{ base: "sm", md: "md" }} color="white">
                  {feature.title}
                </Heading>
                <Text color="whiteAlpha.800" fontSize={{ base: "sm", md: "md" }}>
                  {feature.description}
                </Text>
              </VStack>
              <Button 
                as={NextLink}
                href={feature.link}
                variant="outline" 
                colorScheme="orange" 
                size="sm"
                width="100%"
                mt="auto"
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