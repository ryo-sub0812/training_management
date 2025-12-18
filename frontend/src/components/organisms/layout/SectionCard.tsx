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
        'w-full md:w-auto mb-8 mr-8 ml-5 md:ml-0 animate-fadeIn group',
        'md:mx-0 mx-auto',
        'hover:-translate-y-2 transition-all duration-300',
        'bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700',
        'shadow-lg hover:shadow-2xl',
        className
      )}
      style={{
        width:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? width
            : 'calc(100% - 2rem)',
        maxWidth: 'calc(100% - 2rem)',
        minHeight: '200px',
      }}
    >
      <CardContent className="pt-6 pb-10 px-6 relative overflow-hidden">
        {/* シンプルな装飾 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full -translate-y-16 translate-x-16 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full translate-y-12 -translate-x-12 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

        <div className="relative z-10">{children}</div>
      </CardContent>
    </Card>
  )
})
