import { checkAuth } from '@/app/dashboard/auth'
import { getStore } from './data'
import { StoreForm } from './store-form'

export default async function Page() {
  const user = await checkAuth()
  const store = await getStore(user)

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-semibold'>店舗情報管理</h1>
      <div className='w-full bg-card p-4'>
        {store && <StoreForm store={store} />}
      </div>
    </div>
  )
}
