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
    <header className="fixed w-full z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-2xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <nav className="relative flex justify-between items-center h-20 px-5 md:px-10">
          <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent bottom-0"></div>
          {children}
        </nav>
      </div>
      <div className="px-5 md:px-10 py-4 bg-gradient-to-r from-transparent via-card/50 to-transparent backdrop-blur-sm border-b border-border/30">
        <PageTitle>{title}</PageTitle>
        {isLogin && <TutorialText />}
      </div>
    </header>
  )
})
