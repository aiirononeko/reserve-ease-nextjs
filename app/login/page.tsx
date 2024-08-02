import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  robots: {
    googleBot: {
      index: false,
    },
  },
}

export default async function Page() {
  return (
    <div className='my-8 flex flex-col space-y-8'>
      <h1 className='text-center text-xl font-bold'>ログイン</h1>
      <div className='flex w-full flex-col items-center justify-center space-y-4 px-4'>
        <LoginForm />
        <div className='flex space-x-1 text-[14px]'>
          <p>パスワードを忘れた場合は</p>
          <Link href='/password-recovery' className='text-primary underline'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
