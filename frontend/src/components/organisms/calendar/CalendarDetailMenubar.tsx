import 'moment/locale/ja'

import { memo, VFC } from 'react'
import { Flex, Button, Box } from '@chakra-ui/react'
import moment from 'moment'

import { useCalendar } from '../../../hooks/useCalendar'
import { SectionTitle } from '../../atoms/title/SectionTitle'
import { TODAY } from '../../../../constants'
import { useRecoilValue } from 'recoil'
import { scheduleOneDayState } from '../../../store/scheduleOneDayState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

moment.locale('ja')

export const CalendarDetailMenubar: VFC = memo(() => {
  const { onClickPreviousDate, onClickNextDate } = useCalendar()
  const oneDay = useRecoilValue(scheduleOneDayState)

  return (
    <Flex justify="space-between" alignItems="center" gap={4}>
      <Button
        onClick={onClickPreviousDate}
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
        data-testid="previous-date"
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color: '#805AD5' }}
          className="dark:text-purple-400"
          size="lg"
        />
      </Button>
      <Box flex={1}>
        <SectionTitle>
          {oneDay === TODAY
            ? '今日のスケジュール'
            : `${moment(oneDay).format('M/D(ddd)')}のスケジュール`}
        </SectionTitle>
      </Box>
      <Button
        onClick={onClickNextDate}
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
        data-testid="next-date"
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          style={{ color: '#805AD5' }}
          className="dark:text-purple-400"
          size="lg"
        />
      </Button>
    </Flex>
  )
})
