import { memo, VFC } from 'react'
import { Box, Stack, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type Props = {
  teamId: string
  teamName: string
  coachName: string
  introduction: string
  joinCount: number
}

export const TeamCard: VFC<Props> = memo((props) => {
  const { teamId, teamName, coachName, introduction, joinCount } = props

  const router = useRouter()

  return (
    <Box
      w="320px"
      p={6}
      ml={{ base: '20px', md: '0px' }}
      mr={{ base: '0px', md: '20px' }}
      mb="30px"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(20px)"
      borderRadius="24px"
      border="1px solid rgba(255, 255, 255, 0.2)"
      display="block"
      fontSize={{ md: '16px' }}
      cursor="pointer"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.5)",
      }}
      onClick={async () => {
        router.push(`/teams/${teamId}`)
      }}
      position="relative"
      overflow="hidden"
      _before={{
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
      _hover_before={{
        opacity: 1,
      }}
    >
      <Stack spacing={6} position="relative" zIndex={1}>
        <Text 
          textAlign="center" 
          fontSize="xl" 
          fontWeight="bold" 
          color="white"
          bgGradient="linear(to-r, #3B82F6, #10B981)"
          bgClip="text"
          data-testId={`${teamId}-team-name`}
        >
          {teamName}
        </Text>
        <Box display="flex" justifyContent="center">
          <Image
            borderRadius="full"
            boxSize="120px"
            src="/images/team.jpg"
            alt="チーム画像"
            border="3px solid rgba(255, 255, 255, 0.3)"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.1) rotate(5deg)",
              borderColor: "rgba(59, 130, 246, 0.5)",
            }}
          />
        </Box>
        <Box>
          <Text color="gray.200" fontSize="md" fontWeight="medium" data-testId={`${teamId}-team-coach`}>
            🏃‍♀️ コーチ: <Text as="span" color="white" fontWeight="bold">{coachName}</Text>
          </Text>
        </Box>
        <Box>
          <Text color="gray.200" fontSize="md" fontWeight="medium" data-testId={`${teamId}-team-join-count`}>
            👥 チーム人数: <Text as="span" color="white" fontWeight="bold">{joinCount}人</Text>
          </Text>
        </Box>
        <Box 
          bg="rgba(0, 0, 0, 0.2)" 
          p={4} 
          borderRadius="lg" 
          border="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Text color="gray.300" fontSize="sm" mb={2} fontWeight="semibold">
            📝 紹介文:
          </Text>
          <Text color="gray.100" fontSize="sm" lineHeight="1.6">
            {introduction ? introduction : '記載なし'}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
})
