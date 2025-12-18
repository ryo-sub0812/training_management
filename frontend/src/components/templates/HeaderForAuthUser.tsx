import { memo, useCallback, useState, VFC } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Image,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useUserAuth } from '../../hooks/queries/useUserAuth'
import { useControllModal } from '../../hooks/useControllModal'
import { TeamBoardType } from '../../../types/queriesType'
import { MenuListItem } from '../molecules/MenuListItem'
import { useDeleteMyAccount } from '../../hooks/queries/useDeleteMyAccount'
import {
  faArrowRightFromBracket,
  faBars,
  faCircleUser,
  faHouse,
  faList,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  title: string
  nickname: string
  myTeamBoard: TeamBoardType | undefined
  isMyTeamPage: boolean
  isCoach: boolean
  isGuest: boolean
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
  const { title, nickname, myTeamBoard, isMyTeamPage, isCoach, isGuest } = props

  const [menuFocus, setMenuFocus] = useState<false | 'pageList' | 'myMenuList'>(
    false
  )

  const router = useRouter()
  const { logout } = useUserAuth()
  const { deleteUser } = useDeleteMyAccount()
  const {
    onOpenTeamAuthModal,
    onOpenTrainingCreateModal,
    onOpenScheduleCreateModal,
    onOpenScheduleDeleteModal,
    onOpenMyProfileEditModal,
    onOpenTeamEditModal,
  } = useControllModal()

  const onFocusPageList = useCallback(() => setMenuFocus('pageList'), [])
  const onFocusMyMenuList = useCallback(() => setMenuFocus('myMenuList'), [])
  const onCloseMenuFocus = useCallback(() => setMenuFocus(false), [])

  return (
    <HeaderLayout isLogin={true} title={title}>
      <Flex alignItems="center" justifyContent="space-between" w="full" gap={4}>
        <Box
          onClick={() => (myTeamBoard ? router.push('/main') : null)}
          cursor={myTeamBoard ? 'pointer' : 'default'}
          _hover={myTeamBoard ? { opacity: 0.8 } : {}}
          transition="all 0.2s"
        >
          <Flex alignItems="center" gap={3}>
            <Box
              borderRadius="full"
              overflow="hidden"
              boxSize={{ base: '40px', md: '48px' }}
              borderWidth="2px"
              borderColor="purple.300"
              _dark={{ borderColor: 'purple.600' }}
              boxShadow="md"
            >
              <Image
                borderRadius="full"
                boxSize={{ base: '40px', md: '48px' }}
                src="/images/team.jpg"
                alt="チーム画像"
              />
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: '16px', md: '24px' }}
              fontWeight="800"
              bgGradient="linear(to-r, purple.600, blue.600)"
              bgClip="text"
              _dark={{
                bgGradient: 'linear(to-r, purple.400, blue.400)',
                bgClip: 'text',
              }}
              data-testid="my-team-name"
            >
              {myTeamBoard ? myTeamBoard.team.name : '未所属'}
            </Heading>
          </Flex>
        </Box>
        <Flex alignItems="center" gap={3}>
          <Box
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            gap={3}
            bg="white"
            borderRadius="xl"
            px={4}
            py={2}
            borderWidth="2px"
            borderColor="purple.300"
            _dark={{ bg: 'gray.800', borderColor: 'purple.600' }}
            boxShadow="md"
          >
            <Box
              w="36px"
              h="36px"
              borderRadius="full"
              bg="purple.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth="2px"
              borderColor="purple.300"
              _dark={{ bg: 'purple.900/30', borderColor: 'purple.700' }}
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-purple-600 dark:text-purple-400"
                size="lg"
              />
            </Box>
            <Text
              fontWeight="bold"
              fontSize="md"
              color="gray.800"
              _dark={{ color: 'white' }}
              data-testid="my-nickname"
            >
              {nickname}
            </Text>
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              borderRadius="xl"
              px={4}
              py={2}
              borderWidth="2px"
              borderColor="purple.300"
              _dark={{
                bg: 'gray.800',
                borderColor: 'purple.600',
                color: 'purple.400',
              }}
              boxShadow="md"
              _hover={{
                bg: 'purple.50',
                _dark: { bg: 'purple.900/20' },
                boxShadow: 'lg',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
              color="purple.600"
            >
              <Box
                display={{ base: 'none', md: 'flex' }}
                alignItems="center"
                gap={2}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ color: '#805AD5' }}
                  className="dark:text-purple-400"
                  size="lg"
                />
              </Box>
              <Box display={{ base: 'block', md: 'none' }}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ color: '#805AD5' }}
                  className="dark:text-purple-400"
                  size="lg"
                />
              </Box>
            </MenuButton>
            <MenuList
              bg="white"
              borderRadius="xl"
              borderWidth="2px"
              borderColor="purple.300"
              _dark={{ bg: 'gray.800', borderColor: 'purple.600' }}
              boxShadow="xl"
              p={4}
              minW="280px"
            >
              <Box
                display={{ base: 'block', md: 'none' }}
                pb={4}
                mb={4}
                borderBottomWidth="1px"
                borderColor="gray.200"
                _dark={{ borderColor: 'gray.700' }}
              >
                <Flex alignItems="center" gap={3}>
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg="purple.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth="2px"
                    borderColor="purple.300"
                    _dark={{ bg: 'purple.900/30', borderColor: 'purple.700' }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-purple-600 dark:text-purple-400"
                      size="lg"
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    color="gray.800"
                    _dark={{ color: 'white' }}
                  >
                    {nickname}
                  </Text>
                </Flex>
              </Box>
              <Box>
                <MenuListItem
                  text="メニュー"
                  onClick={() =>
                    menuFocus === 'myMenuList'
                      ? onCloseMenuFocus()
                      : onFocusMyMenuList()
                  }
                >
                  <FontAwesomeIcon icon={faBars} />
                </MenuListItem>
                {menuFocus === 'myMenuList' && (
                  <Box ml={10}>
                    {!isGuest && (
                      <MenuListItem
                        text="プロフィール編集"
                        onClick={onOpenMyProfileEditModal}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </MenuListItem>
                    )}
                    {!myTeamBoard && (
                      <>
                        {!isGuest && (
                          <MenuListItem
                            text="チーム作成"
                            onClick={() => onOpenTeamAuthModal(false)}
                          >
                            <FontAwesomeIcon icon={faUsers} />
                          </MenuListItem>
                        )}
                        <MenuListItem
                          text="チーム加入"
                          onClick={() => onOpenTeamAuthModal(true)}
                        >
                          <FontAwesomeIcon icon={faUsers} />
                        </MenuListItem>
                      </>
                    )}
                    {isCoach && isMyTeamPage && (
                      <>
                        <MenuListItem
                          text="チーム編集"
                          onClick={onOpenTeamEditModal}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </MenuListItem>
                        <MenuListItem
                          text="トレーニング作成"
                          onClick={onOpenTrainingCreateModal}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </MenuListItem>
                        <MenuListItem
                          text="スケジュール作成"
                          onClick={onOpenScheduleCreateModal}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </MenuListItem>
                        <MenuListItem
                          text="スケジュール削除"
                          onClick={onOpenScheduleDeleteModal}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </MenuListItem>
                      </>
                    )}
                    <MenuListItem
                      text={isGuest ? 'アカウント削除' : 'ログアウト'}
                      onClick={isGuest ? deleteUser : logout}
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </MenuListItem>
                  </Box>
                )}
                <MenuListItem
                  text="ページ移動"
                  onClick={() =>
                    menuFocus === 'pageList'
                      ? onCloseMenuFocus()
                      : onFocusPageList()
                  }
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </MenuListItem>
                {menuFocus === 'pageList' && (
                  <Box ml={10}>
                    {myTeamBoard && (
                      <MenuListItem
                        text="マイページ"
                        onClick={() => router.push('/main')}
                      >
                        <FontAwesomeIcon icon={faHouse} />
                      </MenuListItem>
                    )}
                    {isCoach && (
                      <MenuListItem
                        text="マイチームメンバー"
                        onClick={() => router.push('/my-team-member')}
                      >
                        <FontAwesomeIcon icon={faList} />
                      </MenuListItem>
                    )}
                    <MenuListItem
                      text="チームリスト"
                      onClick={() => router.push('/teams')}
                    >
                      <FontAwesomeIcon icon={faList} />
                    </MenuListItem>
                  </Box>
                )}
              </Box>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </HeaderLayout>
  )
})
