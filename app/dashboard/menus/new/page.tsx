import { checkAuth } from '@/app/dashboard/auth'
import { MenuForm } from './menu-form'

export default async function Page() {
  const user = await checkAuth()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-bold'>メニュー作成</h1>
      <div className='w-full px-4'>
        <MenuForm user={user} />
      </div>
    </div>
  )
}
