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
      <Box onClick={() => (myTeamBoard ? router.push('/main') : null)}>
        <Flex alignItems="center">
          <Image
            borderRadius="full"
            boxSize="50px"
            src="/images/team.jpg"
            alt="チーム画像"
          />
          <Heading
            as="h1"
            ml={2}
            fontSize={{ base: '15px', md: '30px' }}
            data-testid="my-team-name"
          >
            {myTeamBoard ? myTeamBoard.team.name : '未所属'}
          </Heading>
        </Flex>
      </Box>
      <Menu>
        <MenuButton>
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex alignItems="center">
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: '50px' }}
              />
              <Text pl={3} data-testid="my-nickname">
                {nickname}
              </Text>
            </Flex>
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <FontAwesomeIcon icon={faBars} />
          </Box>
        </MenuButton>
        <MenuList color="black">
          <Box
            display={{ base: 'block', md: 'none' }}
            borderBottom="1px solid #718096"
            mx={2}
            lineHeight="40px"
          >
            <Flex alignItems="center">
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: '40px' }}
              />
              <Text pl={1} color="black">
                {nickname}
              </Text>
            </Flex>
          </Box>
          <Box mx={6}>
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
    </HeaderLayout>
  )
})
