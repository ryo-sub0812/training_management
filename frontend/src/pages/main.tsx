import 'moment/locale/ja'

import { memo, VFC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Box } from '@chakra-ui/react'
import moment from 'moment'

import { useGetMyProfile } from '../hooks/queries/useGetMyProfile'
import { useMessage } from '../hooks/useMessage'
import { CustomSpinner } from '../components/atoms/spinner/CustomSpinner'
import { FailedText } from '../components/atoms/text/FailedText'
import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { MyTeamCalendarSection } from '../components/templates/MyTeamCalendarSection'
import { HeaderForAuthUser } from '../components/templates/HeaderForAuthUser'
import { MainMenubar } from '../components/templates/MainMenubar'
import { ModalSection } from '../components/templates/ModalSection'
import { MyTeamTrainingSection } from '../components/templates/MyTeamTrainingSection'
import { TeamBoardSection } from '../components/templates/TeamBoardSection'
import { FinishedScheduleLogsSection } from '../components/templates/FinishedScheduleLogsSection'
import { finishedScheduleMemberListModalState } from '../store/finishedScheduleMemberListModalState'
import { useRecoilValue } from 'recoil'
import { FinishedScheduleMemberSection } from '../components/templates/FinishedScheduleMemberSection'
import { Footer } from '../components/organisms/layout/Footer'
import { tutorialState } from '../store/tutorialState'

const Main: VFC = memo(() => {
  moment.locale('ja')

  const router = useRouter()
  const { showMessage } = useMessage()
  const { loadingMyProfile, errorMyProfile, dataMyProfile } = useGetMyProfile()

  const tutorial = useRecoilValue(tutorialState)
  const finishedScheduleMemberListModal = useRecoilValue(
    finishedScheduleMemberListModalState
  )

  useEffect(() => {
    if (errorMyProfile) {
      localStorage.removeItem('token')
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
      showMessage({ title: 'ログインしてください。', status: 'error' })
    }
  }, [errorMyProfile])

  if (loadingMyProfile) return <CustomSpinner />
  else if (errorMyProfile) return <FailedText />

  return (
    <>
      <HeadTitle title="マイページ" />
      <HeaderForAuthUser
        title="マイページ"
        nickname={dataMyProfile?.myProfile?.nickname!}
        myTeamBoard={dataMyProfile?.myProfile.teamBoard}
        isMyTeamPage={true}
        isCoach={dataMyProfile?.myProfile.isCoach!}
        isGuest={dataMyProfile?.myProfile.isGuest!}
      />
      <Flex>
        <MainMenubar
          isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
          isCoach={dataMyProfile?.myProfile.isCoach!}
          isMyTeamPage={true}
          isGuest={dataMyProfile?.myProfile.isGuest!}
        />
        <Box
          mt={tutorial === 0 ? '150px' : { base: '300px', md: '250px' }}
          px={{ base: 4, md: 0 }}
        >
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: 'center', md: 'flex-start' }}
          >
            <Box>
              <MyTeamCalendarSection />
            </Box>
            {dataMyProfile?.myProfile.isCoach &&
              finishedScheduleMemberListModal.isOpen && (
                <Box display={{ base: 'none', md: 'block' }}>
                  <FinishedScheduleMemberSection />
                </Box>
              )}
            <Box>
              <MyTeamTrainingSection />
            </Box>
            {!dataMyProfile.myProfile.isGuest && (
              <Box>
                <FinishedScheduleLogsSection />
              </Box>
            )}
            <Box>
              <TeamBoardSection
                teamName={dataMyProfile?.myProfile.teamBoard.team.name}
                introduction={dataMyProfile?.myProfile.teamBoard?.introduction}
                coachName={dataMyProfile?.myProfile.teamBoard?.coach}
                joinCount={dataMyProfile?.myProfile.teamBoard.joinCount}
                isMyTeam={true}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Footer />
      <ModalSection
        isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
        isCoach={dataMyProfile?.myProfile.isCoach!}
        page="myPage"
      />
    </>
  )
})

export default Main
