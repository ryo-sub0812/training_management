import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        },
        secondary: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
        },
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        }
    },
    fonts: {
        heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    styles: {
        global: {
            body: {
                backgroundColor: "#ffffff",
                color: "#1f2937",
                fontSize: "16px",
                lineHeight: "1.6"
            }
        }
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "lg",
                fontWeight: "semibold",
            },
            variants: {
                solid: {
                    bg: "primary.500",
                    color: "white",
                    _hover: {
                        bg: "primary.600",
                    },
                },
                outline: {
                    borderColor: "primary.500",
                    color: "primary.500",
                    _hover: {
                        bg: "primary.50",
                    },
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    borderRadius: "xl",
                    boxShadow: "sm",
                    border: "1px solid",
                    borderColor: "gray.200",
                },
            },
        },
    },
});

export default theme;