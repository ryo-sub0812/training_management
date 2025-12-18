import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#3B82F6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
        },
        secondary: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#06D6A0',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
        },
        accent: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#8B5CF6',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
        },
        gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
        dark: {
            50: '#18181b',
            100: '#27272a',
            200: '#3f3f46',
            300: '#52525b',
            400: '#71717a',
            500: '#a1a1aa',
            600: '#d4d4d8',
            700: '#e4e4e7',
            800: '#f4f4f5',
            900: '#fafafa',
        }
    },
    fonts: {
        heading: 'Inter, Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body: 'Inter, Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    styles: {
        global: (props: any) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'dark.50' : 'white',
                color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
                fontSize: "16px",
                lineHeight: "1.6",
                fontFeatureSettings: '"rlig" 1, "calt" 1',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            },
            '*': {
                boxSizing: 'border-box',
            },
            html: {
                scrollBehavior: 'smooth',
            }
        })
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "xl",
                fontWeight: "semibold",
                transition: "all 0.3s ease-in-out",
                _focus: {
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                }
            },
            variants: {
                solid: (props: any) => ({
                    bg: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                    _hover: {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(59, 130, 246, 0.35)",
                        _disabled: {
                            transform: "none",
                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                        }
                    },
                    _active: {
                        transform: "translateY(0)",
                    }
                }),
                outline: (props: any) => ({
                    borderColor: "primary.500",
                    color: "primary.500",
                    borderWidth: "2px",
                    bg: "rgba(59, 130, 246, 0.05)",
                    backdropFilter: "blur(10px)",
                    _hover: {
                        bg: "rgba(59, 130, 246, 0.1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(59, 130, 246, 0.15)",
                    },
                }),
                ghost: (props: any) => ({
                    bg: "transparent",
                    _hover: {
                        bg: "rgba(59, 130, 246, 0.1)",
                        transform: "translateY(-1px)",
                    }
                }),
                glass: (props: any) => ({
                    bg: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: props.colorMode === 'dark' ? 'white' : 'gray.800',
                    _hover: {
                        bg: "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }
                }),
            },
            sizes: {
                xs: {
                    h: 8,
                    px: 3,
                    fontSize: 'sm',
                },
                sm: {
                    h: 10,
                    px: 4,
                    fontSize: 'sm',
                },
                md: {
                    h: 12,
                    px: 6,
                    fontSize: 'md',
                },
                lg: {
                    h: 14,
                    px: 8,
                    fontSize: 'lg',
                },
                xl: {
                    h: 16,
                    px: 10,
                    fontSize: 'xl',
                }
            }
        },
        Card: {
            baseStyle: (props: any) => ({
                container: {
                    borderRadius: "2xl",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid",
                    borderColor: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'gray.200',
                    bg: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: "blur(20px)",
                    transition: "all 0.3s ease-in-out",
                    _hover: {
                        transform: "translateY(-4px)",
                        boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.35)",
                        borderColor: props.colorMode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'primary.200',
                    }
                },
            }),
        },
        Text: {
            variants: {
                gradient: {
                    bgGradient: "linear(to-r, primary.500, secondary.500)",
                    bgClip: "text",
                    fontWeight: "bold",
                },
                glass: (props: any) => ({
                    color: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'gray.700',
                    textShadow: props.colorMode === 'dark' ? '0 0 20px rgba(255, 255, 255, 0.1)' : 'none',
                })
            }
        },
        Heading: {
            variants: {
                gradient: {
                    bgGradient: "linear(to-r, primary.400, accent.400, secondary.400)",
                    bgClip: "text",
                    fontWeight: "bold",
                },
                glow: (props: any) => ({
                    color: props.colorMode === 'dark' ? 'white' : 'gray.800',
                    textShadow: props.colorMode === 'dark' ? '0 0 40px rgba(59, 130, 246, 0.3)' : 'none',
                })
            }
        }
    },
    shadows: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
        glow: '0 0 60px -12px rgba(59, 130, 246, 0.25)',
        'glow-lg': '0 0 80px -16px rgba(59, 130, 246, 0.35)',
    }
});

export default theme;