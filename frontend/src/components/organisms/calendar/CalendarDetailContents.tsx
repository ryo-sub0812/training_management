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
          w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 via-accent/25 to-secondary/20
          flex items-center justify-center shadow-lg border-2 border-primary/30
          transition-all duration-300 hover:scale-110 hover:rotate-3
        "
      >
        <TrainingIcon
          iconNumber={node.training.iconNumber}
          color="white"
          size="40px"
        />
      </Box>
      <Box className="flex-1 min-w-0">
        <Text
          className="
            text-lg font-bold text-foreground
            bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
            truncate
          "
          data-testid={node.id + '-schedule-training'}
          title={node.training.title}
        >
          {node.training.title}
        </Text>
      </Box>
    </Flex>
  )
})
