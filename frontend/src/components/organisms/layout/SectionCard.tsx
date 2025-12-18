import { memo, ReactNode, VFC } from 'react'
import { Card, CardContent } from '../../ui/card'
import { cn } from '../../../lib/utils'

type Props = {
  width: string
  children: ReactNode
  className?: string
}

export const SectionCard: VFC<Props> = memo((props) => {
  const { width, children, className } = props

  return (
    <Card
      className={cn(
        "w-full md:w-auto mb-8 mr-8 ml-5 md:ml-0 animate-fadeIn group",
        "hover:scale-[1.02] hover:-translate-y-1 hover:rotate-0.5",
        className
      )}
      style={{ 
        width: typeof window !== 'undefined' && window.innerWidth >= 768 ? width : '350px',
        minHeight: '200px'
      }}
    >
      <CardContent className="pt-6 pb-10 px-6 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          {children}
        </div>
      </CardContent>
    </Card>
  )
})
