import { checkAuth } from '@/app/dashboard/auth'
import { BusinessHourForm } from './business-hours-form'
import { getBusinessHours } from './data'

export default async function Page() {
  const user = await checkAuth()
  const businessHours = await getBusinessHours(user)

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-bold'>営業時間管理</h1>
      <div className='w-full bg-card p-4'>
        {businessHours && <BusinessHourForm businessHours={businessHours} />}
      </div>
    </div>
  )
}
