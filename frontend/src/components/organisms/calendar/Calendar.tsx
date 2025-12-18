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
                  w-12 h-12 rounded-xl bg-white dark:bg-gray-800
                  flex items-center justify-center shadow-md hover:shadow-lg
                  transition-all duration-300 hover:scale-110 hover:rotate-3
                  border-2 border-gray-200 dark:border-gray-700 p-2
                "
              >
                <TrainingIcon
                  iconNumber={node.training.iconNumber}
                  color="black"
                  size="32px"
                />
              </Box>
            ) : (
              <Box
                className="
                  px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md
                  transition-all duration-300 hover:scale-105
                  max-w-[150px]
                "
              >
                <Text
                  className="text-gray-800 dark:text-white font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis"
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
          color="gray.600"
          _dark={{ color: 'gray.300' }}
          fontWeight="medium"
          fontSize="sm"
          px={3}
          py={1.5}
          borderRadius="lg"
          _hover={{
            bg: 'gray.100',
            _dark: { bg: 'gray.700' },
          }}
          transition="all 0.2s"
        >
          {isIconMode
            ? '📝 予定を文字表記にする'
            : '🎯 予定をアイコン表記にする'}
        </Link>
      </Box>
      <Box
        bg="gray.50"
        _dark={{ bg: 'gray.800' }}
        borderRadius="xl"
        p={4}
        mb={4}
        borderWidth="1px"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
      >
        <Flex
          fontSize="sm"
          fontWeight="semibold"
          color="gray.600"
          _dark={{ color: 'gray.400' }}
        >
          <Text w={{ base: '110px', md: '120px' }}>日付</Text>
          <Text pl={{ base: '10px', md: '40px' }}>予定</Text>
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
              bg="white"
              _dark={{ bg: 'gray.800' }}
              borderRadius="xl"
              p={4}
              borderWidth={isToday ? '2px' : '1px'}
              borderColor={
                isToday
                  ? 'purple.400'
                  : isSunday
                  ? 'red.200'
                  : isSaturday
                  ? 'blue.200'
                  : 'gray.200'
              }
              _dark={{
                borderColor: isToday
                  ? 'purple.500'
                  : isSunday
                  ? 'red.600'
                  : isSaturday
                  ? 'blue.600'
                  : 'gray.700',
              }}
              boxShadow={isToday ? 'lg' : 'sm'}
              _hover={{
                boxShadow: 'xl',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.3s"
              cursor="pointer"
              onClick={() => {
                setOneDay(date.format('YYYY-MM-DD'))
              }}
            >
              <Flex alignItems="center" gap={4}>
                <Box
                  minW="120px"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  fontWeight="semibold"
                  fontSize="sm"
                  bg={
                    isToday
                      ? 'purple.100'
                      : isSunday
                      ? 'red.50'
                      : isSaturday
                      ? 'blue.50'
                      : 'gray.50'
                  }
                  _dark={{
                    bg: isToday
                      ? 'purple.900'
                      : isSunday
                      ? 'red.900'
                      : isSaturday
                      ? 'blue.900'
                      : 'gray.700',
                  }}
                  color={
                    isToday
                      ? 'purple.700'
                      : isSunday
                      ? 'red.600'
                      : isSaturday
                      ? 'blue.600'
                      : 'gray.700'
                  }
                  _dark={{
                    color: isToday
                      ? 'purple.300'
                      : isSunday
                      ? 'red.300'
                      : isSaturday
                      ? 'blue.300'
                      : 'gray.300',
                  }}
                  boxShadow="sm"
                >
                  {moment(calendarDate.firstDate).get('M') + 1 === date.get('M')
                    ? date.format('M月D日(ddd)')
                    : date.format('D日(ddd)')}
                  {isToday && (
                    <Text as="span" ml={2} fontSize="xs">
                      ✨
                    </Text>
                  )}
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
