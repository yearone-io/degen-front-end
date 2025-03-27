// src/app/how-it-works/page.tsx
"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { 
  FaSearch, 
  FaShieldAlt, 
  FaCode, 
  FaChartBar, 
  FaDatabase, 
  FaBell,
  FaBrain 
} from "react-icons/fa";
import Navbar from "../../components/Navbar";

const FeatureCard = ({ icon, title, description }) => (
  <GridItem 
    bg="degen.secondary" 
    p={6} 
    borderRadius="md"
    boxShadow="md"
    _hover={{ transform: "translateY(-5px)", transition: "transform 0.3s" }}
  >
    <VStack spacing={4} align="start">
      <HStack spacing={3} align="center">
        <Icon as={icon} w={8} h={8} color="degen.accent" />
        <Heading size="md" color="white">{title}</Heading>
      </HStack>
      <Text color="whiteAlpha.800">{description}</Text>
    </VStack>
  </GridItem>
);

export default function HowItWorksPage() {
  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      
      <Container maxW="container.xl" py={12} px={{ base: 4, md: 8 }}>
        <VStack spacing={10} align="start">
          <Box>
            <Heading 
              as="h1" 
              size="2xl" 
              color="white" 
              mb={4}
              lineHeight="1.2"
            >
              How Degen Dispatch Works
            </Heading>
            <Text 
              fontSize="lg" 
              color="whiteAlpha.800" 
              maxW="800px"
            >
              Our advanced AI-powered algorithm meticulously analyzes and filters newly deployed tokens on Ethereum, providing you with the most promising and secure opportunities.
            </Text>
          </Box>

          <Divider borderColor="whiteAlpha.300" />

          <Box>
            <Heading 
              as="h2" 
              size="xl" 
              color="white" 
              mb={6}
            >
              Our Comprehensive Token Screening Process
            </Heading>

            <Grid 
              templateColumns={{ 
                base: "1fr", 
                md: "repeat(2, 1fr)", 
                lg: "repeat(3, 1fr)" 
              }} 
              gap={6}
            >
              <FeatureCard 
                icon={FaSearch}
                title="Comprehensive Token Discovery"
                description="We scan and analyze hundreds of new tokens deployed on Ethereum daily, filtering through the noise to find hidden gems."
              />
              
              <FeatureCard 
                icon={FaCode}
                title="Smart Contract Deep Dive"
                description="Rigorous analysis of token smart contracts to identify potential security vulnerabilities, honeypot mechanisms, and malicious code patterns."
              />
              
              <FeatureCard 
                icon={FaShieldAlt}
                title="Security Filtering"
                description="Advanced filtering to eliminate tokens with known bad practices, suspicious contract templates, and high-risk deployment techniques."
              />
              
              <FeatureCard 
                icon={FaChartBar}
                title="Liquidity Pool Health"
                description="Comprehensive evaluation of token liquidity, trading volume, and pool dynamics to assess potential market performance."
              />
              
              <FeatureCard 
                icon={FaDatabase}
                title="Social and Market Signals"
                description="Extract and analyze social media presence, community engagement, and early market signals to gauge token potential."
              />
              
              <FeatureCard 
                icon={FaBell}
                title="Whale Movement Tracking"
                description="Monitor significant wallet movements and track whether established crypto whales are showing interest in the token."
              />
            </Grid>
          </Box>

          <Divider borderColor="whiteAlpha.300" />

          <Box>
            <Heading 
              as="h2" 
              size="xl" 
              color="white" 
              mb={6}
            >
              AI-Powered Token Filtering
            </Heading>
            <Grid 
              templateColumns={{ 
                base: "1fr", 
                md: "repeat(2, 1fr)" 
              }} 
              gap={6}
            >
              <FeatureCard 
                icon={FaBrain}
                title="Intelligent Token Screening"
                description="Our AI algorithms leverage machine learning to continuously improve token filtering, identifying patterns and risks human analysts might miss."
              />
              
              <GridItem 
                bg="degen.secondary" 
                p={6} 
                borderRadius="md"
                boxShadow="md"
                _hover={{ transform: "translateY(-5px)", transition: "transform 0.3s" }}
              >
                <VStack spacing={4} align="start">
                  <HStack spacing={3} align="center">
                    <Icon as={FaBrain} w={8} h={8} color="degen.accent" />
                    <Heading size="md" color="white">AI Analysis Capabilities</Heading>
                  </HStack>
                  <Text color="whiteAlpha.800">
                    Our AI models are trained to:
                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                      <li>Detect suspicious contract patterns</li>
                      <li>Analyze historical token performance</li>
                      <li>Predict potential red flags</li>
                      <li>Assess market sentiment</li>
                      <li>Identify emerging token trends</li>
                    </ul>
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </Box>

          <Divider borderColor="whiteAlpha.300" />

          <Box>
            <Heading 
              as="h2" 
              size="xl" 
              color="white" 
              mb={4}
            >
              Our Commitment to Transparency
            </Heading>
            <Text 
              color="whiteAlpha.800" 
              fontSize="lg" 
              maxW="800px"
            >
              We want to be crystal clear: our AI-powered algorithm is a powerful tool, but it's not infallible. The tokens we surface are not investment recommendations. 
              Our AI and checks help identify tokens with potential, but the crypto market remains highly unpredictable. Always conduct your own thorough research 
              (DYOR) before making any investment decisions.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}