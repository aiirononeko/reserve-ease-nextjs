import { StoreForm } from './store-form'

export default function Page() {
  return (
    <div className='mx-4 mt-8 flex flex-col items-center space-y-8 bg-card px-6 py-10'>
      <h1 className='text-xl font-bold'>店舗管理</h1>
      <StoreForm />
    </div>
  )
}
