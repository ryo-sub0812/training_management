import { memo, VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

import { ScheduleNodeType } from '../../../../types/queriesType'
import { TrainingIcon } from '../../molecules/TrainingIcon'

type Props = ScheduleNodeType

export const CalendarDetailContents: VFC<Props> = memo((props) => {
  const { node } = props

  return (
    <Flex alignItems="center" gap={4} className="flex-1">
      <Box
        className="
          w-16 h-16 rounded-2xl bg-white dark:bg-gray-800
          flex items-center justify-center shadow-lg border-2 border-primary/20
          transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-xl
          p-2
        "
      >
        <TrainingIcon
          iconNumber={node.training.iconNumber}
          color="black"
          size="40px"
        />
      </Box>
      <Box className="flex-1 min-w-0">
        <Text
          className="text-xl font-bold text-gray-900 dark:text-white"
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
