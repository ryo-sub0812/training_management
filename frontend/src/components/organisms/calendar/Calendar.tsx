import { memo, useCallback, useEffect, useState, VFC } from 'react'
import { Box, Flex, Link, Text, Wrap, WrapItem } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { TODAY } from '../../../../constants'
import { scheduleOneDayState } from '../../../store/scheduleOneDayState'
import { Maybe, ScheduleNodeType } from '../../../../types/queriesType'
import { TrainingIcon } from '../../molecules/TrainingIcon'
import { calendarDateState } from '../../../store/calendarDateState'

type Props = {
  schedules:
    | {
        edges: Maybe<ScheduleNodeType[]>
      }
    | undefined
}

export const Calendar: VFC<Props> = memo((props) => {
  const { schedules } = props

  const calendarDate = useRecoilValue(calendarDateState)
  const setOneDay = useSetRecoilState(scheduleOneDayState)

  const [isIconMode, setIsIconMode] = useState(true)
  const [datesOfWeek, setDatesOfWeek] = useState<Moment[]>([])

  const onChangeIsIconMode = useCallback(
    () => setIsIconMode(!isIconMode),
    [isIconMode]
  )

  const weekSchedules = useCallback(
    (d: moment.Moment) =>
      schedules?.edges
        ?.filter((sche) => sche.node.date === d.format('YYYY-MM-DD').toString())
        .map(({ node }) => (
          <WrapItem
            key={node.id}
            alignItems="center"
            data-testid={node.id + '-schedule-item'}
            className="group/item"
          >
            {isIconMode && node.training.iconNumber ? (
              <Box
                className="
                  w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 
                  flex items-center justify-center shadow-md hover:shadow-lg
                  transition-all duration-300 hover:scale-110 hover:rotate-3
                  border border-primary/20
                "
              >
                <TrainingIcon
                  iconNumber={node.training.iconNumber}
                  color="white"
                  size="32px"
                />
              </Box>
            ) : (
              <Box
                className="
                  px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20
                  border border-primary/30 shadow-sm hover:shadow-md
                  transition-all duration-300 hover:scale-105
                  max-w-[150px]
                "
              >
                <Text
                  className="text-foreground font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis"
                  title={node.training.title}
                >
                  {node.training.title}
                </Text>
              </Box>
            )}
          </WrapItem>
        )),
    [schedules, isIconMode]
  )

  useEffect(() => {
    const dates: Moment[] = []
    let addDate = 0
    while (addDate < 7) {
      const date = moment(calendarDate.firstDate).add(addDate, 'd')
      dates.push(date)
      addDate++
    }
    setDatesOfWeek(dates)
  }, [calendarDate.firstDate])

  return (
    <Box pt={3} mb={3}>
      <Box pb={4} textAlign="right">
        <Link
          onClick={onChangeIsIconMode}
          className="text-primary hover:text-accent font-medium text-sm transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-primary/10 inline-block"
        >
          {isIconMode
            ? '📝 予定を文字表記にする'
            : '🎯 予定をアイコン表記にする'}
        </Link>
      </Box>
      <Box className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-xl p-4 mb-4 border border-primary/20">
        <Flex className="text-sm font-semibold text-muted-foreground">
          <Text w={{ base: '110px', md: '120px' }}>📅 日付</Text>
          <Text pl={{ base: '10px', md: '40px' }}>🎯 予定</Text>
        </Flex>
      </Box>
      <Box>
        {datesOfWeek.map((date, i) => {
          const isToday = date.format('YYYY-MM-DD') === TODAY
          const isSunday = date.format('ddd') === '日'
          const isSaturday = date.format('ddd') === '土'

          return (
            <Box
              key={i}
              mb={2}
              className={`
                rounded-xl p-4 transition-all duration-300 cursor-pointer
                ${
                  isToday
                    ? 'bg-gradient-to-r from-primary/20 via-accent/15 to-secondary/10 border-2 border-primary/40 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
                    : 'bg-card/50 border border-border/30 hover:bg-card/70 hover:border-primary/30 hover:shadow-md'
                }
                hover:scale-[1.01] hover:-translate-y-0.5
              `}
              onClick={() => {
                setOneDay(date.format('YYYY-MM-DD'))
              }}
            >
              <Flex alignItems="center" gap={4}>
                <Box
                  minW="120px"
                  className={`
                    px-3 py-2 rounded-lg font-semibold text-sm
                    ${
                      isToday
                        ? 'bg-primary/30 text-primary-foreground shadow-md'
                        : isSunday
                        ? 'bg-red-500/20 text-red-400'
                        : isSaturday
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-secondary/20 text-foreground'
                    }
                  `}
                >
                  {moment(calendarDate.firstDate).get('M') + 1 === date.get('M')
                    ? date.format('M月D日(ddd)')
                    : date.format('D日(ddd)')}
                  {isToday && <span className="ml-2 text-xs">✨</span>}
                </Box>
                <Wrap flex={1} spacing={2}>
                  {weekSchedules(date)}
                </Wrap>
              </Flex>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
})
