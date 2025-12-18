import { memo, VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

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
    <Box
      mb={4}
      bg="white"
      borderRadius="xl"
      p={5}
      borderWidth="2px"
      borderColor="gray.200"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      boxShadow="md"
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s"
    >
      <Flex alignItems="center" mb={4}>
        <Box
          w="40px"
          h="40px"
          borderRadius="full"
          bg="purple.50"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={3}
          borderWidth="2px"
          borderColor="purple.200"
          _dark={{ bg: 'purple.900/20', borderColor: 'purple.700' }}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-purple-600 dark:text-purple-400"
            size="lg"
          />
        </Box>
        <Box flex={1}>
          <Text
            fontWeight="bold"
            fontSize="md"
            color="gray.800"
            _dark={{ color: 'white' }}
            data-testid={`${id}-finished-schedule-nickname`}
          >
            {nickname}
          </Text>
          <Text
            fontSize="sm"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            data-testid={`${id}-finished-schedule-date`}
          >
            {moment(date).format('M月D日(ddd)')}
          </Text>
        </Box>
        <Box
          px={3}
          py={1.5}
          borderRadius="full"
          bg="green.50"
          color="green.700"
          fontSize="xs"
          fontWeight="bold"
          borderWidth="2px"
          borderColor="green.300"
          _dark={{
            bg: 'green.900/30',
            color: 'green.400',
            borderColor: 'green.700',
          }}
          boxShadow="sm"
        >
          ✅ 実施完了
        </Box>
      </Flex>

      <Box
        bg="purple.50"
        borderRadius="lg"
        p={4}
        mb={3}
        borderWidth="1px"
        borderColor="purple.200"
        _dark={{ bg: 'purple.900/20', borderColor: 'purple.700' }}
      >
        <Text
          fontWeight="800"
          fontSize="lg"
          bgGradient="linear(to-r, purple.600, blue.600)"
          bgClip="text"
          _dark={{
            bgGradient: 'linear(to-r, purple.400, blue.400)',
            bgClip: 'text',
          }}
          mb={3}
          data-testid={`${id}-finished-schedule-title`}
        >
          {title}
        </Text>
        <Flex wrap="wrap" gap={2}>
          {count !== 0 && (
            <Box
              px={3}
              py={1.5}
              borderRadius="md"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="sm"
              fontSize="xs"
              fontWeight="medium"
              color="gray.700"
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.700',
                color: 'gray.300',
              }}
              data-testid={`${id}-finished-schedule-count`}
            >
              🔄 {count}回
            </Box>
          )}
          {load !== 0 && (
            <Box
              px={3}
              py={1.5}
              borderRadius="md"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="sm"
              fontSize="xs"
              fontWeight="medium"
              color="gray.700"
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.700',
                color: 'gray.300',
              }}
              data-testid={`${id}-finished-schedule-load`}
            >
              ⚖️ {load}kg
            </Box>
          )}
          {distance !== 0 && (
            <Box
              px={3}
              py={1.5}
              borderRadius="md"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="sm"
              fontSize="xs"
              fontWeight="medium"
              color="gray.700"
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.700',
                color: 'gray.300',
              }}
              data-testid={`${id}-finished-schedule-distance`}
            >
              🏃 {distance}km
            </Box>
          )}
          {minitus !== 0 && (
            <Box
              px={3}
              py={1.5}
              borderRadius="md"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="sm"
              fontSize="xs"
              fontWeight="medium"
              color="gray.700"
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.700',
                color: 'gray.300',
              }}
              data-testid={`${id}-finished-schedule-minitus`}
            >
              ⏱️ {minitus}分
            </Box>
          )}
        </Flex>
      </Box>

      {comment !== '' && (
        <Box
          bg="blue.50"
          borderWidth="1px"
          borderColor="blue.200"
          _dark={{ bg: 'blue.900/20', borderColor: 'blue.700' }}
          borderRadius="lg"
          p={3}
        >
          <Text
            fontSize="sm"
            color="gray.700"
            _dark={{ color: 'gray.300' }}
            data-testid={`${id}-finished-schedule-comment`}
          >
            💬 <strong>コメント:</strong> {comment}
          </Text>
        </Box>
      )}
    </Box>
  )
})
