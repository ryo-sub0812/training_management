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
                      rounded-xl p-5 bg-gradient-to-br from-card/80 to-card/60
                      border-2 border-primary/20 shadow-lg hover:shadow-xl
                      transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1
                      hover:border-primary/40
                    "
                  >
                    <Flex alignItems="center" gap={4} mb={3}>
                      <CalendarDetailContents node={node} />

                      {/* 実施ステータス */}
                      {isPast && (
                        <Box>
                          {isFinished ? (
                            <Box
                              className="px-3 py-1.5 rounded-full bg-success/20 text-success font-semibold text-sm shadow-sm"
                              data-testid={node.id + '-previous-finished-text'}
                            >
                              ✅ 実施済み
                            </Box>
                          ) : (
                            <Box
                              className="px-3 py-1.5 rounded-full bg-muted/30 text-muted-foreground font-semibold text-sm"
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
                              className="px-3 py-1.5 rounded-full bg-success/20 text-success font-semibold text-sm shadow-sm hover:bg-success/30 transition-colors cursor-pointer inline-block"
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
                              size="sm"
                              className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-md hover:shadow-lg transition-all"
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

                      {dataMyProfile?.myProfile.isCoach && (
                        <Box
                          className="p-2 rounded-lg hover:bg-red-500/10 cursor-pointer transition-all"
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
                            className="text-red-500 hover:text-red-600 transition-colors"
                          />
                        </Box>
                      )}
                    </Flex>

                    {/* コーチ向け情報 */}
                    {dataMyProfile?.myProfile.isCoach && (
                      <Box className="mt-4 pt-4 border-t border-border/30">
                        <Flex alignItems="center" gap={4} flexWrap="wrap">
                          <Box
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
                            data-testid={node.id + '-finished-count'}
                          >
                            <Text className="font-semibold text-foreground">
                              👥 {node.finishedCount}/
                              {dataMyProfile?.myProfile.teamBoard.joinCount}
                              人実施
                            </Text>
                          </Box>
                          <Link
                            display={{ base: 'none', md: 'inline' }}
                            className="px-4 py-2 rounded-lg bg-accent/20 text-accent font-semibold hover:bg-accent/30 transition-colors"
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
                            className="px-4 py-2 rounded-lg bg-accent/20 text-accent font-semibold hover:bg-accent/30 transition-colors"
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
