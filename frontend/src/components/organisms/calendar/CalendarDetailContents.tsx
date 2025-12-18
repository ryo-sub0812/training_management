import { memo, VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

import { ScheduleNodeType } from '../../../../types/queriesType'
import { TrainingIcon } from '../../molecules/TrainingIcon'

type Props = ScheduleNodeType

export const CalendarDetailContents: VFC<Props> = memo((props) => {
  const { node } = props

  return (
    <Flex alignItems="center" gap={4} flex={1}>
      <Box
        w="64px"
        h="64px"
        borderRadius="xl"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
        borderWidth="2px"
        borderColor="purple.200"
        _dark={{ bg: 'gray.800', borderColor: 'purple.700' }}
        transition="all 0.3s"
        _hover={{
          transform: 'scale(1.1) rotate(3deg)',
          boxShadow: 'lg',
        }}
        p={2}
      >
        <TrainingIcon
          iconNumber={node.training.iconNumber}
          color="black"
          size="40px"
        />
      </Box>
      <Box flex={1} minW={0}>
        <Text
          fontSize="xl"
          fontWeight="800"
          bgGradient="linear(to-r, purple.600, blue.600)"
          bgClip="text"
          _dark={{
            bgGradient: 'linear(to-r, purple.400, blue.400)',
            bgClip: 'text',
          }}
          data-testid={node.id + '-schedule-training'}
          title={node.training.title}
          noOfLines={1}
        >
          {node.training.title}
        </Text>
      </Box>
    </Flex>
  )
})
