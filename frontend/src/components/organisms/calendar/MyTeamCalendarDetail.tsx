import { VFC, memo } from 'react'
import { Box, Flex, Link, Text, Stack } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import moment from 'moment'
import { Button } from '@chakra-ui/react'

import { scheduleOneDayState } from '../../../store/scheduleOneDayState'
import { useGetOneDaySchedules } from '../../../hooks/queries/useGetOneDaySchedules'
import { useGetMyProfile } from '../../../hooks/queries/useGetMyProfile'
import { CustomSpinner } from '../../atoms/spinner/CustomSpinner'
import { FailedText } from '../../atoms/text/FailedText'
import { TODAY } from '../../../../constants'
import { useNumber } from '../../../hooks/useNumber'
import { CalendarDetailMenubar } from './CalendarDetailMenubar'
import { CalendarDetailContents } from './CalendarDetailContents'
import { useControllModal } from '../../../hooks/useControllModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const MyTeamCalendarDetail: VFC = memo(() => {
  const { dataMyProfile } = useGetMyProfile()
  const { loadingOnedaySchedules, dataOneDaySchedules, errorOneDaySchedules } =
    useGetOneDaySchedules()
  const { zeroNumber } = useNumber()
  const {
    onOpenConfirmScheduleDeleteModal,
    onOpenFinishedScheduleCreateModal,
    onOpenConfirmFinishedScheduleDeleteModal,
    onOpenFinishedScheduleMemberListModal,
  } = useControllModal()

  const oneDay = useRecoilValue(scheduleOneDayState)

  return (
    <Box textAlign="center">
      {loadingOnedaySchedules ? (
        <CustomSpinner />
      ) : (
        <>
          <CalendarDetailMenubar />
          <Box py={7}>
            {errorOneDaySchedules && <FailedText />}
            {dataOneDaySchedules?.myTeamSchedules.edges?.length === 0 && (
              <Box className="text-center py-12">
                <Text className="text-muted-foreground text-lg">
                  📅 予定はありません
                </Text>
              </Box>
            )}
            <Stack spacing={4}>
              {dataOneDaySchedules?.myTeamSchedules.edges?.map(({ node }) => {
                const isFinished = node.finishedSchedules.edges?.some(
                  ({ node }) => node.profile.id === dataMyProfile?.myProfile.id
                )
                const isPast = moment(oneDay).isBefore(moment(TODAY))
                const isToday = oneDay === TODAY

                return (
                  <Box
                    key={node.id}
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
                    {/* メインコンテンツエリア */}
                    <Flex direction="column" gap={4}>
                      {/* トレーニング情報 */}
                      <CalendarDetailContents node={node} />

                      {/* アクションエリア */}
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        gap={4}
                        flexWrap="wrap"
                      >
                        {/* 左側: 実施ステータス */}
                        <Flex alignItems="center" gap={3}>
                          {isPast && (
                            <Box>
                              {isFinished ? (
                                <Box
                                  px={4}
                                  py={2}
                                  borderRadius="lg"
                                  bg="green.50"
                                  color="green.700"
                                  fontWeight="bold"
                                  fontSize="sm"
                                  borderWidth="2px"
                                  borderColor="green.300"
                                  _dark={{
                                    bg: 'green.900/30',
                                    color: 'green.400',
                                    borderColor: 'green.700',
                                  }}
                                  boxShadow="sm"
                                  data-testid={
                                    node.id + '-previous-finished-text'
                                  }
                                >
                                  ✅ 実施済み
                                </Box>
                              ) : (
                                <Box
                                  px={4}
                                  py={2}
                                  borderRadius="lg"
                                  bg="gray.50"
                                  color="gray.600"
                                  fontWeight="semibold"
                                  fontSize="sm"
                                  borderWidth="2px"
                                  borderColor="gray.300"
                                  _dark={{
                                    bg: 'gray.700',
                                    color: 'gray.400',
                                    borderColor: 'gray.600',
                                  }}
                                  boxShadow="sm"
                                  data-testid={
                                    node.id + '-previous-not-finished-text'
                                  }
                                >
                                  ⏸️ 未実施
                                </Box>
                              )}
                            </Box>
                          )}

                          {!dataMyProfile?.myProfile.isGuest && isToday && (
                            <Box>
                              {isFinished ? (
                                <Link
                                  px={4}
                                  py={2}
                                  borderRadius="lg"
                                  bg="green.50"
                                  color="green.700"
                                  fontWeight="bold"
                                  fontSize="sm"
                                  borderWidth="2px"
                                  borderColor="green.300"
                                  _dark={{
                                    bg: 'green.900/30',
                                    color: 'green.400',
                                    borderColor: 'green.700',
                                  }}
                                  boxShadow="sm"
                                  _hover={{
                                    bg: 'green.100',
                                    _dark: { bg: 'green.900/50' },
                                    boxShadow: 'md',
                                    transform: 'translateY(-1px)',
                                  }}
                                  transition="all 0.2s"
                                  cursor="pointer"
                                  display="inline-block"
                                  data-testid={node.id + '-finished-text'}
                                  onClick={() => {
                                    onOpenConfirmFinishedScheduleDeleteModal(
                                      node.id,
                                      node.training.title,
                                      node.date
                                    )
                                  }}
                                >
                                  ✅ 実施済み
                                </Link>
                              ) : (
                                <Button
                                  data-testid={
                                    node.id + '-schedule-finished-create-button'
                                  }
                                  size="md"
                                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                  color="white"
                                  fontWeight="bold"
                                  boxShadow="md"
                                  _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                  }}
                                  onClick={() => {
                                    onOpenFinishedScheduleCreateModal(
                                      node.id,
                                      node.training.title,
                                      node.date,
                                      node.training.finishedPatern
                                    )
                                  }}
                                >
                                  🎯 実施する
                                </Button>
                              )}
                            </Box>
                          )}
                        </Flex>

                        {/* 右側: 削除ボタン（コーチのみ） */}
                        {dataMyProfile?.myProfile.isCoach && (
                          <Box
                            p={2}
                            borderRadius="lg"
                            _hover={{
                              bg: 'red.50',
                              _dark: { bg: 'red.900/20' },
                            }}
                            cursor="pointer"
                            transition="all 0.2s"
                            data-testid={node.id + '-schedule-delete-icon'}
                            onClick={() => {
                              onOpenConfirmScheduleDeleteModal(
                                node.id,
                                node.training.title,
                                oneDay,
                                '',
                                '',
                                false
                              )
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              size="lg"
                            />
                          </Box>
                        )}
                      </Flex>

                      {/* コーチ向け情報 */}
                      {dataMyProfile?.myProfile.isCoach && (
                        <Box
                          mt={2}
                          pt={4}
                          borderTopWidth="1px"
                          borderColor="gray.200"
                          _dark={{ borderColor: 'gray.700' }}
                        >
                          <Flex
                            alignItems="center"
                            gap={4}
                            flexWrap="wrap"
                            justifyContent="space-between"
                          >
                            <Box
                              px={4}
                              py={2}
                              borderRadius="lg"
                              bg="blue.50"
                              borderWidth="1px"
                              borderColor="blue.200"
                              _dark={{
                                bg: 'blue.900/20',
                                borderColor: 'blue.800',
                              }}
                              boxShadow="sm"
                              data-testid={node.id + '-finished-count'}
                            >
                              <Text
                                fontWeight="bold"
                                color="blue.700"
                                _dark={{ color: 'blue.400' }}
                                fontSize="sm"
                              >
                                👥 {node.finishedCount}/
                                {dataMyProfile?.myProfile.teamBoard.joinCount}
                                人実施
                              </Text>
                            </Box>
                            <Link
                              display={{ base: 'none', md: 'inline' }}
                              px={4}
                              py={2}
                              borderRadius="lg"
                              bg="purple.50"
                              color="purple.700"
                              fontWeight="bold"
                              borderWidth="1px"
                              borderColor="purple.200"
                              _dark={{
                                bg: 'purple.900/20',
                                color: 'purple.400',
                                borderColor: 'purple.800',
                              }}
                              _hover={{
                                bg: 'purple.100',
                                _dark: { bg: 'purple.900/30' },
                                boxShadow: 'sm',
                              }}
                              transition="all 0.2s"
                              boxShadow="sm"
                              data-testid={node.id + '-finished-member-link'}
                              onClick={() =>
                                onOpenFinishedScheduleMemberListModal(
                                  node.id,
                                  node.training.title,
                                  node.date,
                                  'section'
                                )
                              }
                            >
                              📋 実施者一覧
                            </Link>
                            <Link
                              display={{ base: 'inline', md: 'none' }}
                              px={4}
                              py={2}
                              borderRadius="lg"
                              bg="purple.50"
                              color="purple.700"
                              fontWeight="bold"
                              borderWidth="1px"
                              borderColor="purple.200"
                              _dark={{
                                bg: 'purple.900/20',
                                color: 'purple.400',
                                borderColor: 'purple.800',
                              }}
                              _hover={{
                                bg: 'purple.100',
                                _dark: { bg: 'purple.900/30' },
                                boxShadow: 'sm',
                              }}
                              transition="all 0.2s"
                              boxShadow="sm"
                              onClick={() =>
                                onOpenFinishedScheduleMemberListModal(
                                  node.id,
                                  node.training.title,
                                  node.date,
                                  'modal'
                                )
                              }
                            >
                              📋 実施者一覧
                            </Link>
                          </Flex>
                        </Box>
                      )}
                    </Flex>
                  </Box>
                )
              })}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  )
})
