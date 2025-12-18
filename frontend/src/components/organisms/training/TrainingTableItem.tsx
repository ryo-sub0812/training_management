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
      <Flex
        alignItems="center"
        gap={4}
        mb={isMyTeam && !dataMyProfile?.myProfile.isGuest ? 3 : 0}
      >
        <Box
          w={{ base: '50px', md: '60px' }}
          h={{ base: '50px', md: '60px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="xl"
          bg="purple.50"
          borderWidth="2px"
          borderColor="purple.200"
          _dark={{ bg: 'purple.900/20', borderColor: 'purple.700' }}
          boxShadow="sm"
          p={2}
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
            fontWeight="800"
            bgGradient="linear(to-r, purple.600, blue.600)"
            bgClip="text"
            _dark={{
              bgGradient: 'linear(to-r, purple.400, blue.400)',
              bgClip: 'text',
            }}
            cursor="pointer"
            _hover={{
              opacity: 0.8,
            }}
            transition="all 0.2s"
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
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: 'gray.400' }}
              mt={1}
              data-testid={node.id + '-training-finished-count'}
            >
              📊 実施回数:{' '}
              {
                node.finishedSchedules.edges?.filter(
                  ({ node }) => node.profile.id === dataMyProfile?.myProfile.id
                ).length
              }
              回
            </Text>
          )}
        </Box>

        {isMyTeam &&
          !dataMyProfile?.myProfile.isGuest! &&
          dataMyProfile?.myProfile.isCoach && (
            <Flex gap={3} alignItems="center">
              <Box
                p={2}
                borderRadius="lg"
                _hover={{
                  bg: 'blue.50',
                  _dark: { bg: 'blue.900/20' },
                  boxShadow: 'sm',
                }}
                cursor="pointer"
                transition="all 0.2s"
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
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  size="lg"
                />
              </Box>
              <Box
                p={2}
                borderRadius="lg"
                _hover={{
                  bg: 'red.50',
                  _dark: { bg: 'red.900/20' },
                  boxShadow: 'sm',
                }}
                cursor="pointer"
                transition="all 0.2s"
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
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  size="lg"
                />
              </Box>
            </Flex>
          )}
      </Flex>

      {isMyTeam && !dataMyProfile.myProfile.isGuest && (
        <Box
          mt={3}
          pt={3}
          borderTopWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: 'gray.700' }}
        >
          <Link
            color="purple.600"
            _dark={{ color: 'purple.400' }}
            fontWeight="semibold"
            fontSize="sm"
            _hover={{
              color: 'purple.700',
              _dark: { color: 'purple.300' },
            }}
            transition="all 0.2s"
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
    </Box>
  )
})
