import { memo, ReactNode, VFC } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

type Props = {
  name: string
  type: 'button' | 'submit'
  disabled: boolean
  onClick: () => void | null
  children: ReactNode
  className?: string
}

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { name, type, disabled, onClick, children, className } = props
  return (
    <Button
      disabled={disabled}
      type={type}
      variant="default"
      size="lg"
      className={cn("rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-200", className)}
      data-testid={name + '-button'}
      onClick={onClick}
    >
      {children}
    </Button>
  )
})
