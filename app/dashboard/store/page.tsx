import { getStore } from './data'
import { StoreForm } from './store-form'

export default async function Page() {
  const store = await getStore()

  return (
    <div className='mx-4 mt-8 flex flex-col items-center space-y-8 bg-card px-6 py-10'>
      <h1 className='text-xl font-bold'>店舗管理</h1>
      {store && <StoreForm store={store} />}
    </div>
  )
}
