// src/components/Navbar.tsx
"use client";

import { 
  Flex, 
  Text, 
  Button, 
  Link, 
  HStack, 
} from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      px={5}
      py={3}
      bg="degen.primary"
      color="white"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.200"
    >
      <Flex align="center" mr={5}>
        <NextLink href="/" passHref>
          <HStack spacing={2}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              letterSpacing="tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Text as="span" color="degen.accent">Degen</Text> Dispatch
            </Text>
          </HStack>
        </NextLink>
        <Text ml={4} color="whiteAlpha.800" fontSize="sm">
          Real-Time Crypto Whale Tracker
        </Text>
      </Flex>

      <HStack
        spacing={4}
        display={{ base: "none", md: "flex" }}
      >
        <Link as={NextLink} href="/documentation" color="whiteAlpha.900">
          Documentation
        </Link>
        <Button variant="alpha" size="sm">
          GET ALPHA
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;