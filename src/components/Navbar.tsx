// src/components/Navbar.tsx
"use client";

import { 
  Flex, 
  Text, 
  Button, 
  Link, 
  HStack,
  Box,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" }, // Added this line
    { name: "New Tokens", path: "/newTokens" },
    { name: "Performance Picks", path: "/deals" },
    { name: "Whale Tracking", path: "/whales" },
    { name: "Roulette", path: "/roulette" },
    { name: "CTOs", path: "/ctos" },
    { name: "Telegram Bots", path: "/bots" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

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
        <Text ml={4} color="whiteAlpha.800" fontSize="sm" display={{ base: "none", md: "block" }}>
          Real-Time Token Analysis
        </Text>
      </Flex>

      {isMobile ? (
        <Menu>
          <MenuButton 
            as={IconButton} 
            icon={<HamburgerIcon />} 
            variant="outline" 
            aria-label="Navigation Menu"
          />
          <MenuList bg="degen.secondary">
            {navItems.map((item) => (
              <MenuItem 
                key={item.path}
                as={NextLink} 
                href={item.path}
                bg={isActive(item.path) ? "degen.accent" : "transparent"}
                _hover={{ bg: "degen.accent" }}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={6}>
          {navItems.map((item) => (
            <Link 
              key={item.path}
              as={NextLink} 
              href={item.path} 
              color="whiteAlpha.900"
              fontWeight={isActive(item.path) ? "bold" : "normal"}
              borderBottom={isActive(item.path) ? "2px" : "0"}
              borderColor="degen.accent"
              pb={1}
              _hover={{ textDecoration: "none", color: "degen.accent" }}
            >
              {item.name}
            </Link>
          ))}
        </HStack>
      )}
    </Flex>
  );
};

export default Navbar;