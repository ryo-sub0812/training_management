import { memo, VFC } from 'react'
import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useControllModal } from '../../hooks/useControllModal'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'

export const HeaderForGeneralUser: VFC = memo(() => {
  const { onOpenUserAuthModal } = useControllModal()
  const router = useRouter()

  return (
    <HeaderLayout title="" isLogin={false}>
      <h1 
        className="text-base md:text-3xl font-bold text-primary-600 cursor-pointer hover:text-primary-700 transition-colors"
        onClick={() => router.push('/')}
      >
        トレサポ
      </h1>
      <Button 
        variant="ghost" 
        onClick={() => onOpenUserAuthModal(true)}
        className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
      >
        ログイン
      </Button>
    </HeaderLayout>
  )
})
