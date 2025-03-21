"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  HStack,
  Link as ChakraLink,
  StackDivider,
  Badge,
  Divider,
  UnorderedList,
  ListItem,
  Container,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

// Import Navbar (would actually need to create this file)


interface EventItem {
  key: string[];
  value: any; // The payload for the event
  versionstamp: any;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function TokenDetailsPage() {
  // 1) Get dynamic route params
  const { chainId, tokenAddress } = useParams() as {
    chainId: string;
    tokenAddress: string;
  };

  // 2) Use SWR to fetch the events array
  const { data, error, isLoading } = useSWR<EventItem[]>(
    `https://degen-dispatch.deno.dev/token/${chainId}/${tokenAddress}/events`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // Loading/error states
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

  if (!data || !Array.isArray(data)) {
    return (
      <Box bg="degen.primary" minH="100vh">
        <Navbar />
        <Container maxW="container.xl" py={10}>
          <Box p={8} bg="degen.secondary" borderRadius="md">
            <Text color="white">No data found for this token.</Text>
          </Box>
        </Container>
      </Box>
    );
  }

  // 3) Build an object keyed by event type (e.g. "ContractCreated", "HoneypotChecked", etc.)
  const eventsByType = data.reduce<Record<string, any>>((acc, evt) => {
    if (evt?.value?.type) {
      acc[evt.value.type] = evt.value;
    }
    return acc;
  }, {});

  // Pull out commonly used events/payloads
  const contractCreated = eventsByType["ContractCreated"];
  const contractVerified = eventsByType["ContractVerified"];
  const honeypotChecked = eventsByType["HoneypotChecked"];
  const liquidityLocked = eventsByType["LiquidityLockedEvent"];
  const tokenHealth = eventsByType["TokenHealthEvent"];
  const whaleStats = eventsByType["WhaleStatsEvent"];

  // Basic fields from ContractCreated
  const tokenName = contractCreated?.payload?.name ?? "Unknown";
  const tokenSymbol = contractCreated?.payload?.symbol ?? "";
  const addressFromEvent = contractCreated?.address ?? tokenAddress;

  // If HoneypotChecked has chain info
  const chainName =
    honeypotChecked?.payload?.honeypotResponse?.chain?.name ?? chainId;

  // Social links from ContractVerified
  const socialLinks = contractVerified?.payload?.links ?? {};

  // Risk/Tax from HoneypotChecked
  const riskLevel =
    honeypotChecked?.payload?.honeypotResponse?.summary?.risk ?? "unknown";
  const buyTax =
    honeypotChecked?.payload?.honeypotResponse?.simulationResult?.buyTax ?? 0;
  const sellTax =
    honeypotChecked?.payload?.honeypotResponse?.simulationResult?.sellTax ?? 0;

  // uniqueWords & templateMatch from ContractVerified
  const uniqueWords = contractVerified?.payload?.uniqueWords ?? [];
  const templateMatch = contractVerified?.payload?.templateMatch;

  // Liquidity & Pool info from LiquidityLockedEvent
  const totalPoolValueInETH = liquidityLocked?.payload?.totalPoolValueInETH;
  const liquidityPoolTokenHolders =
    liquidityLocked?.payload?.liquidityPoolTokenHolders ?? [];

  // Summarize LP distribution by "type"
  let burnLPPercent = 0;
  let lockLPPercent = 0;
  let otherLPPercent = 0;

  if (liquidityPoolTokenHolders.length > 0) {
    burnLPPercent = liquidityPoolTokenHolders
      .filter((h: any) => h.type === "burn")
      .reduce((sum: number, h: any) => sum + (h.percentage ?? 0), 0);

    lockLPPercent = liquidityPoolTokenHolders
      .filter((h: any) => h.type === "lock")
      .reduce((sum: number, h: any) => sum + (h.percentage ?? 0), 0);

    const totalUsed = burnLPPercent + lockLPPercent;
    otherLPPercent = Math.max(0, 100 - totalUsed);
  }

  // Number of holders from liquidityLocked or "tokenHealth"
  let numberOfHolders: string | undefined;
  const llResult =
    liquidityLocked?.payload?.liquidityCheckResult?.result?.[
      tokenAddress.toLowerCase()
    ];
  if (llResult && llResult.holder_count) {
    numberOfHolders = llResult.holder_count;
  }

  // Total supply from tokenHealth or contractCreated
  let totalSupply: string | undefined;
  if (tokenHealth?.payload?.topHolders?.totalSupply) {
    totalSupply = String(tokenHealth.payload.topHolders.totalSupply);
  } else if (contractCreated?.payload?.payload?.totalSupply) {
    totalSupply = String(contractCreated.payload.payload.totalSupply);
  }

  return (
    <Box bg="degen.primary" minH="100vh">
      <Navbar />
      
      <Container maxW="container.xl" py={10}>
        {/* Heading area */}
        <Box bg="degen.secondary" p={6} borderRadius="lg" mb={6}>
          <Heading size="lg" mb={2} color="white">
            {tokenName} {tokenSymbol ? `($${tokenSymbol})` : ""} on {chainName}
          </Heading>
          <Text fontSize="sm" color="whiteAlpha.700">
            Address: {addressFromEvent}
          </Text>
        </Box>

        <VStack
          align="stretch"
          spacing={6}
          divider={<StackDivider borderColor="whiteAlpha.200" />}
        >
          {/* Quick Stats (Risk/Tax & ETH Value) */}
          <Box bg="degen.secondary" p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="white">
              Quick Stats
            </Heading>
            <HStack spacing={3} wrap="wrap">
              <Badge colorScheme="red" variant="solid" px={3} py={1}>
                Risk: {riskLevel}
              </Badge>
              <Badge colorScheme="green" variant="solid" px={3} py={1}>
                Buy Tax: {buyTax}%
              </Badge>
              <Badge colorScheme="green" variant="solid" px={3} py={1}>
                Sell Tax: {sellTax}%
              </Badge>
              {typeof totalPoolValueInETH === "number" && (
                <Badge colorScheme="blue" variant="solid" px={3} py={1}>
                  ETH Value: {totalPoolValueInETH.toFixed(8)}
                </Badge>
              )}
            </HStack>
          </Box>

          {/* Pool Health (if we have liquidityLocked info) */}
          {liquidityLocked && (
            <Box bg="degen.secondary" p={6} borderRadius="lg">
              <Heading size="md" mb={4} color="white">
                Pool Health
              </Heading>
              {typeof totalPoolValueInETH === "number" && (
                <Text color="whiteAlpha.900">ETH Value: {totalPoolValueInETH.toFixed(8)}</Text>
              )}
              <Text color="whiteAlpha.900">
                LP 🔥: {burnLPPercent.toFixed(2)}% | LP 🔒:{" "}
                {lockLPPercent.toFixed(2)}% | LP ???: {otherLPPercent.toFixed(2)}%
              </Text>
              {liquidityPoolTokenHolders.length > 0 && (
                <Box mt={4} bg="whiteAlpha.100" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="white">LP Holders:</Text>
                  <UnorderedList color="whiteAlpha.900">
                    {liquidityPoolTokenHolders.map((holder: any) => (
                      <ListItem key={holder.address}>
                        <Text>
                          {holder.address.slice(0, 6)}...
                          {holder.address.slice(-4)} | Type: {holder.type} |{" "}
                          {holder.percentage ?? 0}%
                          {holder.alias ? ` (${holder.alias})` : ""}
                        </Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              )}
            </Box>
          )}

          {/* Social Links (if any) */}
          {Object.keys(socialLinks).length > 0 && (
            <Box bg="degen.secondary" p={6} borderRadius="lg">
              <Heading size="md" mb={4} color="white">
                Social Links
              </Heading>
              {Object.entries(socialLinks).map(([key, value]) => {
                if (Array.isArray(value)) {
                  return value.map((url: string) => (
                    <Text key={url} color="whiteAlpha.900">
                      <ChakraLink
                        href={url}
                        color="degen.accent"
                        isExternal
                        textDecoration="underline"
                      >
                        {key}: {url}
                      </ChakraLink>
                    </Text>
                  ));
                } else {
                  return (
                    <Text key={key} color="whiteAlpha.900">
                      {key}: {JSON.stringify(value)}
                    </Text>
                  );
                }
              })}
            </Box>
          )}

          {/* Unique Words & Template Match (if contractVerified) */}
          {contractVerified &&
            (uniqueWords.length > 0 || templateMatch) && (
              <Box bg="degen.secondary" p={6} borderRadius="lg">
                <Heading size="md" mb={4} color="white">
                  Contract Verification
                </Heading>
                {uniqueWords.length > 0 && (
                  <Text color="whiteAlpha.900">
                    Unique words: {uniqueWords.join(", ")}
                  </Text>
                )}
                {templateMatch && (
                  <Text color="whiteAlpha.900" mt={2}>
                    Template match: {templateMatch.name} ({templateMatch.percentage}% match)
                  </Text>
                )}
              </Box>
            )}

          {/* Token Info (totalSupply & holders) */}
          <Box bg="degen.secondary" p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="white">
              Token Info
            </Heading>
            {totalSupply && (
              <Text color="whiteAlpha.900">
                Total Supply: {totalSupply}
              </Text>
            )}
            {numberOfHolders && (
              <Text color="whiteAlpha.900">
                Number of Holders: {numberOfHolders}
              </Text>
            )}
          </Box>

          {/* Whale Stats (if available) */}
          {whaleStats && whaleStats.payload && (
            <Box bg="degen.secondary" p={6} borderRadius="lg">
              <Heading size="md" mb={4} color="white">
                Whale Analytics
              </Heading>
              <Text color="whiteAlpha.900">
                Top 10 holders control: {whaleStats.payload.top10Percentage ?? "Unknown"}% of supply
              </Text>
              {whaleStats.payload.whales && (
                <Box mt={4} bg="whiteAlpha.100" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="white">Top Whales:</Text>
                  <UnorderedList color="whiteAlpha.900">
                    {whaleStats.payload.whales.slice(0, 5).map((whale: any, index: number) => (
                      <ListItem key={index}>
                        <Text>
                          {whale.address.slice(0, 6)}...{whale.address.slice(-4)} | 
                          {whale.percentage}% of supply
                          {whale.alias ? ` (${whale.alias})` : ""}
                        </Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              )}
            </Box>
          )}

          {/* Raw Event Data (for debugging or advanced users) */}
          <Box bg="degen.secondary" p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="white">
              Available Events
            </Heading>
            <HStack spacing={3} wrap="wrap">
              {Object.keys(eventsByType).map(eventType => (
                <Badge key={eventType} colorScheme="purple" variant="outline" px={3} py={1}>
                  {eventType}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}