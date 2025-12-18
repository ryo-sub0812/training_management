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
                    className="
                      rounded-2xl p-6 bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl
                      transition-all duration-300 hover:-translate-y-1
                    "
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
                                  className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold text-sm border border-green-200 dark:border-green-800"
                                  data-testid={
                                    node.id + '-previous-finished-text'
                                  }
                                >
                                  ✓ 実施済み
                                </Box>
                              ) : (
                                <Box
                                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm border border-gray-200 dark:border-gray-600"
                                  data-testid={
                                    node.id + '-previous-not-finished-text'
                                  }
                                >
                                  ○ 未実施
                                </Box>
                              )}
                            </Box>
                          )}

                          {!dataMyProfile?.myProfile.isGuest && isToday && (
                            <Box>
                              {isFinished ? (
                                <Link
                                  className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold text-sm border border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors cursor-pointer inline-block"
                                  data-testid={node.id + '-finished-text'}
                                  onClick={() => {
                                    onOpenConfirmFinishedScheduleDeleteModal(
                                      node.id,
                                      node.training.title,
                                      node.date
                                    )
                                  }}
                                >
                                  ✓ 実施済み
                                </Link>
                              ) : (
                                <Button
                                  data-testid={
                                    node.id + '-schedule-finished-create-button'
                                  }
                                  size="md"
                                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                  color="white"
                                  fontWeight="semibold"
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
                                  実施する
                                </Button>
                              )}
                            </Box>
                          )}
                        </Flex>

                        {/* 右側: 削除ボタン（コーチのみ） */}
                        {dataMyProfile?.myProfile.isCoach && (
                          <Box
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all"
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
                        <Box className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Flex
                            alignItems="center"
                            gap={4}
                            flexWrap="wrap"
                            justifyContent="space-between"
                          >
                            <Box
                              className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                              data-testid={node.id + '-finished-count'}
                            >
                              <Text className="font-semibold text-blue-700 dark:text-blue-400 text-sm">
                                {node.finishedCount}/
                                {dataMyProfile?.myProfile.teamBoard.joinCount}
                                人実施
                              </Text>
                            </Box>
                            <Link
                              display={{ base: 'none', md: 'inline' }}
                              className="px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-200 dark:border-purple-800"
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
                              実施者一覧
                            </Link>
                            <Link
                              display={{ base: 'inline', md: 'none' }}
                              className="px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-200 dark:border-purple-800"
                              onClick={() =>
                                onOpenFinishedScheduleMemberListModal(
                                  node.id,
                                  node.training.title,
                                  node.date,
                                  'modal'
                                )
                              }
                            >
                              実施者一覧
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
