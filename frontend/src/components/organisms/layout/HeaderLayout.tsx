import { memo, ReactNode, VFC } from 'react'

import { PageTitle } from '../../atoms/title/PageTitle'
import { TutorialText } from '../../atoms/text/TutorialText'

type Props = {
  title: string
  isLogin: boolean
  children: ReactNode
}

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { title, children, isLogin } = props

  return (
    <header className="fixed w-full h-20 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="flex justify-between items-center h-20 px-5 md:px-10">
        {children}
      </nav>
      <PageTitle>{title}</PageTitle>
      {isLogin && <TutorialText />}
    </header>
  )
})
