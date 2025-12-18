import { memo, ReactNode, VFC } from 'react'
import { Heading, Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const SectionTitle: VFC<Props> = memo((props) => {
  const { children } = props

  return (
    <Box position="relative" pb={8} pt={4} textAlign="center">
      <Heading
        as="h2"
        fontSize={{ base: '24px', md: '30px', lg: '36px' }}
        fontWeight="700"
        color="gray.800"
        _dark={{ color: 'white' }}
        position="relative"
        display="inline-block"
        className="animate-slideInLeft"
      >
        {children}
        <Box
          as="span"
          position="absolute"
          bottom="-8px"
          left="50%"
          transform="translateX(-50%)"
          width="60px"
          height="4px"
          borderRadius="full"
          bgGradient="linear(to-r, #667eea, #764ba2)"
          boxShadow="0 2px 8px rgba(102, 126, 234, 0.4)"
        />
      </Heading>
    </Box>
  )
})
