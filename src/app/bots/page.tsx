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
} from "@chakra-ui/react";
import { FaExternalLinkAlt, FaTelegram } from 'react-icons/fa';
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
                
                <HStack 
                  bg="degen.accent" 
                  color="white" 
                  p={3} 
                  borderRadius="md" 
                  alignSelf="flex-end"
                  _hover={{ bg: 'orange.600' }}
                >
                  <LinkOverlay 
                    href="https://t.me/DegenDispatchBot?start=source_website" 
                    isExternal
                  >
                    Connect to Bot
                  </LinkOverlay>
                  <Icon as={FaExternalLinkAlt} ml={2} />
                </HStack>
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
                
                <HStack 
                  bg="degen.accent" 
                  color="white" 
                  p={3} 
                  borderRadius="md" 
                  alignSelf="flex-end"
                  _hover={{ bg: 'orange.600' }}
                >
                  <LinkOverlay 
                    href="https://t.me/ChadTakeoversCTOs" 
                    isExternal
                  >
                    Join Channel
                  </LinkOverlay>
                  <Icon as={FaExternalLinkAlt} ml={2} />
                </HStack>
              </VStack>
            </LinkBox>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}