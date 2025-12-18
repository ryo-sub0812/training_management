import { memo, VFC } from 'react'
import { Box, Flex, Text, Link } from '@chakra-ui/react'

import { TrainingNodeType } from '../../../../types/queriesType'
import { TrainingIcon } from '../../molecules/TrainingIcon'
import { useGetMyProfile } from '../../../hooks/queries/useGetMyProfile'
import { useControllModal } from '../../../hooks/useControllModal'
import { useNumber } from '../../../hooks/useNumber'
import { CustomSpinner } from '../../atoms/spinner/CustomSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card, CardContent } from '../../ui/card'

type Props = TrainingNodeType & {
  isMyTeam: boolean
}

export const TrainingTableItem: VFC<Props> = memo((props) => {
  const { node, isMyTeam } = props

  const { dataMyProfile, loadingMyProfile } = useGetMyProfile()
  const {
    onOpenTrainingUpdateModal,
    onOpenConfirmTrainingDeleteModal,
    onOpneTrainingDetailModal,
    onOpenTrainingImplementationModal,
  } = useControllModal()
  const { zeroNumber } = useNumber()

  if (loadingMyProfile) return <CustomSpinner />

  return (
    <Card className="mb-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <CardContent className="p-4">
        <Flex alignItems="center" gap={4}>
          <Box
            w={{ base: '50px', md: '60px' }}
            h={{ base: '50px', md: '60px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-2"
            data-testid={node.id + '-training-icon'}
          >
            <TrainingIcon
              iconNumber={node.iconNumber}
              color="black"
              size="40px"
            />
          </Box>
          
          <Box flex={1}>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="semibold"
              className="text-foreground cursor-pointer hover:text-primary transition-colors"
              noOfLines={1}
              data-testid={node.id + '-training-title'}
              onClick={() => {
                if (isMyTeam) {
                  onOpneTrainingDetailModal(
                    node.title,
                    node.description,
                    node.finishedPatern,
                    zeroNumber(node.iconNumber)
                  )
                }
              }}
            >
              {node.title}
            </Text>
            
            {isMyTeam && !dataMyProfile?.myProfile.isGuest! && (
              <Text fontSize="sm" className="text-muted-foreground mt-1" data-testid={node.id + '-training-finished-count'}>
                実施回数: {
                  node.finishedSchedules.edges?.filter(
                    ({ node }) => node.profile.id === dataMyProfile?.myProfile.id
                  ).length
                }回
              </Text>
            )}
          </Box>
          
          {isMyTeam && !dataMyProfile?.myProfile.isGuest! && dataMyProfile?.myProfile.isCoach && (
            <Flex gap={3} alignItems="center">
              <Box 
                className="p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-all duration-300"
                data-testid={node.id + '-training-edit-icon'}
                onClick={() => {
                  onOpenTrainingUpdateModal(
                    node.id,
                    node.title,
                    node.description,
                    zeroNumber(node.iconNumber),
                    node.finishedPatern
                  )
                }}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  size="lg"
                />
              </Box>
              <Box 
                className="p-2 rounded-lg hover:bg-red-500/10 cursor-pointer transition-all duration-300"
                data-testid={node.id + '-training-delete-icon'}
                onClick={() => {
                  onOpenConfirmTrainingDeleteModal(
                    node.id,
                    node.title,
                    node.description
                  )
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                  size="lg"
                />
              </Box>
            </Flex>
          )}
        </Flex>
        
        {isMyTeam && !dataMyProfile.myProfile.isGuest && (
          <Box mt={3} pt={3} borderTop="1px solid" className="border-border/30">
            <Link
              className="text-accent hover:text-accent/80 font-medium text-sm transition-colors"
              data-testid={`${node.id}-training-implementation-list`}
              onClick={() =>
                onOpenTrainingImplementationModal(
                  node.id,
                  node.title,
                  node.finishedPatern
                )
              }
            >
              📊 実施状況を確認
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  )
})
