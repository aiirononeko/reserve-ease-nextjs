import { checkAuth } from '@/app/dashboard/auth'
import { getStore } from './data'
import { StoreForm } from './store-form'

export default async function Page() {
  const user = await checkAuth()
  const store = await getStore(user)

  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-semibold'>店舗情報管理</h1>
      {store && <StoreForm store={store} />}
    </div>
  )
}
