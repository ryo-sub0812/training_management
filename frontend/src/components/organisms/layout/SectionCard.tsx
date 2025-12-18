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
        "w-full md:w-auto mb-8 mr-8 ml-5 md:ml-0",
        "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300",
        className
      )}
      style={{ 
        width: typeof window !== 'undefined' && window.innerWidth >= 768 ? width : '350px',
        minHeight: '200px'
      }}
    >
      <CardContent className="pt-5 pb-10 px-4">
        {children}
      </CardContent>
    </Card>
  )
})
