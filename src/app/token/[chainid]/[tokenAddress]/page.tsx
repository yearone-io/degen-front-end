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
} from "@chakra-ui/react";

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
      <Box p={4}>
        <Spinner />
        <Text>Loading token data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">Error loading token data</Text>
      </Box>
    );
  }

  if (!data || !Array.isArray(data)) {
    return (
      <Box p={4}>
        <Text>No data found for this token.</Text>
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
    <Box p={4}>
      {/* Heading area */}
      <Heading size="lg" mb={2}>
        {tokenName} {tokenSymbol ? `($${tokenSymbol})` : ""} on {chainName}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Address: {addressFromEvent}
      </Text>

      <VStack
        align="stretch"
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
      >
        {/* Quick Stats (Risk/Tax & ETH Value) */}
        <Box>
          <Heading size="md" mb={2}>
            Quick Stats
          </Heading>
          <HStack spacing={3} wrap="wrap">
            <Badge colorScheme="red" variant="outline">
              Risk: {riskLevel}
            </Badge>
            <Badge colorScheme="green" variant="outline">
              Buy Tax: {buyTax}%
            </Badge>
            <Badge colorScheme="green" variant="outline">
              Sell Tax: {sellTax}%
            </Badge>
            {typeof totalPoolValueInETH === "number" && (
              <Badge colorScheme="blue" variant="outline">
                ETH Value: {totalPoolValueInETH.toFixed(8)}
              </Badge>
            )}
          </HStack>
        </Box>

        {/* Pool Health (if we have liquidityLocked info) */}
        {liquidityLocked && (
          <Box>
            <Heading size="md" mb={2}>
              Pool Health
            </Heading>
            {typeof totalPoolValueInETH === "number" && (
              <Text>ETH Value: {totalPoolValueInETH.toFixed(8)}</Text>
            )}
            <Text>
              LP 🔥: {burnLPPercent.toFixed(2)}% | LP 🔒:{" "}
              {lockLPPercent.toFixed(2)}% | LP ???: {otherLPPercent.toFixed(2)}%
            </Text>
            {liquidityPoolTokenHolders.length > 0 && (
              <Box mt={2}>
                <Text fontWeight="bold">LP Holders:</Text>
                <UnorderedList>
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
          <Box>
            <Heading size="md" mb={2}>
              Social Links
            </Heading>
            {Object.entries(socialLinks).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((url: string) => (
                  <Text key={url}>
                    <ChakraLink
                      href={url}
                      color="teal.500"
                      isExternal
                      textDecoration="underline"
                    >
                      {key}: {url}
                    </ChakraLink>
                  </Text>
                ));
              } else {
                return (
                  <Text key={key}>
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
            <Box>
              <Heading size="md" mb={2}>
                Contract Verification
              </Heading>
              {uniqueWords.length > 0 && (
                <Text>
                  <strong>Unique Words:</strong> {uniqueWords.join(", ")}
                </Text>
              )}
              {templateMatch && (
                <Box mt={2}>
                  <Text fontWeight="bold">Template Match (First)</Text>
                  <Text>Name: {templateMatch.first?.name}</Text>
                  <Text>Score: {templateMatch.first?.score}</Text>
                  {Array.isArray(templateMatch.first?.uniqueWords) && (
                    <Text>
                      Unique Words:{" "}
                      {templateMatch.first.uniqueWords.join(", ")}
                    </Text>
                  )}
                  <Divider my={2} />
                  <Text fontWeight="bold">Template Match (Second)</Text>
                  <Text>Name: {templateMatch.second?.name}</Text>
                  <Text>Score: {templateMatch.second?.score}</Text>
                  {Array.isArray(templateMatch.second?.uniqueWords) && (
                    <Text>
                      Unique Words:{" "}
                      {templateMatch.second.uniqueWords.join(", ")}
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          )}

        {/* Liquidity & Holders */}
        <Box>
          <Heading size="md" mb={2}>
            Liquidity & Holders
          </Heading>
          {numberOfHolders && (
            <Text>Number of Holders: {numberOfHolders}</Text>
          )}
          {totalSupply && <Text>Total Supply: {totalSupply}</Text>}
        </Box>

        {/* Whale Stats (if available) */}
        {whaleStats && (
          <Box>
            <Heading size="md" mb={2}>
              Whale Stats
            </Heading>
            <Text>
              Number of whale holders:{" "}
              {whaleStats.payload.whaleHoldersCount}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
