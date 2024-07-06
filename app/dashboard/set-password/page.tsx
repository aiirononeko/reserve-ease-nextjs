import { SetPasswordForm } from './set-password-form'

export default async function Page() {
  return (
    <div className='mx-4 flex flex-col items-center space-y-8 px-4 py-8'>
      <h1 className='text-xl font-bold'>パスワード設定</h1>
      <SetPasswordForm />
    </div>
  )
}
