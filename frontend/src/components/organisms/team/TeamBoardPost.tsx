import 'moment/locale/ja'

import { memo, useCallback, VFC } from 'react'
import { Button, Input, Box, Flex, Text, Spinner } from '@chakra-ui/react'

import { SpeechBallon } from '../../molecules/SpeechBallown'
import { useCreatePost } from '../../../hooks/queries/useCreatePost'
import { useGetMoreMyTeamPosts } from '../../../hooks/queries/useGetMoreMyTeamPosts'
import { NUM_PAGE } from '../../../../constants'
import { MyTeamPostsType } from '../../../../types/queriesType'
import { useGetMyProfile } from '../../../hooks/queries/useGetMyProfile'
import { SectionTitle } from '../../atoms/title/SectionTitle'
import { useControllModal } from '../../../hooks/useControllModal'
import { PostMemberItem } from '../../molecules/PostMemberItem'
import { FailedText } from '../../atoms/text/FailedText'
import { FetchMoreLink } from '../../atoms/link/FetchMoreLink'
import { SectionCloseLink } from '../../atoms/link/SectionCloseLink'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export const TeamBoardPost: VFC = memo(() => {
  moment.locale('ja')

  const { dataMyProfile } = useGetMyProfile()
  const {
    loadingMoreMyTeamPosts,
    dataMoreMyTeamPosts,
    errorMoreMyTeamPosts,
    fetchMore,
  } = useGetMoreMyTeamPosts()

  const { onOpenConfirmPostDeleteModal } = useControllModal()
  const { text, onChangeText, createPost } = useCreatePost()

  const fetchMorePost = useCallback(
    () =>
      fetchMore({
        variables: {
          first: NUM_PAGE,
          after: dataMoreMyTeamPosts?.myTeamPosts.pageInfo.endCursor || null,
        },
        updateQuery: (prevLoad, { fetchMoreResult }): MyTeamPostsType => {
          if (!fetchMoreResult) return prevLoad
          fetchMoreResult!.myTeamPosts.edges = [
            ...prevLoad.myTeamPosts.edges!,
            ...fetchMoreResult!.myTeamPosts.edges!,
          ]
          return fetchMoreResult
        },
      }),
    [dataMoreMyTeamPosts]
  )

  const fetchFirstPost = useCallback(
    () =>
      fetchMore({
        variables: {
          first: NUM_PAGE,
        },
        updateQuery: (prevLoad, { fetchMoreResult }): MyTeamPostsType => {
          return fetchMoreResult!
        },
      }),
    []
  )

  return (
    <>
      <SectionTitle>投稿一覧</SectionTitle>
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createPost()
          }}
        >
          {!dataMyProfile?.myProfile.isGuest && (
            <Box
              mb={6}
              bg="white"
              borderRadius="xl"
              p={4}
              borderWidth="2px"
              borderColor="gray.200"
              _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
              boxShadow="md"
            >
              <Flex gap={3}>
                <Input
                  value={text}
                  onChange={onChangeText}
                  flex={1}
                  placeholder="新しい投稿を作成..."
                  data-testid="post-text-form"
                />
                <Button
                  type="submit"
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  color="white"
                  fontWeight="semibold"
                  px={6}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  data-testid="create-post-button"
                >
                  📝 投稿
                </Button>
              </Flex>
            </Box>
          )}
        </form>
        {loadingMoreMyTeamPosts ? (
          <Box textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <>
            {errorMoreMyTeamPosts && <FailedText />}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.length === 0 && (
              <Text textAlign="center">投稿はありません。</Text>
            )}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.map(({ node }) => (
              <Box
                key={node.id}
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
                {dataMyProfile?.myProfile.id! === node.profile.id ? (
                  <Flex justify="flex-end">
                    <Box textAlign="right" flex={1} maxW="80%">
                      <Flex alignItems="center" justify="flex-end" mb={2}>
                        <Box
                          mr={3}
                          p={2}
                          borderRadius="full"
                          _hover={{
                            bg: 'red.50',
                            _dark: { bg: 'red.900/20' },
                          }}
                          cursor="pointer"
                          transition="all 0.2s"
                          data-testid={node.id + '-post-delete-icon'}
                          onClick={() =>
                            onOpenConfirmPostDeleteModal(node.id, node.text)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faX}
                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            size="sm"
                          />
                        </Box>
                        <Box
                          bg="purple.100"
                          color="purple.800"
                          px={4}
                          py={3}
                          borderRadius="2xl"
                          borderBottomRightRadius="sm"
                          maxW="full"
                          borderWidth="1px"
                          borderColor="purple.300"
                          _dark={{
                            bg: 'purple.900/30',
                            color: 'purple.200',
                            borderColor: 'purple.700',
                          }}
                          boxShadow="sm"
                        >
                          <Text fontWeight="medium">{node.text}</Text>
                        </Box>
                      </Flex>
                      <Flex alignItems="center" justify="flex-end" gap={2}>
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          _dark={{ color: 'gray.400' }}
                          data-testid={node.id + '-post-created-at'}
                        >
                          {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                        </Text>
                        <Box
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="purple.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderWidth="2px"
                          borderColor="purple.300"
                          _dark={{
                            bg: 'purple.900/30',
                            borderColor: 'purple.700',
                          }}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="purple.700"
                            _dark={{ color: 'purple.300' }}
                          >
                            {node.profile.nickname.charAt(0)}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                ) : (
                  <Flex>
                    <Box
                      w="32px"
                      h="32px"
                      borderRadius="full"
                      bg="blue.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mr={3}
                      flexShrink={0}
                      borderWidth="2px"
                      borderColor="blue.300"
                      _dark={{ bg: 'blue.900/30', borderColor: 'blue.700' }}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        color="blue.700"
                        _dark={{ color: 'blue.300' }}
                      >
                        {node.profile.nickname.charAt(0)}
                      </Text>
                    </Box>
                    <Box flex={1} maxW="80%">
                      <Flex alignItems="center" mb={2}>
                        <Box
                          bg="blue.100"
                          color="blue.800"
                          px={4}
                          py={3}
                          borderRadius="2xl"
                          borderBottomLeftRadius="sm"
                          maxW="full"
                          borderWidth="1px"
                          borderColor="blue.300"
                          _dark={{
                            bg: 'blue.900/30',
                            color: 'blue.200',
                            borderColor: 'blue.700',
                          }}
                          boxShadow="sm"
                        >
                          <Text fontWeight="medium">{node.text}</Text>
                        </Box>
                        {dataMyProfile?.myProfile.isCoach && (
                          <Box
                            ml={3}
                            p={2}
                            borderRadius="full"
                            _hover={{
                              bg: 'red.50',
                              _dark: { bg: 'red.900/20' },
                            }}
                            cursor="pointer"
                            transition="all 0.2s"
                            data-testid={node.id + '-post-delete-icon'}
                            onClick={() =>
                              onOpenConfirmPostDeleteModal(node.id, node.text)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faX}
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              size="sm"
                            />
                          </Box>
                        )}
                      </Flex>
                      <Flex alignItems="center" gap={2}>
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          color="gray.800"
                          _dark={{ color: 'white' }}
                        >
                          {node.profile.nickname}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          _dark={{ color: 'gray.400' }}
                          data-testid={node.id + '-post-created-at'}
                        >
                          {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                )}
              </Box>
            ))}
            {dataMoreMyTeamPosts?.myTeamPosts.pageInfo.hasNextPage && (
              <Box textAlign="center">
                <FetchMoreLink
                  name="post"
                  onClick={fetchMorePost}
                  text="以前の10件の投稿"
                />
              </Box>
            )}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.length! > 10 && (
              <Box pt={10}>
                <SectionCloseLink name="post-list" onClick={fetchFirstPost} />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  )
})
