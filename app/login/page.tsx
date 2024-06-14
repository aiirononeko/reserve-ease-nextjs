import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { LoginForm } from './login-form'

const containerVariants = cva(
  'mx-4 mt-10 flex flex-col items-center space-y-8 bg-card px-6 py-10',
)
const titleVariants = cva('text-xl font-bold')
const passwordRecoveryTextVariants = cva('flex space-x-1 text-[14px]')
const linkVariants = cva('underline')

export default function Page() {
  return (
    <div className={containerVariants()}>
      <h1 className={titleVariants()}>ログイン</h1>
      <LoginForm />
      <div className={passwordRecoveryTextVariants()}>
        <p>パスワードを忘れた場合は</p>
        <Link href='/password-recovery' className={linkVariants()}>
          こちら
        </Link>
      </div>
    </div>
  )
}
