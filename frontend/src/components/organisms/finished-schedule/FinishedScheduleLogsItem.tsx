import { memo, VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { Card, CardContent } from '../../ui/card'

type Props = {
  id: string
  title: string
  date: string
  nickname: string
  count: number
  load: number
  distance: number
  minitus: number
  comment: string
}

export const FinishedScheduleLogsItem: VFC<Props> = memo((props) => {
  const { id, title, date, nickname, count, load, distance, minitus, comment } =
    props
  return (
    <Card className="mb-4 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
      <CardContent className="p-4">
        <Flex alignItems="center" mb={3}>
          <Box 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-3"
          >
            <FontAwesomeIcon 
              icon={faCircleUser} 
              className="text-primary text-lg" 
            />
          </Box>
          <Box flex={1}>
            <Text 
              fontWeight="semibold" 
              className="text-foreground"
              data-testid={`${id}-finished-schedule-nickname`}
            >
              {nickname}
            </Text>
            <Text 
              fontSize="sm" 
              className="text-muted-foreground"
              data-testid={`${id}-finished-schedule-date`}
            >
              {moment(date).format('M月D日(ddd)')}
            </Text>
          </Box>
          <Box className="bg-success/20 text-success px-3 py-1 rounded-full text-xs font-semibold">
            ✅ 実施完了
          </Box>
        </Flex>
        
        <Box className="bg-secondary/30 rounded-lg p-3 mb-3">
          <Text 
            fontWeight="medium" 
            className="text-foreground mb-2"
            data-testid={`${id}-finished-schedule-title`}
          >
            {title}
          </Text>
          <Flex wrap="wrap" gap={2}>
            {count !== 0 && (
              <Box className="bg-card px-2 py-1 rounded text-xs font-medium" data-testid={`${id}-finished-schedule-count`}>
                🔄 {count}回
              </Box>
            )}
            {load !== 0 && (
              <Box className="bg-card px-2 py-1 rounded text-xs font-medium" data-testid={`${id}-finished-schedule-load`}>
                ⚖️ {load}kg
              </Box>
            )}
            {distance !== 0 && (
              <Box className="bg-card px-2 py-1 rounded text-xs font-medium" data-testid={`${id}-finished-schedule-distance`}>
                🏃 {distance}km
              </Box>
            )}
            {minitus !== 0 && (
              <Box className="bg-card px-2 py-1 rounded text-xs font-medium" data-testid={`${id}-finished-schedule-minitus`}>
                ⏱️ {minitus}分
              </Box>
            )}
          </Flex>
        </Box>
        
        {comment !== '' && (
          <Box className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <Text 
              fontSize="sm" 
              className="text-foreground"
              data-testid={`${id}-finished-schedule-comment`}
            >
              💬 <strong>コメント:</strong> {comment}
            </Text>
          </Box>
        )}
      </CardContent>
    </Card>
  )
})
