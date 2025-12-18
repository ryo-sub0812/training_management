import { memo, VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import { ProfileNodeType } from '../../../../types/queriesType'
import { useControllModal } from '../../../hooks/useControllModal'
import { Card, CardContent } from '../../ui/card'

type Props = {
  member: ProfileNodeType
}

export const MyTeamMemberListItem: VFC<Props> = memo((props) => {
  const { member } = props

  const { onOpenOneMemberSelected } = useControllModal()

  return (
    <Card className="mb-4 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
      <CardContent className="p-4">
        <Flex alignItems="center" gap={4}>
          <Box className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faCircleUser} 
              className="text-primary text-xl"
            />
          </Box>
          
          <Box flex={1}>
            <Text
              fontWeight="semibold"
              fontSize={{ base: 'md', md: 'lg' }}
              className="text-foreground"
              data-testid={`${member.node.id}-member-nickname`}
            >
              {member.node.nickname}
              {member.node.isCoach && (
                <Box as="span" className="ml-2 bg-warning/20 text-warning px-2 py-1 rounded-full text-xs font-semibold">
                  👑 コーチ
                </Box>
              )}
            </Text>
            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 1, md: 4 }} mt={1}>
              <Text
                fontSize="sm"
                className="text-muted-foreground"
                data-testid={`${member.node.id}-member-join-date`}
              >
                🗓️ 参加日: {moment(member.node.joinAt).format('YYYY年M月D日(ddd) H時m分')}
              </Text>
              <Text
                fontSize="sm"
                className="text-muted-foreground"
                data-testid={`${member.node.id}-member-finished-schedule-count`}
              >
                🏆 実施回数: {member.node.finishedScheduleCount}回
              </Text>
            </Flex>
          </Box>
          
          <Box 
            className="p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-all duration-300"
            data-testid={`${member.node.id}-member-detail-${window.innerWidth >= 768 ? 'md' : 'base'}`}
            onClick={() =>
              onOpenOneMemberSelected(
                member.node.id,
                member.node.nickname,
                member.node.isCoach,
                window.innerWidth < 768
              )
            }
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-accent hover:text-accent/80 transition-colors"
              size="lg"
            />
          </Box>
        </Flex>
      </CardContent>
    </Card>
  )
})
