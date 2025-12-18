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
    <header className="fixed w-full z-50 bg-white dark:bg-gray-900 border-b-2 border-purple-200 dark:border-purple-800 shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50"></div>
        <nav className="relative flex justify-between items-center h-16 px-4 md:px-8">
          {children}
        </nav>
      </div>
      {isLogin && (
        <div className="px-4 md:px-8 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <PageTitle>{title}</PageTitle>
          <TutorialText />
        </div>
      )}
    </header>
  )
})
