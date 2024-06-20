import { SetPasswordForm } from './set-password-form'

export default async function Page() {
  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-semibold'>パスワード設定</h1>
      <SetPasswordForm />
    </div>
  )
}
