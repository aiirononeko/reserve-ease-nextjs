import type { Metadata } from 'next'
import { SignUpForm } from './sign-up-form'

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
      <h1 className='text-center text-xl font-bold'>ReserveEaseに登録</h1>
      <div className='flex w-full flex-col items-center justify-center px-4'>
        <SignUpForm />
      </div>
    </div>
  )
}
