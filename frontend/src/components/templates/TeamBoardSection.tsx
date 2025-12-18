import { memo, VFC } from 'react'
import { Box, Flex, Heading, Stack, Text, Image } from '@chakra-ui/react'

import { SectionTitle } from '../atoms/title/SectionTitle'
import { SectionCard } from '../organisms/layout/SectionCard'
import { TeamBoardPost } from '../organisms/team/TeamBoardPost'

type Props = {
  teamName: string | undefined
  introduction: string | undefined
  coachName: String | undefined
  joinCount: Number | undefined
  isMyTeam: boolean
}

export const TeamBoardSection: VFC<Props> = memo((props) => {
  const { teamName, introduction, coachName, joinCount, isMyTeam } = props

  return (
    <SectionCard width="450px">
      <SectionTitle>{teamName ? teamName : null}の掲示板</SectionTitle>
      <Box pb={10}>
        <Stack spacing={4}>
          <Flex justify="center">
            <Box
              borderRadius="full"
              overflow="hidden"
              boxSize="100px"
              borderWidth="3px"
              borderColor="purple.300"
              _dark={{ borderColor: 'purple.600' }}
              boxShadow="lg"
            >
              <Image
                borderRadius="full"
                boxSize="100px"
                src="/images/team.jpg"
                alt="チーム画像"
              />
            </Box>
          </Flex>
          <Box
            bg="white"
            borderRadius="xl"
            p={4}
            borderWidth="2px"
            borderColor="gray.200"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            boxShadow="md"
          >
            <Flex alignItems="center" mb={3}>
              <Heading
                fontSize={{ base: '13px', md: '16px' }}
                color="gray.700"
                _dark={{ color: 'gray.300' }}
              >
                コーチ:
              </Heading>
              <Text
                pl={4}
                fontWeight="semibold"
                color="gray.800"
                _dark={{ color: 'white' }}
                data-testid="team-coach-name"
              >
                {coachName}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Heading
                fontSize={{ base: '13px', md: '16px' }}
                color="gray.700"
                _dark={{ color: 'gray.300' }}
              >
                チーム人数:
              </Heading>
              <Text
                pl={4}
                fontWeight="semibold"
                color="gray.800"
                _dark={{ color: 'white' }}
                data-testid="team-join-count"
              >
                {joinCount.toString()}人
              </Text>
            </Flex>
          </Box>
          <Box
            bg="white"
            borderRadius="xl"
            p={4}
            borderWidth="2px"
            borderColor="gray.200"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            boxShadow="md"
          >
            <Heading
              fontSize={{ base: '13px', md: '16px' }}
              mb={2}
              color="gray.700"
              _dark={{ color: 'gray.300' }}
            >
              紹介文:
            </Heading>
            <Text
              color="gray.800"
              _dark={{ color: 'white' }}
              data-testid="team-introduction"
            >
              {introduction === '' ? '記載はありません。' : introduction}
            </Text>
          </Box>
        </Stack>
      </Box>
      {isMyTeam ? <TeamBoardPost /> : null}
    </SectionCard>
  )
})
