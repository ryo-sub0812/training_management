import { memo, ReactNode, VFC } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const SectionTitle: VFC<Props> = memo((props) => {
  const { children } = props

  return (
    <Heading
      as="h2"
      fontSize={{ base: '20px', md: '28px', lg: '32px' }}
      fontWeight="bold"
      pb={8}
      pt={4}
      textAlign="center"
      bgGradient="linear(to-r, #3B82F6, #06D6A0)"
      bgClip="text"
      position="relative"
      className="animate-slideInLeft"
      _after={{
        content: "''",
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "40px",
        height: "3px",
        borderRadius: "full",
        background: "linear-gradient(90deg, #3B82F6, #06D6A0)",
      }}
      _before={{
        content: "''",
        position: "absolute",
        top: "50%",
        left: "-20px",
        transform: "translateY(-50%)",
        width: "4px",
        height: "20px",
        borderRadius: "full",
        background: "linear-gradient(180deg, #3B82F6, #06D6A0)",
        opacity: 0.6,
      }}
    >
      {children}
    </Heading>
  )
})
