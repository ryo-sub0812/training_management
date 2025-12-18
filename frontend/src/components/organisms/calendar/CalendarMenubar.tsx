import { memo, VFC } from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/react'
import moment from 'moment'

import { useCalendar } from '../../../hooks/useCalendar'
import { useRecoilValue } from 'recoil'
import { calendarDateState } from '../../../store/calendarDateState'
import { SectionTitle } from '../../atoms/title/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

export const CalendarMenubar: VFC = memo(() => {
  const calendarDate = useRecoilValue(calendarDateState)

  const { firstDate, todayDiff } = calendarDate

  const { onClickLastWeek, onClickThisWeek, onClickNextWeek } = useCalendar()

  return (
    <>
      <Flex justify="flex-end" mb={4}>
        <Button
          onClick={onClickThisWeek}
          size="sm"
          bg="purple.100"
          color="purple.700"
          fontWeight="semibold"
          borderWidth="1px"
          borderColor="purple.300"
          _dark={{
            bg: 'purple.900/30',
            color: 'purple.300',
            borderColor: 'purple.700',
          }}
          _hover={{
            bg: 'purple.200',
            _dark: { bg: 'purple.900/50' },
            transform: 'translateY(-1px)',
            boxShadow: 'sm',
          }}
          transition="all 0.2s"
          data-testid="this-week"
        >
          今週
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" gap={4}>
        <Button
          onClick={onClickLastWeek}
          size="md"
          w="44px"
          h="44px"
          borderRadius="xl"
          bg="white"
          borderWidth="2px"
          borderColor="purple.300"
          _dark={{ bg: 'gray.800', borderColor: 'purple.600' }}
          boxShadow="md"
          _hover={{
            bg: 'purple.50',
            _dark: { bg: 'purple.900/20' },
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-testid="last-week"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-purple-600 dark:text-purple-400"
            size="lg"
          />
        </Button>
        <Box flex={1}>
          <SectionTitle>
            {moment(firstDate).get('M') + 1}月
            {todayDiff < 0 ? `(${Math.abs(todayDiff).toString()}週前)` : null}
            {todayDiff === 0 ? '(今週)' : null}
            {todayDiff > 0 ? `(${todayDiff.toString()}週後)` : null}
          </SectionTitle>
        </Box>
        <Button
          onClick={onClickNextWeek}
          size="md"
          w="44px"
          h="44px"
          borderRadius="xl"
          bg="white"
          borderWidth="2px"
          borderColor="purple.300"
          _dark={{ bg: 'gray.800', borderColor: 'purple.600' }}
          boxShadow="md"
          _hover={{
            bg: 'purple.50',
            _dark: { bg: 'purple.900/20' },
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-testid="next-week"
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-purple-600 dark:text-purple-400"
            size="lg"
          />
        </Button>
      </Flex>
    </>
  )
})
