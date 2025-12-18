import { memo, ReactNode, VFC } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const PageTitle: VFC<Props> = memo((props) => {
  const { children } = props

  return (
    <Heading
      as="h1"
      fontSize={{ base: '24px', md: '36px', lg: '42px' }}
      fontWeight="bold"
      textAlign="center"
      pb={6}
      pt={2}
      bgGradient="linear(to-r, #3B82F6, #8B5CF6, #06D6A0)"
      bgClip="text"
      textShadow="0 0 40px rgba(59, 130, 246, 0.3)"
      position="relative"
      data-testid="page-title"
      className="animate-fadeIn"
      _after={{
        content: "''",
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        height: "4px",
        borderRadius: "full",
        background: "linear-gradient(90deg, #3B82F6, #06D6A0)",
      }}
    >
      {children}
    </Heading>
  )
})
