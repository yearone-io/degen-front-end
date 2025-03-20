"use client";

import { 
  Box, 
  Heading, 
  Tab, 
  TabList, 
  TabPanels, 
  Tabs, 
  TabPanel, 
  Text, 
  VStack, 
  Link as ChakraLink 
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function HomePage() {
  // Call hooks unconditionally
  const hasMounted = useHasMounted();
  const { data, error } = useSWR(FEED_ENDPOINT, fetcher, {
    refreshInterval: 10000,
    revalidateOnMount: false,
  });
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTokens(data);
    }
  }, [data]);

  // Until mounted, show a placeholder that is the same on server and client.
  if (!hasMounted) return <Text>Loading tokens...</Text>;
  if (error) return <Text color="red.500">Error loading tokens</Text>;
  if (!data) return <Text>Loading tokens...</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>Degen Frontend</Heading>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Current</Tab>
          <Tab>
            <NextLink href="/performance" passHref legacyBehavior>
              <ChakraLink>Performance Tokens</ChakraLink>
            </NextLink>
          </Tab>
          <Tab>
            <NextLink href="/whales" passHref legacyBehavior>
              <ChakraLink>Whales</ChakraLink>
            </NextLink>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {tokens.map((token) => (
                <Box key={token.address} p={4} borderWidth="1px" borderRadius="md">
                  <NextLink
                    href={`/token/${token.chainId}/${token.address}`}
                    target="_blank"
                    passHref
                    legacyBehavior
                  >
                    <ChakraLink _hover={{ textDecoration: "underline" }}>
                      <Heading size="md">
                        {token.name} ({token.symbol})
                      </Heading>
                      <Text>Address: {token.address}</Text>
                      <Text>Pair Address: {token.pairAddress}</Text>
                      <Text>
                        Social Links: {JSON.stringify(token.socialLinks)}
                      </Text>
                    </ChakraLink>
                  </NextLink>
                </Box>
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <Text>Coming soon!</Text>
          </TabPanel>
          <TabPanel>
            <Text>Coming soon!</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
