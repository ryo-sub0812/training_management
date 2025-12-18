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
import { Card, CardContent } from '../../ui/card'

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
            <Card className="mb-6">
              <CardContent className="p-4">
                <Flex gap={3}>
                  <Input
                    value={text}
                    onChange={onChangeText}
                    className="input-field flex-1"
                    placeholder="新しい投稿を作成..."
                    data-testid="post-text-form"
                  />
                  <Button
                    type="submit"
                    className="btn-primary px-6"
                    data-testid="create-post-button"
                  >
                    📝 投稿
                  </Button>
                </Flex>
              </CardContent>
            </Card>
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
              <Card key={node.id} className="mb-4 transition-all duration-300 hover:scale-[1.01]">
                <CardContent className="p-4">
                  {dataMyProfile?.myProfile.id! === node.profile.id ? (
                    <Flex justify="flex-end">
                      <Box textAlign="right" flex={1} maxW="80%">
                        <Flex alignItems="center" justify="flex-end" mb={2}>
                          <Box 
                            mr={3}
                            className="p-1 rounded-full hover:bg-red-500/10 cursor-pointer transition-all duration-300"
                            data-testid={node.id + '-post-delete-icon'}
                            onClick={() =>
                              onOpenConfirmPostDeleteModal(node.id, node.text)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faX}
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                              size="sm"
                            />
                          </Box>
                          <Box className="bg-primary/90 text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm max-w-full">
                            <Text>{node.text}</Text>
                          </Box>
                        </Flex>
                        <Flex alignItems="center" justify="flex-end" gap={2}>
                          <Text
                            fontSize="xs"
                            className="text-muted-foreground"
                            data-testid={node.id + '-post-created-at'}
                          >
                            {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                          </Text>
                          <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Text fontSize="xs" fontWeight="bold">
                              {node.profile.nickname.charAt(0)}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  ) : (
                    <Flex>
                      <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/40 to-accent/40 flex items-center justify-center mr-3 flex-shrink-0">
                        <Text fontSize="xs" fontWeight="bold">
                          {node.profile.nickname.charAt(0)}
                        </Text>
                      </Box>
                      <Box flex={1} maxW="80%">
                        <Flex alignItems="center" mb={2}>
                          <Box className="bg-secondary/80 text-foreground px-4 py-3 rounded-2xl rounded-bl-sm max-w-full">
                            <Text>{node.text}</Text>
                          </Box>
                          {dataMyProfile?.myProfile.isCoach && (
                            <Box 
                              ml={3}
                              className="p-1 rounded-full hover:bg-red-500/10 cursor-pointer transition-all duration-300"
                              data-testid={node.id + '-post-delete-icon'}
                              onClick={() =>
                                onOpenConfirmPostDeleteModal(node.id, node.text)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faX}
                                className="text-muted-foreground hover:text-red-500 transition-colors"
                                size="sm"
                              />
                            </Box>
                          )}
                        </Flex>
                        <Flex alignItems="center" gap={2}>
                          <Text fontSize="xs" fontWeight="medium" className="text-foreground">
                            {node.profile.nickname}
                          </Text>
                          <Text
                            fontSize="xs"
                            className="text-muted-foreground"
                            data-testid={node.id + '-post-created-at'}
                          >
                            {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  )}
                </CardContent>
              </Card>
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
