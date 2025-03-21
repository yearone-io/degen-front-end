// theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    degen: {
      primary: '#0A3A5F',      // Dark blue background
      secondary: '#1E4D76',    // Slightly lighter blue
      accent: '#FF5C00',       // Orange accent color
      yellow: '#FFD700',       // Yellow for coins
      text: '#FFFFFF',         // White text
      buttonRed: '#E53E3E',    // Red button
      lightBlue: '#87CEEB'     // Light blue accents
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'degen.primary',
        color: 'degen.text',
      },
      a: {
        color: 'degen.accent',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'degen.accent',
          color: 'white',
          _hover: {
            bg: 'orange.600',
          },
        },
        alpha: {
          bg: 'degen.buttonRed',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 'full',
          px: 4,
          _hover: {
            bg: 'red.500',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        bg: 'degen.secondary',
        borderRadius: 'md',
      }
    },
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            _selected: {
              bg: 'degen.accent',
            },
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
      },
    },
  },
});

export default theme;