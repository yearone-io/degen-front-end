"use client";

import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// Adjust the endpoint/chainId as needed
const FEED_ENDPOINT = "https://degen-dispatch.deno.dev/token/1/recent-detailed";

export default function HomePage() {
  const { data, error } = useSWR(FEED_ENDPOINT, fetcher, { refreshInterval: 10000 });
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTokens(data);
    }
  }, [data]);

  if (error) return <Text color="red.500">Error loading tokens</Text>;
  if (!data) return <Text>Loading tokens...</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>Degen Frontend</Heading>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Current</Tab>
          <Tab as={NextLink} href="/performance">Performance Tokens</Tab>
          <Tab as={NextLink} href="/whales">Whales</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {tokens.map((token) => (
                <Box key={token.address} p={4} borderWidth="1px" borderRadius="md">
                  <ChakraLink
                    href={`/token/${token.chainId}/${token.address}`}
                    target="_blank"
                    _hover={{ textDecoration: "underline" }}
                  >
                    <Heading size="md">
                      {token.name} ({token.symbol})
                    </Heading>
                    <Text>Address: {token.address}</Text>
                    <Text>Pair Address: {token.pairAddress}</Text>
                    <Text>
                      Social Links: {JSON.stringify(token.socialLinks)}
                    </Text>
                  </ChakraLink>
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
