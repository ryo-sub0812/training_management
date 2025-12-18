import { memo, ReactNode, VFC } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

type Props = {
  name: string
  onClick: () => void | null
  children: ReactNode
  className?: string
}

export const PrimaryLargeButton: VFC<Props> = memo((props) => {
  const { name, onClick, children, className } = props
  return (
    <Button
      variant="gradient"
      size="lg"
      className={cn("rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300", className)}
      data-testid={name + '-button'}
      onClick={onClick}
    >
      {children}
    </Button>
  )
})
