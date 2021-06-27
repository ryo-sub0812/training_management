import { memo, VFC, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/layout";

import { OneTeamFromIdType } from "../../../types/queriesType";
import { GET_ONE_TEAM_FROM_ID } from "../../queries";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner"
import { HeadTitle } from '../../components/atoms/title/HeadTitle'
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { useMessage } from "../../hooks/useMessage";
import { FailedText } from "../../components/atoms/text/FailedText";
import { HeaderForAuthUser } from "../../components/templates/HeaderForAuthUser";
import { MainMenubar } from "../../components/templates/MainMenubar";
import { TeamDetailMenubar } from "../../components/organisms/team/TeamDetailMenubar";
import { ConfirmTeamJoinModal } from "../../components/organisms/modal/ConfirmTeamJoinModal";
import { OneTeamCalendarSection } from "../../components/templates/OneTeamCalendarSection";
import { OneTeamTrainingSection } from "../../components/templates/OneTeamTrainingSection";
import { TeamBoardSection } from "../../components/templates/TeamBoardSection";
import { ModalSection } from "../../components/templates/ModalSection";
import { Footer } from '../../components/organisms/layout/Footer'

const TeamDetail: VFC = memo(() => {
    const router = useRouter()
    const { id } = router.query

    const { showMessage } = useMessage()

    const { errorMyProfile ,loadingMyProfile, dataMyProfile } = useGetMyProfile()
    const {loading: loadingOneTeamFromId, data: dataOneTeamFromId, error: errorOneTeamFromId } = useQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        variables: { teamId: id }
    })

    useEffect(() => {
        if (errorMyProfile) {
            localStorage.removeItem('token')
        }
        if (!localStorage.getItem('token')) {
            router.push('/')
            showMessage({ title: 'ログインしてください。', status: 'error'})
        }
        if (errorOneTeamFromId) {
            router.push('/teams')
        }
    }, [])
    

    if (loadingMyProfile || loadingOneTeamFromId) return <CustomSpinner />
    else if (errorMyProfile || errorOneTeamFromId) return <FailedText />

    return (
        <>
            <HeadTitle title={dataOneTeamFromId?.oneTeamFromId.name} />
            <HeaderForAuthUser
                title={`${dataOneTeamFromId?.oneTeamFromId.name} ページ`}
                nickname={dataMyProfile?.myProfile.nickname!}
                myTeamBoard={dataMyProfile?.myProfile.teamBoard}
                isMyTeamPage={false}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                isGuest={dataMyProfile?.myProfile.isGuest!}
            />
            <Flex>
                <MainMenubar
                    isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                    isCoach={dataMyProfile?.myProfile.isCoach!}
                    isMyTeamPage={false}
                    isGuest={dataMyProfile?.myProfile.isGuest!}
                />
                <Box mt='150px'>
                    <TeamDetailMenubar/>
                    <Flex flexWrap="wrap">
                        <Box>
                            <OneTeamCalendarSection schedules={dataOneTeamFromId?.oneTeamFromId.teamBoard.schedules} />
                        </Box>
                        <Box>
                            <OneTeamTrainingSection trainings={dataOneTeamFromId?.oneTeamFromId.teamBoard.trainings} />
                        </Box>
                        <Box>
                            <TeamBoardSection
                                teamName={dataOneTeamFromId?.oneTeamFromId.name}
                                introduction={dataOneTeamFromId?.oneTeamFromId.teamBoard.introduction}
                                coachName={dataOneTeamFromId?.oneTeamFromId.teamBoard.coach}
                                joinCount={dataOneTeamFromId?.oneTeamFromId.teamBoard.joinCount}
                                isMyTeam={false}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Footer />
            <ModalSection
                isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                page="teamListPage"
            />
            <ConfirmTeamJoinModal teamName={dataOneTeamFromId?.oneTeamFromId.name} teamId={dataOneTeamFromId?.oneTeamFromId.teamBoard.id}/> 
        </>
    )
})

export default TeamDetail