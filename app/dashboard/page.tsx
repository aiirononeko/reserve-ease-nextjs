import { checkAuth } from '@/app/dashboard/auth'

export default async function Page() {
  await checkAuth()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-semibold'>ダッシュボード</h1>
    </div>
  )
}
