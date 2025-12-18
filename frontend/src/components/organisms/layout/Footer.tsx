import React, { memo, VFC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const Footer: VFC = memo(() => {
  return (
    <Flex
      as="footer"
      fontSize={{ base: '13px', md: '15px' }}
      justify="center"
      align="center"
      px={{ base: 5, md: 10 }}
      py={8}
      mt={16}
      bg="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(20px)"
      borderTop="1px solid rgba(255, 255, 255, 0.1)"
      position="relative"
      _before={{
        content: "''",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
      }}
    >
      <Text 
        color="gray.300" 
        fontWeight="medium"
        textAlign="center"
        bgGradient="linear(to-r, gray.400, gray.200)"
        bgClip="text"
      >
        ✨ &copy; 2025 Training Management Platform - Built with passion 🚀
      </Text>
    </Flex>
  )
})
