import { memo, ReactNode, VFC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  text: string
  onClick: () => void
  children: ReactNode
}

export const MenuListItem: VFC<Props> = memo((props) => {
  const { text, onClick, children } = props

  return (
    <Box
      py={2.5}
      px={3}
      borderRadius="lg"
      cursor="pointer"
      _hover={{
        bg: 'purple.50',
        _dark: { bg: 'purple.900/20' },
      }}
      transition="all 0.2s"
      onClick={onClick}
      mb={1}
    >
      <Flex alignItems="center" gap={3}>
        <Box
          w="32px"
          h="32px"
          borderRadius="lg"
          bg="purple.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderWidth="1px"
          borderColor="purple.300"
          _dark={{ bg: 'purple.900/30', borderColor: 'purple.700' }}
        >
          {children}
        </Box>
        <Box
          fontWeight="semibold"
          fontSize="sm"
          color="gray.800"
          _dark={{ color: 'white' }}
        >
          {text}
        </Box>
      </Flex>
    </Box>
  )
})
