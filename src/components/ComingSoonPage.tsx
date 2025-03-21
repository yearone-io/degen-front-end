// src/components/ComingSoonPage.tsx
"use client";

import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Image, 
  Center 
} from "@chakra-ui/react";
import Navbar from "./Navbar";

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={10}>
        <Center>
          <VStack spacing={6} textAlign="center" maxW="600px">
            <Heading as="h1" size="xl" color="white">
              {title}
            </Heading>
            
            <Box 
              borderWidth="1px" 
              borderColor="whiteAlpha.200" 
              borderRadius="full" 
              p={6}
              bg="degen.secondary"
            >
              <Text fontSize="5xl">🚧</Text>
            </Box>
            
            <Text color="whiteAlpha.800" fontSize="lg">
              {description || "This feature is coming soon! We're working hard to bring you the best experience."}
            </Text>
            
            <Button 
              variant="alpha" 
              size="lg" 
              mt={4}
              isDisabled
            >
              Vote for this feature
            </Button>
            
            <Text color="whiteAlpha.600" fontSize="sm">
              Want to see this feature sooner? Let us know!
            </Text>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
}