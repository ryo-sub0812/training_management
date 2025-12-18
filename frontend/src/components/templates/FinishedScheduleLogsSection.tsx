import { memo } from 'react'
import { VFC } from 'react'
import { Box, Flex, Center, Link } from '@chakra-ui/react'
import { SectionTitle } from '../atoms/title/SectionTitle'
import { FetchMoreLink } from '../atoms/link/FetchMoreLink'
import { SectionCard } from '../organisms/layout/SectionCard'
import { useGetMyFinishedSchedules } from '../../hooks/queries/useGetMyFinishedSchedules'
import { CustomSpinner } from '../atoms/spinner/CustomSpinner'
import { FailedText } from '../atoms/text/FailedText'
import { FinishedScheduleLogsItem } from '../organisms/finished-schedule/FinishedScheduleLogsItem'
import { useGetMyTeamFinishedSchedules } from '../../hooks/queries/useGetMyTeamFinishedSchedules'
import { useState } from 'react'
import { useCallback } from 'react'

export const FinishedScheduleLogsSection: VFC = memo(() => {
  const [isMine, setIsMine] = useState(true)
  const [displayCount, setDisplayCount] = useState(10)

  const {
    loadingMyFinishedSchedules,
    dataMyFinishedSchedules,
    errorMyFinishedSchedules,
  } = useGetMyFinishedSchedules()
  const {
    loadingMyTeamFinishedSchedules,
    dataMyTeamFinishedSchedules,
    errorMyTeamFinishedSchedules,
  } = useGetMyTeamFinishedSchedules()

  const onClickDisplayMyLogs = useCallback(() => {
    setIsMine(true)
    setDisplayCount(10)
  }, [])
  const onClickDisplayMyTeamLogs = useCallback(() => {
    setIsMine(false)
    setDisplayCount(10)
  }, [])

  const onClickAddDisplayCount = useCallback(() => {
    setDisplayCount(displayCount + 10)
  }, [])
  const onClickResetDisplayCount = useCallback(() => {
    setDisplayCount(10)
  }, [])

  if (loadingMyFinishedSchedules || loadingMyTeamFinishedSchedules)
    return <CustomSpinner />
  return (
    <SectionCard width="400px">
      <SectionTitle>スケジュール実施記録</SectionTitle>
      <Flex justify="flex-end" pb={2}>
        <Link
          opacity={isMine ? 0.7 : 1.0}
          data-testid="change-my-finished-schedule-logs-link"
          onClick={onClickDisplayMyLogs}
        >
          自分のみ
        </Link>
        <Link
          pl={3}
          opacity={isMine ? 1.0 : 0.7}
          data-testid="change-my-team-finished-schedule-logs-link"
          onClick={onClickDisplayMyTeamLogs}
        >
          チーム全体
        </Link>
      </Flex>
      {errorMyFinishedSchedules || errorMyTeamFinishedSchedules ? (
        <FailedText />
      ) : (
        <Box borderTop="1px solid #718096">
          {isMine ? (
            <>
              {dataMyFinishedSchedules.myFinishedSchedules.edges.length ===
                0 && <Center mt={10}>スケジュールを実施していません。</Center>}
              {dataMyFinishedSchedules.myFinishedSchedules.edges
                .slice(0, displayCount)
                .map(({ node }) => (
                  <FinishedScheduleLogsItem
                    key={node.id}
                    id={node.id}
                    title={node.training.title}
                    date={node.schedule.date}
                    nickname={node.profile.nickname}
                    count={node.count}
                    load={node.load}
                    distance={node.distance}
                    minitus={node.minitus}
                    comment={node.comment}
                  />
                ))}
              {dataMyFinishedSchedules.myFinishedSchedules.edges.slice(
                displayCount
              ).length !== 0 && (
                <Box textAlign="center" mt={5}>
                  <FetchMoreLink
                    name="finished-schedule-my-log"
                    text="さらに10件表示"
                    onClick={onClickAddDisplayCount}
                  />
                </Box>
              )}
            </>
          ) : (
            <>
              {dataMyTeamFinishedSchedules.myTeamFinishedSchedules.edges
                .length === 0 && (
                <Center mt={10}>スケジュールを実施していません。</Center>
              )}
              {dataMyTeamFinishedSchedules.myTeamFinishedSchedules.edges
                .slice(0, displayCount)
                .map(({ node }) => (
                  <FinishedScheduleLogsItem
                    key={node.id}
                    id={node.id}
                    title={node.training.title}
                    date={node.schedule.date}
                    nickname={node.profile.nickname}
                    count={node.count}
                    load={node.load}
                    distance={node.distance}
                    minitus={node.minitus}
                    comment={node.comment}
                  />
                ))}
              {dataMyTeamFinishedSchedules.myTeamFinishedSchedules.edges.slice(
                displayCount
              ).length !== 0 && (
                <Box textAlign="center" mt={5}>
                  <FetchMoreLink
                    name="finished-schedule-my-team-log"
                    text="さらに10件表示"
                    onClick={onClickAddDisplayCount}
                  />
                </Box>
              )}
            </>
          )}
          {displayCount !== 10 && (
            <Flex justify="flex-end" mt={5}>
              <Link onClick={onClickResetDisplayCount}>最初の10件を表示</Link>
            </Flex>
          )}
        </Box>
      )}
    </SectionCard>
  )
})
