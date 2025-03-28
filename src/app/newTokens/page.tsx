// src/app/newTokens/page.tsx
"use client";

import {
  Box,
  Heading,
  VStack,
  Link as ChakraLink,
  Spinner,
  Text,
  Container,
  HStack,
  Flex,
  Badge,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import Navbar from "@/components/Navbar";
import { FaTwitter, FaTelegram, FaDiscord, FaGlobe, FaEthereum } from "react-icons/fa";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

// Utility function to truncate addresses
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

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
              p={5}
              bg="degen.secondary"
              borderRadius="lg"
              boxShadow="lg"
              _hover={{ 
                transform: "translateY(-2px)", 
                transition: "transform 0.2s",
                boxShadow: "xl",
                borderColor: "degen.accent",
                borderWidth: "1px"
              }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <ChakraLink
                as={NextLink}
                href={`/token/${token.chainId}/${token.address}`}
                _hover={{ textDecoration: "none" }}
                display="block"
              >
              <Flex justify="space-between" align="center" mb={3}>
                <Heading size="md" color="white" display="flex" alignItems="center">
                  <Icon as={FaEthereum} color="grey" mr={2} boxSize={5} />
                  {token.name}
                </Heading>
                <Badge colorScheme="orange" px={3} py={1} borderRadius="full" bg="degen.accent">
                  {token.symbol}
                </Badge>
              </Flex>
                
                <HStack spacing={4} mb={3}>
                  <Tooltip label={token.address} hasArrow placement="top">
                    <Text color="whiteAlpha.800" fontSize="sm">
                      Address: {truncateAddress(token.address)}
                    </Text>
                  </Tooltip>
                  
                  <Tooltip label={token.pairAddress} hasArrow placement="top">
                    <Text color="whiteAlpha.800" fontSize="sm">
                      Pair: {truncateAddress(token.pairAddress)}
                    </Text>
                  </Tooltip>
                </HStack>
                
                {token.socialLinks && (
                  <HStack spacing={3} mt={2}>
                    {/* X (Twitter) Links */}
                    {token.socialLinks.twitter && token.socialLinks.twitter.map((url: string, index: number) => (
                      <Tooltip key={`twitter-${index}`} label="X (Twitter)" hasArrow placement="top">
                        <Box 
                          as="span" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(url, '_blank');
                          }}
                          color="degen.lightBlue"
                          _hover={{ color: "degen.accent" }}
                          transition="color 0.2s"
                        >
                          <Icon as={FaTwitter} boxSize={5} />
                        </Box>
                      </Tooltip>
                    ))}

                    {/* Telegram Links */}
                    {token.socialLinks.telegram && token.socialLinks.telegram.map((url: string, index: number) => (
                      <Tooltip key={`telegram-${index}`} label="Telegram" hasArrow placement="top">
                        <Box 
                          as="span" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(url, '_blank');
                          }}
                          color="degen.lightBlue"
                          _hover={{ color: "degen.accent" }}
                          transition="color 0.2s"
                        >
                          <Icon as={FaTelegram} boxSize={5} />
                        </Box>
                      </Tooltip>
                    ))}

                    {/* Website Links */}
                    {token.socialLinks.website && token.socialLinks.website.map((url: string, index: number) => (
                      <Tooltip key={`website-${index}`} label="Website" hasArrow placement="top">
                        <Box 
                          as="span" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(url, '_blank');
                          }}
                          color="degen.lightBlue"
                          _hover={{ color: "degen.accent" }}
                          transition="color 0.2s"
                        >
                          <Icon as={FaGlobe} boxSize={5} />
                        </Box>
                      </Tooltip>
                    ))}

                    {/* Discord Links */}
                    {token.socialLinks.discord && token.socialLinks.discord.map((url: string, index: number) => (
                      <Tooltip key={`discord-${index}`} label="Discord" hasArrow placement="top">
                        <Box 
                          as="span" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(url, '_blank');
                          }}
                          color="degen.lightBlue"
                          _hover={{ color: "degen.accent" }}
                          transition="color 0.2s"
                        >
                          <Icon as={FaDiscord} boxSize={5} />
                        </Box>
                      </Tooltip>
                    ))}
                  </HStack>
                )}
              </ChakraLink>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}