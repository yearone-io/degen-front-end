"use client";

import { Box, Button, Flex, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

interface Token {
  address: string;
  name: string;
  symbol: string;
  // add additional fields if needed
}

interface SpinCarouselProps {
  tokens: Token[];
}

const SpinCarousel: React.FC<SpinCarouselProps> = ({ tokens }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(currentIndex);

  // Update the ref so that our timeout can use the latest index value.
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const totalTokens = tokens.length;

  // Returns the 5 tokens to be displayed, wrapping around if needed.
  const getVisibleTokens = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % totalTokens;
      visible.push(tokens[index]);
    }
    return visible;
  };

  const visibleTokens = totalTokens ? getVisibleTokens() : [];

  // Starts the spinning carousel.
  const startSpin = () => {
    if (totalTokens === 0) return;
    setIsPlaying(true);
    setSelectedToken(null);

    // Clear any previous interval if necessary.
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Update the carousel every 100ms.
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTokens);
    }, 100);

    // Random spin duration between 3 and 6 seconds.
    const spinDuration = Math.floor(Math.random() * 3000) + 3000;
    setTimeout(() => {
      // Stop the carousel.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // The token in the third slot (index 2) is selected.
      const selectedIndex = (currentIndexRef.current + 2) % totalTokens;
      setSelectedToken(tokens[selectedIndex]);
      setIsPlaying(false);
    }, spinDuration);
  };

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" gap={4} wrap="wrap">
        {visibleTokens.map((token, index) => (
          <Box
            key={token.address}
            p={4}
            borderWidth={index === 2 ? "3px" : "1px"}
            borderColor={index === 2 ? "teal.500" : "gray.200"}
            borderRadius="md"
            minW="100px"
            textAlign="center"
          >
            <Text fontWeight="bold">{token.symbol}</Text>
            <Text fontSize="sm">{token.name}</Text>
          </Box>
        ))}
      </Flex>
      <Flex justifyContent="center" mt={4}>
        <Button onClick={startSpin} disabled={isPlaying || totalTokens === 0}>
          {isPlaying ? <Spinner size="sm" /> : "Play"}
        </Button>
      </Flex>
      {selectedToken && (
        <Box mt={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Selected Token: {selectedToken.name} ({selectedToken.symbol})
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SpinCarousel;
