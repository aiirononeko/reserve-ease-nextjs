import { checkAuth } from '@/app/dashboard/auth'
import { BusinessHourForm } from './business-hours-form'
import { getBusinessHours } from './data'

export default async function Page() {
  const user = await checkAuth()
  const businessHours = await getBusinessHours(user)

  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-bold'>営業時間管理</h1>
      {businessHours && (
        <>
          {businessHours.map((businessHour) => (
            <BusinessHourForm
              key={businessHour.id}
              businessHour={businessHour}
            />
          ))}
        </>
      )}
    </div>
  )
}
