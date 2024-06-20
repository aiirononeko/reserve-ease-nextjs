import { checkAuthAdmin } from '@/app/dashboard/admin/auth'
import { getStores } from './data'
import { StoreCard } from './store-card'

export default async function Page() {
  await checkAuthAdmin()
  const stores = await getStores()

  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-semibold'>店舗管理</h1>
      {stores && stores.length > 0 ? (
        <div className='space-y-4'>
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <p>店舗がありません</p>
      )}
    </div>
  )
}
