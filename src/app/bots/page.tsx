// src/app/bots/page.tsx
"use client";

import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Container, 
  LinkBox, 
  LinkOverlay, 
  VStack, 
  HStack, 
  Icon,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaExternalLinkAlt, FaTelegram, FaBook } from 'react-icons/fa';
import Navbar from "@/components/Navbar";

export default function BotsPage() {
  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" color="white" textAlign="center" mb={6}>
            Trading Bots
          </Heading>
          
          <Text color="whiteAlpha.800" fontSize="lg" textAlign="center" mb={8}>
            Connect with our Telegram bots to enhance your trading experience
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Whales Tracker Bot Card */}
            <LinkBox 
              as="article" 
              p={6} 
              borderRadius="lg" 
              bg="degen.secondary"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
              _hover={{ 
                transform: "translateY(-5px)", 
                shadow: "lg",
                borderColor: "degen.accent" 
              }}
            >
              <VStack spacing={4} align="start">
                <HStack>
                  <Icon as={FaTelegram} color="degen.lightBlue" boxSize={8} />
                  <Heading as="h2" size="lg" color="white">
                    Whales Tracker Bot
                  </Heading>
                </HStack>
                
                <Text color="whiteAlpha.800">
                  Track market movers and whale transactions in real-time. Get instant notifications when big players make significant moves in the market.
                </Text>
                
                <Flex 
                  width="100%" 
                  justifyContent="flex-end" 
                  gap={3} 
                  mt={2}
                >
                  <Button
                    as="a"
                    href="https://docs.degendispatch.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaBook />}
                    bg="degen.secondary"
                    color="white"
                    borderWidth="1px"
                    borderColor="degen.accent"
                    _hover={{ 
                      bg: "degen.primary",
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    size="md"
                  >
                    Documentation
                  </Button>
                  
                  <Button
                    as="a"
                    href="https://t.me/DegenDispatchBot?start=source_website"
                    target="_blank"
                    rel="noopener noreferrer"
                    rightIcon={<FaExternalLinkAlt />}
                    bg="degen.accent"
                    color="white"
                    _hover={{ 
                      bg: "orange.600",
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    size="md"
                  >
                    Connect to Bot
                  </Button>
                </Flex>
              </VStack>
            </LinkBox>

            {/* Announcement Channel Card */}
            <LinkBox 
              as="article" 
              p={6} 
              borderRadius="lg" 
              bg="degen.secondary"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
              _hover={{ 
                transform: "translateY(-5px)", 
                shadow: "lg",
                borderColor: "degen.accent" 
              }}
            >
              <VStack spacing={4} align="start">
                <HStack>
                  <Icon as={FaTelegram} color="degen.lightBlue" boxSize={8} />
                  <Heading as="h2" size="lg" color="white">
                    New Token Announcements
                  </Heading>
                </HStack>
                
                <Text color="whiteAlpha.800">
                  Join our Chad Takeovers (CTOs) channel to get instant notifications about new token launches and market opportunities before they go mainstream.
                </Text>
                
                <Flex 
                  width="100%" 
                  justifyContent="flex-end" 
                  mt={2}
                >
                  <Button
                    as="a"
                    href="https://t.me/ChadTakeoversCTOs"
                    target="_blank"
                    rel="noopener noreferrer"
                    rightIcon={<FaExternalLinkAlt />}
                    bg="degen.accent"
                    color="white"
                    _hover={{ 
                      bg: "orange.600",
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    size="md"
                  >
                    Join Channel
                  </Button>
                </Flex>
              </VStack>
            </LinkBox>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}