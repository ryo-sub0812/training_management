import { useRouter } from 'next/router'
import { memo, VFC } from 'react'
import { useUserAuth } from '../../hooks/queries/useUserAuth'
import { useControllModal } from '../../hooks/useControllModal'
import { PrimaryLargeButton } from '../atoms/button/PrimaryLargeButton'
import { Button } from '../ui/button'

export const TopContentsSection: VFC = memo(() => {
  const { onOpenUserAuthModal } = useControllModal()
  const { joinGuestUser } = useUserAuth()

  const router = useRouter()

  return (
    <section className="pt-20">
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/top-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            <span className="hidden md:block">
              チームを作って、<br />
              トレーニングスケジュールを<br />
              管理しよう。
            </span>
            <span className="block md:hidden text-3xl">
              チームを作って<br />
              トレーニングスケジュールを<br />
              管理しよう。
            </span>
          </h1>
          
          <div className="flex flex-col gap-4 mt-12">
            <PrimaryLargeButton
              name="login-modal"
              onClick={() => onOpenUserAuthModal(true)}
              className="min-w-48"
            >
              ログイン
            </PrimaryLargeButton>
            <p className="text-white text-xl font-medium">または</p>
            <PrimaryLargeButton
              name="signup-modal"
              onClick={() => onOpenUserAuthModal(false)}
              className="min-w-48"
            >
              新規登録
            </PrimaryLargeButton>
          </div>
          
          <div className="mt-24">
            <p className="text-white text-lg mb-4 drop-shadow-md">
              お試しの使用はこちら
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={joinGuestUser}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8"
            >
              ゲストとして参加
            </Button>
          </div>
          
          <div className="mt-24 md:mt-48">
            <button
              onClick={() => router.push('/about')}
              className="text-orange-400 hover:text-orange-300 text-2xl font-semibold underline underline-offset-4 transition-colors drop-shadow-md"
            >
              トレサポとは？
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})
