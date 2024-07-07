import { getStore } from './data'
import { StoreForm } from './store-form'

export default async function Page() {
  const store = await getStore()

  return (
    <div className='mx-4 flex flex-col items-center space-y-8 py-8'>
      <h1 className='text-xl font-semibold'>店舗情報管理</h1>
      <div className='w-full px-4'>{store && <StoreForm store={store} />}</div>
    </div>
  )
}
