import { checkAuthAdmin } from '@/app/dashboard/admin/auth'
import { StoreForm } from './store-form'

export default async function Page() {
  await checkAuthAdmin()

  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-semibold'>店舗作成</h1>
      <StoreForm />
    </div>
  )
}
