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
        'hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300',
        'bg-gradient-to-br from-card via-card/95 to-card/90',
        'border-2 border-primary/20 shadow-2xl shadow-primary/10',
        'backdrop-blur-xl',
        className
      )}
      style={{
        width:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? width
            : '350px',
        minHeight: '200px',
      }}
    >
      <CardContent className="pt-6 pb-10 px-6 relative overflow-hidden">
        {/* 装飾的なグラデーション背景 */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/20 rounded-full -translate-y-20 translate-x-20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 via-secondary/15 to-primary/10 rounded-full translate-y-16 -translate-x-16 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

        {/* 光るエフェクト */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <div className="relative z-10">{children}</div>
      </CardContent>
    </Card>
  )
})
